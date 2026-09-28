interface IconProps {
  className?: string
  size?: number
}

const ic = (size: number | undefined, className: string | undefined) =>
  ({ width: size ?? 20, height: size ?? 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.75, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, className })

export function HomeIcon({ className, size }: IconProps) {
  return <svg {...ic(size, className)}><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/><path d="M9 21V12h6v9"/></svg>
}

export function RouteIcon({ className, size }: IconProps) {
  return <svg {...ic(size, className)}><circle cx="6" cy="18" r="2"/><circle cx="18" cy="6" r="2"/><path d="M6 16V9a2 2 0 012-2h8"/><path d="M15 9l3-3-3-3"/></svg>
}

export function MapIcon({ className, size }: IconProps) {
  return <svg {...ic(size, className)}><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>
}

export function TowerIcon({ className, size }: IconProps) {
  return <svg {...ic(size, className)}><path d="M12 2L4 7v5l8 4 8-4V7z"/><path d="M12 21V13"/><path d="M8.5 19.5L12 21l3.5-1.5"/><path d="M4 7l8 4 8-4"/></svg>
}

export function BrainIcon({ className, size }: IconProps) {
  return <svg {...ic(size, className)}><path d="M9.5 2a4.5 4.5 0 014.5 4.5v0a4.5 4.5 0 01-4.5 4.5H9"/><path d="M14.5 2a4.5 4.5 0 00-4.5 4.5v0"/><path d="M9 11.5V21"/><path d="M14.5 11a4.5 4.5 0 010 9H9v-9"/><path d="M5 7a4 4 0 000 8h4V7"/></svg>
}

export function FlaskIcon({ className, size }: IconProps) {
  return <svg {...ic(size, className)}><path d="M9 3h6v6l4 10H5L9 9z"/><path d="M3 3h18"/></svg>
}

export function AlertBellIcon({ className, size }: IconProps) {
  return <svg {...ic(size, className)}><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/><line x1="12" y1="2" x2="12" y2="3"/></svg>
}

export function DatabaseIcon({ className, size }: IconProps) {
  return <svg {...ic(size, className)}><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
}

export function RocketIcon({ className, size }: IconProps) {
  return <svg {...ic(size, className)}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>
}

export function AlertTriangleIcon({ className, size }: IconProps) {
  return <svg {...ic(size, className)}><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
}

export function CheckCircleIcon({ className, size }: IconProps) {
  return <svg {...ic(size, className)}><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
}

export function ShieldIcon({ className, size }: IconProps) {
  return <svg {...ic(size, className)}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
}

export function ZapIcon({ className, size }: IconProps) {
  return <svg {...ic(size, className)}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
}

export function DropletIcon({ className, size }: IconProps) {
  return <svg {...ic(size, className)}><path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/></svg>
}

export function CloudRainIcon({ className, size }: IconProps) {
  return <svg {...ic(size, className)}><line x1="16" y1="13" x2="16" y2="21"/><line x1="8" y1="13" x2="8" y2="21"/><line x1="12" y1="15" x2="12" y2="23"/><path d="M20 16.58A5 5 0 0018 7h-1.26A8 8 0 104 15.25"/></svg>
}

export function ActivityIcon({ className, size }: IconProps) {
  return <svg {...ic(size, className)}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
}

export function NavigationIcon({ className, size }: IconProps) {
  return <svg {...ic(size, className)}><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
}

export function CpuIcon({ className, size }: IconProps) {
  return <svg {...ic(size, className)}><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>
}

export function RadioIcon({ className, size }: IconProps) {
  return <svg {...ic(size, className)}><circle cx="12" cy="12" r="2"/><path d="M16.24 7.76a6 6 0 010 8.49m-8.48-.01a6 6 0 010-8.49m11.31-2.82a10 10 0 010 14.14m-14.14 0a10 10 0 010-14.14"/></svg>
}

export function ArrowRightIcon({ className, size }: IconProps) {
  return <svg {...ic(size, className)}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
}

export function RefreshIcon({ className, size }: IconProps) {
  return <svg {...ic(size, className)}><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>
}

export function XIcon({ className, size }: IconProps) {
  return <svg {...ic(size, className)}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
}

export function PhoneIcon({ className, size }: IconProps) {
  return <svg {...ic(size, className)}><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .02h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/></svg>
}

export function LocationIcon({ className, size }: IconProps) {
  return <svg {...ic(size, className)}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
}

export function LayersIcon({ className, size }: IconProps) {
  return <svg {...ic(size, className)}><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
}

export function SettingsIcon({ className, size }: IconProps) {
  return <svg {...ic(size, className)}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
}

export function EyeIcon({ className, size }: IconProps) {
  return <svg {...ic(size, className)}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
}

export function ChevronRightIcon({ className, size }: IconProps) {
  return <svg {...ic(size, className)}><polyline points="9 18 15 12 9 6"/></svg>
}

export function InfoIcon({ className, size }: IconProps) {
  return <svg {...ic(size, className)}><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
}

export function WifiIcon({ className, size }: IconProps) {
  return <svg {...ic(size, className)}><path d="M5 12.55a11 11 0 0114.08 0"/><path d="M1.42 9a16 16 0 0121.16 0"/><path d="M8.53 16.11a6 6 0 016.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>
}

export function GridIcon({ className, size }: IconProps) {
  return <svg {...ic(size, className)}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
}
