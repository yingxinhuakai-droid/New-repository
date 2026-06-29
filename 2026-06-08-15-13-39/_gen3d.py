#!/usr/bin/env python3
"""Generate 3D model from image - with proxy fully disabled."""
import os, sys, base64, json, time, hashlib, hmac
from urllib.parse import urlparse

# ── 1. Kill ALL proxy env vars BEFORE importing requests ──
for k in list(os.environ.keys()):
    if 'proxy' in k.lower():
        del os.environ[k]
os.environ['NO_PROXY'] = '*'
os.environ['no_proxy'] = '*'

import requests
# Disable proxy in requests globally
requests.Session.trust_env = False
old_request = requests.Session.request
def no_proxy_request(self, *args, **kwargs):
    kwargs['proxies'] = {}
    return old_request(self, *args, **kwargs)
requests.Session.request = no_proxy_request

# ── 2. Import buddy-cloud module (file has hyphen, use importlib) ──
import importlib.util
SCRIPT_PATH = "/Applications/WorkBuddy.app/Contents/Resources/app.asar.unpacked/resources/builtin-skills/buddy-multimodal-generation/scripts/buddy-cloud.py"
spec = importlib.util.spec_from_file_location("buddy", SCRIPT_PATH)
buddy = importlib.util.module_from_spec(spec)
spec.loader.exec_module(buddy)

# ── 3. Read image as base64 ──
IMG_PATH = "/Users/houjiasanshao/Pictures/3D实景截图/砂轮机.png"
with open(IMG_PATH, "rb") as f:
    b64_data = base64.b64encode(f.read()).decode("ascii")
print(f"[INFO] Image base64 length: {len(b64_data)}", file=sys.stderr)

# ── 4. Get token ──
TOKEN = sys.argv[1] if len(sys.argv) > 1 else ""
if not TOKEN:
    print("[ERROR] No token provided. Usage: python3 _gen3d.py <token>", file=sys.stderr)
    sys.exit(1)

buddy._ACTIVE_TOKEN = TOKEN

# ── 5. Build 3D request body (image only, no prompt) ──
body = buddy._build_3d_body(
    prompt="",
    model="3.1",
    image_base64=b64_data,
    face_count=500000,
    generate_type="Normal",
)

# ── 6. Submit job ──
cfg = buddy._PROVIDER_MAP["3d"]
endpoint = buddy._DEFAULT_ENDPOINT

print("[INFO] Submitting 3D generation job...", file=sys.stderr)
submit_result = buddy._call_api(
    endpoint, cfg["provider"], cfg["service"], cfg["version"],
    cfg["submit_action"], body, TOKEN,
)

job_id = submit_result.get("JobId", "")
if not job_id:
    print(f"[ERROR] No JobId in response: {json.dumps(submit_result, ensure_ascii=False)}", file=sys.stderr)
    sys.exit(1)

print(f"[INFO] Job submitted: {job_id}", file=sys.stderr)

# ── 7. Poll for completion ──
print(f"[INFO] Waiting for job {job_id} to complete...", file=sys.stderr)
start = time.time()
MAX_WAIT = 600  # 10 minutes

while True:
    elapsed = time.time() - start
    if elapsed > MAX_WAIT:
        print(f"[ERROR] Timeout after {MAX_WAIT}s. Job ID: {job_id}", file=sys.stderr)
        print(json.dumps({"job_id": job_id, "status": "TIMEOUT"}, ensure_ascii=False))
        sys.exit(1)

    try:
        result = buddy._call_api(
            endpoint, cfg["provider"], cfg["service"], cfg["version"],
            cfg["query_action"], {"JobId": job_id}, TOKEN,
        )
    except Exception as e:
        print(f"[WARN] Poll error (will retry): {e}", file=sys.stderr)
        time.sleep(10)
        continue

    status = result.get("Status", "")
    raw_code = result.get("JobStatusCode")
    status_code = int(raw_code) if raw_code is not None else None

    if status == "DONE" or status_code == 5:
        print(f"[INFO] Job DONE! Elapsed: {int(elapsed)}s", file=sys.stderr)
        output = buddy._format_output(result, job_id=job_id)
        print(json.dumps(output, ensure_ascii=False, indent=2))
        # Also save to file
        with open("/Users/houjiasanshao/WorkBuddy/2026-06-08-15-13-39/_3d_result.json", "w") as f:
            json.dump(output, f, ensure_ascii=False, indent=2)
        print("[INFO] Result saved to _3d_result.json", file=sys.stderr)
        sys.exit(0)

    elif status == "FAIL" or status_code == 4:
        print(f"[ERROR] Job FAILED: {result.get('ErrorMessage', result.get('JobErrorMsg', 'Unknown'))}", file=sys.stderr)
        print(json.dumps({"job_id": job_id, "status": "FAIL", "error": result.get("ErrorMessage", "")}, ensure_ascii=False))
        sys.exit(1)

    disp = status or (str(status_code) if status_code is not None else "unknown")
    print(f"[INFO] Job {job_id}: status={disp}, elapsed={int(elapsed)}s, next check in 5s ...", file=sys.stderr)
    time.sleep(5)
