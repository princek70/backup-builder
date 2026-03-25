# ArchitectAI — Intelligent Resume Builder

ArchitectAI is a premium, AI-powered resume builder designed to give professionals an edge in their career development. Built with Next.js, Tailwind CSS, and Prisma, it features a unique "Cloning Architecture" and real-time AI context evaluation.

## 🚀 Tech Stack

- **Frontend/Framework:** Next.js (App Router), React, Tailwind CSS
- **Database:** Prisma ORM with PostgreSQL (Neon)
- **AI Integration:** Google Gemini AI Studio
- **Animations:** Framer Motion
- **PDF Export:** Native Browser Print with strict `min-h-[11in]` calculations

## 🏗️ The "Cloning Architecture"

To ensure data integrity and prevent users from accidentally overwriting master templates, the application uses a strict cloning architecture:

1. **Master Templates (`Template` model)**
   - Hardcoded in the database (via `seed.ts`).
   - Marked with `isMaster: true`.
   - Act as read-only blueprints containing default layouts, styles, and dummy data.

2. **User Resumes (`UserResume` model)**
   - Created instantly when a user clicks "Get Started" on a template card.
   - The server explicitly maps `master.data` → `userResume.data` and preserves the `profileImage`.
   - All subsequent live edits in the builder side-panel write **only** to the `UserResume` record.

## 💰 Pricing Tiers (UI Implementation)

The platform is designed with a freemium upsell strategy built into `/pricing`:
- **₹0 (Basic Blueprint):** Entry-level access.
- **₹200 (Career Builder):** Pro tier with photo support and no watermarks.
- **₹300 (Full Architect):** The "Best Value" tier featured prominently with AI capabilities and lifetime storage.

## 🚀 Deployment (Vercel + Neon)

This repository is optimized for a zero-configuration deployment to Vercel. 

### 1. Database Setup (Neon)
Create a free PostgreSQL database on [Neon.tech](https://neon.tech) and copy your connection string.

### 2. Environment Variables
Copy `.env.example` to `.env` locally, or add these directly in your Vercel project settings:
```env
DATABASE_URL="postgresql://username:password@hostname/dbname?sslmode=require"
GEMINI_API_KEY="your-google-api-key"
ADMIN_PASSWORD="your-admin-password"
ADMIN_JWT_SECRET="your-jwt-secret"
```

### 3. Vercel Deployment
1. Import this repository into Vercel.
2. Add the environment variables from Step 2.
3. Deploy! The `package.json` is configured to run `prisma generate && next build` automatically, ensuring the database client is correctly synced before the app builds.

---
*Built with agentic precision.*
