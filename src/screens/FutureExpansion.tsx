import { RocketIcon, ArrowRightIcon, LayersIcon, ZapIcon } from '../components/icons'

interface ArchNode {
  label: string
  sub: string
  icon: string
  color: string
}

const ARCH_NODES: ArchNode[] = [
  { label: 'Weather APIs', sub: 'IMD, AccuWeather, ECMWF', icon: '🌧', color: 'border-blue-500/30 bg-blue-500/8 text-blue-400' },
  { label: 'Government Disaster Systems', sub: 'NDMA, State Emergency Ops', icon: '🏛', color: 'border-blue-500/30 bg-blue-500/8 text-blue-400' },
  { label: 'IoT Infrastructure Sensors', sub: 'Tilt, water, electrical telemetry', icon: '📡', color: 'border-yellow-500/25 bg-yellow-500/6 text-yellow-400' },
  { label: 'Utility Network Integration', sub: 'Power grid, telecom, roads', icon: '⚡', color: 'border-yellow-500/25 bg-yellow-500/6 text-yellow-400' },
  { label: 'AI Risk Engine', sub: 'SafeRoute ML v2 — multi-modal', icon: '🤖', color: 'border-purple-500/30 bg-purple-500/8 text-purple-400' },
  { label: 'SafeRoute AI Platform', sub: 'Core product — this prototype', icon: '🛡️', color: 'border-emerald-500/30 bg-emerald-500/8 text-emerald-400' },
  { label: 'Future Navigation Integration', sub: 'Navigation platform APIs', icon: '🗺', color: 'border-slate-500/25 bg-slate-500/6 text-slate-400' },
  { label: 'Vehicle Dashboard Integration', sub: 'OBD-II / CAN bus interfaces', icon: '🚗', color: 'border-slate-500/25 bg-slate-500/6 text-slate-400' },
]

const EXPANSION_ITEMS = [
  {
    phase: 'Phase 1',
    title: 'Real IoT Sensor Deployment',
    items: ['Deploy tilt + flood sensors on 100+ poles', 'MQTT gateway infrastructure', 'Edge computing for latency reduction', 'Solar-powered autonomous sensor nodes'],
    color: 'border-blue-500/25 bg-blue-500/5',
    accent: 'text-blue-400',
  },
  {
    phase: 'Phase 2',
    title: 'Government System Integration',
    items: ['NDMA API integration', 'State disaster operations center feeds', 'Real-time road closure data (NHAI)', 'Smart city infrastructure hookup'],
    color: 'border-emerald-500/20 bg-emerald-500/5',
    accent: 'text-emerald-400',
  },
  {
    phase: 'Phase 3',
    title: 'Navigation Platform Integration',
    items: ['Navigation app API partnership', 'Real-time route override API', 'Turn-by-turn hazard alerts', 'Fleet management system hooks'],
    color: 'border-purple-500/20 bg-purple-500/5',
    accent: 'text-purple-400',
  },
  {
    phase: 'Phase 4',
    title: 'Smart City Scale Deployment',
    items: ['City-wide sensor mesh network', 'Predictive flood modeling (72h)', 'Vehicle dashboard integration', 'Emergency vehicle priority routing'],
    color: 'border-orange-500/20 bg-orange-500/5',
    accent: 'text-orange-400',
  },
]

