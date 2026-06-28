#!/usr/bin/env python3
"""Wrapper: reads base64 image from file and calls buddy-cloud 3D generation directly."""
import sys, json, os

SCRIPTS_DIR = "/Applications/WorkBuddy.app/Contents/Resources/app.asar.unpacked/resources/builtin-skills/buddy-multimodal-generation/scripts"
sys.path.insert(0, SCRIPTS_DIR)

# Import the buddy-cloud module
import importlib.util
spec = importlib.util.spec_from_file_location("buddy_cloud", os.path.join(SCRIPTS_DIR, "buddy-cloud.py"))
buddy = importlib.util.module_from_spec(spec)
spec.loader.exec_module(buddy)

TOKEN = "tk_cWzi37sooGk0AxdGpGJZBT9fqiCwh9A2"
B64_FILE = "/Users/houjiasanshao/WorkBuddy/2026-06-08-15-13-39/_sandwheel_b64.txt"
ENDPOINT = "https://copilot.tencent.com/agenttool/v1/tcproxy"

# Read base64
with open(B64_FILE, "r") as f:
    b64_data = f.read().strip()

print(f"[INFO] Read base64 image: {len(b64_data)} chars", file=sys.stderr)

# Build 3D body
body = buddy._build_3d_body(
    image_base64=b64_data,
    model="3.1",
    face_count=500000,
    generate_type="Normal",
    # Figure-to-3D: don't pass prompt when image is provided
)

# Get provider config
cfg = buddy._PROVIDER_MAP["3d"]

# Submit job
print(f"[INFO] Submitting 3D generation job...", file=sys.stderr)
submit_resp = buddy._call_api(
    ENDPOINT, cfg["provider"], cfg["service"], cfg["version"],
    cfg["submit_action"], body, TOKEN,
)

job_id = submit_resp.get("JobId")
if not job_id:
    print(json.dumps({"error": "NO_JOB_ID", "response": submit_resp}))
    sys.exit(1)

print(f"[INFO] Job submitted: {job_id}", file=sys.stderr)

# Poll for result
result = buddy._poll_job(
    ENDPOINT, cfg["provider"], cfg["service"], cfg["version"],
    cfg["query_action"], job_id, TOKEN,
    poll_interval=5, max_poll_time=600,
)

output = buddy._format_output(result, job_id=job_id)
print(json.dumps(output, ensure_ascii=False, indent=2))
