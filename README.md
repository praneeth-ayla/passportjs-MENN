## 🔧 Full Stack Auth App

This is a full-stack authentication project using **Next.js** on the frontend and **Express.js with Passport.js** on the backend. It supports multiple OAuth providers including Google, GitHub, Microsoft, Discord, LinkedIn, Twitter, and more.

---

### 📁 Structure

```
├── client    # Frontend (Next.js + Tailwind)
└── server    # Backend (Express.js + Passport)
```

---

## ⚙️ Backend – Express + Passport

### 🔌 Features

-   User authentication with Passport.js
-   MongoDB session handling via `connect-mongo`
-   Supports:
    -   Google, GitHub, Microsoft, Discord, LinkedIn, Twitter, Facebook, Apple
-   JWT generation for token-based flows
-   CORS configured to work with the frontend

### 📦 Installation

```bash
cd server
npm install
```

### 🚀 Run the server

```bash
npm start
```

> Server runs by default on `http://localhost:5000`

### 📄 Environment Variables (`.env`)

```env
PORT=5000
MONGO_URI=your_mongo_connection_string
SESSION_SECRET=your_session_secret
CLIENT_URL=http://localhost:3000

# OAuth credentials
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
MICROSOFT_CLIENT_ID=
MICROSOFT_CLIENT_SECRET=
DISCORD_CLIENT_ID=
DISCORD_CLIENT_SECRET=
LINKEDIN_CLIENT_ID=
LINKEDIN_CLIENT_SECRET=
TWITTER_CONSUMER_KEY=
TWITTER_CONSUMER_SECRET=
FACEBOOK_APP_ID=
FACEBOOK_APP_SECRET=
APPLE_CLIENT_ID=
APPLE_TEAM_ID=
APPLE_KEY_ID=
APPLE_PRIVATE_KEY=
```

> ⚠️ Apple Sign-In requires a paid Apple Developer Account to test ($100/year). It's set up but **not tested**.

---

## 🎨 Frontend – Next.js + Tailwind CSS

### 📦 Installation

```bash
cd client
npm install
```

### 🧪 Development

```bash
npm run dev
```

> Runs on `http://localhost:3000`

### 📄 Environment Variables (`.env.local`)

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

This allows the frontend to connect to the backend API and auth routes.

---

## ✅ Status

-   All providers except Apple have been fully tested and are working.
-   Code is clean and modular.
-   Easy to plug into any app.
