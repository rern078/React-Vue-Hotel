# Hotel System

A full-stack hotel management system with:

- **Backend** — Node.js + Express API (rooms, bookings, stats)
- **React App (Admin)** — Dashboard, rooms CRUD, booking management
- **Vue App (User Portal)** — Browse rooms, book a stay, view my bookings

## Project structure

```
├── backend/          # API (Express)
├── react-admin/      # Admin UI (React + Vite)
├── vue-user-portal/  # Guest UI (Vue 3 + Vite)
└── README.md
```

## Prerequisites

- **Node.js** 18+ and **npm**
- **MySQL** 5.7+ or 8+

## Database (MySQL)

The backend uses MySQL for rooms and bookings.

### 1. Create database

Create a database named **hoteldb** in MySQL.

**Option A — from the backend (uses your `.env`):**
```bash
cd backend
npm run db:create
```

**Option B — using MySQL client:**
```bash
mysql -u root -p -e "CREATE DATABASE hoteldb;"
```

**Option C — in MySQL Workbench or phpMyAdmin:**  
Create a new schema/database named `hoteldb`.

### 2. Configure connection

In `backend/`, copy `.env.example` to `.env` and set your credentials:

```env
# Option 1: URL
DATABASE_URL=mysql://root:yourpassword@localhost:3306/hoteldb

# Option 2: Individual vars
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=yourpassword
MYSQL_DATABASE=hoteldb
```

**"Password authentication failed" or "Access denied"?**

Set `MYSQL_PASSWORD` (or the password in `DATABASE_URL`) in `backend/.env` to the same password you use for the MySQL **root** user. Restart the backend (`npm run dev`).

### 3. Run schema and seed

```bash
cd backend
npm install
npm run db:init    # creates tables
npm run db:seed    # inserts sample rooms (only if table is empty)
```

## Quick start

### 1. Start the API

```bash
cd backend
npm run dev
```

API runs at **http://localhost:3001**.

### 2. Start React Admin

In a new terminal:

```bash
cd react-admin
npm install
npm run dev
```

Admin UI: **http://localhost:5173**

### 3. Start Vue User Portal

In another terminal:

```bash
cd vue-user-portal
npm install
npm run dev
```

User portal: **http://localhost:5174**

## Features

### Backend (`/api`)

- `GET/POST /api/rooms` — List and create rooms
- `GET/PUT/DELETE /api/rooms/:id` — Room by ID
- `GET/POST /api/bookings` — List and create bookings
- `PATCH/DELETE /api/bookings/:id` — Update or cancel booking
- `GET /api/stats` — Dashboard stats (rooms, bookings counts)

### React Admin

- **Dashboard** — Stats and recent bookings
- **Rooms** — Add, edit, delete rooms
- **Bookings** — Filter by status; confirm or cancel

### Vue User Portal

- **Rooms** — Grid of available rooms
- **Room detail** — Book with name, email, dates, guests
- **My Bookings** — Look up bookings by email

## Data

The backend uses **MySQL**. Tables: `rooms`, `bookings`. See **Database (MySQL)** above for setup.
