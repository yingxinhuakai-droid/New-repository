const DATA_URL = "data/provinces.json";
const STORAGE_KEY = "cjaq-2026-province-data";

let examData = null;
let activeStatus = "all";
let activeNotice = "all";
let activeRegion = "all";
let keyword = "";
let selectedProvinceId = "shanghai";

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function parseDate(value) {
  return value ? new Date(value) : null;
}

function formatDate(value, fallback = "待公布") {
  const date = parseDate(value);
  if (!date || Number.isNaN(date.getTime())) return fallback;
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}

function formatShortDate(value, fallback = "待公布") {
  const date = parseDate(value);
  if (!date || Number.isNaN(date.getTime())) return fallback;
  return `${date.getMonth() + 1}月${date.getDate()}日`;
}

function formatRange(start, end) {
  if (!start || !end) return "待公布";
  return `${formatShortDate(start)}-${formatShortDate(end)}`;
}

function nowTime() {
  return new Date();
}

function statusOf(item) {
  const now = nowTime();
  const start = parseDate(item.registrationStart);
  const end = parseDate(item.registrationEnd);
  const exam = parseDate(item.examDate);
  if (!item.announced || !start || !end) return { key: "pending", label: "待公布" };
  if (now >= start && now <= end) return { key: "open", label: "报名中" };
  if (now < start) return { key: "soon", label: "即将报名" };
  if (exam && now <= exam) return { key: "wait", label: "待考" };
  return { key: "end", label: "已结束" };
}

function secondsBetween(target) {
  const date = parseDate(target);
  if (!date) return 0;
  return Math.max(0, Math.floor((date.getTime() - Date.now()) / 1000));
}

function splitSeconds(total) {
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60
  };
}

function pad(value) {
  return String(value).padStart(2, "0");
}

function searchableText(item) {
  return [
    item.province,
    item.region,
    item.educationThreshold,
    item.auditMethod,
    item.fee,
    item.admissionTicketTime,
    item.scoreQueryTime,
    item.officialSite,
    item.examForm,
    item.note
  ].join(" ").toLowerCase();
}

