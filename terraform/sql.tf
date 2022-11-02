resource "google_project_service" "cloud_sql" {
  service = "sqladmin.googleapis.com"
}

resource "google_sql_database_instance" "instance" {
  name             = "cloudrun-sql"
  database_version = "POSTGRES_13"
  settings {
    tier = "db-f1-micro"
    backup_configuration {
      enabled    = true
      start_time = "03:00"
    }
  }
}

resource "google_sql_database" "database" {
  name     = var.postgres_db
  instance = google_sql_database_instance.instance.name
}

resource "google_sql_user" "users" {
  name       = var.postgres_user
  instance   = google_sql_database_instance.instance.name
  password   = data.google_secret_manager_secret_version.postgres-password.secret_data
  depends_on = [google_secret_manager_secret_iam_member.postgres-password-access]
}
