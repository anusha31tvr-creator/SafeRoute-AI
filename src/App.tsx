import { useState, useEffect, useCallback } from 'react'
import { type Screen, type SimulationData } from './types'

import {
  HomeIcon, RouteIcon, MapIcon, TowerIcon, BrainIcon, FlaskIcon,
  AlertBellIcon, DatabaseIcon, RocketIcon, AlertTriangleIcon,
  ShieldIcon, ZapIcon, DropletIcon, CloudRainIcon, XIcon, SettingsIcon, EyeIcon,
} from './components/icons'

import Dashboard from './screens/Dashboard'
import RoutePlanner from './screens/RoutePlanner'
import LiveRiskMap from './screens/LiveRiskMap'
import HazardDetails from './screens/HazardDetails'
import InfrastructureMonitor from './screens/InfrastructureMonitor'
import AIRiskAnalysis from './screens/AIRiskAnalysis'
import DisasterSimulation from './screens/DisasterSimulation'
import Emergency from './screens/Emergency'
import DataSources from './screens/DataSources'
import FutureExpansion from './screens/FutureExpansion'

// ──────────────────────────────────────────────
// Mock data
// ──────────────────────────────────────────────
const NORMAL: SimulationData = {
  rainfall: 12,
  waterLevel: 18,
  poleP101Tilt: 2,
  poleP102Tilt: 5,
  poleP102Water: 'LOW',
  poleP102Electrical: 'NORMAL',
  floodProbability: 8,
  routeRiskScore: 23,
  segment14Risk: 'LOW',
  overallRisk: 'SAFE',
  weatherRisk: 'MODERATE',
  floodRisk: 'LOW',
  infraRisk: 'NORMAL',
  active: false,
}

const DISASTER: SimulationData = {
  rainfall: 85,
  waterLevel: 72,
  poleP101Tilt: 2,
  poleP102Tilt: 36,
  poleP102Water: 'HIGH',
  poleP102Electrical: 'ABNORMAL',
  floodProbability: 78,
  routeRiskScore: 91,
  segment14Risk: 'CRITICAL',
  overallRisk: 'CRITICAL',
  weatherRisk: 'HIGH',
  floodRisk: 'HIGH',
  infraRisk: 'ABNORMAL',
  active: true,
}

// ──────────────────────────────────────────────
// Nav config
// ──────────────────────────────────────────────
interface NavItem {
  id: Screen
  label: string
  icon: React.ComponentType<{ className?: string; size?: number }>
  critical?: boolean
}

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: HomeIcon },
  { id: 'route', label: 'Safe Route', icon: RouteIcon },
  { id: 'map', label: 'Risk Map', icon: MapIcon },
  { id: 'infrastructure', label: 'Infrastructure', icon: TowerIcon },
  { id: 'ai', label: 'AI Analysis', icon: BrainIcon },
  { id: 'simulation', label: 'Simulation', icon: FlaskIcon },
  { id: 'emergency', label: 'Emergency', icon: AlertBellIcon, critical: true },
  { id: 'data', label: 'Data Sources', icon: DatabaseIcon },
  { id: 'future', label: 'Future', icon: RocketIcon },
]

const BOTTOM_NAV: NavItem[] = [
  { id: 'dashboard', label: 'Home', icon: HomeIcon },
  { id: 'map', label: 'Map', icon: MapIcon },
  { id: 'simulation', label: 'Simulate', icon: FlaskIcon },
  { id: 'emergency', label: 'Emergency', icon: AlertBellIcon, critical: true },
  { id: 'ai', label: 'AI', icon: BrainIcon },
]

