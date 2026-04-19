# FinTrack

A full-stack personal finance tracker built with React + TypeScript on the frontend and FastAPI + SQLAlchemy on the backend.

---

## Tech Stack

**Frontend**
- React 19 with TypeScript
- Vite
- React Router v6
- Tailwind CSS
- Context API + useReducer for global state

**Backend**
- FastAPI (async)
- SQLAlchemy 2.0 (async) with aiosqlite
- Pydantic v2 for validation
- JWT authentication via python-jose
- bcrypt password hashing via passlib

---

## Project Structure

```
fintrack/
├── frontend/                  # React + TypeScript app
│   └── src/
│       ├── components/        # Reusable UI components
│       ├── context/           # Global state (ExpenseContext)
│       ├── hooks/             # Custom hooks (useExpenseStats)
│       ├── pages/             # Route-level page components
│       └── types.ts           # Shared TypeScript interfaces
│
├── backend/                   # FastAPI app
│   └── app/
│       ├── core/
│       │   ├── auth.py        # JWT logic, password hashing, get_current_user
│       │   └── config.py      # Pydantic settings from .env
│       ├── routers/
│       │   ├── auth.py        # POST /auth/register, POST /auth/login
│       │   └── expenses.py    # GET/POST/DELETE /expenses
│       ├── crud.py            # Reusable DB queries
│       ├── database.py        # Async engine, session, Base
│       ├── models.py          # SQLAlchemy table definitions
│       ├── schemas.py         # Pydantic request/response models
│       └── main.py            # App entry point, CORS, router registration
│
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.11+

### Backend setup

```bash
cd backend
python -m venv .venv
source .venv/bin/activate      # Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

Create a `.env` file inside `backend/`:

```bash
DATABASE_URL=sqlite+aiosqlite:///./fintrack.db
SECRET_KEY=your-secret-key-here   # generate with: openssl rand -hex 32
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=10080  # 7 days
```

Start the backend:

```bash
uvicorn app.main:app --reload
```

API runs at `http://localhost:8000`. Interactive docs at `http://localhost:8000/docs`.

### Frontend setup

```bash
cd frontend
npm install
npm run dev
```

App runs at `http://localhost:5173`.

---

## API Endpoints

### Auth

| Method | Endpoint | Description | Auth required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Create a new account | No |
| POST | `/auth/login` | Login and receive JWT | No |

### Expenses

| Method | Endpoint | Description | Auth required |
|--------|----------|-------------|---------------|
| GET | `/expenses` | Get all expenses for current user | Yes |
| POST | `/expenses` | Create a new expense | Yes |
| DELETE | `/expenses/{id}` | Delete an expense | Yes |
| GET | `/expenses/categories` | Get distinct categories for current user | Yes |

All protected endpoints require an `Authorization: Bearer <token>` header.

---

## Features

- User registration and login with JWT authentication
- Add, view, and delete personal expenses
- Expenses are private — each user only sees their own
- Dashboard with total spent, expense count, and breakdown by category
- Category dropdown populated dynamically from existing expenses
- Fully responsive — works on mobile and desktop

---

## Design Decisions

**Async FastAPI over Supabase** — the backend is a hand-written FastAPI app rather than a hosted BaaS, demonstrating real backend development with custom auth, database modelling, and business logic.

**useReducer over useState for expenses** — all expense state mutations go through a typed discriminated union reducer, making state transitions explicit and predictable.

**Context API over Redux** — the app's state surface is small enough that a custom context + reducer covers all needs without the boilerplate overhead of Redux.

**No refresh tokens** — access tokens are long-lived (7 days) as a deliberate tradeoff for simplicity. A production version would implement short-lived access tokens with a refresh token rotation strategy.

**Dynamic categories** — rather than a separate `categories` table, categories are derived via `SELECT DISTINCT` on the expenses table, keeping the schema simple while still supporting the dropdown UX.

---

## Future Improvements

- Refresh token rotation
- Expense editing
- Date range filtering
- Charts and spending trends on the dashboard
- PostgreSQL + Docker Compose for production deployment
- End-to-end tests with Playwright