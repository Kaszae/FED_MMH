import type { Location, LoginResponse } from './types';

const API_URL = import.meta.env.VITE_API_URL;

export async function login(username: string, password: string): Promise<LoginResponse> {
  const response = await fetch(`${API_URL}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error(`Login failed (status ${response.status})`);
  }

  return (await response.json()) as LoginResponse;
}

export async function getLocations(token: string): Promise<Location[]> {
  const response = await fetch(`${API_URL}/api/locations`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error(`Could not load locations (status ${response.status})`);
  }

  return (await response.json()) as Location[];
}
