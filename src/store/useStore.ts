import { create } from 'zustand';

export interface Task {
    id: string;
    category_id: string;
    title: string;
    completed: boolean;
    daily_streak: number;
}

export interface Category {
    id: string;
    name: string;
    color: string;
    orbit_radius: number;
    rotation_speed: number;
}

interface AppState {
    categories: Category[];
    tasks: Task[];
    activePlanetId: string | null;
    setCategories: (categories: Category[]) => void;
    setTasks: (tasks: Task[]) => void;
    setActivePlanetId: (id: string | null) => void;
    updateTask: (taskId: string, updates: Partial<Task>) => void;
}

export const useStore = create<AppState>((set) => ({
    categories: [],
    tasks: [],
    activePlanetId: null,
    setCategories: (categories) => set({ categories }),
    setTasks: (tasks) => set({ tasks }),
    setActivePlanetId: (id) => set({ activePlanetId: id }),
    updateTask: (taskId, updates) =>
        set((state) => ({
            tasks: state.tasks.map((t) => (t.id === taskId ? { ...t, ...updates } : t)),
        })),
}));
