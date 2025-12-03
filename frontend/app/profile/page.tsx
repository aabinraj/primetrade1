// frontend/app/profile/page.tsx
'use client';
import React, { useEffect, useState } from 'react';
import API from '@/lib/api';
import { initAuthFromStorage, setToken } from '@/lib/auth';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, reset } = useForm();

  useEffect(()=> {
    initAuthFromStorage();
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if(!token) { router.push('/auth/login'); return; }

    API.get('/api/auth/me').then(res => {
      reset(res.data);
      setLoading(false);
    }).catch(()=> { setToken(null); router.push('/auth/login'); });
  }, []);

  async function onSubmit(data:any) {
    try {
      const res = await API.put('/api/auth/me', data);
      alert('Profile updated');
      reset(res.data);
    } catch (err:any) {
      alert(err?.response?.data?.message || 'Update failed');
    }
  }

  if(loading) return <div className="p-8">Loading profile...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="text-sm block mb-1">Name</label>
          <input {...register('name')} className="w-full border p-2 rounded bg-white dark:bg-zinc-900" />
        </div>

        <div>
          <label className="text-sm block mb-1">Email</label>
          <input {...register('email')} className="w-full border p-2 rounded bg-white dark:bg-zinc-900" />
        </div>

        <div className="flex gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
          <button type="button" onClick={()=>router.push('/dashboard')} className="px-4 py-2 border rounded">Back</button>
        </div>
      </form>
    </div>
  );
}
