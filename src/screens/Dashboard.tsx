import { type Screen, type SimulationData } from '../types'
import {
  ShieldIcon, AlertTriangleIcon, CloudRainIcon, DropletIcon,
  TowerIcon, ActivityIcon, RouteIcon, FlaskIcon, ZapIcon, NavigationIcon,
} from '../components/icons'

interface DashboardProps {
  disasterData: SimulationData
  setScreen: (s: Screen) => void
  onSimulate: () => void
}

function RiskCard({
  icon: Icon, label, value, level,
}: {
  icon: React.ComponentType<{ className?: string; size?: number }>
  label: string
  value: string
  level: 'safe' | 'moderate' | 'high' | 'critical' | 'normal'
}) {
  const colors = {
    safe: { bg: 'bg-emerald-500/8', border: 'border-emerald-500/20', icon: 'text-emerald-400', badge: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' },
    normal: { bg: 'bg-emerald-500/8', border: 'border-emerald-500/20', icon: 'text-emerald-400', badge: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' },
    moderate: { bg: 'bg-yellow-500/8', border: 'border-yellow-500/20', icon: 'text-yellow-400', badge: 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/30' },
    high: { bg: 'bg-orange-500/8', border: 'border-orange-500/20', icon: 'text-orange-400', badge: 'bg-orange-500/15 text-orange-400 border border-orange-500/30' },
    critical: { bg: 'bg-red-500/10', border: 'border-red-500/30', icon: 'text-red-400', badge: 'bg-red-500/20 text-red-400 border border-red-500/40' },
  }
  const c = colors[level]
  return (
    <div className={`rounded-xl border p-5 ${c.bg} ${c.border} flex flex-col gap-3 transition-all duration-500`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase">{label}</span>
        <Icon className={c.icon} size={18} />
      </div>
      <span className={`self-start px-3 py-1 rounded-full text-xs font-bold tracking-widest font-display ${c.badge}`}>
        {value}
      </span>
    </div>
  )
}

function StatBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const pct = Math.min((value / max) * 100, 100)
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between items-center">
        <span className="text-xs text-slate-400">{label}</span>
        <span className="font-mono-data text-xs text-slate-300">{value}</span>
      </div>
      <div className="h-1.5 bg-navy-600 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  )
}

export default function Dashboard({ disasterData, setScreen, onSimulate }: DashboardProps) {
  const d = disasterData
  const overall = d.active ? 'critical' : 'safe'
  const weather = d.active ? 'high' : 'moderate'
  const flood = d.active ? 'critical' : 'safe'
  const infra = d.active ? 'critical' : 'normal'

  return (
    <div className="flex flex-col gap-6 p-6 overflow-y-auto h-full">

      {/* Header */}
      <div className="animate-slide-in-up">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
            <ShieldIcon className="text-blue-400" size={16} />
          </div>
          <span className="text-xs font-semibold text-blue-400 tracking-widest uppercase font-display">SafeRoute AI</span>
        </div>
        <h1 className="text-3xl font-display font-bold text-slate-100 tracking-wide leading-none mb-1">
          Situation Dashboard
        </h1>
        <p className="text-sm text-slate-400">Disaster-aware navigation and real-time safety intelligence</p>
      </div>

      {/* Critical alert banner when disaster active */}
      {d.active && (
        <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-4 flex items-start gap-3 animate-slide-in-up glow-critical">
          <AlertTriangleIcon className="text-red-400 shrink-0 mt-0.5 animate-pulse-critical" size={20} />
          <div>
            <div className="font-display font-bold text-red-400 text-base tracking-wide">DISASTER EVENT ACTIVE</div>
            <div className="text-xs text-red-300/80 mt-0.5">
              Simulated flood event detected. Road Segment 14 is now critical. An alternative route is available.
            </div>
          </div>
        </div>
      )}

      {/* Status cards */}
      <div className="grid grid-cols-2 gap-3">
        <RiskCard icon={ShieldIcon} label="Overall Safety" value={d.active ? 'CRITICAL' : 'SAFE'} level={overall} />
        <RiskCard icon={CloudRainIcon} label="Weather Risk" value={d.active ? 'HIGH' : 'MODERATE'} level={weather} />
        <RiskCard icon={DropletIcon} label="Flood Risk" value={d.active ? 'HIGH' : 'LOW'} level={flood} />
        <RiskCard icon={TowerIcon} label="Infrastructure" value={d.active ? 'ABNORMAL' : 'NORMAL'} level={infra} />
      </div>

      {/* Live readings */}
      <div className="rounded-xl border border-navy-600 bg-navy-800 p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-display font-semibold text-slate-200 tracking-wide">Environmental Readings</h3>
            <p className="text-xs text-slate-500 mt-0.5">Prototype Sensor Feed</p>
          </div>
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${d.active ? 'bg-red-500/15 text-red-400 border border-red-500/30' : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25'}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${d.active ? 'bg-red-400 animate-pulse-critical' : 'bg-emerald-400'}`} />
            {d.active ? 'ALERT' : 'NOMINAL'}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <StatBar
            label={`Rainfall (mm/hr)`}
            value={d.rainfall}
            max={100}
            color={d.active ? '#ef4444' : '#3b82f6'}
          />
          <StatBar
            label="Water Level (%)"
            value={d.waterLevel}
            max={100}
            color={d.active ? '#ef4444' : '#22c55e'}
          />
          <StatBar
            label="Flood Probability (%)"
            value={d.floodProbability}
            max={100}
            color={d.active ? '#ef4444' : '#22c55e'}
          />
        </div>
      </div>

      {/* Route risk summary */}
      <div className="rounded-xl border border-navy-600 bg-navy-800 p-5">
        <h3 className="font-display font-semibold text-slate-200 tracking-wide mb-3">Route Risk: Vijayawada → Hyderabad</h3>
        <div className="flex items-center gap-3 mb-3">
          <div className="flex-1 h-3 bg-navy-600 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${d.routeRiskScore}%`,
                backgroundColor: d.active ? '#ef4444' : '#22c55e',
              }}
            />
          </div>
          <span className={`font-mono-data text-sm font-bold ${d.active ? 'text-red-400' : 'text-emerald-400'}`}>
            {d.routeRiskScore}/100
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold font-display tracking-wider ${d.active ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25'}`}>
            {d.active ? 'CRITICAL' : 'LOW RISK'}
          </span>
          {d.active && (
            <span className="text-xs text-slate-400">Road Segment 14 — Flood + Infrastructure Hazard</span>
          )}
        </div>
      </div>

      {/* CTAs */}
      <div className="flex flex-col gap-3">
        <button
          onClick={() => setScreen('route')}
          className="flex items-center justify-center gap-2.5 px-6 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-display font-semibold text-base tracking-wide transition-all duration-200 shadow-lg shadow-blue-900/40 active:scale-[0.98]"
        >
          <NavigationIcon size={18} />
          Plan Safe Route
        </button>
        <button
          onClick={onSimulate}
          className={`flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-display font-semibold text-sm tracking-wide transition-all duration-200 border active:scale-[0.98] ${d.active ? 'bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/15' : 'bg-navy-700 border-navy-500 text-slate-300 hover:bg-navy-600'}`}
        >
          <FlaskIcon size={16} />
          {d.active ? 'Disaster Active — View Simulation' : 'Simulate Disaster Event'}
        </button>
      </div>

      {/* Activity feed */}
      <div className="rounded-xl border border-navy-600 bg-navy-800 p-5">
        <h3 className="font-display font-semibold text-slate-200 tracking-wide mb-3 flex items-center gap-2">
          <ActivityIcon className="text-slate-500" size={15} />
          Recent Activity
        </h3>
        <div className="flex flex-col gap-2.5">
          {[
            { time: 'Just now', text: d.active ? 'Flood event simulated — Route Segment 14 critical' : 'System operational — No active hazards', color: d.active ? 'bg-red-400' : 'bg-emerald-400' },
            { time: '5 min ago', text: 'Route analysis completed: Vijayawada → Hyderabad', color: 'bg-blue-400' },
            { time: '12 min ago', text: 'Infrastructure scan completed — 4 nodes monitored', color: 'bg-emerald-400' },
            { time: '18 min ago', text: 'Weather data feed refreshed', color: 'bg-slate-400' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${item.color}`} />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-300 leading-relaxed">{item.text}</p>
                <p className="text-xs text-slate-600 mt-0.5">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* System status */}
      <div className="flex items-center justify-between px-4 py-3 rounded-lg border border-navy-600 bg-navy-800/60">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-slate-400">System Status</span>
        </div>
        <span className="text-xs font-semibold text-emerald-400 font-display tracking-wide">OPERATIONAL</span>
      </div>

    </div>
  )
}