// ──────────────────────────────────────────────
// Sidebar
// ──────────────────────────────────────────────
function Sidebar({
  screen, setScreen, disasterActive, onDemoToggle, demoOpen,
}: {
  screen: Screen
  setScreen: (s: Screen) => void
  disasterActive: boolean
  onDemoToggle: () => void
  demoOpen: boolean
}) {
  return (
    <aside className="hidden md:flex flex-col w-56 bg-navy-950 border-r border-navy-700 h-full shrink-0 overflow-hidden">
      {/* Logo */}
      <div className="px-4 pt-5 pb-4 border-b border-navy-700">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-600/25 border border-blue-500/40 flex items-center justify-center shrink-0">
            <ShieldIcon className="text-blue-400" size={15} />
          </div>
          <div>
            <div className="font-display font-black text-slate-100 text-sm tracking-wide leading-none">SafeRoute AI</div>
            <div className="text-xs text-slate-600 mt-0.5 leading-none font-display tracking-wider">DISASTER NAVIGATION</div>
          </div>
        </div>
        {disasterActive && (
          <div className="mt-3 flex items-center gap-1.5 px-2.5 py-1.5 bg-red-500/15 border border-red-500/30 rounded-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse-critical" />
            <span className="text-xs font-bold text-red-400 font-display tracking-wider">HAZARD ACTIVE</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-3 overflow-y-auto">
        <div className="px-2 mb-2">
          <span className="text-xs font-semibold text-slate-600 tracking-widest uppercase px-2 font-display">Navigation</span>
        </div>
        {NAV_ITEMS.map(item => {
          const active = screen === item.id
          const isEmergency = item.id === 'emergency'
          return (
            <button
              key={item.id}
              onClick={() => setScreen(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-all nav-item ${active ? 'nav-item-active' : ''} ${isEmergency && disasterActive ? 'bg-red-500/8 border-l-red-500' : ''}`}
            >
              <item.icon
                className={active ? 'text-blue-400' : isEmergency && disasterActive ? 'text-red-400 animate-pulse-critical' : 'text-slate-500'}
                size={16}
              />
              <span className={`text-sm font-medium ${active ? 'text-blue-300' : isEmergency && disasterActive ? 'text-red-400 font-semibold' : 'text-slate-400'}`}>
                {item.label}
              </span>
              {isEmergency && disasterActive && (
                <span className="ml-auto w-2 h-2 rounded-full bg-red-400 animate-pulse-critical" />
              )}
            </button>
          )
        })}
      </nav>

      {/* Bottom: demo mode + status */}
      <div className="px-3 py-3 border-t border-navy-700 flex flex-col gap-2">
        <button
          onClick={onDemoToggle}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-semibold font-display tracking-wide transition-all ${demoOpen ? 'bg-blue-600/20 border-blue-500/40 text-blue-300' : 'bg-navy-800 border-navy-600 text-slate-400 hover:bg-navy-700'}`}
        >
          <EyeIcon size={13} />
          Demo Mode
        </button>
        <div className="flex items-center gap-1.5 px-2 py-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="text-xs text-slate-600">System Operational</span>
        </div>
      </div>
    </aside>
  )
}

// ──────────────────────────────────────────────
// Bottom Nav (mobile)
// ──────────────────────────────────────────────
function BottomNav({
  screen, setScreen, disasterActive,
}: {
  screen: Screen
  setScreen: (s: Screen) => void
  disasterActive: boolean
}) {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-navy-950/95 backdrop-blur-sm border-t border-navy-700 flex z-40">
      {BOTTOM_NAV.map(item => {
        const active = screen === item.id
        const isEmergency = item.id === 'emergency'
        return (
          <button
            key={item.id}
            onClick={() => setScreen(item.id)}
            className={`flex-1 flex flex-col items-center gap-1 py-2.5 transition-all ${active ? 'text-blue-400' : isEmergency && disasterActive ? 'text-red-400' : 'text-slate-500'}`}
          >
            <item.icon
              className={isEmergency && disasterActive && !active ? 'animate-pulse-critical' : ''}
              size={20}
            />
            <span className="text-xs font-medium">{item.label}</span>
            {active && <span className="w-1 h-1 rounded-full bg-blue-400" />}
          </button>
        )
      })}
    </nav>
  )
}

// ──────────────────────────────────────────────
// Demo Mode Panel
// ──────────────────────────────────────────────
function DemoModePanel({
  disasterActive, onSimulate, onReset, setScreen, onClose,
}: {
  disasterActive: boolean
  onSimulate: () => void
  onReset: () => void
  setScreen: (s: Screen) => void
  onClose: () => void
}) {
  const events = [
    { id: 'rain', icon: CloudRainIcon, label: 'Heavy Rain', color: 'text-blue-400', desc: 'Rainfall 85mm/hr' },
    { id: 'flood', icon: DropletIcon, label: 'Flood Event', color: 'text-blue-500', desc: 'Water level HIGH' },
    { id: 'electrical', icon: ZapIcon, label: 'Infra Failure', color: 'text-yellow-400', desc: 'P-102 ABNORMAL' },
    { id: 'bridge', icon: AlertTriangleIcon, label: 'Bridge Hazard', color: 'text-orange-400', desc: 'Segment alert' },
  ]

  return (
    <div className="fixed bottom-20 md:bottom-4 right-4 w-72 glass-card rounded-2xl shadow-2xl z-50 animate-slide-in-right overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-navy-600">
        <div className="flex items-center gap-2">
          <EyeIcon className="text-blue-400" size={15} />
          <span className="font-display font-bold text-slate-200 text-sm tracking-wide">Demo Mode</span>
          <span className="px-1.5 py-0.5 bg-blue-600/25 border border-blue-500/35 text-blue-300 text-xs rounded-full font-display font-bold">ACTIVE</span>
        </div>
        <button
          onClick={onClose}
          className="w-6 h-6 rounded-full bg-navy-700 border border-navy-500 flex items-center justify-center hover:bg-navy-600 transition-all"
        >
          <XIcon size={12} className="text-slate-400" />
        </button>
      </div>

      <div className="p-4 flex flex-col gap-3">
        {/* Main flow button */}
        <div>
          <p className="text-xs text-slate-500 mb-2">Full demo sequence:</p>
          {disasterActive ? (
            <button
              onClick={onReset}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-navy-700 border border-navy-500 hover:bg-navy-600 text-slate-300 rounded-xl font-display font-semibold text-xs tracking-wide transition-all"
            >
              Reset Simulation
            </button>
          ) : (
            <button
              onClick={() => { onSimulate(); setScreen('simulation') }}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-red-600/80 hover:bg-red-600 text-white rounded-xl font-display font-semibold text-xs tracking-wide transition-all"
            >
              <span>🌊</span>
              Run Full Flood Demo
            </button>
          )}
        </div>

        {/* Individual events */}
        <div>
          <p className="text-xs text-slate-500 mb-2">Individual events:</p>
          <div className="grid grid-cols-2 gap-1.5">
            {events.map(ev => (
              <button
                key={ev.id}
                onClick={() => { onSimulate(); setScreen('map') }}
                className={`flex flex-col items-center gap-1 p-2.5 rounded-lg border text-center transition-all ${disasterActive ? 'border-navy-500 bg-navy-700 opacity-60' : 'border-navy-500 bg-navy-700 hover:bg-navy-600'}`}
              >
                <ev.icon className={ev.color} size={16} />
                <span className="text-xs font-semibold font-display text-slate-300">{ev.label}</span>
                <span className="text-xs text-slate-600">{ev.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Quick nav */}
        <div>
          <p className="text-xs text-slate-500 mb-2">Quick navigate:</p>
          <div className="flex flex-wrap gap-1.5">
            {(['map', 'ai', 'infrastructure', 'emergency'] as Screen[]).map(s => (
              <button
                key={s}
                onClick={() => setScreen(s)}
                className="px-2.5 py-1 bg-navy-700 border border-navy-600 hover:bg-navy-600 text-slate-400 rounded-lg text-xs font-display font-semibold capitalize transition-all"
              >
                {s === 'ai' ? 'AI' : s === 'infrastructure' ? 'Infra' : s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────
// Hazard modal overlay
// ──────────────────────────────────────────────
function HazardModal({
  disasterData, onClose, onUseSaferRoute, setScreen,
}: {
  disasterData: SimulationData
  onClose: () => void
  onUseSaferRoute: () => void
  setScreen: (s: Screen) => void
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="w-full max-w-md bg-navy-900 border border-navy-600 rounded-t-2xl md:rounded-2xl max-h-[90vh] overflow-hidden shadow-2xl animate-slide-in-up"
        onClick={e => e.stopPropagation()}
      >
        <HazardDetails
          disasterData={disasterData}
          onClose={onClose}
          onUseSaferRoute={onUseSaferRoute}
          setScreen={setScreen}
        />
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────
// App
// ──────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState<Screen>('dashboard')
  const [disasterData, setDisasterData] = useState<SimulationData>(NORMAL)
  const [routeAnalyzed, setRouteAnalyzed] = useState(false)
  const [routeAnalyzing, setRouteAnalyzing] = useState(false)
  const [analyzeStep, setAnalyzeStep] = useState(0)
  const [saferRouteSelected, setSaferRouteSelected] = useState(false)
  const [showHazardModal, setShowHazardModal] = useState(false)
  const [demoModeOpen, setDemoModeOpen] = useState(false)

  // Route analysis flow
  const handleAnalyze = useCallback(() => {
    if (routeAnalyzing) return
    setRouteAnalyzing(true)
    setAnalyzeStep(0)
    setSaferRouteSelected(false)
    let step = 0
    const interval = setInterval(() => {
      step++
      setAnalyzeStep(step)
      if (step >= 5) {
        clearInterval(interval)
        setTimeout(() => {
          setRouteAnalyzing(false)
          setRouteAnalyzed(true)
          setScreen('map')
        }, 600)
      }
    }, 500)
  }, [routeAnalyzing])

  // Simulate disaster
  const handleSimulate = useCallback(() => {
    setDisasterData(DISASTER)
    setSaferRouteSelected(false)
  }, [])

  // Reset
  const handleReset = useCallback(() => {
    setDisasterData(NORMAL)
    setSaferRouteSelected(false)
    setShowHazardModal(false)
  }, [])

  // Safer route
  const handleUseSaferRoute = useCallback(() => {
    setSaferRouteSelected(true)
    setShowHazardModal(false)
    setScreen('map')
  }, [])

  // Segment click → show hazard panel
  const handleSegmentClick = useCallback(() => {
    setShowHazardModal(true)
  }, [])

  // Demo + simulate shortcut
  const handleDemoSimulate = useCallback(() => {
    handleSimulate()
    setRouteAnalyzed(true)
  }, [handleSimulate])

  const disasterActive = disasterData.active

  const screenProps = {
    disasterData,
    setScreen,
    onUseSaferRoute: handleUseSaferRoute,
  }

  return (
    <div className="flex h-screen bg-[#080e1c] overflow-hidden font-body text-slate-200">
      {/* Sidebar */}
      <Sidebar
        screen={screen}
        setScreen={setScreen}
        disasterActive={disasterActive}
        onDemoToggle={() => setDemoModeOpen(o => !o)}
        demoOpen={demoModeOpen}
      />

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">

        {/* Mobile header */}
        <div className="md:hidden flex items-center justify-between px-4 pt-4 pb-3 border-b border-navy-700 shrink-0 bg-navy-950/80 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-600/25 border border-blue-500/35 flex items-center justify-center">
              <ShieldIcon className="text-blue-400" size={13} />
            </div>
            <span className="font-display font-black text-slate-100 text-sm tracking-wide">SafeRoute AI</span>
          </div>
          <div className="flex items-center gap-2">
            {disasterActive && (
              <span className="flex items-center gap-1 px-2 py-0.5 bg-red-500/15 border border-red-500/30 rounded-full text-xs font-bold text-red-400 font-display tracking-wider">
                <span className="w-1 h-1 rounded-full bg-red-400 animate-pulse-critical" />
                ALERT
              </span>
            )}
            <button
              onClick={() => setDemoModeOpen(o => !o)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold font-display transition-all ${demoModeOpen ? 'bg-blue-600/20 border-blue-500/40 text-blue-300' : 'bg-navy-800 border-navy-600 text-slate-400'}`}
            >
              <EyeIcon size={12} />
              Demo
            </button>
          </div>
        </div>

        {/* Screen content */}
        <div className="flex-1 overflow-hidden pb-16 md:pb-0">
          {screen === 'dashboard' && (
            <Dashboard
              disasterData={disasterData}
              setScreen={setScreen}
              onSimulate={() => { setScreen('simulation') }}
            />
          )}
          {screen === 'route' && (
            <RoutePlanner
              routeAnalyzed={routeAnalyzed}
              routeAnalyzing={routeAnalyzing}
              analyzeStep={analyzeStep}
              setScreen={setScreen}
              onAnalyze={handleAnalyze}
            />
          )}
          {screen === 'map' && (
            <LiveRiskMap
              disasterData={disasterData}
              routeAnalyzed={routeAnalyzed}
              saferRouteSelected={saferRouteSelected}
              setScreen={setScreen}
              onUseSaferRoute={handleUseSaferRoute}
              onSegmentClick={handleSegmentClick}
            />
          )}
          {screen === 'infrastructure' && (
            <InfrastructureMonitor disasterData={disasterData} />
          )}
          {screen === 'ai' && (
            <AIRiskAnalysis
              disasterData={disasterData}
              setScreen={setScreen}
              onUseSaferRoute={handleUseSaferRoute}
            />
          )}
          {screen === 'simulation' && (
            <DisasterSimulation
              disasterData={disasterData}
              setScreen={setScreen}
              onSimulate={handleSimulate}
              onReset={handleReset}
            />
          )}
          {screen === 'emergency' && (
            <Emergency
              disasterData={disasterData}
              setScreen={setScreen}
              onUseSaferRoute={handleUseSaferRoute}
            />
          )}
          {screen === 'data' && <DataSources />}
          {screen === 'future' && <FutureExpansion />}
        </div>
      </main>

      {/* Bottom nav (mobile) */}
      <BottomNav
        screen={screen}
        setScreen={setScreen}
        disasterActive={disasterActive}
      />

      {/* Hazard modal */}
      {showHazardModal && (
        <HazardModal
          disasterData={disasterData}
          onClose={() => setShowHazardModal(false)}
          onUseSaferRoute={handleUseSaferRoute}
          setScreen={setScreen}
        />
      )}

      {/* Demo mode panel */}
      {demoModeOpen && (
        <DemoModePanel
          disasterActive={disasterActive}
          onSimulate={handleDemoSimulate}
          onReset={handleReset}
          setScreen={setScreen}
          onClose={() => setDemoModeOpen(false)}
        />
      )}
    </div>
  )
}
