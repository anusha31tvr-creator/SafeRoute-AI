import { useState, useEffect } from 'react'
import { type Screen } from '../types'
import { NavigationIcon, LocationIcon, ArrowRightIcon, ActivityIcon } from '../components/icons'

interface RoutePlannerProps {
  routeAnalyzed: boolean
  routeAnalyzing: boolean
  analyzeStep: number
  setScreen: (s: Screen) => void
  onAnalyze: () => void
}

const ANALYSIS_STEPS = [
  'Connecting to weather data sources…',
  'Fetching flood risk information…',
  'Analyzing infrastructure anomalies…',
  'Processing hazard reports…',
  'Calculating route risk score…',
]

export default function RoutePlanner({
  routeAnalyzed,
  routeAnalyzing,
  analyzeStep,
  setScreen,
  onAnalyze,
}: RoutePlannerProps) {
  const [from, setFrom] = useState('Vijayawada')
  const [to, setTo] = useState('Hyderabad')

  return (
    <div className="flex flex-col gap-6 p-6 overflow-y-auto h-full">

      {/* Header */}
      <div className="animate-slide-in-up">
        <div className="flex items-center gap-2 mb-2">
          <NavigationIcon className="text-blue-400" size={18} />
          <span className="text-xs font-semibold text-slate-400 tracking-widest uppercase font-display">Route Planner</span>
        </div>
        <h1 className="text-3xl font-display font-bold text-slate-100 tracking-wide">Safe Route</h1>
        <p className="text-sm text-slate-400 mt-1">AI-powered route safety analysis with real-time hazard detection</p>
      </div>

      {/* Route form */}
      <div className="rounded-xl border border-navy-600 bg-navy-800 p-5 flex flex-col gap-4 animate-slide-in-up">
        <h2 className="font-display font-semibold text-slate-200 tracking-wide text-base">Plan Your Journey</h2>

        {/* From */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-400 tracking-wider uppercase">Origin</label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500 ring-2 ring-blue-500/30" />
            </div>
            <input
              value={from}
              onChange={e => setFrom(e.target.value)}
              className="w-full bg-navy-700 border border-navy-500 rounded-lg px-3 py-3 pl-8 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500/60 focus:bg-navy-600/50 transition-colors"
              placeholder="Enter starting location"
            />
          </div>
        </div>

        {/* Swap indicator */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-navy-600" />
          <div className="w-7 h-7 rounded-full border border-navy-500 bg-navy-700 flex items-center justify-center">
            <ArrowRightIcon className="text-slate-500 rotate-90" size={14} />
          </div>
          <div className="flex-1 h-px bg-navy-600" />
        </div>

        {/* To */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-400 tracking-wider uppercase">Destination</label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-emerald-500/30" />
            </div>
            <input
              value={to}
              onChange={e => setTo(e.target.value)}
              className="w-full bg-navy-700 border border-navy-500 rounded-lg px-3 py-3 pl-8 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500/60 focus:bg-navy-600/50 transition-colors"
              placeholder="Enter destination"
            />
          </div>
        </div>

        {/* Route options */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Safety First', icon: '🛡️', desc: 'Avoid all hazards' },
            { label: 'Balanced', icon: '⚖️', desc: 'Risk vs speed' },
            { label: 'Fastest', icon: '⚡', desc: 'Shortest time' },
          ].map((opt, i) => (
            <button
              key={i}
              className={`flex flex-col items-center gap-1 px-2 py-3 rounded-lg border text-center transition-all ${i === 0 ? 'border-blue-500/50 bg-blue-600/10 text-blue-400' : 'border-navy-500 bg-navy-700 text-slate-400 hover:border-navy-400'}`}
            >
              <span className="text-base">{opt.icon}</span>
              <span className="text-xs font-semibold font-display">{opt.label}</span>
              <span className="text-xs text-slate-500">{opt.desc}</span>
            </button>
          ))}
        </div>

        {/* Analyze button */}
        <button
          onClick={onAnalyze}
          disabled={routeAnalyzing}
          className={`flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-display font-semibold text-base tracking-wide transition-all duration-200 active:scale-[0.98] ${routeAnalyzing ? 'bg-blue-700/60 text-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/40'}`}
        >
          {routeAnalyzing ? (
            <>
              <div className="w-4 h-4 rounded-full border-2 border-blue-300 border-t-transparent animate-spin" />
              Analyzing Route…
            </>
          ) : routeAnalyzed ? (
            <>
              <ActivityIcon size={18} />
              Re-Analyze Route
            </>
          ) : (
            <>
              <NavigationIcon size={18} />
              Analyze Safe Route
            </>
          )}
        </button>
      </div>

      {/* Analysis progress */}
      {routeAnalyzing && (
        <div className="rounded-xl border border-blue-500/25 bg-blue-500/5 p-5 animate-slide-in-up">
          <h3 className="font-display font-semibold text-blue-300 tracking-wide mb-4 text-sm flex items-center gap-2">
            <div className="w-3 h-3 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />
            AI Analysis In Progress
          </h3>
          <div className="flex flex-col gap-2.5">
            {ANALYSIS_STEPS.map((step, i) => (
              <div key={i} className={`flex items-center gap-3 transition-all duration-300 ${i <= analyzeStep ? 'opacity-100' : 'opacity-30'}`}>
                <div className={`w-5 h-5 rounded-full shrink-0 flex items-center justify-center text-xs font-bold ${i < analyzeStep ? 'bg-emerald-500 text-white' : i === analyzeStep ? 'bg-blue-500 text-white' : 'bg-navy-600 text-slate-500'}`}>
                  {i < analyzeStep ? '✓' : i + 1}
                </div>
                <span className={`text-sm ${i <= analyzeStep ? 'text-slate-200' : 'text-slate-600'}`}>{step}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Completed analysis */}
      {routeAnalyzed && !routeAnalyzing && (
        <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/5 p-5 animate-slide-in-up">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-xs text-white font-bold">✓</div>
            <h3 className="font-display font-semibold text-emerald-300 tracking-wide text-sm">Analysis Complete</h3>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {[
              { label: 'Route Distance', value: '274 km' },
              { label: 'Est. Travel Time', value: '3h 45m' },
              { label: 'Hazard Zones', value: '1 detected' },
              { label: 'Risk Score', value: '91/100' },
            ].map(item => (
              <div key={item.label} className="bg-navy-800/60 rounded-lg p-3 border border-navy-600">
                <div className="text-xs text-slate-500">{item.label}</div>
                <div className="font-mono-data text-sm font-semibold text-slate-200 mt-0.5">{item.value}</div>
              </div>
            ))}
          </div>
          <button
            onClick={() => setScreen('map')}
            className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-display font-semibold text-sm tracking-wide transition-all duration-200 active:scale-[0.98]"
          >
            View Live Risk Map
            <ArrowRightIcon size={16} />
          </button>
        </div>
      )}

      {/* Info cards */}
      <div className="grid grid-cols-1 gap-3">
        <div className="rounded-xl border border-navy-600 bg-navy-800 p-4">
          <h3 className="font-display font-semibold text-slate-300 tracking-wide text-sm mb-2">What We Analyze</h3>
          <div className="grid grid-cols-2 gap-y-2 gap-x-4">
            {[
              '🌧 Live weather conditions',
              '💧 Flood risk levels',
              '⚡ Infrastructure status',
              '🚧 Road hazard reports',
              '📡 IoT sensor data',
              '🤖 AI risk modeling',
            ].map((item, i) => (
              <div key={i} className="text-xs text-slate-400">{item}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Prototype note */}
      <div className="flex items-start gap-2 px-4 py-3 rounded-lg border border-blue-500/15 bg-blue-500/5">
        <span className="text-blue-400 text-sm shrink-0">ℹ</span>
        <p className="text-xs text-slate-500 leading-relaxed">
          <strong className="text-slate-400">Prototype Mode:</strong> Route analysis uses simulated sensor data and AI modeling. In a real deployment, live feeds from IoT sensors and government systems would be integrated.
        </p>
      </div>

    </div>
  )
}
