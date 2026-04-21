import { useState } from 'react';
import { Calendar, Clock, RotateCcw, Moon, Sun, Hash, Compass, Zap, Timer } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { format } from 'date-fns';
import { calculateAge, type AgeResult } from './lib/dateUtils';

export default function App() {
  const [birthDate, setBirthDate] = useState<string>('');
  const [birthTime, setBirthTime] = useState<string>('00:00');
  const [targetDate, setTargetDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [targetTime, setTargetTime] = useState<string>(format(new Date(), 'HH:mm'));
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [result, setResult] = useState<AgeResult | null>(null);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleCalculate = () => {
    if (!birthDate) return;

    try {
      const bDate = new Date(`${birthDate}T${birthTime}`);
      const tDate = new Date(`${targetDate}T${targetTime}`);
      const res = calculateAge(bDate, tDate);
      setResult(res);
    } catch (e) {
      console.error('Invalid date format', e);
    }
  };

  const handleReset = () => {
    setBirthDate('');
    setBirthTime('00:00');
    setTargetDate(format(new Date(), 'yyyy-MM-dd'));
    setTargetTime(format(new Date(), 'HH:mm'));
    setResult(null);
  };

  const isValidInput = birthDate && targetDate;

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''} bg-surface-bg text-white font-sans transition-colors duration-500`}>
      <div className="max-w-[1024px] mx-auto p-6 md:p-10">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center shadow-lg shadow-brand-primary/20">
              <Clock size={28} className="text-black" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight leading-none">
                Age <span className="text-brand-primary">Calculator</span>
              </h1>
              <p className="text-gray-500 text-xs mt-1 uppercase tracking-[0.2em] font-medium">Precision Time Analysis</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className="p-3 rounded-full bg-surface-input border border-white/5 text-gray-400 hover:text-brand-primary transition-all cursor-pointer"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </header>

        {/* Main Content Grid */}
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls Panel */}
          <div className="lg:col-span-5 space-y-6">
            <section className="material-card">
              <h2 className="text-lg font-medium mb-8 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                  <Calendar size={18} />
                </div>
                Birth Details
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="label-text">Date of Birth</label>
                  <input
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="label-text">Time of Birth</label>
                  <input
                    type="time"
                    value={birthTime}
                    onChange={(e) => setBirthTime(e.target.value)}
                    className="input-field"
                  />
                </div>
              </div>
            </section>

            <section className="material-card">
              <h2 className="text-lg font-medium mb-8 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                  <Compass size={18} />
                </div>
                Date Difference
              </h2>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="label-text">Target Date</label>
                  <input
                    type="date"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="label-text">Time At</label>
                  <input
                    type="time"
                    value={targetTime}
                    onChange={(e) => setTargetTime(e.target.value)}
                    className="input-field"
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={handleCalculate}
                  disabled={!isValidInput}
                  className="btn-primary w-full"
                >
                  Calculate Age
                </button>
                <button 
                  onClick={handleReset}
                  className="w-full bg-surface-input py-3 rounded-lg border border-white/10 hover:border-brand-primary/50 text-xs font-semibold uppercase tracking-widest text-gray-400 hover:text-white transition-all cursor-pointer"
                >
                  Reset Parameters
                </button>
              </div>
            </section>
          </div>

          {/* Visualization Panel */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {result ? (
              <motion.div
                key={`${result.totalDays}-${result.years}-${result.months}-${result.days}`}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={{
                  hidden: { opacity: 0, x: 20 },
                  visible: { 
                    opacity: 1, 
                    x: 0,
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.2
                    }
                  },
                  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
                }}
                className="material-card h-full flex flex-col min-h-[500px]"
              >
                <div className="text-center flex-grow flex flex-col justify-center">
                  <motion.div 
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    className="text-[11px] text-brand-primary font-bold uppercase tracking-[0.3em] mb-10"
                  >
                    Calculate Age
                  </motion.div>
                  
                  <div className="flex justify-center items-end space-x-6 sm:space-x-10 mb-12">
                    {[
                      { label: 'Years', value: result.years },
                      { label: 'Months', value: result.months },
                      { label: 'Days', value: result.days },
                    ].map((stat) => (
                      <motion.div 
                        key={stat.label}
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: { opacity: 1, y: 0 }
                        }}
                        className="text-center"
                      >
                        <div className="text-6xl sm:text-8xl font-thin tracking-tighter leading-none mb-4 tabular-nums">
                          {stat.value.toString().padStart(2, '0')}
                        </div>
                        <div className="text-[10px] text-gray-500 uppercase font-bold tracking-[0.2em]">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div 
                    variants={{
                      hidden: { scaleX: 0 },
                      visible: { scaleX: 1 }
                    }}
                    className="divider origin-left" 
                  />

                  <div className="grid grid-cols-2 gap-6 mt-10">
                    <motion.div 
                      variants={{
                        hidden: { opacity: 0, scale: 0.9 },
                        visible: { opacity: 1, scale: 1 }
                      }}
                      className="stat-box"
                    >
                      <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-2">Total Life Days</div>
                      <div className="text-2xl font-bold text-brand-primary tabular-nums">
                        {result.totalDays.toLocaleString()}
                      </div>
                    </motion.div>
                    <motion.div 
                      variants={{
                        hidden: { opacity: 0, scale: 0.9 },
                        visible: { opacity: 1, scale: 1 }
                      }}
                      className="stat-box"
                    >
                      <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-2">Hours Active</div>
                      <div className="text-2xl font-bold tabular-nums">
                        {(result.totalDays * 24).toLocaleString()}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="material-card h-full flex flex-col items-center justify-center text-center py-20 min-h-[500px] border-dashed border-white/10"
                >
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 animate-pulse">
                    <Timer size={40} className="text-gray-600" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-300 mb-2">Awaiting Parameters</h3>
                  <p className="text-gray-500 text-sm max-w-xs mx-auto uppercase tracking-widest leading-loose font-bold text-[10px]">
                    Configure birth details and target metrics to initiate chronological analysis
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
