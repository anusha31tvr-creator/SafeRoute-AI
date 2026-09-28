export type Screen =
  | 'dashboard'
  | 'route'
  | 'map'
  | 'infrastructure'
  | 'ai'
  | 'simulation'
  | 'emergency'
  | 'data'
  | 'future'

export type RiskLevel = 'SAFE' | 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL' | 'NORMAL' | 'ABNORMAL'

export type DisasterType = 'none' | 'rain' | 'flood' | 'electrical' | 'bridge'

export interface SimulationData {
  rainfall: number
  waterLevel: number
  poleP101Tilt: number
  poleP102Tilt: number
  poleP102Water: string
  poleP102Electrical: string
  floodProbability: number
  routeRiskScore: number
  segment14Risk: RiskLevel
  overallRisk: RiskLevel
  weatherRisk: RiskLevel
  floodRisk: RiskLevel
  infraRisk: RiskLevel
  active: boolean
}

export interface AppState {
  screen: Screen
  disasterData: SimulationData
  routeAnalyzed: boolean
  routeAnalyzing: boolean
  analyzeStep: number
  saferRouteSelected: boolean
  showHazardPanel: boolean
  demoModeOpen: boolean
  aiAnalysisStep: number
  aiAnalysisComplete: boolean
}
