import { type SimulationData } from '../types'
import { TowerIcon, AlertTriangleIcon, ZapIcon, DropletIcon, InfoIcon } from '../components/icons'

interface InfrastructureMonitorProps {
  disasterData: SimulationData
}

interface SensorNode {
  id: string
  location: string
  tilt: number
  water: string
  electrical: string
  status: 'SAFE' | 'CAUTION' | 'CRITICAL'
  affectedRoad?: string
}

function StatusBadge({ status }: { status: 'SAFE' | 'CAUTION' | 'CRITICAL' | 'NORMAL' | 'LOW' | 'HIGH' | 'MODERATE' | 'ABNORMAL' }) {
  const map: Record<string, string> = {
    SAFE: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    NORMAL: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    LOW: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    CAUTION: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
    MODERATE: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
    HIGH: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
    CRITICAL: 'bg-red-500/20 text-red-400 border-red-500/40',
    ABNORMAL: 'bg-red-500/20 text-red-400 border-red-500/40',
  }
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold font-display tracking-wider border ${map[status] ?? map.CAUTION}`}>
      {status}
    </span>
  )
}

function TiltBar({ degrees, max = 45 }: { degrees: number; max?: number }) {
  const pct = Math.min((degrees / max) * 100, 100)
  const color = degrees >= 20 ? '#ef4444' : degrees >= 10 ? '#f97316' : degrees >= 5 ? '#eab308' : '#22c55e'
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-navy-600 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
      <span className="font-mono-data text-xs text-slate-300 w-8 text-right">{degrees}°</span>
    </div>
  )
}

function NodeCard({ node, disaster }: { node: SensorNode; disaster: boolean }) {
  const isCritical = node.status === 'CRITICAL'
  return (
    <div className={`rounded-xl border p-4 transition-all duration-500 ${isCritical ? 'border-red-500/35 bg-red-500/5 glow-critical' : node.status === 'CAUTION' ? 'border-yellow-500/25 bg-yellow-500/5' : 'border-navy-600 bg-navy-800'}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${isCritical ? 'bg-red-500/20' : 'bg-navy-600'}`}>
              <TowerIcon className={isCritical ? 'text-red-400' : 'text-slate-400'} size={14} />
            </div>
            <div>
              <div className="font-display font-bold text-slate-200 text-sm tracking-wide">{node.id}</div>
              <div className="text-xs text-slate-500">{node.location}</div>
            </div>
          </div>
        </div>
        <StatusBadge status={node.status} />
      </div>

      {/* Metrics */}
      <div className="flex flex-col gap-2.5">
        <div>
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 text-xs">⟳</span>
              <span className="text-xs text-slate-400">Structural Tilt</span>
            </div>
            <StatusBadge status={node.tilt >= 20 ? 'CRITICAL' : node.tilt >= 10 ? 'CAUTION' : 'NORMAL'} />
          </div>
          <TiltBar degrees={node.tilt} />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <DropletIcon className="text-slate-500" size={12} />
            <span className="text-xs text-slate-400">Water Exposure</span>
          </div>
          <StatusBadge status={node.water as any} />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <ZapIcon className="text-slate-500" size={12} />
            <span className="text-xs text-slate-400">Electrical Status</span>
          </div>
          <StatusBadge status={node.electrical as any} />
        </div>
      </div>

      {/* Affected road indicator */}
      {node.affectedRoad && isCritical && (
        <div className="mt-3 pt-3 border-t border-red-500/20">
          <div className="flex items-center gap-1.5">
            <AlertTriangleIcon className="text-red-400" size={12} />
            <span className="text-xs text-red-400 font-semibold">
              Affects: {node.affectedRoad}
            </span>
          </div>
        </div>
      )}

      {/* Live indicator */}
      <div className="mt-3 pt-3 border-t border-navy-600 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${isCritical ? 'bg-red-400 animate-pulse-critical' : 'bg-emerald-400 animate-pulse'}`} />
          <span className="text-xs text-slate-600">Simulated IoT Data</span>
        </div>
        <span className="text-xs text-slate-600">Updated: now</span>
      </div>
    </div>
  )
}

