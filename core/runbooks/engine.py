import uuid
import time
from typing import List, Dict, Any, Optional
from datetime import datetime

class Step:
    def __init__(self, name: str, action: str, params: Dict[str, Any], retry_count: int = 0):
        self.name = name
        self.action = action
        self.params = params
        self.retry_count = retry_count
        self.status = "PENDING"
        self.result = None

class Runbook:
    def __init__(self, name: str, steps: List[Step]):
        self.id = str(uuid.uuid4())
        self.name = name
        self.steps = steps
        self.status = "PENDING"
        self.created_at = datetime.utcnow().isoformat()

class RunbookEngine:
    """Orchestrates the execution of runbooks and their steps."""
    
    def __init__(self):
        self.executions = {}

    def execute(self, runbook: Runbook) -> Dict:
        runbook.status = "RUNNING"
        print(f"--- Starting Runbook: {runbook.name} ({runbook.id}) ---")
        
        for step in runbook.steps:
            self._execute_step(step)
            if step.status == "FAILED":
                runbook.status = "FAILED"
                break
        
        if runbook.status != "FAILED":
            runbook.status = "COMPLETED"
            
        print(f"--- Runbook {runbook.status} ---")
        return {"id": runbook.id, "status": runbook.status}

    def _execute_step(self, step: Step):
        step.status = "RUNNING"
        print(f"[STEP] Executing: {step.name} ({step.action})")
        
        # Simulate plugin execution
        try:
            # Action mapping
            if step.action == "api_call":
                step.result = f"Successfully called {step.params.get('url')}"
            elif step.action == "notification":
                step.result = f"Sent alert to {step.params.get('channel')}"
            elif step.action == "shell":
                step.result = f"Executed: {step.params.get('command')}"
            
            time.sleep(0.5) # Simulate work
            step.status = "SUCCESS"
            print(f"  Result: {step.result}")
        except Exception as e:
            step.status = "FAILED"
            step.result = str(e)
            print(f"  Error: {step.result}")

class PluginManager:
    """Manages the action plugins for the runbook engine."""
    
    def __init__(self):
        self.plugins = ["api_call", "shell", "notification", "approval"]

    def validate_action(self, action: str) -> bool:
        return action in self.plugins

if __name__ == "__main__":
    engine = RunbookEngine()
    
    # Define a sample Incident Response Runbook
    steps = [
        Step("Alert Channel", "notification", {"channel": "#incidents", "message": "High CPU detected"}),
        Step("Check Top Processes", "shell", {"command": "top -b -n 1"}),
        Step("Restart Service", "api_call", {"url": "https://api.internal/restart/app-service"})
    ]
    
    rb = Runbook("High CPU Incident Response", steps)
    engine.execute(rb)
