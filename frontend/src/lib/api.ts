const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:4000/api';

export type LoginResponse = { token: string; user: { id: string; name: string; email: string } };
export type RegisterResponse = LoginResponse;

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options
  });
  const data = await res.json();
  if (!res.ok) {
    const message = (data && (data.error || data.message)) || 'Request failed';
    throw new Error(message);
  }
  return data as T;
}

export const api = {
  login(body: { email: string; password: string }) {
    return request<LoginResponse>('/auth/login', { method: 'POST', body: JSON.stringify(body) });
  },
  register(body: { name: string; email: string; password: string }) {
    return request<RegisterResponse>('/auth/register', { method: 'POST', body: JSON.stringify(body) });
  },
  catalog() {
    return request<Array<{ id: string; name: string; price: number; sizes: string[]; image: string }>>('/catalog');
  },
  recommend(body: any) {
    return request<Array<{ product_id: string; score: number }>>('/recommendations/suggest', {
      method: 'POST',
      body: JSON.stringify(body)
    });
  }
};


