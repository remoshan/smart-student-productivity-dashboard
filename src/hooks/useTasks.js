import { useState, useEffect } from 'react';
import { getStorageItem, setStorageItem, STORAGE_KEYS } from '../utils/storage';
import { recordTaskCompletion } from '../utils/analytics';

/**
 * Custom hook for task management
 */
export const useTasks = () => {
  const [tasks, setTasks] = useState(() => {
    return getStorageItem(STORAGE_KEYS.TASKS, []);
  });

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.TASKS, tasks);
  }, [tasks]);

  const addTask = (task) => {
    const newTask = {
      id: Date.now().toString(),
      ...task,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTasks((prev) => [...prev, newTask]);
    return newTask;
  };

  const updateTask = (id, updates) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, ...updates, updatedAt: new Date().toISOString() }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const toggleTaskStatus = (id) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === id) {
          const newStatus =
            task.status === 'completed' ? 'todo' : 'completed';
          recordTaskCompletion(id, newStatus === 'completed');
          return {
            ...task,
            status: newStatus,
            updatedAt: new Date().toISOString(),
          };
        }
        return task;
      })
    );
  };

  const reorderTasks = (sourceIndex, destinationIndex) => {
    setTasks((prev) => {
      const result = Array.from(prev);
      const [removed] = result.splice(sourceIndex, 1);
      result.splice(destinationIndex, 0, removed);
      return result;
    });
  };

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
    reorderTasks,
    setTasks,
  };
};
