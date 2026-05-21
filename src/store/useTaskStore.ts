import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TaskItem } from '../utils/handle-api'; // Assuming we still use the interface from here or we can redefine it. Let's redefine it here to break dependencies if needed, or just import. Let's just import for now since it's an interface.

interface TaskState {
  tasks: TaskItem[];
  editingTask: TaskItem | null;
  filter: 'all' | 'completed' | 'pending';
  addTask: (text: string, completed: boolean, dueDate: string | null) => void;
  updateTask: (taskId: string, text: string, completed: boolean, dueDate: string | null) => void;
  deleteTask: (taskId: string) => void;
  deleteAllTasks: () => void;
  setEditingTask: (task: TaskItem | null) => void;
  setFilter: (filter: 'all' | 'completed' | 'pending') => void;
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: [],
      editingTask: null,
      filter: 'all',
      addTask: (text, completed, dueDate) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              _id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
              text,
              completed,
              dueDate: dueDate || undefined,
            },
          ],
        })),
      updateTask: (taskId, text, completed, dueDate) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task._id === taskId
              ? { ...task, text, completed, dueDate: dueDate || undefined }
              : task
          ),
        })),
      deleteTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task._id !== taskId),
        })),
      deleteAllTasks: () => set({ tasks: [] }),
      setEditingTask: (task) => set({ editingTask: task }),
      setFilter: (filter) => set({ filter }),
    }),
    {
      name: 'task-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => AsyncStorage), // (optional) by default, 'localStorage' is used
      // we only want to persist tasks, not editingTask
      partialize: (state) => ({ tasks: state.tasks }),
    }
  )
);
