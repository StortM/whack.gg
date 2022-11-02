terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "3.69.0"
    }
    google-beta = {
      source  = "hashicorp/google-beta"
      version = "3.71.0"
    }
  }
  backend "gcs" {
    bucket      = "terraform-state-kvalifik"
    credentials = "./state-bucket-service-account.json"
  }
}

provider "google" {
  project     = var.project_id
  region      = var.google_cloud_project_region
  credentials = file("./service-account.json")
}

provider "google-beta" {
  project     = var.project_id
  region      = var.google_cloud_project_region
  credentials = file("./service-account.json")
}
data "google_project" "project" {
  provider = google-beta
}