async function loadData() {
  const local = localStorage.getItem(STORAGE_KEY);
  if (local) {
    try {
      return JSON.parse(local);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }
  try {
    const response = await fetch(DATA_URL, { cache: "no-store" });
    if (!response.ok) throw new Error("数据文件读取失败");
    return response.json();
  } catch (error) {
    if (window.CJAQ_EMBEDDED_DATA) return window.CJAQ_EMBEDDED_DATA;
    throw error;
  }
}

function updateCountdownBlock(prefix, target, note) {
  const total = secondsBetween(target);
  const parts = splitSeconds(total);
  $(`#${prefix}Days`).textContent = parts.days;
  $(`#${prefix}Hours`).textContent = pad(parts.hours);
  $(`#${prefix}Minutes`).textContent = pad(parts.minutes);
  $(`#${prefix}Seconds`).textContent = pad(parts.seconds);
  $(`#${prefix}Note`).textContent = note;
}

function selectedProvince() {
  return examData.provinces.find((item) => item.id === selectedProvinceId) || examData.provinces[0];
}

function updateCountdowns() {
  if (!examData) return;
  updateCountdownBlock("exam", examData.unifiedExamDate, `设定考试时间：${formatDate(examData.unifiedExamDate)}`);
  const chosen = selectedProvince();
  const status = statusOf(chosen);
  if (status.key === "open") {
    updateCountdownBlock("province", chosen.registrationEnd, `${chosen.province}报名截止：${formatDate(chosen.registrationEnd)}`);
  } else if (status.key === "soon") {
    updateCountdownBlock("province", chosen.registrationStart, `${chosen.province}报名开始：${formatDate(chosen.registrationStart)}`);
  } else if (chosen.examDate) {
    updateCountdownBlock("province", chosen.examDate, `${chosen.province}考试时间：${formatDate(chosen.examDate)}`);
  } else {
    updateCountdownBlock("province", examData.unifiedExamDate, `${chosen.province}暂未公布报名时间，先按统一考试时间提醒`);
  }
  $("#selectedProvinceName").textContent = chosen.province;
}

function computeStats() {
  const enriched = examData.provinces.map((item) => ({ ...item, status: statusOf(item) }));
  return {
    total: enriched.length,
    open: enriched.filter((item) => item.status.key === "open").length,
    soon: enriched.filter((item) => item.status.key === "soon").length,
    announced: enriched.filter((item) => item.announced).length,
    latest: enriched.filter((item) => item.latest).length
  };
}

function renderStats() {
  const stats = computeStats();
  $("#statTotal").textContent = stats.total;
  $("#statOpen").textContent = stats.open;
  $("#statSoon").textContent = stats.soon;
  $("#statAnnounced").textContent = stats.announced;
  $("#statLatest").textContent = stats.latest;
  $("#updatedAt").textContent = examData.updatedAt || "待更新";
}

function buildFilterButton(group, key, label, count) {
  return `<button class="filter-btn ${group === key ? "active" : ""}" data-filter="${key}">
    <span>${label}</span><span class="chip-count">${count}</span>
  </button>`;
}

function renderFilters() {
  const enriched = examData.provinces.map((item) => ({ ...item, status: statusOf(item) }));
  const count = (predicate) => enriched.filter(predicate).length;
  $("#statusFilters").innerHTML = [
    buildFilterButton(activeStatus, "all", "全部省市", enriched.length),
    buildFilterButton(activeStatus, "open", "开放报名", count((item) => item.status.key === "open")),
    buildFilterButton(activeStatus, "soon", "即将报名", count((item) => item.status.key === "soon")),
    buildFilterButton(activeStatus, "wait", "待考", count((item) => item.status.key === "wait")),
    buildFilterButton(activeStatus, "end", "已结束", count((item) => item.status.key === "end")),
    buildFilterButton(activeStatus, "pending", "待公布", count((item) => item.status.key === "pending"))
  ].join("");

  $("#noticeFilters").innerHTML = [
    buildFilterButton(activeNotice, "all", "公告不限", enriched.length),
    buildFilterButton(activeNotice, "announced", "已出公告", count((item) => item.announced)),
    buildFilterButton(activeNotice, "pending", "未出公告", count((item) => !item.announced))
  ].join("");

  const regions = ["华北", "华东", "华南", "华中", "西南", "西北", "东北"];
  $("#regionFilter").innerHTML = `<option value="all">全部地区</option>${regions.map((region) => `<option value="${region}">${region}</option>`).join("")}`;
  $("#regionFilter").value = activeRegion;
}

function filteredItems() {
  const text = keyword.trim().toLowerCase();
  return examData.provinces
    .map((item) => ({ ...item, status: statusOf(item) }))
    .filter((item) => activeStatus === "all" || item.status.key === activeStatus)
    .filter((item) => activeNotice === "all" || (activeNotice === "announced" ? item.announced : !item.announced))
    .filter((item) => activeRegion === "all" || item.region === activeRegion)
    .filter((item) => !text || searchableText(item).includes(text))
    .sort((a, b) => {
      const order = { open: 0, soon: 1, wait: 2, end: 3, pending: 4 };
      const dateA = parseDate(a.registrationStart) || parseDate(a.examDate) || new Date("2999-01-01");
      const dateB = parseDate(b.registrationStart) || parseDate(b.examDate) || new Date("2999-01-01");
      return order[a.status.key] - order[b.status.key] || dateA - dateB;
    });
}

function detail(label, value, icon) {
  return `<div class="info-item"><i class="${icon}"></i><span>${label}</span><strong>${value || "待公布"}</strong></div>`;
}

function renderProvinceCard(item) {
  const status = item.status;
  const cardId = `card-${item.id}`;
  return `<article class="province-card" id="${cardId}">
    ${item.latest ? `<div class="latest-badge">最新更新</div>` : ""}
    <div class="card-head">
      <div>
        <div class="province-name">${item.province}</div>
        <div class="province-region">${item.region} · ${item.announced ? "已出公告" : "公告待公布"}</div>
      </div>
      <span class="status ${status.key}">${status.label}</span>
    </div>
    <div class="card-primary">
      <div class="date-row"><i class="fa-solid fa-calendar-check"></i><span>报名：${formatRange(item.registrationStart, item.registrationEnd)}</span></div>
      <div class="deadline-mini">考试：${formatDate(item.examDate)} · ${item.examForm || "待公布"}</div>
    </div>
    <div class="info-list">
      ${detail("门槛", item.educationThreshold, "fa-solid fa-user-graduate")}
      ${detail("审核", item.auditMethod, "fa-solid fa-shield-halved")}
      ${detail("费用", item.fee, "fa-solid fa-yen-sign")}
      ${detail("准考证", item.admissionTicketTime, "fa-solid fa-print")}
      ${detail("成绩", item.scoreQueryTime, "fa-solid fa-chart-line")}
    </div>
    <div class="card-actions">
      <a class="entry-link" href="${item.officialUrl}" target="_blank" rel="noopener"><i class="fa-solid fa-arrow-up-right-from-square"></i>官方入口</a>
      <button class="copy-btn" data-copy="${item.officialUrl}" title="复制报名网址"><i class="fa-solid fa-copy"></i></button>
    </div>
  </article>`;
}

function renderProvinceGrid() {
  const items = filteredItems();
  $("#provinceGrid").innerHTML = items.map(renderProvinceCard).join("");
  $("#emptyState").style.display = items.length ? "none" : "block";
  $("#resultCount").textContent = items.length;
  $$("[data-copy]").forEach((button) => {
    button.addEventListener("click", async () => {
      await navigator.clipboard.writeText(button.dataset.copy);
      showToast("报名网址已复制");
    });
  });
}

function renderFaq() {
  $("#faqList").innerHTML = examData.faq.map((item, index) => `<div class="faq-item ${index === 0 ? "open" : ""}">
    <button class="faq-question" type="button"><span>${item.question}</span><i class="fa-solid fa-chevron-down"></i></button>
    <div class="faq-answer">${item.answer}</div>
  </div>`).join("");
  $$(".faq-question").forEach((button) => {
    button.addEventListener("click", () => button.closest(".faq-item").classList.toggle("open"));
  });
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 1800);
}

