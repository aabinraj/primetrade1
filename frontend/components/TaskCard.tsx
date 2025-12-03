// frontend/components/TaskCard.tsx
'use client';

import React from 'react';
import clsx from 'clsx';

interface TaskCardProps {
  task: any;
  onEdit: (task: any) => void;
  onDelete: (task: any) => void;
  onToggle: (task: any) => void;
}

export default function TaskCard({ task, onEdit, onDelete, onToggle }: TaskCardProps) {
  return (
    <div className="p-4 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg shadow flex justify-between items-start gap-4">
      
      {/* LEFT SIDE */}
      <div className="flex-1">
        {/* Title */}
        <div
          className={clsx(
            "text-lg font-semibold text-zinc-900 dark:text-zinc-100",
            task.completed && "line-through text-zinc-400 dark:text-zinc-500"
          )}
        >
          {task.title}
        </div>

        {/* Description */}
        {task.description && (
          <div className="text-sm text-zinc-700 dark:text-zinc-300 mt-1">
            {task.description}
          </div>
        )}

        {/* Timestamp */}
        <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
          {new Date(task.createdAt).toLocaleString()}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-col items-end gap-3">

        {/* Toggle */}
        <label className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300 cursor-pointer">
          <input
            type="checkbox"
            checked={!!task.completed}
            onChange={() => onToggle(task)}
            className="accent-blue-600"
          />
          <span className="text-xs">Done</span>
        </label>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(task)}
            className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task)}
            className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>

      </div>
    </div>
  );
}
