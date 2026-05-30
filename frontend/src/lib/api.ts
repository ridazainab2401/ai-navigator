/**
 * API utility for making requests to the Vercel serverless functions
 */

const API_BASE = "/api";

export async function fetchHealth() {
  const response = await fetch(`${API_BASE}/health`);
  return response.json();
}

export async function fetchResearch() {
  const response = await fetch(`${API_BASE}/research`);
  return response.json();
}

export async function fetchProjects() {
  const response = await fetch(`${API_BASE}/projects`);
  return response.json();
}

export async function fetchAbout() {
  const response = await fetch(`${API_BASE}/about`);
  return response.json();
}
