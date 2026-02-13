# 🚀 SmartTracker – Meeting Action Items Tracker

SmartTracker is a mini workspace web app that converts messy meeting transcripts into structured, actionable task lists using AI.

Built as part of the AGGROSO Full-Stack Developer assignment.

---

## ✨ Features Implemented

### ✅ Core Requirements
- Paste meeting transcript
- AI extraction of:
  - Task
  - Owner (if available)
  - Due date (if available)
- Edit tasks
- Delete tasks
- Mark tasks as completed
- Redirect to transcript page after extraction

### ✅ Bonus Improvements
- Responsive layout (desktop sidebar + mobile sheet)
- Optimistic UI updates
- Clean architecture separation (Server vs Client)
- Strong schema validation
- Database normalization

---

## 🏗 Tech Stack

- **Next.js (App Router)**
- **TypeScript**
- **Drizzle ORM**
- **Neon PostgreSQL**
- **OpenAI (gpt-4o-mini)**
- **Tailwind CSS**
- **shadcn/ui components**

---


## ⚙️ How to Run Locally

### 1️⃣ Clone the repository

```bash
git clone https://github.com/GauravNardia/aggroso-assignment.git

cd aggroso-assignment
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Setup environment variables

#### Create .env
```bash
DATABASE_URL=neon-posgress-db-url

OPENAI_API_KEY=OPENAI_API_KEY
```

### 4️⃣ Run migrations

```bash
npx drizzle-kit generate

npx drizzle-kit migrate

npx drizzle-kit push
```

### 5️⃣ Start development server

```bash
npm run dev

visit:
http://localhost:3000

```
