resource "google_project_service" "run" {
  service = "run.googleapis.com"
}

resource "google_cloud_run_service" "default" {
  provider = google-beta
  name     = "cloudrun-instance"
  location = var.google_cloud_project_region

  template {
    spec {
      containers {
        image = data.google_container_registry_image.image.image_url
        env {
          name  = "POSTGRES_HOST"
          value = "/cloudsql/${google_sql_database_instance.instance.connection_name}"
        }
        env {
          name  = "POSTGRES_PORT"
          value = ""
        }
        env {
          name  = "POSTGRES_USER"
          value = var.postgres_user
        }
        env {
          name  = "POSTGRES_DB"
          value = var.postgres_db
        }
        env {
          name = "POSTGRES_PASSWORD"
          value_from {
            secret_key_ref {
              name = google_secret_manager_secret.postgres-password.secret_id
              key  = "latest"
            }
          }
        }
      }
    }

    metadata {
      annotations = {
        "autoscaling.knative.dev/maxScale"      = "1000"
        "run.googleapis.com/cloudsql-instances" = google_sql_database_instance.instance.connection_name
        "run.googleapis.com/client-name"        = "terraform"
      }
    }
  }

  metadata {
    annotations = {
      generated-by                      = "magic-modules"
      "run.googleapis.com/launch-stage" = "BETA"
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }

  autogenerate_revision_name = true

  lifecycle {
    ignore_changes = [
      metadata.0.annotations,
    ]
  }

  depends_on = [google_secret_manager_secret_iam_member.postgres-password-access]
}

resource "google_cloud_run_service_iam_member" "member" {
  location = google_cloud_run_service.default.location
  project  = google_cloud_run_service.default.project
  service  = google_cloud_run_service.default.name
  role     = "roles/run.invoker"
  member   = "allUsers"
}