function ArchRow({ node, isLast }: { node: ArchNode; isLast: boolean }) {
  return (
    <div className="flex flex-col items-center">
      <div className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border ${node.color} transition-all`}>
        <span className="text-xl">{node.icon}</span>
        <div className="flex-1">
          <div className="font-display font-semibold tracking-wide text-sm">{node.label}</div>
          <div className="text-xs text-slate-500 mt-0.5">{node.sub}</div>
        </div>
      </div>
      {!isLast && (
        <div className="flex flex-col items-center py-1">
          <div className="w-px h-3 bg-navy-500" />
          <div className="text-navy-500 text-xs">▼</div>
        </div>
      )}
    </div>
  )
}

export default function FutureExpansion() {
  return (
    <div className="flex flex-col gap-5 p-5 overflow-y-auto h-full">

      {/* Header */}
      <div className="animate-slide-in-up">
        <div className="flex items-center gap-2 mb-1">
          <RocketIcon className="text-blue-400" size={18} />
          <span className="text-xs font-semibold text-slate-400 tracking-widest uppercase font-display">Roadmap</span>
        </div>
        <h1 className="text-3xl font-display font-bold text-slate-100 tracking-wide">Future Expansion</h1>
        <p className="text-sm text-slate-400 mt-0.5">Architecture vision and deployment roadmap</p>
      </div>

      {/* Vision */}
      <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
        <div className="flex items-start gap-3">
          <div className="text-2xl">🚀</div>
          <div>
            <h3 className="font-display font-semibold text-blue-300 tracking-wide text-sm mb-1">Our Vision</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              SafeRoute AI will evolve from this hackathon prototype into a fully operational, city-scale disaster-intelligent navigation platform — integrating real IoT infrastructure, government emergency systems, and mainstream navigation platforms.
            </p>
          </div>
        </div>
      </div>

      {/* Architecture diagram */}
      <div className="rounded-xl border border-navy-600 bg-navy-800 p-4">
        <h3 className="font-display font-semibold text-slate-200 tracking-wide text-sm mb-4 flex items-center gap-2">
          <LayersIcon size={15} className="text-slate-400" />
          System Architecture
        </h3>
        <div className="flex flex-col">
          {ARCH_NODES.map((node, i) => (
            <ArchRow key={node.label} node={node} isLast={i === ARCH_NODES.length - 1} />
          ))}
        </div>
      </div>

      {/* Expansion phases */}
      <div className="flex flex-col gap-3">
        <h3 className="font-display font-semibold text-slate-200 tracking-wide text-sm">Expansion Roadmap</h3>
        {EXPANSION_ITEMS.map(phase => (
          <div key={phase.phase} className={`rounded-xl border p-4 ${phase.color}`}>
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-xs font-bold font-display tracking-widest ${phase.accent}`}>{phase.phase}</span>
              <h4 className="font-display font-semibold text-slate-200 tracking-wide text-sm">{phase.title}</h4>
            </div>
            <div className="flex flex-col gap-1.5">
              {phase.items.map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <ArrowRightIcon className="text-slate-600 shrink-0 mt-0.5" size={12} />
                  <span className="text-xs text-slate-400">{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Impact potential */}
      <div className="rounded-xl border border-navy-600 bg-navy-800 p-4">
        <h3 className="font-display font-semibold text-slate-200 tracking-wide text-sm mb-3 flex items-center gap-2">
          <ZapIcon size={15} className="text-yellow-400" />
          Potential Impact
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { metric: '10M+', label: 'Road users protected', icon: '👥' },
            { metric: '500+', label: 'Monitored road segments', icon: '🛣️' },
            { metric: '15 min', label: 'Advance hazard warning', icon: '⏱️' },
            { metric: '94%', label: 'Route risk accuracy', icon: '🎯' },
          ].map(item => (
            <div key={item.label} className="bg-navy-700 border border-navy-600 rounded-xl p-3 text-center">
              <div className="text-lg mb-1">{item.icon}</div>
              <div className="font-display font-black text-xl text-blue-400">{item.metric}</div>
              <div className="text-xs text-slate-500 mt-0.5">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tech stack future */}
      <div className="rounded-xl border border-navy-600 bg-navy-800 p-4">
        <h3 className="font-display font-semibold text-slate-200 tracking-wide text-sm mb-3">Production Technology Stack</h3>
        <div className="grid grid-cols-2 gap-2">
          {[
            { layer: 'Sensors', tech: 'MQTT over 4G/LTE' },
            { layer: 'Edge', tech: 'ARM + Edge Inference' },
            { layer: 'Cloud', tech: 'Azure IoT Hub' },
            { layer: 'AI Model', tech: 'Azure ML + ONNX' },
            { layer: 'API', tech: 'GraphQL + WebSocket' },
            { layer: 'Navigation', tech: 'Navigation API SDK' },
          ].map(item => (
            <div key={item.layer} className="bg-navy-700 border border-navy-600 rounded-lg px-3 py-2">
              <div className="text-xs text-slate-500">{item.layer}</div>
              <div className="font-mono-data text-xs font-semibold text-slate-300 mt-0.5">{item.tech}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
