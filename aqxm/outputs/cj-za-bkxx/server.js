const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = Number(process.env.PORT || 4173);
const ROOT = __dirname;
const DATA_FILE = path.join(ROOT, "data", "provinces.json");

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".csv": "text/csv; charset=utf-8",
  ".svg": "image/svg+xml"
};

function send(res, status, body, type = "text/plain; charset=utf-8") {
  res.writeHead(status, { "Content-Type": type, "Cache-Control": "no-store" });
  res.end(body);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 5 * 1024 * 1024) {
        reject(new Error("请求体过大"));
        req.destroy();
      }
    });
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

function safePath(urlPath) {
  const cleanPath = decodeURIComponent(urlPath.split("?")[0]);
  const target = path.normalize(path.join(ROOT, cleanPath === "/" ? "index.html" : cleanPath));
  if (!target.startsWith(ROOT)) return null;
  return target;
}

const server = http.createServer(async (req, res) => {
  try {
    if (req.method === "GET" && req.url === "/api/provinces") {
      return send(res, 200, fs.readFileSync(DATA_FILE, "utf8"), "application/json; charset=utf-8");
    }

    if (req.method === "POST" && req.url === "/api/provinces") {
      const body = await readBody(req);
      const data = JSON.parse(body);
      if (!Array.isArray(data.provinces) || !data.updatedAt) {
        return send(res, 400, JSON.stringify({ ok: false, message: "数据结构不完整" }), "application/json; charset=utf-8");
      }
      fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
      return send(res, 200, JSON.stringify({ ok: true }), "application/json; charset=utf-8");
    }

    if (req.method !== "GET") {
      return send(res, 405, "Method Not Allowed");
    }

    const target = safePath(req.url);
    if (!target || !fs.existsSync(target) || fs.statSync(target).isDirectory()) {
      return send(res, 404, "Not Found");
    }
    const ext = path.extname(target).toLowerCase();
    return send(res, 200, fs.readFileSync(target), mimeTypes[ext] || "application/octet-stream");
  } catch (error) {
    return send(res, 500, JSON.stringify({ ok: false, message: error.message }), "application/json; charset=utf-8");
  }
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`2026初级注册安全工程师报考查询站已启动：http://127.0.0.1:${PORT}`);
  console.log("前台：http://127.0.0.1:" + PORT + "/");
  console.log("后台：http://127.0.0.1:" + PORT + "/admin.html");
});
