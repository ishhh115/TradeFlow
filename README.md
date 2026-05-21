# TradeFlow — Leads Management Platform

A scalable full-stack REST API with JWT authentication, role-based access control, and a React dashboard.


## Live Demo
- Frontend: https://trade-flow-kappa.vercel.app
- Backend API: https://tradeflow-tjpe.onrender.com/api/v1
- Swagger Docs: https://tradeflow-tjpe.onrender.com/api/v1/docs

## Test Accounts
- Admin: `admin@test.com` / `password123`
- Staff: Register via `/register` (staff role by default)

## Tech Stack
- Frontend: React, TypeScript, Vite, Tailwind CSS
- Backend: Node.js, Express, MongoDB, JWT
- Security: Helmet, Rate Limiting, bcrypt, express-validator
- Logging: Morgan
- Docs: Swagger UI
- Deployment: Vercel (frontend), Render (backend)

## Features
- JWT authentication with role-based access control (admin / staff)
- Full CRUD operations for leads
- API versioning (`/api/v1/`)
- Swagger API documentation at `/api/v1/docs`
- Debounced search, filters by status & source, sorting, pagination
- CSV export (admin only)
- Rate limiting (100 req / 15 min per IP)
- Security headers via Helmet.js
- Request logging via Morgan
- Dark mode
- Docker support

## Prerequisites
- Node.js (v18+ recommended)
- npm
- MongoDB (local or hosted) or Docker

## Environment Variables
Copy `.env.example` to `.env` in `smart-leads/server/`:

- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — JWT signing secret
- `PORT` — backend port (default: 5000)
- `CLIENT_URL` — frontend URL for CORS

## Quick Start (local)

**Backend**
```bash
cd smart-leads/server
npm install
cp .env.example .env
npm run dev
```

**Frontend**
```bash
cd smart-leads/client
npm install
cp .env.example .env
npm run dev
```

Frontend runs at `http://localhost:5173`, backend at `http://localhost:5000`.

## Docker
```bash
docker-compose up --build
```

## API Documentation
Swagger UI available at `http://localhost:5000/api/v1/docs` when running locally.

## Scalability
See [SCALABILITY.md](./smart-leads/SCALABILITY.md) for notes on horizontal scaling, caching, microservices, and deployment strategies.

## License
MIT