const ADMIN_DATA_URL = "data/provinces.json";
const ADMIN_STORAGE_KEY = "cjaq-2026-province-data";

let adminData = null;
let currentId = "";

const adminFields = [
  "province",
  "region",
  "registrationStart",
  "registrationEnd",
  "officialSite",
  "officialUrl",
  "educationThreshold",
  "auditMethod",
  "fee",
  "admissionTicketTime",
  "examDate",
  "scoreQueryTime",
  "examForm",
  "note"
];

const $ = (selector) => document.querySelector(selector);

function toInputDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const pad = (number) => String(number).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function fromInputDate(value, endOfDay = false) {
  if (!value) return "";
  const suffix = endOfDay ? ":59+08:00" : ":00+08:00";
  return `${value}${suffix}`;
}

function setState(message) {
  $("#saveState").textContent = message;
}

async function loadAdminData() {
  const local = localStorage.getItem(ADMIN_STORAGE_KEY);
  if (local) {
    try {
      return JSON.parse(local);
    } catch {
      localStorage.removeItem(ADMIN_STORAGE_KEY);
    }
  }
  try {
    const response = await fetch(ADMIN_DATA_URL, { cache: "no-store" });
    if (!response.ok) throw new Error("读取数据失败");
    return response.json();
  } catch (error) {
    if (window.CJAQ_EMBEDDED_DATA) return structuredClone(window.CJAQ_EMBEDDED_DATA);
    throw error;
  }
}

function currentItem() {
  return adminData.provinces.find((item) => item.id === currentId);
}

function renderList() {
  $("#provinceList").innerHTML = adminData.provinces.map((item) => `<button class="admin-row ${item.id === currentId ? "active" : ""}" data-id="${item.id}" type="button">
    <span>${item.province}</span>
    <span>${item.announced ? "已公告" : "待公布"}</span>
  </button>`).join("");
}

function fillForm() {
  const item = currentItem();
  if (!item) return;
  adminFields.forEach((field) => {
    const input = document.querySelector(`[name="${field}"]`);
    if (!input) return;
    if (["registrationStart", "registrationEnd", "examDate"].includes(field)) {
      input.value = toInputDate(item[field]);
    } else {
      input.value = item[field] || "";
    }
  });
  $("[name='announced']").value = String(Boolean(item.announced));
  $("[name='latest']").value = String(Boolean(item.latest));
}

function collectForm() {
  const item = currentItem();
  adminFields.forEach((field) => {
    const input = document.querySelector(`[name="${field}"]`);
    if (!input) return;
    if (field === "registrationStart") item[field] = fromInputDate(input.value);
    else if (field === "registrationEnd") item[field] = fromInputDate(input.value, true);
    else if (field === "examDate") item[field] = fromInputDate(input.value);
    else item[field] = input.value.trim();
  });
  item.announced = $("[name='announced']").value === "true";
  item.latest = $("[name='latest']").value === "true";
  adminData.updatedAt = new Date().toLocaleString("zh-CN", { hour12: false }).replaceAll("/", "-");
}

async function saveData() {
  collectForm();
  localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(adminData));
  try {
    const response = await fetch("/api/provinces", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(adminData)
    });
    if (response.ok) {
      setState("已保存到 data/provinces.json，前台刷新后立即生效。");
      return;
    }
  } catch {
    // Static-file mode has no API. Local preview still uses localStorage.
  }
  setState("已保存到当前浏览器本地预览。若需写入 JSON，请用 server.js 启动后台。");
}

function resetLocal() {
  localStorage.removeItem(ADMIN_STORAGE_KEY);
  window.location.reload();
}

function downloadJson() {
  collectForm();
  const blob = new Blob([JSON.stringify(adminData, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "provinces.json";
  link.click();
  URL.revokeObjectURL(url);
}

function bindAdminEvents() {
  $("#provinceList").addEventListener("click", (event) => {
    const button = event.target.closest("[data-id]");
    if (!button) return;
    collectForm();
    currentId = button.dataset.id;
    renderList();
    fillForm();
    setState("已切换省份，记得保存修改。");
  });
  $("#saveBtn").addEventListener("click", saveData);
  $("#downloadJsonBtn").addEventListener("click", downloadJson);
  $("#resetLocalBtn").addEventListener("click", resetLocal);
}

async function initAdmin() {
  try {
    adminData = await loadAdminData();
    currentId = adminData.provinces[0]?.id || "";
    renderList();
    fillForm();
    bindAdminEvents();
    setState("数据已载入。");
  } catch (error) {
    setState("数据加载失败，请检查 data/provinces.json。");
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", initAdmin);
