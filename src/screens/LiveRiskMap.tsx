import { type Screen, type SimulationData } from '../types'
import { AlertTriangleIcon, ShieldIcon, ArrowRightIcon, LocationIcon, NavigationIcon } from '../components/icons'
import RouteMap from '../components/RouteMap'

interface LiveRiskMapProps {
  disasterData: SimulationData
  routeAnalyzed: boolean
  saferRouteSelected: boolean
  setScreen: (s: Screen) => void
  onUseSaferRoute: () => void
  onSegmentClick: () => void
}

export default function LiveRiskMap({
  disasterData,
  routeAnalyzed,
  saferRouteSelected,
  setScreen,
  onUseSaferRoute,
  onSegmentClick,
}: LiveRiskMapProps) {
  const d = disasterData

  return (
    <div className="flex flex-col h-full overflow-hidden">

      {/* Map header */}
      <div className="px-5 pt-5 pb-3 flex items-center justify-between shrink-0">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <LocationIcon className="text-blue-400" size={16} />
            <span className="text-xs font-semibold text-slate-400 tracking-widest uppercase font-display">Live Risk Map</span>
          </div>
          <h1 className="text-2xl font-display font-bold text-slate-100 tracking-wide">Vijayawada → Hyderabad</h1>
        </div>
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold font-display tracking-wider ${d.active ? 'bg-red-500/20 text-red-400 border border-red-500/35 animate-pulse-critical' : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25'}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${d.active ? 'bg-red-400' : 'bg-emerald-400'}`} />
          {d.active ? 'HAZARD ACTIVE' : 'MONITORING'}
        </div>
      </div>

      {/* Map area */}
      <div className="relative flex-1 mx-4 rounded-xl overflow-hidden border border-navy-600 bg-navy-950 min-h-0">
        <RouteMap
          disasterData={disasterData}
          saferRouteSelected={saferRouteSelected}
          routeAnalyzed={routeAnalyzed}
          onSegmentClick={onSegmentClick}
        />

        {/* Floating hazard card */}
        {d.active && !saferRouteSelected && (
          <div className="absolute top-4 right-4 w-60 glass-card rounded-xl p-4 animate-slide-in-right glow-critical">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangleIcon className="text-red-400 animate-pulse-critical" size={16} />
              <span className="font-display font-bold text-red-400 text-sm tracking-wide">HIGH-RISK AREA AHEAD</span>
            </div>
            <p className="text-xs text-slate-300 mb-1">
              Flood risk detected <strong className="text-red-300">~12.4 km</strong> ahead on NH Segment 14.
            </p>
            <p className="text-xs text-slate-400 mb-3">
              Recommended action: <strong className="text-yellow-300">Avoid current road</strong>
            </p>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Risk Level</span>
                <span className="text-red-400 font-bold font-display tracking-wider">CRITICAL</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Risk Score</span>
                <span className="font-mono-data text-red-400 font-bold">91/100</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Hazard</span>
                <span className="text-orange-300">Flood + Infra</span>
              </div>
            </div>
            <button
              onClick={onUseSaferRoute}
              className="mt-3 w-full flex items-center justify-center gap-1.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-display font-semibold tracking-wide transition-all"
            >
              <ShieldIcon size={13} />
              Use Safer Route
            </button>
          </div>
        )}

        {/* Safe route confirmed */}
        {saferRouteSelected && (
          <div className="absolute top-4 right-4 w-60 glass-card rounded-xl p-4 animate-slide-in-right glow-safe">
            <div className="flex items-center gap-2 mb-2">
              <ShieldIcon className="text-emerald-400" size={16} />
              <span className="font-display font-bold text-emerald-400 text-sm tracking-wide">SAFE ROUTE ACTIVE</span>
            </div>
            <p className="text-xs text-slate-300 mb-3">
              Route B selected. Hazard zone avoided. Additional travel time: <strong className="text-yellow-300">+14 min</strong>
            </p>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Risk Level</span>
                <span className="text-emerald-400 font-bold font-display tracking-wider">LOW</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Risk Score</span>
                <span className="font-mono-data text-emerald-400 font-bold">12/100</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Status</span>
                <span className="text-emerald-300">Hazard Bypassed ✓</span>
              </div>
            </div>
          </div>
        )}

        {/* Click hint on map */}
        {routeAnalyzed && d.active && !saferRouteSelected && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 glass-card rounded-full px-4 py-2 text-xs text-slate-400 animate-fade-in">
            Tap the <span className="text-red-400 font-semibold">red segment</span> for hazard details
          </div>
        )}
      </div>

      {/* Bottom action bar */}
      <div className="px-4 pt-3 pb-4 shrink-0">
        {!routeAnalyzed && (
          <button
            onClick={() => setScreen('route')}
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-display font-semibold text-sm tracking-wide transition-all"
          >
            <NavigationIcon size={16} />
            Plan a Route to See Risk Analysis
          </button>
        )}

        {routeAnalyzed && !d.active && (
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'Route Risk', value: '23/100', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
              { label: 'Segments', value: '6 total', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
              { label: 'Est. Time', value: '3h 45m', color: 'text-slate-300', bg: 'bg-navy-700 border-navy-600' },
            ].map(item => (
              <div key={item.label} className={`rounded-xl border p-3 text-center ${item.bg}`}>
                <div className="text-xs text-slate-500 mb-0.5">{item.label}</div>
                <div className={`font-mono-data text-sm font-bold ${item.color}`}>{item.value}</div>
              </div>
            ))}
          </div>
        )}

        {routeAnalyzed && d.active && !saferRouteSelected && (
          <div className="flex gap-2">
            <button
              onClick={onSegmentClick}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-navy-700 border border-navy-500 hover:bg-navy-600 text-slate-300 rounded-xl font-display font-semibold text-sm tracking-wide transition-all"
            >
              <AlertTriangleIcon size={15} className="text-red-400" />
              Hazard Details
            </button>
            <button
              onClick={onUseSaferRoute}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-display font-semibold text-sm tracking-wide transition-all"
            >
              <ShieldIcon size={15} />
              Use Safer Route
            </button>
          </div>
        )}

        {saferRouteSelected && (
          <div className="flex items-center justify-between px-5 py-3.5 bg-emerald-600/15 border border-emerald-500/30 rounded-xl">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                <ShieldIcon className="text-emerald-400" size={16} />
              </div>
              <div>
                <div className="text-xs font-bold text-emerald-400 font-display tracking-wide">SAFE ROUTE CONFIRMED</div>
                <div className="text-xs text-slate-400">Route B — Hazard avoided</div>
              </div>
            </div>
            <ArrowRightIcon className="text-emerald-400" size={16} />
          </div>
        )}
      </div>

    </div>
  )
}
