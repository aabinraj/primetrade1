// frontend/lib/tasks.ts
import API from './api';

export async function fetchTasks(q?:string, completed?:string) {
  const params:any = {};
  if (q) params.q = q;
  if (completed !== undefined) params.completed = completed;
  const res = await API.get('/api/tasks', { params });
  return res.data;
}

export async function createTask(payload:{ title:string; description?:string }) {
  const res = await API.post('/api/tasks', payload);
  return res.data;
}

export async function updateTask(id:string, payload:any) {
  const res = await API.put(`/api/tasks/${id}`, payload);
  return res.data;
}

export async function deleteTask(id:string) {
  const res = await API.delete(`/api/tasks/${id}`);
  return res.data;
}
