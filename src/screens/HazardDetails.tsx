import { type Screen, type SimulationData } from '../types'
import { AlertTriangleIcon, ShieldIcon, ArrowRightIcon, XIcon } from '../components/icons'

interface HazardDetailsProps {
  disasterData: SimulationData
  onClose: () => void
  onUseSaferRoute: () => void
  setScreen: (s: Screen) => void
}

function FactorRow({ icon, label, value, severity }: { icon: string; label: string; value: string; severity: 'low' | 'medium' | 'high' | 'critical' }) {
  const colors = {
    low: 'text-emerald-400',
    medium: 'text-yellow-400',
    high: 'text-orange-400',
    critical: 'text-red-400',
  }
  return (
    <div className="flex items-center gap-3 py-3 border-b border-navy-600 last:border-0">
      <span className="text-lg">{icon}</span>
      <div className="flex-1">
        <div className="text-xs text-slate-400">{label}</div>
        <div className={`text-sm font-semibold ${colors[severity]} font-display tracking-wide`}>{value}</div>
      </div>
      <div className={`w-2 h-2 rounded-full ${severity === 'critical' ? 'bg-red-400' : severity === 'high' ? 'bg-orange-400' : severity === 'medium' ? 'bg-yellow-400' : 'bg-emerald-400'}`} />
    </div>
  )
}

export default function HazardDetails({ disasterData, onClose, onUseSaferRoute, setScreen }: HazardDetailsProps) {
  const d = disasterData

  return (
    <div className="flex flex-col gap-0 h-full overflow-y-auto">

      {/* Critical header */}
      <div className="bg-red-950/60 border-b border-red-500/30 px-5 pt-5 pb-4 shrink-0">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <AlertTriangleIcon className="text-red-400 animate-pulse-critical" size={20} />
            <span className="font-display font-bold text-red-400 tracking-wide text-sm uppercase">Critical Hazard</span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-navy-700 border border-navy-500 flex items-center justify-center hover:bg-navy-600 transition-colors"
          >
            <XIcon size={14} className="text-slate-400" />
          </button>
        </div>
        <h1 className="text-2xl font-display font-bold text-slate-100 tracking-wide leading-none">
          Critical Hazard<br />Detected
        </h1>
        <p className="text-sm text-slate-400 mt-1">NH Road Segment 14 — Flood + Electrical Infrastructure</p>
      </div>

      <div className="flex flex-col gap-5 p-5">

        {/* Risk score */}
        <div className="rounded-xl border border-red-500/25 bg-red-500/8 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-xs text-slate-400 tracking-wider uppercase font-display mb-1">Overall Risk Score</div>
              <div className="text-5xl font-display font-black text-red-400 leading-none">91</div>
              <div className="text-sm text-slate-400 mt-0.5">out of 100</div>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-500/25 text-red-400 border border-red-500/40 rounded-full font-display font-bold text-sm tracking-widest">
                CRITICAL
              </div>
              <div className="text-xs text-slate-500 mt-2">Confidence: 91%</div>
              <div className="text-xs text-slate-500">Distance: 12.4 km</div>
            </div>
          </div>
          {/* Risk meter */}
          <div className="h-3 bg-navy-700 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full risk-meter-bar"
              style={{ width: '91%', background: 'linear-gradient(90deg, #f97316 0%, #ef4444 70%, #dc2626 100%)' }}
            />
          </div>
          <div className="flex justify-between mt-1.5 text-xs text-slate-600">
            <span>0</span>
            <span>25</span>
            <span>50</span>
            <span>75</span>
            <span className="text-red-500 font-bold">91</span>
          </div>
        </div>

        {/* Hazard summary */}
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: 'Hazard Type', value: 'Flood + Electrical' },
            { label: 'Risk Level', value: 'CRITICAL' },
            { label: 'Distance', value: '12.4 km ahead' },
            { label: 'Detected', value: 'Recently' },
          ].map(item => (
            <div key={item.label} className="bg-navy-800 border border-navy-600 rounded-lg p-3">
              <div className="text-xs text-slate-500 mb-0.5">{item.label}</div>
              <div className="text-sm font-semibold text-slate-200 font-display">{item.value}</div>
            </div>
          ))}
        </div>

        {/* Contributing factors */}
        <div className="rounded-xl border border-navy-600 bg-navy-800 p-4">
          <h3 className="font-display font-semibold text-slate-200 tracking-wide text-sm mb-1">Contributing Factors</h3>
          <p className="text-xs text-slate-500 mb-3">Signals that triggered this hazard alert:</p>
          <div>
            <FactorRow icon="🌧" label="Rainfall intensity" value={`${d.rainfall} mm/hr — EXTREME`} severity="critical" />
            <FactorRow icon="💧" label="Water level" value={`${d.waterLevel}% — CRITICAL HIGH`} severity="critical" />
            <FactorRow icon="⚡" label="Infrastructure status" value="Pole P-102 — ABNORMAL TILT" severity="critical" />
            <FactorRow icon="🌊" label="Flood forecast" value={`${d.floodProbability}% probability (6h)`} severity="high" />
            <FactorRow icon="📡" label="Sensor alerts" value="3 IoT nodes triggered" severity="high" />
          </div>
        </div>

        {/* AI explanation */}
        <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
          <h3 className="font-display font-semibold text-blue-300 tracking-wide text-sm mb-2 flex items-center gap-2">
            <span className="text-base">🤖</span>
            Why is this road risky?
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Multiple environmental and infrastructure signals indicate an elevated risk on this road segment. Heavy rainfall combined with rising water levels creates active flood conditions. Additionally, infrastructure sensor P-102 reports an abnormal tilt of 36°, suggesting structural instability near the roadway.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => { onUseSaferRoute(); setScreen('map') }}
            className="flex items-center justify-center gap-2 px-5 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-display font-semibold text-base tracking-wide transition-all active:scale-[0.98]"
          >
            <ShieldIcon size={18} />
            View Safer Route
          </button>
          <button
            onClick={() => setScreen('ai')}
            className="flex items-center justify-center gap-2 px-5 py-3 bg-navy-700 border border-navy-500 hover:bg-navy-600 text-slate-300 rounded-xl font-display font-semibold text-sm tracking-wide transition-all"
          >
            Full AI Risk Analysis
            <ArrowRightIcon size={15} />
          </button>
        </div>

      </div>
    </div>
  )
}
