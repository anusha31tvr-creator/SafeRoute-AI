# SafeRoute AI

> **Know the hazard. Avoid the danger. Reach safely.**

SafeRoute AI is a disaster-aware route intelligence platform designed to help people make safer travel decisions during heavy rain, flooding, infrastructure failures, and other road-level hazards.

Instead of treating a route as only a distance-and-time problem, SafeRoute AI combines route information with hazard signals and converts them into an actionable safety view: **where the risk is, why the risk exists, and what the traveller should do next.**

---

## Table of Contents

- [Project Overview](#project-overview)
- [The Problem](#the-problem)
- [The Solution](#the-solution)
- [What Makes SafeRoute AI Different](#what-makes-saferoute-ai-different)
- [Core Features](#core-features)
- [How the System Works](#how-the-system-works)
- [Risk Assessment Model](#risk-assessment-model)
- [Hazard Intelligence](#hazard-intelligence)
- [Infrastructure Monitoring](#infrastructure-monitoring)
- [Disaster Simulation](#disaster-simulation)
- [Emergency / Evacuation Mode](#emergency--evacuation-mode)
- [Route Planning](#route-planning)
- [Before and After Example](#before-and-after-example)
- [Real Project Code Example](#real-project-code-example)
- [Hindsight Integration](#hindsight-integration)
- [Technology Stack](#technology-stack)
- [Project Architecture](#project-architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Running the Application](#running-the-application)
- [How to Use](#how-to-use)
- [Current Prototype Scope](#current-prototype-scope)
- [Limitations](#limitations)
- [Future Enhancements](#future-enhancements)
- [Screenshots and Demo](#screenshots-and-demo)
- [Public Project Link](#public-project-link)
- [Safety and Responsible Use](#safety-and-responsible-use)
- [Project Status](#project-status)
- [Acknowledgements](#acknowledgements)

---

## Project Overview

Most navigation tools answer questions such as:

- How far is the destination?
- How long will the journey take?
- Which route is shorter?

During a disaster, the more important questions become:

- Is part of the route flooded?
- Is a road segment becoming unsafe?
- Is there a reported infrastructure problem?
- Is the risk increasing while I am travelling?
- Is there a safer alternative route?
- Why is this route being flagged?

SafeRoute AI is designed around these questions.

The platform is intended to bring fragmented hazard information into one route-level decision layer so that travellers do not have to interpret multiple sources separately.

---

## The Problem

Heavy rainfall and disaster conditions can turn an otherwise normal journey into a high-risk journey. The danger may not be obvious when a traveller begins moving toward the destination.

Examples include:

- Flooded roads and low-lying areas
- Rapidly increasing water levels
- Damaged bridges or road infrastructure
- Fallen poles or electrical hazards
- Severe-weather warnings
- Local hazard reports
- Infrastructure anomalies
- Road segments affected by an active disaster

The core problem is not simply **detecting a disaster**. The practical problem is **connecting that information to the person's route and turning it into a clear action.**

---

## The Solution

SafeRoute AI follows a simple decision flow:

```text
User enters origin + destination
                ↓
       Route is determined
                ↓
   Hazard data is collected
                ↓
   Signals are normalized
                ↓
       Risk is calculated
                ↓
  Affected road segments are identified
                ↓
    Safer route is suggested
                ↓
 AI explains the safety decision
```

The goal is to move from **information overload** to an **actionable route decision**.

---

## What Makes SafeRoute AI Different

SafeRoute AI is designed to connect several layers that are often viewed separately:

### 1. Disaster intelligence
Weather, rainfall, flood conditions, official alerts, and hazard reports are treated as inputs to one decision system.

### 2. Route-level reasoning
The focus is not only on the city or region. The system aims to identify the **specific route segments** affected by a hazard.

### 3. Actionable recommendations
The system is designed to produce a clear response such as:

- **Safe**
- **Caution**
- **High Risk**
- **Critical**

### 4. Explainable output
A risk score is more useful when the user can understand why the score changed.

### 5. Infrastructure awareness
The design extends beyond weather by allowing infrastructure anomaly signals to influence road safety decisions.

---

## Core Features

### 🗺️ Live Risk Map

A map-oriented interface can represent:

- Route segments
- Hazard locations
- Flood zones
- Origin and destination
- Risk levels
- Safer route alternatives

Risk colors are used to make changes easy to understand:

| Level | Meaning |
|---|---|
| 🟢 Safe | No major hazard signal detected |
| 🟡 Moderate | Caution recommended |
| 🟠 High | Significant hazard detected |
| 🔴 Critical | Avoid the affected segment |

---

### 📍 Route Planner

The Route Planner accepts an origin and destination and is designed to combine route information with safety analysis.

A typical analysis flow is:

1. Connect to weather-related inputs.
2. Retrieve flood-risk information.
3. Evaluate infrastructure anomalies.
4. Process hazard reports.
5. Calculate the route risk score.
6. Display the affected route segments.
7. Present a safer alternative when one is available.

---

### 🤖 AI Risk Analysis

The analysis layer can combine multiple signals instead of making a decision from a single data source.

Conceptually:

```text
Route Risk =
    Weather Risk
  + Flood Risk
  + Infrastructure Risk
  + Hazard Report Risk
  + Route Exposure
```

The actual weighting can be tuned later as the system moves from prototype data to validated real-world data.

---

### 🌧️ Flood and Hazard Detection

The system is designed to represent hazards such as:

- Flooded road segments
- Flood-prone zones
- Severe rainfall
- Water-level changes
- Reported hazards
- Infrastructure anomalies

The prototype includes simulated hazard states so the behaviour can be demonstrated without depending on a live disaster event.

---

### ⚡ Infrastructure Monitoring

SafeRoute AI includes an infrastructure-monitoring concept where abnormal telemetry can contribute to road risk.

Examples of signals that a future deployment could use include:

- Pole or roadside equipment status
- Electrical-network telemetry
- Infrastructure fault alerts
- Water-level sensors
- Environmental sensors

**Important:** a single physical pole sensor cannot independently determine arbitrary failures across a large region. A production implementation would require a distributed sensor/network architecture or utility/infrastructure telemetry.

For the prototype, infrastructure values are represented as **simulated telemetry**.

---

### 🚨 Disaster Simulation

The Disaster Simulation module allows a disaster condition to be triggered during a demo.

Example:

```text
Normal state
   ↓
Flood event triggered
   ↓
Risk signals increase
   ↓
Affected route segment changes status
   ↓
AI explanation is updated
   ↓
Safer route can be selected
```

This makes the change in system behaviour visible without waiting for an actual disaster.

---

### 🏥 Emergency / Evacuation Mode

An emergency mode can surface nearby safe locations or shelters and prioritize immediate safety information.

Potential emergency information includes:

- Nearest safe location
- Shelter / evacuation point
- Hazard warnings
- Critical route segments
- Emergency instructions

---

## How the System Works

### Step 1 — Route Input

The traveller enters:

```text
From: Origin
To: Destination
```

### Step 2 — Location Resolution

For a dynamic routing implementation, place names or addresses are converted into geographic coordinates using a geocoding service.

### Step 3 — Route Generation

A routing engine determines the road path between the selected points.

### Step 4 — Hazard Collection

Relevant hazard signals are collected for the journey area.

### Step 5 — Risk Mapping

Hazard signals are mapped to route segments instead of only to a broad city-level region.

### Step 6 — Risk Scoring

A route or segment receives a risk state based on the available evidence.

### Step 7 — Recommendation

The system can suggest continuing, exercising caution, avoiding a segment, or choosing a safer alternative.

### Step 8 — Explanation

The user sees the reason behind the decision rather than a number alone.

---

## Risk Assessment Model

A prototype risk engine can use normalized values between 0 and 1.

Example model:

```text
weather_score        = 0.0 – 1.0
flood_score          = 0.0 – 1.0
infrastructure_score = 0.0 – 1.0
report_score         = 0.0 – 1.0
exposure_score       = 0.0 – 1.0
```

A weighted score can then be calculated:

```text
risk_score =
    w1 * weather_score
  + w2 * flood_score
  + w3 * infrastructure_score
  + w4 * report_score
  + w5 * exposure_score
```

The final score can be mapped to a human-readable state:

```text
0–24   → Safe
25–49  → Moderate
50–74  → High
75–100 → Critical
```

These thresholds are **prototype values**, not an emergency-management standard. A production system would require domain validation, historical data, calibration, and clear governance before being used for operational safety decisions.

---

## Hazard Intelligence

SafeRoute AI is designed to support multiple information categories:

| Source type | Example signal | Use in SafeRoute AI |
|---|---|---|
| Weather | Heavy rainfall | Raises weather risk |
| Flood data | Water level / flood warning | Raises flood risk |
| Government alert | Disaster warning | Adds high-priority context |
| News / public reports | Local hazard report | Adds local evidence |
| Infrastructure | Abnormal telemetry | Raises infrastructure risk |
| Route data | Road path / segment | Connects hazards to the journey |

The project should clearly distinguish between **live verified data**, **public reports**, and **simulated prototype data**.

---

## Route Planning

### Current prototype behaviour

The original prototype contains a visual route representation centred on the Vijayawada → Hyderabad scenario.

### Dynamic-routing direction

The next routing layer is intended to support arbitrary locations across India rather than a fixed pair of cities.

Examples:

```text
Vijayawada → Hyderabad
Delhi → Mumbai
Bengaluru → Chennai
Visakhapatnam → Tirupati
Guntur → Vijayawada
Kolkata → Bhubaneswar
```

The key change is to resolve user-entered locations dynamically and then request a road route from a routing engine.

> Public geocoding and routing services have usage limits. A production deployment should use an appropriate provider or a self-hosted routing stack rather than assuming unlimited public API usage.

---

## Before and After Example

One of the clearest prototype demonstrations is the disaster simulation.

### Before

The route is in a normal state:

```text
Route status → baseline
Hazard signal → normal
Map → normal route representation
```

### After a simulated flood event

```text
Flood condition → active
Affected segment → high/critical risk
Map → hazard segment highlighted
AI explanation → updated
Safer alternative → available for selection where supported
```

This demonstrates the central product behaviour: **the route is not treated as static when the safety conditions change.**

---

## Real Project Code Example

The current Route Planner contains the following analysis-stage configuration:

```tsx
const ANALYSIS_STEPS = [
  'Connecting to weather data sources…',
  'Fetching flood risk information…',
  'Analyzing infrastructure anomalies…',
  'Processing hazard reports…',
  'Calculating route risk score…',
]
```

This sequence mirrors the intended pipeline shown in the UI: collect signals, analyze hazards, and produce a route risk result.

---

## Hindsight Integration

Hindsight is a persistent memory system for AI agents. Its core operations include **retain**, **recall**, and **reflect**. Official Hindsight documentation provides Node.js and Python clients for integrating memory into agent workflows.

For SafeRoute AI, a memory layer can be useful for an assistant that remembers previous route-analysis context, recurring hazard patterns, or the history of decisions made during a session.

### Important implementation note

The current frontend package configuration does **not** show Hindsight as a runtime dependency. Therefore, this README does not claim that Hindsight is already integrated into the production path of the current React prototype.

When the integration is actually added, document the exact backend file here, for example:

```text
backend/
└── hindsightMemory.ts
```

and describe the real data flow:

```text
Route / hazard context
        ↓
     Hindsight
        ↓
      retain
        ↓
   Memory bank
        ↓
      recall
        ↓
 AI route assistant context
```

A reference Node.js pattern using the official client is:

```ts
import { HindsightClient } from '@vectorize-io/hindsight-client'

const client = new HindsightClient({
  baseUrl: process.env.HINDSIGHT_BASE_URL,
})

await client.retain(
  'saferoute-demo',
  JSON.stringify({ route: 'example', hazard: 'flood', level: 'high' }),
)

const memory = await client.recall(
  'saferoute-demo',
  'What previous flood-related route information is relevant?',
)
```

This snippet is a **reference integration example**, not a claim that the exact code already exists in the current SafeRoute AI source tree. Keep Hindsight credentials on the server side and never expose private API keys in the browser.

Official documentation:

- Hindsight GitHub: https://github.com/vectorize-io/hindsight
- Hindsight API quick start: https://github.com/vectorize-io/hindsight/blob/main/hindsight-docs/docs/developer/api/quickstart.mdx

---

## Technology Stack

### Frontend

- React 19
- TypeScript
- Vite
- Tailwind CSS
- React component-based architecture

### Planned / integration-oriented services

- Geocoding service for location resolution
- Routing service for road paths
- Weather and flood data sources
- Hazard / disaster feeds
- Infrastructure or IoT telemetry
- AI risk-analysis layer
- Optional Hindsight memory layer for an AI assistant

### Development and deployment

- Git
- GitHub
- Vercel

---

## Project Architecture

```text
┌─────────────────────────────────────────────────────┐
│                   SafeRoute AI                      │
├─────────────────────────────────────────────────────┤
│                  React Frontend                     │
│                                                     │
│ Dashboard | Route Planner | Risk Map | Emergency   │
└───────────────────────┬─────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────┐
│              Route + Risk Intelligence              │
├─────────────────────────────────────────────────────┤
│ Geocoding | Routing | Hazard Fusion | Risk Scoring │
└───────────────────────┬─────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────┐
│                    Data Inputs                      │
├─────────────────────────────────────────────────────┤
│ Weather | Flood | Alerts | Reports | Infrastructure│
└───────────────────────┬─────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────┐
│            AI Explanation / Memory Layer             │
│      Optional Hindsight retain / recall / reflect    │
└─────────────────────────────────────────────────────┘
```

---

## Project Structure

A simplified view of the current frontend project is:

```text
SafeRoute-AI/
├── src/
│   ├── components/
│   ├── screens/
│   │   ├── RoutePlanner.tsx
│   │   ├── RouteMap.tsx
│   │   └── ...
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── .gitignore
└── README.md
```

File names can change as the project evolves.

---

## Getting Started

### Prerequisites

Install:

- Node.js 22+
- pnpm 10+
- Git

### Clone the repository

```bash
git clone https://github.com/anusha31tvr-creator/SafeRoute-AI.git
cd SafeRoute-AI
```

### Install dependencies

```bash
pnpm install
```

---

## Running the Application

Start the development server:

```bash
pnpm dev
```

Build for production:

```bash
pnpm build
```

Preview the production build locally:

```bash
pnpm preview
```

The project is configured as a Vite application.

---

## How to Use

### Basic flow

1. Open the application.
2. Enter an origin and destination.
3. Start route analysis.
4. Review the hazard and risk information.
5. Open the map to inspect affected segments.
6. Review the AI explanation.
7. Select a safer route when available.
8. Use emergency mode when disaster conditions require immediate safety information.

### Demo flow

For a controlled demonstration:

```text
Open Route Planner
      ↓
Choose route
      ↓
Run Analysis
      ↓
Open Risk Map
      ↓
Trigger Disaster Simulation
      ↓
Observe risk change
      ↓
Inspect AI explanation
      ↓
Choose safer route / emergency action
```

---

## Current Prototype Scope

The current repository is a functional UI prototype focused on demonstrating the SafeRoute AI workflow.

The prototype uses simulated or hardcoded elements in parts of the experience so that the complete concept can be shown consistently.

That includes areas such as:

- Simulated hazard signals
- Simulated infrastructure telemetry
- Prototype route risk values
- Visual map representation
- Disaster simulation states

These should be clearly labelled as simulation when shown to users.

---

## Limitations

A responsible prototype should state its limitations clearly.

### Data reliability

Public, delayed, incomplete, or unverified reports can produce false positives or false negatives.

### Prototype data

Simulated telemetry and hazard values are not equivalent to calibrated physical sensors or official emergency infrastructure.

### Routing coverage

Dynamic routing depends on the external routing/geocoding provider and its geographic coverage, availability, and usage limits.

### Risk scoring

Prototype thresholds are not an emergency-management standard and should not be treated as authoritative life-safety guidance.

### Infrastructure detection

Real infrastructure monitoring requires appropriate distributed sensors, utility telemetry, connectivity, fault-detection logic, and operational partnerships.

---

## Future Enhancements

### 🌐 India-wide dynamic routing

Replace fixed route examples with dynamic geocoding and road routing so users can select locations across India.

### 📡 Real sensor integration

Connect supported infrastructure and environmental telemetry sources.

### 🛰️ Stronger disaster intelligence

Add validated government and disaster-management feeds where access is available.

### 🧠 Better risk prediction

Use historical events, geospatial features, time series, and validated ML models to improve risk estimation.

### 🔔 Real-time alerts

Notify users when the risk of their active route changes materially.

### 📱 Mobile experience

Provide a mobile-first interface for people travelling during severe weather.

### 🧠 Persistent AI memory

Add Hindsight-backed memory for a route assistant that can retain and recall relevant user/session context.

### 🏠 Safe-location intelligence

Improve evacuation routing using shelter capacity, accessibility, and live availability where authoritative data exists.

### 🏛️ Institutional integration

Explore future integrations with municipalities, utilities, transportation agencies, and disaster-management systems.

---

## Screenshots and Demo

Add real application screenshots to this section before publishing the final project write-up.

Recommended screenshots:

1. Dashboard
2. Route Planner
3. Risk Map with a highlighted hazard
4. AI Risk Analysis explanation
5. Infrastructure Monitor
6. Disaster Simulation before/after
7. Emergency / Evacuation screen
8. Dynamic routing example using two different Indian locations

Recommended image folder:

```text
docs/
└── screenshots/
    ├── dashboard.png
    ├── route-planner.png
    ├── risk-map.png
    ├── ai-analysis.png
    ├── infrastructure-monitor.png
    ├── disaster-before.png
    ├── disaster-after.png
    └── emergency-mode.png
```

Then reference them from this README with normal relative Markdown image links.

---

## Public Project Link

### GitHub Repository

https://github.com/anusha31tvr-creator/SafeRoute-AI

### Live Demo

Add the final public deployment URL here after the Vercel deployment is confirmed.

```text
Live demo: <ADD_YOUR_FINAL_VERCEL_URL_HERE>
```

Do not publish a placeholder URL in a final article or social post.

---

## Safety and Responsible Use

SafeRoute AI is a decision-support prototype. It is not a replacement for official emergency instructions, local authorities, road-closure information, or professional disaster-management systems.

When real emergency data is available, the application should prioritize authoritative and timestamped sources and clearly display data freshness and source confidence.

The system should also avoid presenting uncertain model output as certainty. A high-risk prediction should be communicated as a warning based on available evidence, not as a guaranteed event.

---

## Project Status

**Current stage:** Functional prototype / active development.

### Implemented concept areas

- Route planning interface
- Risk analysis workflow
- Hazard visualization
- Infrastructure monitoring concept
- Disaster simulation
- Emergency mode concept
- AI explanation concept

### Active engineering direction

- Dynamic location support across India
- Real road routing
- Stronger live data integration
- Backend risk engine
- Verified Hindsight integration for persistent AI memory
- Production-grade validation and deployment

---

## Acknowledgements

SafeRoute AI builds on modern web technologies and publicly documented approaches for geospatial routing, disaster information, AI reasoning, and persistent agent memory.

Special thanks to the open-source projects and public-data ecosystems that make rapid prototyping possible.

---

## Author / Project

**SafeRoute AI**

Repository: https://github.com/anusha31tvr-creator/SafeRoute-AI

---

> **The goal is simple:** turn scattered disaster signals into a route-level safety decision that a traveller can understand and act on.
