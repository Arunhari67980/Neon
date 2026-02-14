import { useEffect } from 'react';
import { GalaxyScene } from './scenes/GalaxyScene';
import { useStore } from './store/useStore';
import { GlassPanel } from './components/ui/GlassPanel';

// Mock Data for Initial Load
const MOCK_CATEGORIES = [
  { id: '1', name: 'Productivity', color: '#c084fc', orbit_radius: 8, rotation_speed: 0.4 },
  { id: '2', name: 'Wellness', color: '#4ade80', orbit_radius: 14, rotation_speed: 0.25 },
  { id: '3', name: 'Learning', color: '#60a5fa', orbit_radius: 20, rotation_speed: 0.15 },
];

const MOCK_TASKS = [
  { id: 't1', category_id: '1', title: 'Complete 3D App', completed: false, daily_streak: 5 },
  { id: 't2', category_id: '1', title: 'Review PRs', completed: true, daily_streak: 2 },
  { id: 't3', category_id: '2', title: 'Morning Yoga', completed: false, daily_streak: 10 },
  { id: 't4', category_id: '3', title: 'Read 20 pages', completed: false, daily_streak: 0 },
];

function App() {
  const { setCategories, setTasks, activePlanetId, setActivePlanetId } = useStore();

  useEffect(() => {
    // Populate with mock data initially
    setCategories(MOCK_CATEGORIES);
    setTasks(MOCK_TASKS);
  }, [setCategories, setTasks]);

  return (
    <main className="relative w-full h-screen overflow-hidden font-sans">
      <GalaxyScene />

      {/* UI Overlay */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none p-8 flex flex-col justify-between">
        <header className="flex justify-between items-start">
          <div className="pointer-events-auto">
            <h1 className="text-4xl font-black tracking-tighter text-white drop-shadow-glow-blue uppercase">
              Growth <span className="text-neon-purple italic">Universe</span>
            </h1>
            <p className="text-white/50 text-sm mt-1 uppercase tracking-widest">v1.0.0 Real-Time Sync Active</p>
          </div>

          <div className="pointer-events-auto">
            <GlassPanel className="p-4 flex gap-4 items-center">
              <div className="text-right">
                <p className="text-[10px] text-white/50 uppercase">Global Streak</p>
                <p className="text-2xl font-bold text-neon-pink">12 Days</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-neon-purple to-neon-blue flex items-center justify-center shadow-glow-purple">
                🔥
              </div>
            </GlassPanel>
          </div>
        </header>

        {activePlanetId && (
          <div className="flex-1 flex items-center justify-end">
            <GlassPanel className="w-80 p-6 pointer-events-auto animate-in slide-in-from-right duration-500">
              <button
                onClick={() => setActivePlanetId(null)}
                className="text-xs text-white/50 hover:text-white transition-colors mb-4"
              >
                ← Back to Galaxy
              </button>
              <h2 className="text-2xl font-bold mb-1">
                {MOCK_CATEGORIES.find(c => c.id === activePlanetId)?.name}
              </h2>
              <div className="space-y-3 mt-6">
                {MOCK_TASKS.filter(t => t.category_id === activePlanetId).map(task => (
                  <div key={task.id} className="flex items-center justify-between p-3 rounded bg-white/5 border border-white/10">
                    <span className={task.completed ? 'line-through text-white/30' : ''}>{task.title}</span>
                    {task.completed && <span className="text-green-400 text-xs">✓</span>}
                  </div>
                ))}
              </div>
            </GlassPanel>
          </div>
        )}

        <footer className="footer pointer-events-auto">
          <div className="flex gap-4">
            {MOCK_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActivePlanetId(cat.id)}
                className="px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur hover:bg-white/20 transition-all text-xs uppercase tracking-wider"
              >
                {cat.name}
              </button>
            ))}
          </div>
        </footer>
      </div>
    </main>
  );
}

export default App;
