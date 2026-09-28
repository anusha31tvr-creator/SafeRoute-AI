import { DatabaseIcon, WifiIcon, CheckCircleIcon, InfoIcon } from '../components/icons'

function SourceCard({
  icon, title, status, provider, type, detail,
}: {
  icon: string
  title: string
  status: 'Connected' | 'Simulated' | 'Partial'
  provider: string
  type: string
  detail: string
}) {
  const isConnected = status === 'Connected'
  const isSimulated = status === 'Simulated'
  const statusStyle = isConnected
    ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
    : isSimulated
    ? 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30'
    : 'bg-blue-500/15 text-blue-400 border-blue-500/30'

  return (
    <div className={`rounded-xl border p-4 transition-all ${isConnected ? 'border-navy-600 bg-navy-800' : isSimulated ? 'border-yellow-500/20 bg-yellow-500/4' : 'border-navy-600 bg-navy-800'}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="text-xl">{icon}</div>
          <div>
            <div className="font-display font-semibold text-slate-200 text-sm tracking-wide">{title}</div>
            <div className="text-xs text-slate-500">{provider}</div>
          </div>
        </div>
        <div className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold font-display tracking-wide border ${statusStyle}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-emerald-400' : isSimulated ? 'bg-yellow-400' : 'bg-blue-400'}`} />
          {status}
        </div>
      </div>
      <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
        <span className="px-2 py-0.5 bg-navy-700 border border-navy-600 rounded text-slate-500 font-mono-data">{type}</span>
        <span>{detail}</span>
      </div>
      <div className={`h-1.5 rounded-full overflow-hidden ${isSimulated ? 'bg-yellow-950' : 'bg-navy-700'}`}>
        <div className={`h-full rounded-full ${isConnected ? 'bg-emerald-500 w-full' : isSimulated ? 'bg-yellow-500 w-3/5' : 'bg-blue-500 w-4/5'}`} />
      </div>
    </div>
  )
}

