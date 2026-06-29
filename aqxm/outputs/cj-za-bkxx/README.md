# 2026年初级注册安全工程师全国报考一站式查询网站

这是一个轻量化前后端项目，无数据库，全部报考信息存放在 `data/provinces.json`。

## 文件结构

- `index.html`：前台查询页，包含双倒计时、搜索、筛选、省市卡片、FAQ、资料下载。
- `admin.html`：轻量管理后台，可视化修改省份信息。
- `data/provinces.json`：全部省市报考数据。
- `assets/styles.css`：统一视觉样式。
- `assets/app.js`：前台交互逻辑。
- `assets/admin.js`：后台编辑逻辑。
- `server.js`：本地轻量服务，负责读取和保存 JSON。
- `启动网站.command`：Mac 双击启动脚本。

## 推荐打开方式

双击 `启动网站.command`，或在当前目录运行：

```bash
node server.js
```

然后打开：

- 前台：`http://127.0.0.1:4173/`
- 后台：`http://127.0.0.1:4173/admin.html`

也可以直接双击 `index.html` 预览前台。项目已内置 `assets/data-inline.js` 作为兜底数据包，即使浏览器禁止直接读取 JSON，前台也能展示。

## 如何修改2026报考时间

打开 `admin.html`，在左侧选择省份，修改：

- `报名开始时间`
- `报名截止时间`
- `考试日期`
- `准考证打印时间`
- `成绩查询时间`

点击“保存修改”后，数据会写回 `data/provinces.json`。前台刷新后立即生效，倒计时也会自动读取新时间。

## 如何修改省份文字信息

仍然在 `admin.html` 选择省份，可以修改：

- 官方报名网站名称
- 官方报名网址
- 学历/工作年限报考门槛
- 审核方式
- 报名费金额
- 考试形式
- 备注
- 是否已出公告
- 是否标记「最新更新」

标记「最新更新」后，前台省市卡片右上角会显示红色角标。

## 直接打开 HTML 的说明

如果直接双击 `index.html`，前台会使用内置兜底数据包展示。后台在直接打开时可以编辑、预览并导出 JSON，但浏览器不允许网页直接覆盖本地文件；如果要点击“保存修改”后直接写回 `data/provinces.json`，请使用 `node server.js` 或双击 `启动网站.command` 启动。

每次手动改完 `data/provinces.json` 后，如果还想保持双击 HTML 也能展示最新数据，需要同步更新 `assets/data-inline.js`。运行：

```bash
node -e "const fs=require('fs');const data=fs.readFileSync('data/provinces.json','utf8');fs.writeFileSync('assets/data-inline.js','window.CJAQ_EMBEDDED_DATA = '+data+';\\n')"
```

## 数据提醒

当前数据以公开汇总信息做了第一版整理，报名费、审核方式、考试形式等细项需要继续按各省官方考务通知逐条复核。页面已预留“待官方公告复核”“待公布”等状态，便于后续更新。
