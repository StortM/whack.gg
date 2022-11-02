resource "google_project_service" "secretmanager" {
  provider = google-beta
  service  = "secretmanager.googleapis.com"
}

// POSTGRES_PASSWORD
resource "google_secret_manager_secret" "postgres-password" {
  provider = google-beta

  secret_id = "postgres-password"
  replication {
    automatic = true
  }
}

data "google_secret_manager_secret_version" "postgres-password" {
  secret     = "postgres-password"
  depends_on = [google_secret_manager_secret_iam_member.postgres-password-access]
}

resource "google_secret_manager_secret_iam_member" "postgres-password-access" {
  provider = google-beta

  secret_id  = google_secret_manager_secret.postgres-password.id
  role       = "roles/secretmanager.secretAccessor"
  member     = "serviceAccount:${data.google_project.project.number}-compute@developer.gserviceaccount.com"
  depends_on = [google_secret_manager_secret.postgres-password]
}
