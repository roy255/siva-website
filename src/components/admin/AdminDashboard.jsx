import React, { useState, useEffect, useMemo } from 'react';
import { ShieldCheck, Users, Search, Activity, Database, Lock, ArrowLeft, Filter, Download, MoreVertical, HeartPulse } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

// Mock Data for Analytics
const areaData = [
  { name: 'Mon', leads: 0 }, { name: 'Tue', leads: 0 }, { name: 'Wed', leads: 0 },
  { name: 'Thu', leads: 0 }, { name: 'Fri', leads: 0 }, { name: 'Sat', leads: 0 }, { name: 'Sun', leads: 0 }
];

const goalData = [
  { name: 'Fat Loss', count: 0 }, { name: 'Muscle Gain', count: 0 }, 
  { name: 'Fitness', count: 0 }, { name: 'Lifestyle', count: 0 }
];

export default function AdminDashboard() {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === 'Siva2026') {
      setIsAdminAuthenticated(true);
      setErrorMsg('');
      fetchUsers();
    } else {
      setErrorMsg('Invalid Passcode');
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/profiles');
      if (!res.ok) throw new Error('Failed to fetch profiles');
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users: ", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = useMemo(() => {
    return users.filter(u => 
      u.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      u.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [users, searchQuery]);

  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-luxury-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-electric-blue/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="glass-panel p-12 max-w-md w-full relative z-10"
        >
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center shadow-inner">
              <Lock className="w-10 h-10 text-electric-blue" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-center mb-2 tracking-wide uppercase">Admin Portal</h2>
          <p className="text-slate-400 text-center mb-8 text-sm">Secure access required.</p>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <input 
              type="password" 
              required
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="input-glass text-center tracking-[0.5em] font-mono text-xl"
              placeholder="••••••••"
            />
            {errorMsg && <p className="text-brand-error text-sm text-center">{errorMsg}</p>}
            <button type="submit" className="w-full btn-premium flex items-center justify-center">
              Authenticate
            </button>
          </form>
          <div className="mt-8 text-center border-t border-white/5 pt-6">
             <Link to="/" className="text-slate-500 hover:text-white text-sm flex items-center justify-center font-semibold tracking-wide uppercase transition-colors">
               <ArrowLeft className="w-4 h-4 mr-2" /> Return to Site
             </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-luxury-black text-white flex overflow-hidden font-sans">
      {/* Sidebar */}
      <motion.div 
        initial={{ x: -300 }} animate={{ x: 0 }} transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-72 bg-luxury-card/40 backdrop-blur-2xl border-r border-white/5 flex flex-col z-20"
      >
        <div className="p-8 flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-neon-lime text-luxury-black rounded-xl flex items-center justify-center font-black text-xl">OS</div>
          <h1 className="text-xl font-bold tracking-widest uppercase text-white">Admin</h1>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          {[
            { id: 'dashboard', icon: Activity, label: 'Overview' },
            { id: 'users', icon: Users, label: 'Clients & Leads' },
            { id: 'database', icon: Database, label: 'System Health' },
          ].map(item => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-5 py-4 rounded-2xl transition-all duration-300 font-medium tracking-wide ${activeTab === item.id ? 'bg-white/10 text-white shadow-inner' : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'}`}
            >
              <item.icon className={`w-5 h-5 mr-4 ${activeTab === item.id ? 'text-neon-lime' : ''}`} /> {item.label}
            </button>
          ))}
        </nav>

        <div className="p-6">
          <button onClick={() => setIsAdminAuthenticated(false)} className="w-full flex items-center justify-center px-4 py-3 bg-white/5 hover:bg-brand-error/20 hover:text-brand-error text-slate-400 rounded-xl transition-colors text-sm font-semibold uppercase tracking-widest border border-white/5">
            <Lock className="w-4 h-4 mr-2" /> Lock Portal
          </button>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto relative z-10">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-electric-blue/5 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="p-10 max-w-7xl mx-auto space-y-8">
          
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <motion.div key="dashboard" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold mb-2 tracking-wide">Performance Overview</h2>
                  <p className="text-slate-400">Your coaching business at a glance.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="glass-card p-6">
                    <div className="flex justify-between items-start mb-4">
                      <p className="text-slate-400 font-semibold text-sm uppercase tracking-widest">Total Leads</p>
                      <Users className="w-5 h-5 text-electric-blue" />
                    </div>
                    <h3 className="text-4xl font-bold">{users.length}</h3>
                    <p className="text-neon-lime text-sm font-medium mt-2">+12% this week</p>
                  </div>
                  <div className="glass-card p-6">
                    <div className="flex justify-between items-start mb-4">
                      <p className="text-slate-400 font-semibold text-sm uppercase tracking-widest">Conversion Rate</p>
                      <HeartPulse className="w-5 h-5 text-neon-lime" />
                    </div>
                    <h3 className="text-4xl font-bold">0%</h3>
                    <p className="text-neon-lime text-sm font-medium mt-2">+0% this week</p>
                  </div>
                  <div className="glass-card p-6">
                    <div className="flex justify-between items-start mb-4">
                      <p className="text-slate-400 font-semibold text-sm uppercase tracking-widest">Revenue Potential</p>
                      <ShieldCheck className="w-5 h-5 text-brand-warning" />
                    </div>
                    <h3 className="text-4xl font-bold">$0</h3>
                    <p className="text-slate-500 text-sm font-medium mt-2">Based on current leads</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="glass-card p-6 lg:col-span-2">
                    <h3 className="text-lg font-bold mb-6 tracking-wide">Lead Generation (7 Days)</h3>
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={areaData}>
                          <defs>
                            <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#A3FF12" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#A3FF12" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                          <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" tick={{fill: '#94A3B8'}} axisLine={false} tickLine={false} />
                          <YAxis stroke="rgba(255,255,255,0.3)" tick={{fill: '#94A3B8'}} axisLine={false} tickLine={false} />
                          <Tooltip contentStyle={{backgroundColor: '#111827', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px'}} itemStyle={{color: '#A3FF12'}} />
                          <Area type="monotone" dataKey="leads" stroke="#A3FF12" strokeWidth={3} fillOpacity={1} fill="url(#colorLeads)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div className="glass-card p-6">
                    <h3 className="text-lg font-bold mb-6 tracking-wide">Goal Distribution</h3>
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={goalData} layout="vertical" margin={{top: 0, right: 0, left: -20, bottom: 0}}>
                          <XAxis type="number" hide />
                          <YAxis dataKey="name" type="category" stroke="rgba(255,255,255,0.3)" tick={{fill: '#94A3B8', fontSize: 12}} axisLine={false} tickLine={false} />
                          <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{backgroundColor: '#111827', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px'}} />
                          <Bar dataKey="count" fill="#38BDF8" radius={[0, 4, 4, 0]} barSize={20} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'users' && (
              <motion.div key="users" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h2 className="text-3xl font-bold mb-1 tracking-wide">Client Directory</h2>
                    <p className="text-slate-400">View and manage comprehensive profiling data.</p>
                  </div>
                  <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative w-full md:w-64">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input 
                        type="text" 
                        placeholder="Search leads..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-electric-blue transition-colors"
                      />
                    </div>
                    <button className="p-2 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors">
                      <Filter className="w-4 h-4 text-slate-300" />
                    </button>
                    <button className="p-2 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors">
                      <Download className="w-4 h-4 text-slate-300" />
                    </button>
                  </div>
                </div>

                <div className="glass-card overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/5 bg-white/5">
                          <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-widest">Name</th>
                          <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-widest">Contact</th>
                          <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-widest">Goal</th>
                          <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-widest">Health Issues</th>
                          <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-widest">Date</th>
                          <th className="px-6 py-4"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {loading ? (
                          <tr><td colSpan="6" className="px-6 py-12 text-center text-slate-500">Loading database...</td></tr>
                        ) : filteredUsers.length === 0 ? (
                          <tr><td colSpan="6" className="px-6 py-12 text-center text-slate-500">No leads found.</td></tr>
                        ) : (
                          filteredUsers.map(user => (
                            <tr key={user.id} className="hover:bg-white/5 transition-colors group">
                              <td className="px-6 py-4">
                                <p className="font-bold text-white">{user.name || 'Anonymous'}</p>
                                <p className="text-xs text-slate-500">{user.age ? `${user.age} yrs • ` : ''}{user.gender || 'Unknown'}</p>
                              </td>
                              <td className="px-6 py-4">
                                <p className="text-sm text-slate-300">{user.email}</p>
                                <p className="text-xs text-slate-500">{user.phone}</p>
                              </td>
                              <td className="px-6 py-4">
                                <span className="px-3 py-1 rounded-full bg-electric-blue/10 text-electric-blue text-xs font-semibold uppercase tracking-wider">{user.purpose || 'Fitness'}</span>
                              </td>
                              <td className="px-6 py-4">
                                {user.health_challenges && user.health_challenges !== '[]' && user.health_challenges !== 'null' ? (
                                  <span className="text-xs text-brand-error border border-brand-error/20 bg-brand-error/10 px-2 py-1 rounded-md">Detected</span>
                                ) : (
                                  <span className="text-xs text-slate-500">Clear</span>
                                )}
                              </td>
                              <td className="px-6 py-4 text-sm text-slate-400">
                                {new Date(user.created_at).toLocaleDateString()}
                              </td>
                              <td className="px-6 py-4 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-2 hover:bg-white/10 rounded-lg text-slate-400 transition-colors">
                                  <MoreVertical className="w-5 h-5" />
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'database' && (
              <motion.div key="database" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold mb-1 tracking-wide">System Health</h2>
                  <p className="text-slate-400">MySQL Connection and Server status.</p>
                </div>
                <div className="glass-card p-10 max-w-2xl">
                  <div className="flex items-center space-x-6 mb-8 pb-8 border-b border-white/5">
                    <div className="w-20 h-20 bg-brand-success/10 rounded-3xl flex items-center justify-center border border-brand-success/20">
                      <Database className="w-10 h-10 text-brand-success" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white flex items-center">
                        All Systems Operational <span className="ml-3 w-3 h-3 bg-brand-success rounded-full animate-pulse shadow-[0_0_10px_#22C55E]"></span>
                      </h3>
                      <p className="text-slate-400 mt-1">Express API is connected to local MySQL instance.</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                      <span className="text-slate-400 font-medium">Database Name</span>
                      <span className="font-mono text-white">siva_website</span>
                    </div>
                    <div className="flex justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                      <span className="text-slate-400 font-medium">Total Rows (Profiles)</span>
                      <span className="font-mono text-white">{users.length}</span>
                    </div>
                    <div className="flex justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                      <span className="text-slate-400 font-medium">Latency</span>
                      <span className="font-mono text-brand-success">14ms</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
