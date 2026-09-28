import { type SimulationData } from '../types'

interface RouteMapProps {
  disasterData: SimulationData
  saferRouteSelected: boolean
  routeAnalyzed: boolean
  onSegmentClick: () => void
  compact?: boolean
}

const SEG_COLORS = {
  safe: '#22c55e',
  caution: '#eab308',
  high: '#f97316',
  critical: '#ef4444',
  dim: '#2a3f5f',
}

export default function RouteMap({
  disasterData,
  saferRouteSelected,
  routeAnalyzed,
  onSegmentClick,
  compact = false,
}: RouteMapProps) {
  const disaster = disasterData.active

  // Segment colors shift when disaster is active
  const seg3Color = disaster ? SEG_COLORS.critical : SEG_COLORS.high
  const seg4Color = disaster ? SEG_COLORS.critical : (saferRouteSelected ? SEG_COLORS.dim : SEG_COLORS.critical)
  const seg3Width = disaster ? 7 : 5
  const seg4Width = disaster ? 7 : 5
  const mainOpacity = saferRouteSelected ? 0.28 : 1

  // When disaster active, seg2 also becomes risky
  const seg2Color = disaster ? SEG_COLORS.high : SEG_COLORS.caution

  const vb = compact ? '150 80 630 330' : '0 0 900 480'

  return (
    <svg
      viewBox={vb}
      className="w-full h-full"
      style={{ fontFamily: 'DM Sans, sans-serif' }}
    >
      <defs>
        <filter id="glow-red" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="glow-green" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="city-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="flood-zone" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.45" />
          <stop offset="60%" stopColor="#1d4ed8" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="vj-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hyd-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
        </radialGradient>
        <pattern id="mapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e2f4f" strokeWidth="0.5" opacity="0.6" />
        </pattern>
        <marker id="arrow-safe" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <polygon points="0 0, 6 3, 0 6" fill="#22c55e" opacity="0.8" />
        </marker>
        <marker id="arrow-alt" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <polygon points="0 0, 6 3, 0 6" fill="#22c55e" />
        </marker>
      </defs>

      {/* Background */}
      <rect width="900" height="480" fill="#080e1c" />

      {/* Map grid */}
      <rect width="900" height="480" fill="url(#mapGrid)" />

      {/* Major grid lines */}
      {[120, 240, 360].map(y => (
        <line key={y} x1="0" y1={y} x2="900" y2={y} stroke="#1e2f4f" strokeWidth="0.8" opacity="0.5" />
      ))}
      {[225, 450, 675].map(x => (
        <line key={x} x1={x} y1="0" x2={x} y2="480" stroke="#1e2f4f" strokeWidth="0.8" opacity="0.5" />
      ))}

      {/* Terrain: southern landmass suggestion */}
      <path
        d="M 0 390 C 60 375 130 360 200 370 C 280 380 360 400 450 410 C 540 420 640 430 730 420 C 800 413 860 400 900 390 L 900 480 L 0 480 Z"
        fill="#0d1627"
        opacity="0.5"
      />

      {/* Krishna River (near Vijayawada) */}
      <path
        d="M 830 400 C 810 393 790 385 770 378 C 752 372 738 374 720 382 C 698 392 675 408 645 425"
        stroke="#1e4080"
        strokeWidth="3"
        fill="none"
        opacity="0.5"
        strokeLinecap="round"
      />

      {/* Secondary roads */}
      <path d="M 615 282 C 600 305 585 340 570 380" stroke="#1e2d47" strokeWidth="1.5" fill="none" opacity="0.35" />
      <path d="M 478 210 C 462 235 448 265 440 300" stroke="#1e2d47" strokeWidth="1.5" fill="none" opacity="0.35" />
      <path d="M 360 170 C 342 195 328 230 318 270" stroke="#1e2d47" strokeWidth="1.5" fill="none" opacity="0.35" />
      <path d="M 130 130 C 115 155 106 185 100 220" stroke="#1e2d47" strokeWidth="1.5" fill="none" opacity="0.35" />
      <path d="M 760 370 C 780 355 800 330 810 300" stroke="#1e2d47" strokeWidth="1.5" fill="none" opacity="0.35" />

      {/* Small towns along route */}
      {[
        { x: 690, y: 325, label: 'Miryalaguda' },
        { x: 548, y: 248, label: 'Nalgonda' },
        { x: 380, y: 175, label: 'Yadagirigutta' },
        { x: 260, y: 148, label: 'Bhongir' },
      ].map(town => (
        <g key={town.label}>
          <circle cx={town.x} cy={town.y} r="3" fill="#253a60" stroke="#3d5a80" strokeWidth="1" />
          <text x={town.x} y={town.y - 8} textAnchor="middle" fill="#4a6080" fontSize="9" fontFamily="DM Sans, sans-serif">
            {town.label}
          </text>
        </g>
      ))}

      {/* === ROUTE PATHS === */}
      {routeAnalyzed ? (
        <>
          {/* Road shadow/border layer */}
          <g opacity={mainOpacity}>
            {/* Seg 1: VJ exit → Seg2 start — Safe */}
            <path d="M 760 370 C 740 355 720 340 690 325" stroke="#1a3d1a" strokeWidth="12" fill="none" strokeLinecap="round" />
            <path d="M 760 370 C 740 355 720 340 690 325" stroke={SEG_COLORS.safe} strokeWidth="6" fill="none" strokeLinecap="round" />

            {/* Seg 2: Caution/High */}
            <path d="M 690 325 C 668 312 640 295 615 282" stroke={disaster ? '#7a2d00' : '#7a5c00'} strokeWidth="12" fill="none" strokeLinecap="round" />
            <path d="M 690 325 C 668 312 640 295 615 282" stroke={seg2Color} strokeWidth="6" fill="none" strokeLinecap="round" />

            {/* Seg 3: High Risk */}
            <path d="M 615 282 C 592 268 570 258 548 248" stroke={disaster ? '#7a1010' : '#7a2d00'} strokeWidth="12" fill="none" strokeLinecap="round" />
            <path
              d="M 615 282 C 592 268 570 258 548 248"
              stroke={seg3Color}
              strokeWidth={seg3Width}
              fill="none"
              strokeLinecap="round"
              style={disaster ? { filter: 'drop-shadow(0 0 6px rgba(239,68,68,0.7))' } : undefined}
            />

            {/* Seg 4: NH Seg 14 — Critical */}
            <path d="M 548 248 C 525 235 502 220 478 210" stroke="#5a0a0a" strokeWidth="14" fill="none" strokeLinecap="round" />
            <path
              d="M 548 248 C 525 235 502 220 478 210"
              stroke={seg4Color}
              strokeWidth={seg4Width}
              fill="none"
              strokeLinecap="round"
              onClick={onSegmentClick}
              className="cursor-pointer"
              style={{ filter: disaster ? 'drop-shadow(0 0 8px rgba(239,68,68,0.9))' : 'drop-shadow(0 0 5px rgba(239,68,68,0.6))' }}
            />

            {/* Seg 5: Safe */}
            <path d="M 478 210 C 445 196 400 182 360 170" stroke="#1a3d1a" strokeWidth="12" fill="none" strokeLinecap="round" />
            <path d="M 478 210 C 445 196 400 182 360 170" stroke={SEG_COLORS.safe} strokeWidth="6" fill="none" strokeLinecap="round" />

            {/* Seg 6: Safe → HYD */}
            <path d="M 360 170 C 295 156 210 140 130 130" stroke="#1a3d1a" strokeWidth="12" fill="none" strokeLinecap="round" />
            <path d="M 360 170 C 295 156 210 140 130 130" stroke={SEG_COLORS.safe} strokeWidth="6" fill="none" strokeLinecap="round" />
          </g>

          {/* NH Seg 14 label */}
          {!saferRouteSelected && (
            <g>
              <rect x="489" y="215" width="86" height="18" rx="4" fill={disaster ? 'rgba(239,68,68,0.85)' : 'rgba(239,68,68,0.7)'} />
              <text x="532" y="228" textAnchor="middle" fill="white" fontSize="10" fontWeight="700" fontFamily="Barlow Condensed, sans-serif" letterSpacing="0.5">
                NH SEG 14
              </text>
            </g>
          )}

          {/* Flood zone overlay */}
          {disaster && (
            <>
              <ellipse
                cx="513"
                cy="229"
                rx="80"
                ry="55"
                fill="url(#flood-zone)"
                className="animate-flood-wave"
              />
              <ellipse
                cx="513"
                cy="229"
                rx="55"
                ry="38"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="1.5"
                opacity="0.4"
                strokeDasharray="4 3"
              />
            </>
          )}

          {/* Alternative route */}
          {(disaster || saferRouteSelected) && (
            <>
              {/* Alt route shadow */}
              <path
                d="M 615 282 C 600 310 578 345 550 368 C 524 390 492 397 462 386 C 434 374 416 350 400 320 C 385 290 378 260 368 234 C 364 220 361 193 360 170"
                stroke="#0a2a0a"
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
              />
              {/* Alt route */}
              <path
                d="M 615 282 C 600 310 578 345 550 368 C 524 390 492 397 462 386 C 434 374 416 350 400 320 C 385 290 378 260 368 234 C 364 220 361 193 360 170"
                stroke={saferRouteSelected ? '#22c55e' : '#16a34a'}
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={saferRouteSelected ? 'none' : '10 4'}
                style={{ filter: saferRouteSelected ? 'drop-shadow(0 0 6px rgba(34,197,94,0.6))' : undefined }}
              />
              {/* Alt route label */}
              <g transform="translate(470,368)">
                <rect x="-40" y="-12" width="80" height="18" rx="4" fill={saferRouteSelected ? 'rgba(34,197,94,0.85)' : 'rgba(34,197,94,0.5)'} />
                <text textAnchor="middle" y="0" fill="white" fontSize="9" fontWeight="700" fontFamily="Barlow Condensed, sans-serif" letterSpacing="0.5">
                  {saferRouteSelected ? 'ACTIVE SAFE ROUTE' : 'ALT ROUTE B'}
                </text>
              </g>
            </>
          )}

          {/* Hazard pulse marker */}
          {!saferRouteSelected && (
            <g onClick={onSegmentClick} className="cursor-pointer">
              {/* Outer pulse rings */}
              <circle cx="513" cy="229" r="18" fill="none" stroke={disaster ? '#ef4444' : '#f97316'} strokeWidth="2" opacity="0.5">
                <animate attributeName="r" values="16;28;16" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.5;0;0.5" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="513" cy="229" r="12" fill="none" stroke={disaster ? '#ef4444' : '#f97316'} strokeWidth="2" opacity="0.7">
                <animate attributeName="r" values="10;20;10" dur="2s" begin="0.3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.7;0;0.7" dur="2s" begin="0.3s" repeatCount="indefinite" />
              </circle>
              {/* Center */}
              <circle cx="513" cy="229" r="8" fill={disaster ? '#ef4444' : '#f97316'} />
              <text x="513" y="233" textAnchor="middle" fill="white" fontSize="10" fontWeight="800" fontFamily="Barlow Condensed, sans-serif">!</text>
            </g>
          )}

          {/* Safe route confirmation marker */}
          {saferRouteSelected && (
            <g>
              <circle cx="513" cy="229" r="10" fill="#22c55e" opacity="0.3" />
              <circle cx="513" cy="229" r="6" fill="#22c55e" />
              <text x="513" y="233" textAnchor="middle" fill="white" fontSize="9" fontWeight="800" fontFamily="Barlow Condensed, sans-serif">✓</text>
            </g>
          )}
        </>
      ) : (
        /* No route yet: subtle empty route indicator */
        <g opacity="0.2">
          <path d="M 760 370 C 700 330 600 280 513 229 C 430 180 300 158 130 130" stroke="#3d5a80" strokeWidth="3" fill="none" strokeDasharray="8 6" />
        </g>
      )}

      {/* === CITY MARKERS === */}

      {/* Vijayawada */}
      <g filter="url(#city-glow)">
        <circle cx="760" cy="370" r="28" fill="url(#vj-glow)" />
        <circle cx="760" cy="370" r="9" fill="#172540" stroke="#60a5fa" strokeWidth="2.5" />
        <circle cx="760" cy="370" r="4" fill="#60a5fa" />
      </g>
      <rect x="772" y="355" width="106" height="30" rx="5" fill="rgba(8,14,28,0.88)" stroke="#1e2f4f" strokeWidth="1" />
      <text x="825" y="368" textAnchor="middle" fill="#93c5fd" fontSize="11" fontWeight="700" fontFamily="Barlow Condensed, sans-serif" letterSpacing="0.8">
        VIJAYAWADA
      </text>
      <text x="825" y="380" textAnchor="middle" fill="#4a6080" fontSize="9" fontFamily="DM Sans, sans-serif">
        Origin
      </text>

      {/* Hyderabad */}
      <g filter="url(#city-glow)">
        <circle cx="130" cy="130" r="28" fill="url(#hyd-glow)" />
        <circle cx="130" cy="130" r="9" fill="#172540" stroke="#34d399" strokeWidth="2.5" />
        <circle cx="130" cy="130" r="4" fill="#34d399" />
      </g>
      <rect x="148" y="115" width="104" height="30" rx="5" fill="rgba(8,14,28,0.88)" stroke="#1e2f4f" strokeWidth="1" />
      <text x="200" y="128" textAnchor="middle" fill="#6ee7b7" fontSize="11" fontWeight="700" fontFamily="Barlow Condensed, sans-serif" letterSpacing="0.8">
        HYDERABAD
      </text>
      <text x="200" y="140" textAnchor="middle" fill="#4a6080" fontSize="9" fontFamily="DM Sans, sans-serif">
        Destination
      </text>

      {/* === LEGEND === */}
      <g transform="translate(20, 20)">
        <rect width="145" height="72" rx="6" fill="rgba(8,14,28,0.82)" stroke="#1e2f4f" strokeWidth="1" />
        <rect width="145" height="26" rx="6" fill="rgba(8,14,28,0.82)" stroke="#1e2f4f" strokeWidth="1" />
        <text x="10" y="17" fill="#64748b" fontSize="9" fontWeight="600" fontFamily="Barlow Condensed, sans-serif" letterSpacing="1">RISK LEGEND</text>
        <line x1="10" y1="30" x2="10" y2="40" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" />
        <text x="20" y="39" fill="#94a3b8" fontSize="9" fontFamily="DM Sans, sans-serif">Safe</text>
        <line x1="55" y1="30" x2="55" y2="40" stroke="#eab308" strokeWidth="3" strokeLinecap="round" />
        <text x="65" y="39" fill="#94a3b8" fontSize="9" fontFamily="DM Sans, sans-serif">Caution</text>
        <line x1="10" y1="48" x2="10" y2="58" stroke="#f97316" strokeWidth="3" strokeLinecap="round" />
        <text x="20" y="57" fill="#94a3b8" fontSize="9" fontFamily="DM Sans, sans-serif">High Risk</text>
        <line x1="75" y1="48" x2="75" y2="58" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
        <text x="85" y="57" fill="#94a3b8" fontSize="9" fontFamily="DM Sans, sans-serif">Critical</text>
      </g>

      {/* Distance indicator */}
      {routeAnalyzed && (
        <g transform="translate(700, 20)">
          <rect width="160" height="32" rx="6" fill="rgba(8,14,28,0.82)" stroke="#1e2f4f" strokeWidth="1" />
          <text x="80" y="13" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="Barlow Condensed, sans-serif" letterSpacing="1">TOTAL ROUTE</text>
          <text x="80" y="26" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="Barlow Condensed, sans-serif" fontWeight="600">VJA → HYD  •  274 km</text>
        </g>
      )}

      {/* Compass rose */}
      <g transform="translate(848, 440)">
        <circle cx="0" cy="0" r="16" fill="rgba(8,14,28,0.7)" stroke="#1e2f4f" strokeWidth="1" />
        <text x="0" y="-5" textAnchor="middle" fill="#60a5fa" fontSize="8" fontFamily="Barlow Condensed, sans-serif" fontWeight="700">N</text>
        <line x1="0" y1="-2" x2="0" y2="-11" stroke="#60a5fa" strokeWidth="1.5" />
        <line x1="0" y1="2" x2="0" y2="11" stroke="#3d5a80" strokeWidth="1" />
        <line x1="-11" y1="0" x2="-2" y2="0" stroke="#3d5a80" strokeWidth="1" />
        <line x1="2" y1="0" x2="11" y2="0" stroke="#3d5a80" strokeWidth="1" />
      </g>

      {/* "No route" prompt */}
      {!routeAnalyzed && (
        <text
          x="450"
          y="260"
          textAnchor="middle"
          fill="#3d5a80"
          fontSize="14"
          fontFamily="DM Sans, sans-serif"
          fontWeight="500"
        >
          Enter your route above to see risk analysis
        </text>
      )}
    </svg>
  )
}
