import { useEffect, useState } from 'react';
import { GalaxyScene } from './scenes/GalaxyScene';
import { useStore } from './store/useStore';
import { GlassPanel } from './components/ui/GlassPanel.tsx';

// Mock Data for Initial Load - Expanded with 6 life areas
const MOCK_CATEGORIES = [
  { id: '1', name: 'Productivity', color: '#c084fc', orbit_radius: 8, rotation_speed: 0.4 },
  { id: '2', name: 'Wellness', color: '#4ade80', orbit_radius: 14, rotation_speed: 0.25 },
  { id: '3', name: 'Learning', color: '#60a5fa', orbit_radius: 20, rotation_speed: 0.15 },
  { id: '4', name: 'Creativity', color: '#f97316', orbit_radius: 26, rotation_speed: 0.12 },
  { id: '5', name: 'Social', color: '#ec4899', orbit_radius: 32, rotation_speed: 0.08 },
  { id: '6', name: 'Finance', color: '#fbbf24', orbit_radius: 38, rotation_speed: 0.05 },
];

const MOCK_TASKS = [
  { id: 't1', category_id: '1', title: 'Complete 3D App', completed: false, daily_streak: 5 },
  { id: 't2', category_id: '1', title: 'Review PRs', completed: true, daily_streak: 2 },
  { id: 't3', category_id: '1', title: 'Team Standup', completed: true, daily_streak: 8 },
  { id: 't4', category_id: '2', title: 'Morning Yoga', completed: false, daily_streak: 10 },
  { id: 't5', category_id: '2', title: 'Meditation', completed: true, daily_streak: 5 },
  { id: 't6', category_id: '2', title: 'Hydration', completed: true, daily_streak: 15 },
  { id: 't7', category_id: '3', title: 'Read 20 pages', completed: false, daily_streak: 0 },
  { id: 't8', category_id: '3', title: 'TypeScript Course', completed: true, daily_streak: 12 },
  { id: 't9', category_id: '3', title: 'Learn Three.js', completed: false, daily_streak: 3 },
  { id: 't10', category_id: '4', title: 'Sketch Ideas', completed: true, daily_streak: 6 },
  { id: 't11', category_id: '4', title: 'Write Music', completed: false, daily_streak: 2 },
  { id: 't12', category_id: '5', title: 'Call Friends', completed: false, daily_streak: 1 },
  { id: 't13', category_id: '5', title: 'Social Hangout', completed: true, daily_streak: 4 },
  { id: 't14', category_id: '6', title: 'Budget Review', completed: true, daily_streak: 3 },
  { id: 't15', category_id: '6', title: 'Invest Research', completed: false, daily_streak: 1 },
];

