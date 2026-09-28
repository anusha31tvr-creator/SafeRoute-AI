import { useState } from 'react'
import { type Screen, type SimulationData } from '../types'
import { FlaskIcon, AlertTriangleIcon, ShieldIcon, ArrowRightIcon, ZapIcon, DropletIcon, CloudRainIcon } from '../components/icons'

interface DisasterSimulationProps {
  disasterData: SimulationData
  setScreen: (s: Screen) => void
  onSimulate: () => void
  onReset: () => void
}

function MiniRouteViz({ active }: { active: boolean }) {
  const seg4Color = active ? '#ef4444' : '#22c55e'
  const seg3Color = active ? '#ef4444' : '#f97316'
  return (
    <svg viewBox="0 0 400 120" className="w-full h-20">
      <defs>
        <pattern id="miniGrid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e2f4f" strokeWidth="0.4" opacity="0.5" />
        </pattern>
        <radialGradient id="miniFlood" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity={active ? 0.4 : 0} />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="120" fill="#080e1c" />
      <rect width="400" height="120" fill="url(#miniGrid)" />

      {/* Route segments */}
      {/* S1: Safe */}
      <path d="M 370 90 C 350 80 330 72 305 64" stroke="#22c55e" strokeWidth="4" fill="none" strokeLinecap="round" />
      {/* S2: Caution */}
      <path d="M 305 64 C 285 58 265 52 244 47" stroke={active ? '#f97316' : '#eab308'} strokeWidth="4" fill="none" strokeLinecap="round" />
      {/* S3: High/Critical */}
      <path d="M 244 47 C 225 42 207 38 188 35" stroke={seg3Color} strokeWidth="4" fill="none" strokeLinecap="round"
        style={active ? { filter: 'drop-shadow(0 0 5px rgba(239,68,68,0.7))' } : undefined} />
      {/* S4: NH Seg 14 — Critical */}
      <path d="M 188 35 C 170 32 152 30 132 30" stroke={seg4Color} strokeWidth={active ? 5 : 4} fill="none" strokeLinecap="round"
        style={active ? { filter: 'drop-shadow(0 0 7px rgba(239,68,68,0.9))' } : undefined} />
      {/* S5+6: Safe */}
      <path d="M 132 30 C 100 28 60 25 30 22" stroke="#22c55e" strokeWidth="4" fill="none" strokeLinecap="round" />

      {/* Flood overlay when active */}
      {active && (
        <ellipse cx="160" cy="32" rx="46" ry="28" fill="url(#miniFlood)" className="animate-flood-wave" />
      )}

      {/* Hazard marker */}
      {active && (
        <g>
          <circle cx="160" cy="32" r="10" fill="none" stroke="#ef4444" strokeWidth="1.5">
            <animate attributeName="r" values="8;16;8" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;0;1" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="160" cy="32" r="6" fill="#ef4444" />
          <text x="160" y="36" textAnchor="middle" fill="white" fontSize="8" fontWeight="800">!</text>
        </g>
      )}

      {/* City dots */}
      <circle cx="370" cy="90" r="5" fill="#172540" stroke="#60a5fa" strokeWidth="1.5" />
      <text x="370" y="106" textAnchor="middle" fill="#60a5fa" fontSize="7" fontFamily="Barlow Condensed, sans-serif">VJA</text>
      <circle cx="30" cy="22" r="5" fill="#172540" stroke="#34d399" strokeWidth="1.5" />
      <text x="30" y="10" textAnchor="middle" fill="#34d399" fontSize="7" fontFamily="Barlow Condensed, sans-serif">HYD</text>
    </svg>
  )
}

function ReadingRow({ icon: Icon, label, before, after, active }: {
  icon: React.ComponentType<{ className?: string; size?: number }>
  label: string
  before: string
  after: string
  active: boolean
}) {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-navy-600 last:border-0">
      <Icon className="text-slate-500 shrink-0" size={15} />
      <span className="text-sm text-slate-400 flex-1">{label}</span>
      <div className="flex items-center gap-2">
        {active && (
          <>
            <span className="text-xs text-slate-500 line-through">{before}</span>
            <ArrowRightIcon className="text-slate-600" size={12} />
          </>
        )}
        <span className={`text-sm font-semibold font-display tracking-wide ${active ? 'text-red-400' : 'text-emerald-400'}`}>
          {active ? after : before}
        </span>
      </div>
    </div>
  )
}

