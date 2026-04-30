module "automation_db" {
  source = "./modules/database"

  db_name = "runbook_automation_records"
}

module "automation_cache" {
  source = "./modules/redis"

  cluster_mode = false
}

module "automation_monitoring" {
  source = "./modules/monitoring"

  retention_days = 180
}

resource "kubernetes_namespace" "automation_systems" {
  metadata {
    name = "runbook-automation"
    labels = {
      "automation.ops/managed" = "true"
    }
  }
}

resource "kubernetes_config_map" "automation_configs" {
  metadata {
    name      = "runbook-workload-configs"
    namespace = kubernetes_namespace.automation_systems.metadata[0].name
  }

  data = {
    "default-timeout"  = "300"
    "retry-limit"      = "3"
    "approval-enabled" = "true"
  }
}