export default function DataSources() {
  const sources = [
    {
      icon: '🌧',
      title: 'Weather Data',
      status: 'Connected' as const,
      provider: 'IMD Weather API',
      type: 'REST/JSON',
      detail: 'Refreshes every 15 minutes',
    },
    {
      icon: '💧',
      title: 'Flood Information',
      status: 'Connected' as const,
      provider: 'Central Water Commission',
      type: 'GeoJSON',
      detail: 'River gauge network data',
    },
    {
      icon: '🏛',
      title: 'Government Alerts',
      status: 'Connected' as const,
      provider: 'NDMA — National Disaster Mgmt',
      type: 'CAP / XML',
      detail: 'Official emergency broadcasts',
    },
    {
      icon: '⚠️',
      title: 'Hazard Reports',
      status: 'Connected' as const,
      provider: 'Crowdsource + Authority Data',
      type: 'REST/JSON',
      detail: 'Community + authority reports',
    },
    {
      icon: '🏗',
      title: 'Infrastructure Data',
      status: 'Simulated' as const,
      provider: 'Utility Network API (Prototype)',
      type: 'MQTT / IoT',
      detail: 'Pole, bridge, road sensors',
    },
    {
      icon: '📡',
      title: 'IoT Sensors',
      status: 'Simulated' as const,
      provider: 'Prototype Sensor Feed',
      type: 'MQTT / WebSocket',
      detail: 'Tilt, water, electrical sensors',
    },
    {
      icon: '🗺',
      title: 'Road Network',
      status: 'Connected' as const,
      provider: 'OpenStreetMap / NHAI Data',
      type: 'Vector Tiles',
      detail: 'Road geometry and closures',
    },
    {
      icon: '🤖',
      title: 'AI Risk Engine',
      status: 'Connected' as const,
      provider: 'SafeRoute ML Model v1.2',
      type: 'Internal API',
      detail: 'Multi-factor risk inference',
    },
  ]

  const connected = sources.filter(s => s.status === 'Connected').length
  const simulated = sources.filter(s => s.status === 'Simulated').length

  return (
    <div className="flex flex-col gap-5 p-5 overflow-y-auto h-full">

      {/* Header */}
      <div className="animate-slide-in-up">
        <div className="flex items-center gap-2 mb-1">
          <DatabaseIcon className="text-blue-400" size={18} />
          <span className="text-xs font-semibold text-slate-400 tracking-widest uppercase font-display">Data Sources</span>
        </div>
        <h1 className="text-3xl font-display font-bold text-slate-100 tracking-wide">Data Sources</h1>
        <p className="text-sm text-slate-400 mt-0.5">Transparency dashboard for all integrated data feeds</p>
      </div>

      {/* Prototype mode banner */}
      <div className="rounded-xl border border-blue-500/25 bg-blue-500/5 px-4 py-3 flex items-start gap-3">
        <InfoIcon className="text-blue-400 shrink-0 mt-0.5" size={16} />
        <div>
          <div className="text-xs font-bold text-blue-400 font-display tracking-wide mb-0.5">PROTOTYPE MODE</div>
          <p className="text-xs text-slate-400 leading-relaxed">
            The hackathon prototype uses simulated sensor feeds for IoT and infrastructure data. In a real deployment, these values would come from connected IoT sensors, utility networks, and government monitoring systems.
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-2">
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/6 p-3 text-center">
          <div className="text-2xl font-display font-black text-emerald-400">{connected}</div>
          <div className="text-xs text-slate-400 mt-0.5">Connected</div>
        </div>
        <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/6 p-3 text-center">
          <div className="text-2xl font-display font-black text-yellow-400">{simulated}</div>
          <div className="text-xs text-slate-400 mt-0.5">Simulated</div>
        </div>
        <div className="rounded-xl border border-navy-600 bg-navy-800 p-3 text-center">
          <div className="text-2xl font-display font-black text-slate-200">{sources.length}</div>
          <div className="text-xs text-slate-400 mt-0.5">Total</div>
        </div>
      </div>

      {/* Source cards */}
      <div className="grid grid-cols-1 gap-3">
        {sources.map(source => (
          <SourceCard key={source.title} {...source} />
        ))}
      </div>

      {/* Data flow */}
      <div className="rounded-xl border border-navy-600 bg-navy-800 p-4">
        <h3 className="font-display font-semibold text-slate-200 tracking-wide text-sm mb-3">Data Pipeline</h3>
        <div className="flex flex-col gap-1">
          {[
            { label: 'Raw Data Ingestion', sub: 'Multiple source connectors' },
            { label: 'Data Normalization', sub: 'Schema validation + transform' },
            { label: 'Risk Scoring Engine', sub: 'ML inference model' },
            { label: 'Route Analysis', sub: 'Segment-level risk mapping' },
            { label: 'User Alert', sub: 'Hazard notification + routing' },
          ].map((step, i, arr) => (
            <div key={step.label} className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-xs font-bold text-blue-400 shrink-0">
                  {i + 1}
                </div>
                {i < arr.length - 1 && <div className="w-px h-4 bg-navy-600 mt-0.5" />}
              </div>
              <div className="pb-2">
                <div className="text-sm font-semibold text-slate-300">{step.label}</div>
                <div className="text-xs text-slate-500">{step.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Update schedule */}
      <div className="rounded-xl border border-navy-600 bg-navy-800 p-4">
        <h3 className="font-display font-semibold text-slate-200 tracking-wide text-sm mb-3">Update Schedule</h3>
        <div className="flex flex-col gap-2">
          {[
            { source: 'Weather feeds', freq: 'Every 15 min' },
            { source: 'Flood gauge data', freq: 'Every 30 min' },
            { source: 'IoT sensors (prod)', freq: 'Real-time (MQTT)' },
            { source: 'Government alerts', freq: 'Event-driven' },
            { source: 'AI risk scores', freq: 'On data change' },
          ].map(item => (
            <div key={item.source} className="flex justify-between items-center text-xs py-1.5 border-b border-navy-600 last:border-0">
              <span className="text-slate-400">{item.source}</span>
              <span className="font-mono-data text-slate-500">{item.freq}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