function App() {
  const { setCategories, setTasks, categories, tasks, activePlanetId, setActivePlanetId } = useStore();
  const [globalStreak] = useState(12);
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    // Populate with mock data initially
    setCategories(MOCK_CATEGORIES);
    setTasks(MOCK_TASKS);
  }, [setCategories, setTasks]);

  // Calculate statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const totalStreak = tasks.reduce((max, t) => Math.max(max, t.daily_streak), 0);
  const averageTasksPerCategory = totalTasks / categories.length;

  const activePlanet = categories.find(c => c.id === activePlanetId);
  const activeTasks = tasks.filter(t => t.category_id === activePlanetId);
  const activePlanetCompletion = activeTasks.length > 0
    ? Math.round((activeTasks.filter(t => t.completed).length / activeTasks.length) * 100)
    : 0;

  return (
    <main className="relative w-full h-screen overflow-hidden font-sans">
      <GalaxyScene />

      {/* UI Overlay */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none p-8 flex flex-col justify-between">
        {/* Header */}
        <header className="flex justify-between items-start">
          <div className="pointer-events-auto">
            <h1 className="text-4xl font-black tracking-tighter text-white drop-shadow-glow-blue uppercase">
              Growth <span className="text-neon-purple italic">Universe</span>
            </h1>
            <p className="text-white/50 text-sm mt-1 uppercase tracking-widest">v1.1.0 Enhanced Edition</p>
          </div>

          <div className="flex gap-4 pointer-events-auto">
            <GlassPanel className="p-4">
              <p className="text-[10px] text-white/50 uppercase mb-1">Completion Rate</p>
              <p className="text-2xl font-bold text-neon-cyan">{completionRate}%</p>
              <div className="w-24 h-1 bg-white/10 rounded-full mt-2">
                <div
                  className="h-full bg-neon-cyan rounded-full transition-all"
                  style={{ width: `${completionRate}%` }}
                />
              </div>
            </GlassPanel>

            <GlassPanel className="p-4 flex gap-4 items-center">
              <div className="text-right">
                <p className="text-[10px] text-white/50 uppercase">Global Streak</p>
                <p className="text-2xl font-bold text-neon-pink">{globalStreak} Days</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-neon-purple to-neon-blue flex items-center justify-center shadow-glow-purple">
                🔥
              </div>
            </GlassPanel>

            <button
              onClick={() => setShowStats(!showStats)}
              className="pointer-events-auto px-4 py-3 rounded-lg border border-white/20 bg-white/5 backdrop-blur hover:bg-white/10 transition-all text-xs uppercase tracking-wider hover:border-white/40"
            >
              {showStats ? '✕ Stats' : '📊 Stats'}
            </button>
          </div>
        </header>

        {/* Stats Panel */}
        {showStats && (
          <div className="absolute top-32 right-8 pointer-events-auto">
            <GlassPanel className="p-6 w-72 animate-in slide-in-from-right duration-300">
              <h3 className="text-lg font-bold mb-4 text-neon-purple">Universe Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/70">Total Tasks</span>
                  <span className="font-bold text-neon-cyan">{totalTasks}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/70">Completed</span>
                  <span className="font-bold text-green-400">{completedTasks}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/70">Longest Streak</span>
                  <span className="font-bold text-neon-pink">{totalStreak} days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/70">Avg Tasks/Realm</span>
                  <span className="font-bold text-neon-blue">{averageTasksPerCategory.toFixed(1)}</span>
                </div>
                <div className="h-px bg-white/10 my-2" />
                <h4 className="text-xs font-bold text-white/50 uppercase mt-4 mb-2">By Realm</h4>
                {categories.map(cat => {
                  const catTasks = tasks.filter(t => t.category_id === cat.id);
                  const catCompleted = catTasks.filter(t => t.completed).length;
                  return (
                    <div key={cat.id} className="flex justify-between items-center text-xs">
                      <span className="text-white/60">{cat.name}</span>
                      <span style={{ color: cat.color }} className="font-bold">
                        {catCompleted}/{catTasks.length}
                      </span>
                    </div>
                  );
                })}
              </div>
            </GlassPanel>
          </div>
        )}

        {/* Active Planet Details Panel */}
        {activePlanetId && activePlanet && (
          <div className="flex-1 flex items-end justify-end">
            <GlassPanel className="w-96 p-6 pointer-events-auto animate-in slide-in-from-right duration-500">
              <button
                onClick={() => setActivePlanetId(null)}
                className="text-xs text-white/50 hover:text-white transition-colors mb-4"
              >
                ← Back to Galaxy
              </button>
              
              <div style={{ borderColor: activePlanet.color }} className="pb-4 border-b border-white/10 mb-4">
                <h2 className="text-2xl font-bold" style={{ color: activePlanet.color }}>
                  {activePlanet.name}
                </h2>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex-1 h-2 bg-white/10 rounded-full">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${activePlanetCompletion}%`,
                        backgroundColor: activePlanet.color,
                      }}
                    />
                  </div>
                  <span className="text-xs font-bold text-white/70">{activePlanetCompletion}%</span>
                </div>
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto">
                {activeTasks.length === 0 ? (
                  <p className="text-sm text-white/50 text-center py-4">No tasks in this realm yet</p>
                ) : (
                  activeTasks.map(task => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between p-3 rounded bg-white/5 border border-white/10 hover:border-white/20 transition-all group cursor-pointer"
                    >
                      <div className="flex-1">
                        <span className={task.completed ? 'line-through text-white/30' : 'text-white'}>
                          {task.title}
                        </span>
                        {task.daily_streak > 0 && (
                          <p className="text-[10px] text-white/40 mt-1">
                            🔥 {task.daily_streak} day streak
                          </p>
                        )}
                      </div>
                      {task.completed && (
                        <span className="text-green-400 text-lg group-hover:scale-110 transition-transform">
                          ✓
                        </span>
                      )}
                    </div>
                  ))
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-white/10">
                <button className="w-full py-2 px-3 rounded bg-gradient-to-r from-neon-purple to-neon-blue text-white text-xs font-bold uppercase hover:opacity-90 transition-opacity">
                  + Add Task
                </button>
              </div>
            </GlassPanel>
          </div>
        )}

        {/* Footer with Category Buttons */}
        <footer className="footer pointer-events-auto">
          <div className="flex gap-2 flex-wrap">
            {categories.map(cat => {
              const catTasks = tasks.filter(t => t.category_id === cat.id);
              const completed = catTasks.filter(t => t.completed).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActivePlanetId(cat.id)}
                  className="px-4 py-2 rounded-full border transition-all text-xs uppercase tracking-wider hover:shadow-glow-purple group"
                  style={{
                    borderColor: activePlanetId === cat.id ? cat.color : 'rgba(255, 255, 255, 0.1)',
                    backgroundColor: activePlanetId === cat.id ? `${cat.color}20` : 'rgba(255, 255, 255, 0.05)',
                    color: activePlanetId === cat.id ? cat.color : 'white',
                  }}
                >
                  <span className="flex items-center gap-2">
                    {cat.name}
                    <span className="text-[10px] opacity-60 group-hover:opacity-100">
                      {completed}/{catTasks.length}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </footer>
      </div>
    </main>
  );
}

export default App;
