# Setup

## Wardrope Whisper - Virtual Dressing App

### Services
- Backend (Node/Express, TS) in `backend`
- AI Service (FastAPI) in `ai-service`
- Frontend (Expo React Native) in `frontend`

### Prerequisites
- Node.js 18+
- Python 3.11/3.12/3.13
- PowerShell 7 (on Windows)

### Install dependencies

```powershell
cd "E:\Code\New folder (2)\backend"; npm install
cd "E:\Code\New folder (2)\frontend"; npm install
cd "E:\Code\New folder (2)\ai-service"; if (!(Test-Path .venv)) { python -m venv .venv }; .\.venv\Scripts\pip install -r requirements.txt
```

### Run services

1) AI Service
```powershell
cd "E:\Code\New folder (2)\ai-service"; .\.venv\Scripts\uvicorn main:app --host 0.0.0.0 --port 8000
```

2) Backend
```powershell
cd "E:\Code\New folder (2)\backend"; $env:PORT='4000'; $env:AI_SERVICE_URL='http://localhost:8000'; $env:JWT_SECRET='devsecret'; npm run dev
```

3) Frontend (Expo)
```powershell
cd "E:\Code\New folder (2)\frontend"; $env:EXPO_PUBLIC_API_URL='http://localhost:4000/api'; npx expo start --tunnel
```

### Verify
- Backend health: `http://localhost:4000/health`
- AI service health: `http://localhost:8000/health`
- In the app, Register and Login should navigate to Main tabs.
- Catalog tab should list items from backend.
- Recommend tab should return items from AI service via backend proxy.

