// frontend/components/TaskForm.tsx
'use client';

import { useForm } from 'react-hook-form';
import React from 'react';

interface TaskFormProps {
  initial?: {
    title: string;
    description?: string;
  };
  onCancel: () => void;
  onSubmit: (data: any) => void;
}

export default function TaskForm({
  initial = { title: '', description: '' },
  onCancel,
  onSubmit,
}: TaskFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: initial,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 p-5 bg-white dark:bg-zinc-800 border dark:border-zinc-700 shadow rounded-lg"
    >
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200 mb-1">
          Task Title
        </label>
        <input
          {...register('title', { required: 'Title required' })}
          placeholder="Enter task title"
          className="w-full border border-zinc-300 dark:border-zinc-600 p-3 rounded bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
        />
        <p className="text-red-500 text-sm mt-1">
          {errors.title?.message && String(errors.title.message)}
        </p>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200 mb-1">
          Description
        </label>
        <textarea
          {...register('description')}
          placeholder="Enter task description"
          rows={3}
          className="w-full border border-zinc-300 dark:border-zinc-600 p-3 rounded bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          disabled={isSubmitting}
          type="submit"
          className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Save
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2 border border-zinc-400 dark:border-zinc-600 rounded text-zinc-700 dark:text-zinc-200"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
