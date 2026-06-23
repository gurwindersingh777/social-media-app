# 📸 Social Media App

A full-stack social media app where users can sign up, log in, and share posts with text and images.

🔗 **Live Demo:** [social-media-app-three-tawny.vercel.app](https://social-media-app-three-tawny.vercel.app/)  
🛠️ **Backend API:** [social-media-app-5w67.onrender.com](https://social-media-app-5w67.onrender.com/health)

---

## ✨ Features

- 🔐 **JWT Authentication** — Secure sign up and login
- 📝 **Create Posts** — Share text content with your feed
- 🖼️ **Image Uploads** — Upload and host images via Cloudinary
- 📰 **Feed** — View all posts from the community

---

## 🛠️ Tech Stack

| Layer     | Technology                  |
|-----------|-----------------------------|
| Frontend  | React, Material UI (MUI)    |
| Backend   | Node.js, Express            |
| Database  | MongoDB, Mongoose           |
| Storage   | Cloudinary                  |

---

## 🚀 Getting Started

**1. Clone the repo**
```bash
git clone <your-repo-url>
```

**2. Install dependencies**
```bash
# Backend
cd backend && npm install

# Frontend
cd frontend && npm install
```

**3. Configure environment variables**

Create a `.env` file inside `/backend`:
```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

**4. Run the app**
```bash
# Backend
npm run server

# Frontend
npm run dev
```

---

## 📁 Project Structure

```
my-social-app/
├── backend/
│   ├── config/         # DB & Cloudinary setup
│   ├── controllers/    # Request handlers
│   ├── middleware/     # Auth & file upload (Multer)
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API routes
│   └── index.js        # Entry point
│
└── frontend/
    └── src/
        ├── components/ # Reusable UI (Navbar, PostCard, CreatePost)
        ├── context/    # AuthContext
        ├── pages/      # Feed, Login
        └── App.jsx     # Routing
```

---

