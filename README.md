# ft_transcendence

A full-stack multiplayer web application built around a real-time Pong game. The final project of the [42 / Hive School](https://www.hive.fi) common core curriculum.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Requirements](#requirements)
- [Setup & Running](#setup--running)
- [What I Did](#what-i-did)
- [License](#license)

---

## Overview

ft_transcendence is a full-stack web platform where players can register, manage profiles, compete in real-time Pong matches against other players or an AI opponent, and participate in tournaments. The application is built on a microservices architecture, containerized with Docker, and secured with JWT authentication and optional two-factor authentication (2FA).

## Features

- **Real-time Pong** — Play against human opponents or an AI via WebSockets
- **User Management** — Registration, login, profile customization, and avatars
- **JWT Authentication** — Secure token-based auth with refresh token support
- **Two-Factor Authentication (2FA)** — Optional extra layer of account security
- **Google OAuth** — Sign in with a Google account
- **Tournaments** — Create and participate in competitive brackets
- **Match History & Stats** — Track wins, losses, and performance over time
- **Multi-language Support** — Accessible to a diverse userbase
- **Containerized Deployment** — All services managed with Docker Compose

## Tech Stack

**Frontend**
- React + TypeScript
- Tailwind CSS

**Backend**
- Node.js + Fastify (microservices)
- WebSockets (real-time game communication)
- SQLite + Sequelize ORM

**Infrastructure**
- Docker & Docker Compose
- API Gateway (centralized routing to microservices)
- GitHub Actions (CI/CD workflows)

## Project Structure

```
ft_transcendence/
├── frontend/          # React/TypeScript SPA
├── gateway/           # API Gateway service
├── services/          # Backend microservices
│   └── auth-service/  # Authentication & JWT handling
├── test/              # Test scripts
├── docs/              # Documentation
├── docker-compose.yml
└── Makefile
```

## Requirements

- Docker
- Docker Compose

No other dependencies need to be installed manually — everything runs inside containers.

## Setup & Running

**1. Clone the repository**

```bash
git clone https://github.com/joellehtonen/ft_transcendence.git
cd ft_transcendence
```

**2. Configure environment variables**

Copy the example env file and fill in your own values:

```bash
cp ./services/auth-service/.env.example ./services/auth-service/.env
```

Open `.env` and replace the placeholders:

```env
# JWT secrets (32+ characters recommended)
JWT_SECRET=your-jwt-secret-here
JWT_REFRESH_SECRET=your-refresh-secret-here

# 2FA encryption key
TWOFA_ENC_KEY=your-2fa-encryption-key-here

# Google OAuth credentials
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
```

**3. Build and start all containers**

```bash
make
```

This step may take 2–3 minutes on first run.

**4. Open the application**

Navigate to: [https://localhost:8443](https://localhost:8443)

The app uses a self-signed certificate, so your browser will show a security warning. Click **Advanced → Proceed to localhost (unsafe)** to continue.

![Self-signed certificate warning step 1](z-images/self-signed-1.png)

![Self-signed certificate warning step 2](z-images/self-signed-2.png)

Once past the warning, you'll land on the home page:

![Home page](z-images/First-page.png)

---

## Screenshots

![Main page](z-images/main-page.png)

![Game view](z-images/game.png)

---

## What I Did

This was a team project. My personal contributions included:

- Designing the layout of the web page with the other frontend engineer
- Designing the look of the web page
- Most of the components (navbar, search bar, icons, dropdown, etc)
- Main user page, rival pages, statistics
- Merging frontend with backend with our backend engineer, fetching backend data
- Managing user login data (contexts)
- Most of the UI/UX polish

---

## License

This project was developed as part of the 42 / Hive School curriculum. No license is explicitly provided.