function exportCsv() {
  const headers = ["省份", "报名起止", "官方入口", "报名门槛", "审核方式", "报名费", "准考证打印", "考试日期", "成绩查询"];
  const rows = examData.provinces.map((item) => [
    item.province,
    formatRange(item.registrationStart, item.registrationEnd),
    item.officialUrl,
    item.educationThreshold,
    item.auditMethod,
    item.fee,
    item.admissionTicketTime,
    formatDate(item.examDate),
    item.scoreQueryTime
  ]);
  const csv = [headers, ...rows].map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(",")).join("\n");
  const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "2026初级注册安全工程师报考信息.csv";
  link.click();
  URL.revokeObjectURL(url);
}

function bindEvents() {
  $("#globalSearch").addEventListener("input", (event) => {
    keyword = event.target.value;
    renderProvinceGrid();
  });
  $("#statusFilters").addEventListener("click", (event) => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;
    activeStatus = button.dataset.filter;
    renderFilters();
    renderProvinceGrid();
  });
  $("#noticeFilters").addEventListener("click", (event) => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;
    activeNotice = button.dataset.filter;
    renderFilters();
    renderProvinceGrid();
  });
  $("#regionFilter").addEventListener("change", (event) => {
    activeRegion = event.target.value;
    renderProvinceGrid();
  });
  $("#provinceSelect").addEventListener("change", (event) => {
    selectedProvinceId = event.target.value;
    updateCountdowns();
  });
  $("#downloadCsv").addEventListener("click", exportCsv);
}

function renderProvinceSelect() {
  $("#provinceSelect").innerHTML = examData.provinces.map((item) => `<option value="${item.id}">${item.province}</option>`).join("");
  $("#provinceSelect").value = selectedProvinceId;
}

function renderAll() {
  renderProvinceSelect();
  renderStats();
  renderFilters();
  renderProvinceGrid();
  renderFaq();
  updateCountdowns();
}

async function init() {
  try {
    examData = await loadData();
    const openProvince = examData.provinces.find((item) => statusOf(item).key === "open");
    if (openProvince) selectedProvinceId = openProvince.id;
    renderAll();
    bindEvents();
    window.setInterval(updateCountdowns, 1000);
  } catch (error) {
    $("#provinceGrid").innerHTML = "";
    $("#emptyState").style.display = "block";
    $("#emptyState").textContent = "数据加载失败，请检查 data/provinces.json 或使用本地服务打开。";
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", init);
