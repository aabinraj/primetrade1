import API from './api';

export function setToken(t: string | null) {
  if (typeof window === 'undefined') return;
  if (t) {
    localStorage.setItem('token', t);
    API.defaults.headers.common['Authorization'] = `Bearer ${t}`;
  } else {
    localStorage.removeItem('token');
    delete API.defaults.headers.common['Authorization'];
  }
}

export function initAuthFromStorage() {
  if (typeof window === 'undefined') return;
  const t = localStorage.getItem('token');
  if (t) API.defaults.headers.common['Authorization'] = `Bearer ${t}`;
}
