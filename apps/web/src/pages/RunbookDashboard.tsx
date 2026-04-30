import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';
import { 
  PlayCircle, 
  FileText, 
  Activity, 
  ShieldCheck,
  ArrowUpRight,
  TrendingDown,
  Clock,
  History,
  CheckCircle2,
  AlertTriangle,
  Zap
} from 'lucide-react';

const executionData = [
  { name: 'Mon', success: 42, failure: 2 },
  { name: 'Tue', success: 38, failure: 1 },
  { name: 'Wed', success: 45, failure: 3 },
  { name: 'Thu', success: 52, failure: 0 },
  { name: 'Fri', success: 61, failure: 4 },
  { name: 'Sat', success: 25, failure: 1 },
  { name: 'Sun', success: 22, failure: 0 },
];

const KPI_CARDS = [
  { title: 'Total Executions (24h)', value: '1,284', trend: '+12%', color: 'blue', icon: PlayCircle },
  { title: 'Auto-Remediated', value: '842', trend: '65.5%', color: 'emerald', icon: Zap },
  { title: 'Avg Execution Time', value: '42.5s', trend: '-2.4s', color: 'blue', icon: Clock },
  { title: 'Success Rate', value: '98.2%', trend: 'Healthy', color: 'slate', icon: CheckCircle2 },
];

const RunbookDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Operational Runbook Intelligence</h1>
          <p className="text-slate-400">Strategic oversight of automated remediation and operational maintenance workflows.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
            Download Audit Report
          </button>
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2">
            <PlusCircle size={16} />
            New Runbook
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {KPI_CARDS.map((card) => (
          <div key={card.title} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative group hover:border-slate-700 transition-all">
            <div className="flex justify-between items-start">
              <div className={`p-2 bg-${card.color}-600/10 rounded-lg`}>
                <card.icon className={`w-6 h-6 text-${card.color}-400`} />
              </div>
              <div className={`text-xs font-medium ${card.trend.includes('+') || card.trend.includes('%') ? 'text-emerald-400' : 'text-slate-400'}`}>
                {card.trend}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-slate-500 font-medium">{card.title}</p>
              <p className="text-3xl font-bold text-white mt-1">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Execution Trends Graph */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-6">Runbook Execution Trends (Weekly)</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={executionData}>
                <defs>
                  <linearGradient id="colorSuccess" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                />
                <Area type="monotone" dataKey="success" stroke="#3b82f6" fill="url(#colorSuccess)" name="Successful" />
                <Area type="monotone" dataKey="failure" stroke="#f43f5e" fill="transparent" strokeDasharray="5 5" name="Failed" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Action Usage by Plugin */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col">
          <h3 className="text-lg font-bold text-white mb-6">Plugin Distribution</h3>
          <div className="flex-1 space-y-6">
            {[
              { name: 'API Plugin', value: 45, color: 'bg-blue-500' },
              { name: 'Shell Plugin', value: 30, color: 'bg-amber-500' },
              { name: 'Notification Hub', value: 15, color: 'bg-emerald-500' },
              { name: 'Approval Gateway', value: 10, color: 'bg-slate-500' },
            ].map((plugin) => (
              <div key={plugin.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300 font-medium">{plugin.name}</span>
                  <span className="text-slate-400">{plugin.value}% Usage</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full ${plugin.color}`} style={{ width: `${plugin.value}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Latest Execution Log Stream */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">Live Automation Execution Stream</h3>
          <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">View Full Logs</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Execution ID</th>
                <th className="px-6 py-4 font-semibold">Runbook</th>
                <th className="px-6 py-4 font-semibold">Trigger</th>
                <th className="px-6 py-4 font-semibold">Duration</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {[
                { id: '#EX-9942', runbook: 'Incident Response: High CPU', trigger: 'ALERT_API', duration: '12.4s', status: 'SUCCESS' },
                { id: '#EX-9941', runbook: 'DB Maintenance: Snapshot', trigger: 'SCHEDULED', duration: '45.2s', status: 'RUNNING' },
                { id: '#EX-9940', runbook: 'App Deployment: Rollback', trigger: 'MANUAL', duration: '18.9s', status: 'SUCCESS' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-800/50 transition-all group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-blue-400" />
                      <span className="text-sm font-medium text-slate-300">{row.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-300">{row.runbook}</td>
                  <td className="px-6 py-4 text-xs font-mono text-slate-400">{row.trigger}</td>
                  <td className="px-6 py-4 text-sm text-slate-400">{row.duration}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded border ${
                      row.status === 'SUCCESS' ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10' : 'text-blue-400 border-blue-500/20 bg-blue-500/10'
                    }`}>{row.status}</span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-400 hover:text-blue-300 text-xs font-bold uppercase tracking-wider">
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RunbookDashboard;
