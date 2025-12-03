// frontend/app/dashboard/tasks/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import API from '@/lib/api';
import { initAuthFromStorage } from '@/lib/auth';
import { fetchTasks, createTask, updateTask, deleteTask } from '@/lib/tasks';
import TaskCard from '@/components/TaskCard';
import TaskForm from '@/components/TaskForm';

export default function TasksPage() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<string | undefined>(undefined);
  const [editing, setEditing] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    initAuthFromStorage();
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
    }
  }, []);

  const key = ['/api/tasks', query, filter];
  const { data: tasks, isLoading } = useSWR(key, () => fetchTasks(query, filter), {
    revalidateOnFocus: false,
  });

  async function handleCreate(data: any) {
    await createTask(data);
    (await import('swr')).mutate(key);
    setShowForm(false);
  }

  async function handleUpdate(id: string, data: any) {
    await updateTask(id, data);
    (await import('swr')).mutate(key);
    setEditing(null);
    setShowForm(false);
  }

  async function handleDelete(task: any) {
    if (!confirm('Delete this task?')) return;
    await deleteTask(task._id);
    (await import('swr')).mutate(key);
  }

  async function toggleComplete(task: any) {
    await updateTask(task._id, { completed: !task.completed });
    (await import('swr')).mutate(key);
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">Tasks</h2>

          <button
            onClick={() => {
              setEditing(null);
              setShowForm(true);
            }}
            className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 shadow"
          >
            + New Task
          </button>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tasks..."
            className="flex-1 px-4 py-3 rounded bg-zinc-900 border border-zinc-700 text-white placeholder:text-zinc-500"
          />

          <select
            value={filter ?? ''}
            onChange={(e) => setFilter(e.target.value || undefined)}
            className="px-4 py-3 rounded bg-zinc-900 border border-zinc-700 text-white"
          >
            <option value="">All</option>
            <option value="true">Completed</option>
            <option value="false">Incomplete</option>
          </select>
        </div>

        {/* Form */}
        {showForm && !editing && (
          <TaskForm onCancel={() => setShowForm(false)} onSubmit={handleCreate} />
        )}

        {showForm && editing && (
          <TaskForm
            initial={editing}
            onCancel={() => {
              setEditing(null);
              setShowForm(false);
            }}
            onSubmit={(data) => handleUpdate(editing._id, data)}
          />
        )}

        {/* Task List */}
        <div className="space-y-4 mt-8">
          {isLoading && <p className="text-zinc-400">Loading tasks...</p>}

          {!isLoading && (!tasks || tasks.length === 0) && (
            <p className="text-zinc-500">No tasks found</p>
          )}

          {tasks &&
            tasks.map((t: any) => (
              <TaskCard
                key={t._id}
                task={t}
                onEdit={(tk: any) => {
                  setEditing(tk);
                  setShowForm(true);
                }}
                onDelete={handleDelete}
                onToggle={toggleComplete}
              />
            ))}
        </div>
      </div>
    </main>
  );
}