export default function InfrastructureMonitor({ disasterData }: InfrastructureMonitorProps) {
  const d = disasterData
  const disaster = d.active

  const nodes: SensorNode[] = [
    {
      id: 'Pole P-101',
      location: 'Vijayawada Sector A',
      tilt: 2,
      water: 'LOW',
      electrical: 'NORMAL',
      status: 'SAFE',
    },
    {
      id: 'Pole P-102',
      location: 'NH Seg 14 — Hazard Zone',
      tilt: disaster ? d.poleP102Tilt : 5,
      water: disaster ? d.poleP102Water : 'LOW',
      electrical: disaster ? d.poleP102Electrical : 'NORMAL',
      status: disaster ? 'CRITICAL' : 'CAUTION',
      affectedRoad: 'Road Segment 14',
    },
    {
      id: 'Pole P-103',
      location: 'Nalgonda Junction',
      tilt: 5,
      water: 'LOW',
      electrical: 'NORMAL',
      status: 'SAFE',
    },
    {
      id: 'Pole P-104',
      location: 'Bhongir Bypass',
      tilt: 8,
      water: 'MODERATE',
      electrical: 'NORMAL',
      status: 'CAUTION',
    },
    {
      id: 'Bridge S-11',
      location: 'Krishna River Crossing',
      tilt: disaster ? 14 : 3,
      water: disaster ? 'HIGH' : 'LOW',
      electrical: 'NORMAL',
      status: disaster ? 'CRITICAL' : 'SAFE',
      affectedRoad: disaster ? 'River Crossing Segment' : undefined,
    },
    {
      id: 'Pole P-105',
      location: 'Yadagirigutta',
      tilt: 4,
      water: 'LOW',
      electrical: 'NORMAL',
      status: 'SAFE',
    },
  ]

  const criticalCount = nodes.filter(n => n.status === 'CRITICAL').length
  const cautionCount = nodes.filter(n => n.status === 'CAUTION').length
  const safeCount = nodes.filter(n => n.status === 'SAFE').length

  return (
    <div className="flex flex-col gap-5 p-5 overflow-y-auto h-full">

      {/* Header */}
      <div className="animate-slide-in-up">
        <div className="flex items-center gap-2 mb-1">
          <TowerIcon className="text-blue-400" size={18} />
          <span className="text-xs font-semibold text-slate-400 tracking-widest uppercase font-display">Infrastructure Monitor</span>
        </div>
        <h1 className="text-3xl font-display font-bold text-slate-100 tracking-wide">Infrastructure Monitor</h1>
        <p className="text-sm text-slate-400 mt-0.5">Prototype IoT / Network Monitoring</p>
      </div>

      {/* Simulated data banner */}
      <div className="rounded-xl border border-yellow-500/25 bg-yellow-500/6 px-4 py-3 flex items-start gap-3">
        <InfoIcon className="text-yellow-400 shrink-0 mt-0.5" size={16} />
        <div>
          <div className="text-xs font-bold text-yellow-400 font-display tracking-wide mb-0.5">SIMULATED SENSOR DATA</div>
          <p className="text-xs text-slate-400 leading-relaxed">
            In a real deployment, these values would be received from IoT sensors and utility infrastructure telemetry systems. Current readings are prototype-generated.
          </p>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-2">
        <div className="rounded-xl border border-red-500/25 bg-red-500/8 p-3 text-center">
          <div className="text-2xl font-display font-black text-red-400">{criticalCount}</div>
          <div className="text-xs text-slate-400 mt-0.5">Critical</div>
        </div>
        <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/6 p-3 text-center">
          <div className="text-2xl font-display font-black text-yellow-400">{cautionCount}</div>
          <div className="text-xs text-slate-400 mt-0.5">Caution</div>
        </div>
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/6 p-3 text-center">
          <div className="text-2xl font-display font-black text-emerald-400">{safeCount}</div>
          <div className="text-xs text-slate-400 mt-0.5">Safe</div>
        </div>
      </div>

      {/* Node grid */}
      <div className="grid grid-cols-1 gap-3">
        {nodes.map(node => (
          <NodeCard key={node.id} node={node} disaster={disaster} />
        ))}
      </div>

      {/* Info box */}
      <div className="rounded-xl border border-navy-600 bg-navy-800 p-4">
        <h3 className="font-display font-semibold text-slate-300 text-sm tracking-wide mb-2">About This Module</h3>
        <p className="text-xs text-slate-400 leading-relaxed">
          This infrastructure monitoring system tracks the health of electrical poles, bridges, and road-adjacent structures. Tilt sensors detect structural shifts caused by flooding or ground instability. Elevated tilt readings above 15° trigger automatic hazard alerts and route warnings.
        </p>
      </div>

    </div>
  )
}