export default function DisasterSimulation({ disasterData, setScreen, onSimulate, onReset }: DisasterSimulationProps) {
  const [simulating, setSimulating] = useState(false)
  const d = disasterData
  const active = d.active

  function handleSimulate() {
    if (active) { onReset(); return }
    setSimulating(true)
    setTimeout(() => {
      onSimulate()
      setSimulating(false)
    }, 2200)
  }

  const events = [
    { id: 'rain', icon: CloudRainIcon, label: 'Heavy Rain', desc: 'Rainfall: 85mm/hr', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
    { id: 'flood', icon: DropletIcon, label: 'Flood', desc: 'Water level: HIGH', color: 'text-blue-500', bg: 'bg-blue-600/10 border-blue-600/20' },
    { id: 'electrical', icon: ZapIcon, label: 'Infra Failure', desc: 'P-102: ABNORMAL', color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20' },
    { id: 'bridge', icon: AlertTriangleIcon, label: 'Bridge Hazard', desc: 'Segment alert', color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20' },
  ]

  return (
    <div className="flex flex-col gap-5 p-5 overflow-y-auto h-full">

      {/* Header */}
      <div className="animate-slide-in-up">
        <div className="flex items-center gap-2 mb-1">
          <FlaskIcon className="text-blue-400" size={18} />
          <span className="text-xs font-semibold text-slate-400 tracking-widest uppercase font-display">Simulation</span>
        </div>
        <h1 className="text-3xl font-display font-bold text-slate-100 tracking-wide">Disaster Simulation</h1>
        <p className="text-sm text-slate-400 mt-0.5">Trigger simulated disaster events and observe the AI response</p>
      </div>

      {/* Main simulate button */}
      <div className={`rounded-xl border p-5 text-center transition-all duration-700 ${active ? 'border-red-500/35 bg-red-500/8 glow-critical' : 'border-navy-600 bg-navy-800'}`}>
        <div className="mb-4">
          {active ? (
            <>
              <div className="text-4xl mb-2">🌊</div>
              <div className="font-display font-black text-red-400 text-2xl tracking-wide animate-pulse-critical">FLOOD EVENT ACTIVE</div>
              <div className="text-sm text-slate-400 mt-1">Simulated disaster scenario is running</div>
            </>
          ) : (
            <>
              <div className="text-4xl mb-2">🌀</div>
              <div className="font-display font-bold text-slate-200 text-xl tracking-wide">Ready to Simulate</div>
              <div className="text-sm text-slate-400 mt-1">Trigger a simulated flood event to see the AI response</div>
            </>
          )}
        </div>

        <button
          onClick={handleSimulate}
          disabled={simulating}
          className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-display font-bold text-base tracking-wide transition-all duration-300 active:scale-[0.98] ${
            simulating ? 'bg-blue-700/50 text-blue-300 cursor-not-allowed' :
            active ? 'bg-red-700/40 border border-red-500/40 text-red-300 hover:bg-red-700/60' :
            'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/40'
          }`}
        >
          {simulating ? (
            <>
              <div className="w-4 h-4 rounded-full border-2 border-blue-300 border-t-transparent animate-spin" />
              Simulating Flood Event…
            </>
          ) : active ? (
            <>
              <FlaskIcon size={18} />
              Reset Simulation
            </>
          ) : (
            <>
              <span className="text-xl">🌊</span>
              Simulate Flood Event
            </>
          )}
        </button>
      </div>

      {/* Mini route visualization */}
      <div className="rounded-xl border border-navy-600 bg-navy-800 p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display font-semibold text-slate-200 tracking-wide text-sm">Route Status</h3>
          {active && (
            <span className="px-2.5 py-0.5 bg-red-500/20 text-red-400 border border-red-500/30 rounded-full text-xs font-bold font-display tracking-wider animate-pulse-critical">
              HAZARD DETECTED
            </span>
          )}
          {!active && (
            <span className="px-2.5 py-0.5 bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 rounded-full text-xs font-bold font-display tracking-wider">
              SAFE
            </span>
          )}
        </div>
        <div className="rounded-lg overflow-hidden border border-navy-600">
          <MiniRouteViz active={active} />
        </div>
        {active && (
          <p className="text-xs text-red-300/80 mt-2 text-center animate-fade-in">
            🔴 Road Segment 14 — CRITICAL — Safer alternative route available
          </p>
        )}
      </div>

      {/* Sensor readings comparison */}
      <div className="rounded-xl border border-navy-600 bg-navy-800 p-4">
        <h3 className="font-display font-semibold text-slate-200 tracking-wide text-sm mb-1">Sensor Readings</h3>
        <p className="text-xs text-slate-500 mb-3">Simulated IoT Data</p>
        <div>
          <ReadingRow icon={CloudRainIcon} label="Rainfall" before="NORMAL (12 mm/hr)" after={`HIGH (${d.rainfall} mm/hr)`} active={active} />
          <ReadingRow icon={DropletIcon} label="Water Level" before="LOW (18%)" after={`HIGH (${d.waterLevel}%)`} active={active} />
          <ReadingRow icon={ZapIcon} label="Infrastructure" before="NORMAL" after={d.poleP102Electrical} active={active} />
          <ReadingRow icon={ShieldIcon} label="Route Risk" before="🟢 LOW (23/100)" after={`🔴 CRITICAL (${d.routeRiskScore}/100)`} active={active} />
        </div>
      </div>

      {/* Event sequence */}
      <div className="rounded-xl border border-navy-600 bg-navy-800 p-4">
        <h3 className="font-display font-semibold text-slate-200 tracking-wide text-sm mb-3">Simulation Sequence</h3>
        <div className="flex flex-col gap-2">
          {[
            { step: '1', label: 'Heavy Rain Event', sub: 'Rainfall spikes to 85mm/hr', done: active },
            { step: '2', label: 'Water Level Rises', sub: 'Ground sensors detect 72% saturation', done: active },
            { step: '3', label: 'Infrastructure Anomaly', sub: 'Pole P-102 reports 36° tilt', done: active },
            { step: '4', label: 'AI Risk Engine Activated', sub: 'Route risk calculated: 91/100', done: active },
            { step: '5', label: 'Safer Alternative Generated', sub: 'Route B — +14 min — Risk: LOW', done: active },
          ].map(item => (
            <div key={item.step} className={`flex items-start gap-3 ${item.done ? 'opacity-100' : 'opacity-40'}`}>
              <div className={`w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-xs font-bold mt-0.5 ${item.done ? 'bg-emerald-500 text-white' : 'bg-navy-600 text-slate-500'}`}>
                {item.done ? '✓' : item.step}
              </div>
              <div>
                <div className={`text-sm font-semibold ${item.done ? 'text-slate-200' : 'text-slate-500'}`}>{item.label}</div>
                <div className="text-xs text-slate-500">{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Individual events */}
      <div className="rounded-xl border border-navy-600 bg-navy-800 p-4">
        <h3 className="font-display font-semibold text-slate-200 tracking-wide text-sm mb-3">Demo Mode Events</h3>
        <p className="text-xs text-slate-500 mb-3">Trigger individual events for demo purposes</p>
        <div className="grid grid-cols-2 gap-2">
          {events.map(ev => (
            <button
              key={ev.id}
              onClick={() => { if (!active) { onSimulate() } }}
              className={`flex flex-col items-center gap-1 p-3 rounded-lg border text-center transition-all ${active ? ev.bg : 'bg-navy-700 border-navy-500 hover:bg-navy-600'}`}
            >
              <ev.icon className={active ? ev.color : 'text-slate-500'} size={18} />
              <span className="text-xs font-semibold font-display">{ev.label}</span>
              <span className={`text-xs ${active ? 'text-slate-400' : 'text-slate-600'}`}>{ev.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Actions after simulation */}
      {active && (
        <div className="flex flex-col gap-2 animate-slide-in-up">
          <button
            onClick={() => setScreen('map')}
            className="flex items-center justify-center gap-2 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-display font-semibold text-sm tracking-wide transition-all"
          >
            <ShieldIcon size={16} />
            View Safer Alternative Route
          </button>
          <button
            onClick={() => setScreen('ai')}
            className="flex items-center justify-center gap-2 py-3 bg-navy-700 border border-navy-500 hover:bg-navy-600 text-slate-300 rounded-xl font-display font-semibold text-sm tracking-wide transition-all"
          >
            View AI Risk Analysis
            <ArrowRightIcon size={15} />
          </button>
        </div>
      )}

    </div>
  )
}
