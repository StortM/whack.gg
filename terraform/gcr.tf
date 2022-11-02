resource "google_project_service" "containerregistry" {
  service = "containerregistry.googleapis.com"
}

resource "google_container_registry" "registry" {
  location = var.google_container_registry_location
}

data "google_container_registry_image" "image" {
  name   = var.project_id
  region = var.google_container_registry_location
  tag    = var.image_tag
}
