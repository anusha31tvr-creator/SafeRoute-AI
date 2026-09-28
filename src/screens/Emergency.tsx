import { type Screen, type SimulationData } from '../types'
import { AlertTriangleIcon, ShieldIcon, LocationIcon, PhoneIcon, NavigationIcon, ArrowRightIcon } from '../components/icons'

interface EmergencyProps {
  disasterData: SimulationData
  setScreen: (s: Screen) => void
  onUseSaferRoute: () => void
}

export default function Emergency({ disasterData, setScreen, onUseSaferRoute }: EmergencyProps) {
  const d = disasterData
  const isActive = d.active

  if (!isActive) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center gap-6">
        <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
          <ShieldIcon className="text-emerald-400" size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-100 tracking-wide mb-2">No Active Hazard</h1>
          <p className="text-sm text-slate-400 leading-relaxed">
            No emergency situations are currently active on your route. The emergency screen will activate when a critical hazard is detected.
          </p>
        </div>
        <div className="w-full px-4 py-3 bg-emerald-500/10 border border-emerald-500/25 rounded-xl">
          <div className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm font-semibold text-emerald-400 font-display tracking-wide">All Clear — Route Safe</span>
          </div>
        </div>
        <button
          onClick={() => setScreen('simulation')}
          className="flex items-center gap-2 px-5 py-3 bg-navy-700 border border-navy-500 text-slate-300 rounded-xl font-display font-semibold text-sm tracking-wide hover:bg-navy-600 transition-all"
        >
          <span>🌊</span> Simulate Emergency Event
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto">

      {/* Critical alert header */}
      <div className="bg-red-950/80 border-b border-red-500/40 px-5 pt-5 pb-5 glow-critical">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangleIcon className="text-red-400 animate-pulse-critical" size={22} />
          <span className="font-display font-black text-red-400 text-lg tracking-widest">🚨 CRITICAL HAZARD</span>
        </div>
        <p className="text-slate-300 text-sm mb-4 leading-relaxed">
          You are approaching a high-risk area. Immediate action required.
        </p>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-red-900/40 border border-red-500/30 rounded-lg p-3">
            <div className="text-xs text-slate-500 mb-0.5">Risk Level</div>
            <div className="font-display font-bold text-red-400 tracking-wider text-sm">CRITICAL</div>
          </div>
          <div className="bg-red-900/40 border border-red-500/30 rounded-lg p-3">
            <div className="text-xs text-slate-500 mb-0.5">Distance</div>
            <div className="font-mono-data font-bold text-red-300 text-sm">12.4 km</div>
          </div>
          <div className="bg-red-900/40 border border-red-500/30 col-span-2 rounded-lg p-3">
            <div className="text-xs text-slate-500 mb-0.5">Hazard Type</div>
            <div className="font-display font-bold text-orange-300 tracking-wide text-sm">Flood + Infrastructure Hazard</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 p-5">

        {/* Recommended action */}
        <div className="rounded-xl border border-red-500/30 bg-red-500/8 p-4">
          <h3 className="font-display font-bold text-red-300 tracking-wide text-sm mb-2 flex items-center gap-2">
            <AlertTriangleIcon size={15} className="text-red-400" />
            Recommended Action
          </h3>
          <p className="text-sm text-slate-200 font-semibold leading-relaxed">
            Do not enter the affected road segment.
          </p>
          <p className="text-xs text-slate-400 mt-1">
            NH Segment 14 has been flagged CRITICAL. A flood event is active. Stay on safe alternative routes.
          </p>
        </div>

        {/* Safe location */}
        <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/6 p-4">
          <h3 className="font-display font-semibold text-emerald-300 tracking-wide text-sm mb-3 flex items-center gap-2">
            <LocationIcon size={15} className="text-emerald-400" />
            Nearest Safe Location
          </h3>
          <div className="flex items-center gap-3 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-xl shrink-0">
              🏥
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-emerald-300">Community Emergency Shelter</div>
              <div className="text-xs text-slate-400 mt-0.5">2.8 km from your current position</div>
              <div className="text-xs text-emerald-500 mt-0.5">Via safe alternate route — Est. 6 min</div>
            </div>
          </div>

          <div className="mt-2 flex items-center gap-2 p-2.5 bg-navy-800 border border-navy-600 rounded-lg">
            <span className="text-base">🏫</span>
            <div className="flex-1">
              <div className="text-xs font-semibold text-slate-300">Nalgonda Government School</div>
              <div className="text-xs text-slate-500">4.1 km — Designated evacuation point</div>
            </div>
          </div>
        </div>

        {/* Primary action: Navigate to safety */}
        <button
          onClick={() => { onUseSaferRoute(); setScreen('map') }}
          className="flex items-center justify-center gap-2.5 px-5 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-display font-bold text-base tracking-wide transition-all active:scale-[0.98] shadow-lg shadow-emerald-900/30"
        >
          <NavigationIcon size={18} />
          Navigate to Safety
        </button>

        {/* Emergency contacts */}
        <div className="rounded-xl border border-navy-600 bg-navy-800 p-4">
          <h3 className="font-display font-semibold text-slate-200 tracking-wide text-sm mb-3 flex items-center gap-2">
            <PhoneIcon size={15} className="text-slate-400" />
            Emergency Services
          </h3>
          <div className="flex flex-col gap-2">
            {[
              { label: 'National Emergency', number: '112', icon: '🚨', color: 'border-red-500/25 bg-red-500/8 text-red-300' },
              { label: 'Disaster Helpline', number: '108', icon: '🌊', color: 'border-orange-500/25 bg-orange-500/8 text-orange-300' },
              { label: 'Police Control', number: '100', icon: '👮', color: 'border-blue-500/20 bg-blue-500/6 text-blue-300' },
            ].map(contact => (
              <div
                key={contact.label}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${contact.color}`}
              >
                <span className="text-base">{contact.icon}</span>
                <div className="flex-1">
                  <div className="text-xs text-slate-400">{contact.label}</div>
                  <div className="font-mono-data font-bold text-base">{contact.number}</div>
                </div>
                <button className="flex items-center gap-1 px-3 py-1.5 bg-white/8 border border-white/10 rounded-lg text-xs font-semibold text-slate-300 hover:bg-white/12 transition-all">
                  <PhoneIcon size={12} />
                  Call
                </button>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-600 mt-3 text-center">
            * Numbers shown are standard Indian emergency numbers. This is a prototype.
          </p>
        </div>

        {/* Evacuation guidance */}
        <div className="rounded-xl border border-navy-600 bg-navy-800 p-4">
          <h3 className="font-display font-semibold text-slate-200 tracking-wide text-sm mb-3">Evacuation Guidance</h3>
          <div className="flex flex-col gap-2">
            {[
              'Turn around — do not drive through flooded roads',
              'Move to higher ground immediately if water is rising',
              'Keep emergency kit accessible (water, documents, torch)',
              'Stay tuned to official emergency broadcasts',
              'Do not walk through moving water',
            ].map((tip, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-slate-500 text-xs mt-0.5">•</span>
                <span className="text-xs text-slate-400">{tip}</span>
              </div>
            ))}
          </div>
        </div>

        {/* View full map */}
        <button
          onClick={() => setScreen('map')}
          className="flex items-center justify-center gap-2 py-3 bg-navy-700 border border-navy-500 hover:bg-navy-600 text-slate-300 rounded-xl font-display font-semibold text-sm tracking-wide transition-all"
        >
          View Hazard Map
          <ArrowRightIcon size={15} />
        </button>

      </div>
    </div>
  )
}
