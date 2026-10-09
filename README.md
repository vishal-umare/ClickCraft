# ClickCraft

AI-powered YouTube thumbnails, created in seconds. Describe your concept, choose a visual style, and generate professional thumbnails natively composed for both long-form and short-form videos.

## Structure

This is a monorepo consisting of:

- `frontend/` - The React/Vite/Tailwind landing page and application.
- `backend/` - The backend services (to be built).

## Getting Started

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Deployment

The project is configured for serverless deployment on **Vercel** with **MongoDB Atlas**, **Cloudinary**, and **Gemini API**.

### Infrastructure

- **Frontend**: Deploys as a standard Vite application on Vercel.
- **Backend**: Deploys as a Serverless API (`@vercel/node`) via `vercel.json`.
- **Database**: MongoDB Atlas.
- **Image Storage**: Cloudinary (uploaded via streams).
- **AI**: Google Gemini API.

### Environment Variables

Both frontend and backend require environment variables to run in production. See `.env.example` in both directories for the required keys.

**Frontend (`frontend/.env`)**:
- `VITE_API_URL`: The production backend URL (e.g., `https://clickcraft-backend.vercel.app/api`)

**Backend (`backend/.env`)**:
- `PORT`: 3000 (Local only)
- `SESSION_SECRET`: A secure random string
- `MONGODB_URI`: MongoDB Atlas connection string
- `GEMINI_API_KEY`: Google Gemini API key
- `CLOUDINARY_URL`: Cloudinary API URL
- `FRONTEND_URL`: The production frontend URL for CORS (e.g., `https://clickcraft.vercel.app`)

### Vercel Setup

1. **Frontend**: Import the `frontend` directory as a new Vercel project. Set the framework to Vite. Add `VITE_API_URL`.
2. **Backend**: Import the `backend` directory as a new Vercel project. The provided `vercel.json` will automatically configure it as a Node.js serverless app. Add all required backend environment variables.
