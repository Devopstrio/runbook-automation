import sys
import argparse
from core.runbooks.engine import RunbookEngine, Runbook, Step

def run_automation_simulation(runbook_id: str):
    # 1. Initialize Engine
    engine = RunbookEngine()
    
    # 2. Define Incident Response Runbook
    print(f"--- Runbook Automation Intelligence Simulation ---")
    print(f"Runbook ID: {runbook_id}")
    
    steps = [
        Step("Init Alert", "notification", {"channel": "#sre-ops", "message": "Simulated Alert: High Error Rate"}),
        Step("Diagnostic Shell", "shell", {"command": "curl -s http://app.svc/health"}),
        Step("Remediation API", "api_call", {"url": "https://api.ops/v1/scale/app-deployment"}),
        Step("Final Notify", "notification", {"channel": "#sre-ops", "message": "Remediation Complete."})
    ]
    
    rb = Runbook(f"Automated Response: {runbook_id}", steps)
    
    # 3. Execute
    result = engine.execute(rb)
    
    print(f"\n--- Execution Results ---")
    print(f"[DATA] Runbook ID: {result['id']}")
    print(f"[DATA] Status: {result['status']}")
    
    for i, step in enumerate(rb.steps):
        print(f"[STEP {i+1}] {step.name}: {step.status} -> {step.result}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--runbook", default="incident_response_v1")
    args = parser.parse_args()
    run_automation_simulation(args.runbook)
