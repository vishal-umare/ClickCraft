# 🎨 ClickCraft — AI-Powered YouTube Thumbnail Generator

ClickCraft is a full-stack AI-powered thumbnail generation platform that helps content creators turn video ideas into engaging, click-worthy thumbnails. It combines AI image generation with customizable visual styles, color schemes, and multiple aspect ratios.

---

## 🚀 Features

### 🤖 AI Thumbnail Generation

- Generate thumbnails from video titles and creative prompts
- Powered by Google Gemini image generation
- Multiple visual styles:
  - Bold & Graphic
  - Tech/Futuristic
  - Minimalist
  - Photorealistic
  - Illustrated

### 🎨 Creative Customization

- Choose from multiple color schemes
- Add custom creative prompts
- Support for YouTube thumbnails and YouTube Shorts
- 16:9 and 9:16 aspect ratios

### 🔐 Authentication & Authorization

- Secure user registration and login
- Session-based authentication
- Protected generation routes
- Persistent authentication using server-side sessions
- Logout functionality

### 🖼️ Generation History

- View previously generated thumbnails
- Store generation metadata in MongoDB
- Cloudinary-powered image storage
- Delete generated thumbnails
- Personal generation history for each authenticated user

### ⚡ Serverless Image Processing

- Gemini image output processed directly in memory
- Images uploaded directly to Cloudinary
- No persistent server-side image storage
- Designed for serverless deployment environments

### 🛡️ Robust API Architecture

- RESTful backend APIs
- Authentication middleware
- Request validation
- Error handling
- MongoDB-backed session storage
- Production-ready CORS configuration

---

## 🛠️ Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- React Router
- Axios

### Backend

- Node.js
- Express.js
- TypeScript
- Express Session

### Database

- MongoDB
- Mongoose
- MongoDB Atlas

### AI

- Google Gemini API
- `@google/genai`

### Image Storage

- Cloudinary

### Deployment

- Vercel

---

## 🧠 Key Highlights

- Built a complete **AI-powered full-stack application**
- Implemented **session-based authentication** with MongoDB-backed sessions
- Designed a **protected API architecture** for authenticated users
- Integrated **Google Gemini** for AI image generation
- Implemented **direct in-memory image processing** for serverless compatibility
- Integrated **Cloudinary** for scalable image storage
- Built a personalized **generation history system**
- Designed the application for **production deployment on Vercel**
- Implemented responsive UI with dedicated light and dark themes

---

## 🔄 Generation Workflow

```text
User
  ↓
Enter Video Idea
  ↓
Choose Style + Color + Format
  ↓
Generate Thumbnail
  ↓
Backend API
  ↓
Google Gemini
  ↓
Image Buffer
  ↓
Cloudinary
  ↓
MongoDB
  ↓
Generated Thumbnail