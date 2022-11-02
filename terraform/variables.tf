variable "project_id" {
  type        = string
  description = "Google Cloud Project ID (example: kvalifik-data-warehouse)"
}
variable "google_container_registry_location" {
  type        = string
  default     = "eu"
  description = "Location of Google Container Registry"
}
variable "google_cloud_project_region" {
  type        = string
  description = "Server location"
  default     = "europe-west1"
}
variable "image_tag" {
  type        = string
  description = "Tag for image to use for google cloud run"
}
variable "postgres_db" {
  type        = string
  description = "PostgreSQL database name"
  default     = "postgres-db"
}
variable "postgres_user" {
  type        = string
  description = "PostgreSQL username"
  default     = "postgres-user"
}
