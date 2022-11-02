resource "google_project_service" "app_engine" {
  service = "appengine.googleapis.com"
}

resource "google_project_service" "cloudscheduler" {
  service = "cloudscheduler.googleapis.com"
}

resource "google_app_engine_application" "app" {
  location_id = "europe-west"
  depends_on  = [google_project_service.app_engine]
}

resource "google_cloud_scheduler_job" "warmer" {
  name             = "warmer"
  description      = "Keep Cloud Run warm"
  schedule         = "*/5 * * * *"
  time_zone        = "Europe/Copenhagen"
  attempt_deadline = "320s"

  retry_config {
    retry_count = 1
  }

  http_target {
    http_method = "GET"
    uri         = google_cloud_run_service.default.status[0].url
  }
  depends_on = [google_app_engine_application.app]
}

