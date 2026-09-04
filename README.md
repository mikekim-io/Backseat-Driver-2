# Backseat Driver 2

A voice command driven 3D interactive simulation.
_Please backseat drive responsibly!_

**Live Site**: https://backseat-driver-2.web.app

## Gameplay Mechanics

Backseat Driver is a 3D driving simulation in which the player's movement is controlled by voice commands rather than keyboard or touch inputs. The player's goal is to navigate through a 3D city grid to reach a designated yellow goal zone. The voice recognition model accepts several concise commands: `go`, `stop`, `left`, `right`, `up`, `down`. Course completion is timed and recorded on a global leaderboard powered by Firebase Firestore.

## Modern Tech Stack

- **Runtime & Package Manager**: Node.js & `pnpm`
- **Build Tool**: Vite 6 (ESM, fast HMR)
- **Frontend Framework**: React 18 & React-Bootstrap 2
- **State Management**: Redux Toolkit
- **3D Graphics & Physics**: Three.js, `@react-three/fiber`, `@react-three/drei`, `@react-three/cannon`
- **Machine Learning**: TensorFlow.js & `@tensorflow-models/speech-commands`
- **Backend & Database**: Firebase 10+ (Firestore & Firebase Hosting)

## How to Play

Use the following voice commands to control your car:

- **Go**: Gas (Engage first gear)
- **Stop**: Stop / Brake
- **Right**: Turn 90 degrees right
- **Left**: Turn 90 degrees left
- **Up**: Accelerate
- **Down**: Decelerate
- **Screen click**: Enable panning camera (cursor lock)
- **ESC Key**: Camera lock (show cursor)

Make it to the yellow goal zone as fast as possible!

## Installation & Local Development

### 1. Install Dependencies

Make sure you have Node.js (>= 18) and `pnpm` installed:

```bash
pnpm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and fill in your Firebase project credentials if needed:

```bash
cp .env.example .env
```

### 3. Start Development Server

```bash
pnpm dev
```

The game will be available at `http://localhost:3000`.

### 4. Build for Production

```bash
pnpm build
```

The production assets will be output to the `dist/` directory, ready to deploy to Firebase Hosting.

## Firebase Deployment

Deploy to Firebase Hosting and Firestore:

```bash
npx firebase-tools deploy
```

## Credits

- **Music**: Synthwave - Ryan Andersen | https://freemusicarchive.org/music/Ryan_Andersen/Pop_Music/Synthwave
- **Car Model**: Kingman257 - McLaren | https://sketchfab.com/3d-models/mc-laren-5b3ea73446204fd0b90a8cbf24d6c3a1
