import { useEffect, useState } from 'react'
import { type Screen, type SimulationData } from '../types'
import { BrainIcon, CheckCircleIcon, ShieldIcon, ArrowRightIcon, ActivityIcon } from '../components/icons'

interface AIRiskAnalysisProps {
  disasterData: SimulationData
  setScreen: (s: Screen) => void
  onUseSaferRoute: () => void
}

const ANALYSIS_STEPS = [
  { label: 'Weather data received', detail: 'Rainfall: 85mm/hr, Thunderstorm active' },
  { label: 'Flood information received', detail: 'Water level: 72%, Rising rapidly' },
  { label: 'Infrastructure data received', detail: 'Pole P-102: 36° tilt — Abnormal' },
  { label: 'Hazard reports analyzed', detail: '3 sensor alerts on Segment 14' },
  { label: 'Route risk calculated', detail: 'Risk score: 91/100 — CRITICAL' },
]

export default function AIRiskAnalysis({ disasterData, setScreen, onUseSaferRoute }: AIRiskAnalysisProps) {
  const d = disasterData
  const [step, setStep] = useState(0)
  const [running, setRunning] = useState(false)
  const [complete, setComplete] = useState(d.active)

  useEffect(() => {
    if (d.active && !complete) {
      setRunning(true)
      setStep(0)
    }
  }, [d.active])

  useEffect(() => {
    if (!running) return
    if (step >= ANALYSIS_STEPS.length) {
      setRunning(false)
      setComplete(true)
      return
    }
    const t = setTimeout(() => setStep(s => s + 1), 600)
    return () => clearTimeout(t)
  }, [step, running])

  function runAnalysis() {
    setComplete(false)
    setStep(0)
    setRunning(true)
  }

  const riskScore = d.routeRiskScore
  const riskLevel = d.active ? 'CRITICAL' : 'LOW'
  const riskColor = d.active ? 'text-red-400' : 'text-emerald-400'
  const meterColor = d.active
    ? 'from-orange-500 via-red-500 to-red-600'
    : 'from-emerald-500 to-emerald-400'

  return (
    <div className="flex flex-col gap-5 p-5 overflow-y-auto h-full">

      {/* Header */}
      <div className="animate-slide-in-up">
        <div className="flex items-center gap-2 mb-1">
          <BrainIcon className="text-blue-400" size={18} />
          <span className="text-xs font-semibold text-slate-400 tracking-widest uppercase font-display">AI Engine</span>
        </div>
        <h1 className="text-3xl font-display font-bold text-slate-100 tracking-wide">AI Risk Analysis</h1>
        <p className="text-sm text-slate-400 mt-0.5">Multi-factor route risk modeling and hazard intelligence</p>
      </div>

      {/* Run analysis button */}
      {!running && (
        <button
          onClick={runAnalysis}
          className="flex items-center justify-center gap-2 px-5 py-3 bg-blue-600/20 border border-blue-500/30 hover:bg-blue-600/30 text-blue-300 rounded-xl font-display font-semibold text-sm tracking-wide transition-all"
        >
          <ActivityIcon size={15} />
          {complete ? 'Re-run Analysis' : 'Run AI Analysis'}
        </button>
      )}

      {/* Analysis steps */}
      <div className={`rounded-xl border p-5 ${running || complete ? 'border-blue-500/25 bg-blue-500/5' : 'border-navy-600 bg-navy-800'}`}>
        <h2 className="font-display font-semibold text-slate-200 tracking-wide text-sm mb-4 flex items-center gap-2">
          {running && <div className="w-3.5 h-3.5 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />}
          {complete && !running && <CheckCircleIcon className="text-emerald-400" size={16} />}
          {!running && !complete && <BrainIcon className="text-slate-500" size={16} />}
          Analysis Process
        </h2>
        <div className="flex flex-col gap-3">
          {ANALYSIS_STEPS.map((s, i) => {
            const done = complete ? true : i < step
            const active = !complete && i === step - 1 && running
            return (
              <div key={i} className={`flex items-start gap-3 transition-all duration-300 ${done || active ? 'opacity-100' : 'opacity-30'}`}>
                <div className={`w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-xs font-bold mt-0.5 transition-all ${done ? 'bg-emerald-500 text-white' : active ? 'bg-blue-500 text-white' : 'bg-navy-600 text-slate-500'}`}>
                  {done ? '✓' : i + 1}
                </div>
                <div className="flex-1">
                  <div className={`text-sm font-semibold ${done || active ? 'text-slate-200' : 'text-slate-600'}`}>
                    {s.label} {done && <span className="text-slate-500 font-normal">✓</span>}
                  </div>
                  {done && (
                    <div className="text-xs text-slate-500 mt-0.5 animate-fade-in">{s.detail}</div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Risk score result */}
      {complete && (
        <div className={`rounded-xl border p-5 animate-slide-in-up ${d.active ? 'border-red-500/30 bg-red-500/8' : 'border-emerald-500/25 bg-emerald-500/5'}`}>
          <h2 className="font-display font-semibold text-slate-200 tracking-wide text-sm mb-4">Overall Route Risk</h2>

          <div className="flex items-end gap-4 mb-4">
            <div className={`text-6xl font-display font-black leading-none ${riskColor}`}>{riskScore}</div>
            <div className="pb-1">
              <div className="text-slate-400 text-sm">/ 100</div>
              <div className={`font-display font-bold tracking-widest text-sm mt-0.5 ${riskColor}`}>{riskLevel}</div>
            </div>
          </div>

          {/* Meter */}
          <div className="h-4 bg-navy-700 rounded-full overflow-hidden mb-3">
            <div
              className={`h-full rounded-full risk-meter-bar bg-gradient-to-r ${meterColor}`}
              style={{ width: `${riskScore}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-slate-600 font-mono-data">
            {[0, 25, 50, 75, 100].map(v => <span key={v}>{v}</span>)}
          </div>
        </div>
      )}

      {/* AI explanation */}
      {complete && (
        <div className="rounded-xl border border-navy-600 bg-navy-800 p-4 animate-slide-in-up">
          <h3 className="font-display font-semibold text-slate-200 tracking-wide text-sm mb-2 flex items-center gap-2">
            <span>🤖</span> AI Explanation
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            {d.active
              ? 'High rainfall intensity (85mm/hr) and rapidly rising water levels (72%) combined with an infrastructure anomaly at Pole P-102 significantly increase the risk of the selected route through Segment 14. The AI model assigns a 91% confidence score to a flood event in the next 6 hours.'
              : 'No significant hazards detected on the Vijayawada → Hyderabad corridor. Weather conditions are within normal parameters. Infrastructure sensors report nominal readings. Route is assessed as low risk.'}
          </p>
        </div>
      )}

      {/* Recommendation */}
      {complete && d.active && (
        <div className="rounded-xl border border-orange-500/25 bg-orange-500/6 p-4 animate-slide-in-up">
          <h3 className="font-display font-semibold text-orange-300 tracking-wide text-sm mb-3">Recommended Action</h3>
          <div className="flex flex-col gap-2 mb-4">
            <div className="flex items-center gap-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <span className="text-red-400 text-lg">⛔</span>
              <div>
                <div className="text-sm font-semibold text-red-300">Avoid Road Segment 14</div>
                <div className="text-xs text-slate-400">Flood + infrastructure hazard — Critical risk</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
              <span className="text-emerald-400 text-lg">✅</span>
              <div>
                <div className="text-sm font-semibold text-emerald-300">Use Alternative Route B</div>
                <div className="text-xs text-slate-400">+14 minutes additional travel time — Risk: LOW</div>
              </div>
            </div>
          </div>
          <button
            onClick={() => { onUseSaferRoute(); setScreen('map') }}
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-display font-semibold text-sm tracking-wide transition-all active:scale-[0.98]"
          >
            <ShieldIcon size={16} />
            View Alternative Route
          </button>
        </div>
      )}

      {/* Risk factors breakdown */}
      {complete && (
        <div className="rounded-xl border border-navy-600 bg-navy-800 p-4 animate-slide-in-up">
          <h3 className="font-display font-semibold text-slate-200 tracking-wide text-sm mb-3">Risk Factor Breakdown</h3>
          <div className="flex flex-col gap-2.5">
            {[
              { factor: 'Weather Conditions', score: d.active ? 78 : 15, color: d.active ? '#ef4444' : '#22c55e' },
              { factor: 'Flood Risk', score: d.active ? 85 : 10, color: d.active ? '#ef4444' : '#22c55e' },
              { factor: 'Infrastructure Health', score: d.active ? 92 : 8, color: d.active ? '#ef4444' : '#22c55e' },
              { factor: 'Road Condition', score: d.active ? 70 : 20, color: d.active ? '#f97316' : '#22c55e' },
              { factor: 'Historical Incidents', score: 35, color: '#eab308' },
            ].map(item => (
              <div key={item.factor} className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">{item.factor}</span>
                  <span className="font-mono-data text-xs font-semibold" style={{ color: item.color }}>{item.score}</span>
                </div>
                <div className="h-1.5 bg-navy-600 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-700" style={{ width: `${item.score}%`, backgroundColor: item.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}
