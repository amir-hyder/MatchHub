# MatchHub

---

## Team Name  
MatchHub

## Level of Achievement (LoA)  
Apollo 11

---

## Project Scope

**One-Sentence Version**  
A unified web platform to match NUS students for tutorial/lab swaps, hall/CCA mentorship, and study-buddy or project-team pairing.

**Detailed Version**  
MatchHub offers:  
1. **Slot Matching** – Automates one-to-one or multi-way swaps for tutorials/labs.  
2. **Hall & CCA Mentorship** – Pairs freshmen with senior mentors in chosen halls/CCAs.  
3. **Study-Buddy/Project Teams** – Finds peers with overlapping schedules and shared course interests.  
4. **Notifications & Status** – In-app alerts and optional email updates on match progress.  
5. **Integrated Chat** – Temporary, secure messaging for matched users.  
6. **Enrollment Verification** – Uses EduRec API to confirm valid swaps.

---

## Problem Motivation  
- Manual slot swaps in large chats are slow and unreliable.  
- Freshmen lack structured ways to find hall/CCA mentors.  
- No centralized method exists to form study or project pairs.  
- Lack of enrollment verification causes wasted time on invalid matches.

---

## Core Features / User Stories

1. **Slot Matching**  
   - *User Story*: “I want to swap my current tutorial slot with a compatible peer automatically.”  
   - Accept multiple alternates, support multi-way chains, and visualize demand.

2. **Hall & CCA Mentorship**  
   - *User Story*: “As a freshman, I want a senior mentor in my chosen hall/CCA.”  
   - Matches based on shared hall/CCA interest and mentor availability.

3. **Study-Buddy & Project Teams**  
   - *User Story*: “I want to find classmates with similar free slots and course interests.”  
   - Filters by module codes and time slots; sorts by compatibility.

4. **Notifications**  
   - *User Story*: “Notify me immediately when a match is found or confirmed.”  
   - In-app alerts and optional email reminders for pending or completed matches.

5. **Secure Chat**  
   - *User Story*: “I want to chat with my match anonymously before confirming.”  
   - Each match has a dedicated, encrypted chat channel with temporary handles.

6. **Enrollment Verification**  
   - *User Story*: “Ensure my swap partner is enrolled in the claimed slot.”  
   - Calls EduRec API to validate enrollment before creating a swap request.

---

## System Design

**Architecture**   
[React Frontend]
↓ HTTPS/API
[Express Backend] ←→ [PostgreSQL Database]
↓
Matching Worker (cron/BullMQ)
↓
Third-Party APIs (EduRec, NUSMods)
↓
Notifications (SendGrid, Optional FCM)

### Components

- **Frontend (React + Tailwind)**  
  - **Pages**:  
    1. **Login/Registration** (local JWT PoC; later NUS SSO)  
    2. **Dashboard** (tabs: Slot Matching, Mentor Matching, Study Matching)  
    3. **Request Forms** (swap, mentor, study)  
    4. **Notifications & Chat**  

- **Backend (Node.js + Express)**  
  - **Auth**: JWT (PoC) → NUS SSO OAuth  
  - **Endpoints**:  
    - `POST /api/auth/*` (register/login or SSO callbacks)  
    - `GET /api/modules/:code/slots` (cached via NUSMods)  
    - `POST /api/swaps`, `GET /api/swaps/user`, `POST /api/swaps/:id/confirm`  
    - `POST /api/mentors`, `GET /api/mentors/user`, `POST /api/mentors/:id/confirm`  
    - `POST /api/study-requests`, `GET /api/study-requests/user`, `POST /api/study-requests/:id/confirm`  
    - `GET /api/chat/:matchId/messages`, `POST /api/chat/:matchId/messages`  
    - `GET /api/notifications/user`, `PUT /api/notifications/:id/read`  

  - **Matching Worker** (runs every 5 minutes):  
    1. Fetch pending swap/mentor/study requests.  
    2. One-to-one or multi-way swap logic for slots.  
    3. Pair mentor/mentee by hall/CCA.  
    4. Compute compatibility for study requests.  
    5. Update statuses, assign a shared `match_id`, enqueue notifications.

- **Database (PostgreSQL)**  
  - **Users**: `id, email, password_hash (PoC), nusnet_id, name, role, timestamps`  
  - **Modules**: `code (PK), name, acad_year, semester`  
  - **Slots**: `id, module_code, slot_type, slot_code, day_of_week, start_time, end_time, capacity, timestamps`  
  - **Enrollments**: `id, user_id, slot_id, status, timestamps`  
  - **SwapRequests**: `id, requester_id, module_code, from_slot_id, alternates (text[]), notes, status, match_id (UUID), timestamps`  
  - **MentorRequests**: `id, requester_id, interest_type, interest_value, status, mentor_id, match_id (UUID), timestamps`  
  - **StudyRequests**: `id, requester_id, modules (text[]), free_time_slots (text[]), project_topics (text[]), status, match_id (UUID), timestamps`  
  - **Chats**: `id, match_id (UUID), sender_id, content, timestamps`  
  - **Notifications**: `id, user_id, type, payload (JSONB), is_read, timestamps`

---

## Development Plan & Milestones

1. **Milestone 1 (Due 2 June, 2 pm)**  
   - Finalize problem motivation and feature list.   
   - Deliverables:  
     - `README.docx` with scope, features, design overview, and plan.  
     - GitHub repo with minimal PoC (login form).  
     - Poster & video on Skylab.

2. **Milestone 2 (Due 30 June, 2 pm)**  
   - Set up PostgreSQL and run migrations; seed modules/slots.  
   - Build backend endpoints for swap creation and retrieval; verify via EduRec PoC.  
   - Frontend integration: fetch slot list, submit swap, view “Pending.”  
   - Matching worker for one-to-one slot swaps (status → “Matched,” set `match_id`).  
   - Deliverables:  
     - Proto demo: submit two complementary swaps → worker matches.  
     - Updated README with setup and API details.

3. **Milestone 3 (Due 28 July, 2 pm)**  
   - Implement “Confirm Swap” flow and update `enrollments`.  
   - Hall/CCA mentor endpoints and matching logic.  
   - Study-buddy matching endpoints and worker logic.  
   - Secure chat with socket.io and message persistence.  
   - Email notifications via SendGrid; optional push (FCM).  
   - EduRec enrollment verification in production.  
   - Peer feedback testing and bug fixes.  
   - Deliverables:  
     - Full feature demo (swap + confirm, mentor match, study match, chat, notifications).  
     - Updated README with test results and user feedback.

4. **Splashdown (By 27 Aug)**  
   - UI/UX polish, responsive design, accessibility.  
   - Comprehensive unit/integration tests (Jest + Supertest; React Testing Library; worker tests).  
   - Switch PoC JWT to NUS SSO fully.  
   - Final README (≥30 pages) with complete docs.  
   - A1 poster & demo video.  
   - Project log with ≥140 hours per team member.

---

## Tech Stack

- **Frontend**  
  - React (v18) + Tailwind CSS  
  - Vite (or Create React App)  
  - React Query for data fetching  
  - socket.io-client for chat  
  - Optional: Firebase Cloud Messaging for push

- **Backend**  
  - Node.js (v16+) + Express  
  - Sequelize ORM for PostgreSQL  
  - JWT (PoC) → NUS SSO OAuth (production)  
  - BullMQ (Redis) or node-cron for matching  
  - socket.io for real-time chat  
  - SendGrid for email notifications  
  - Optional: Firebase Cloud Messaging server integration

- **Database**  
  - PostgreSQL (v13+)  
  - Redis (for BullMQ queues and caching NUSMods responses)

- **External APIs**  
  - NUSMods API (module/slot data)  
  - EduRec API (enrollment verification)  
  - SendGrid API (emails)  
  - Firebase Cloud Messaging (optional push)

- **DevOps & CI/CD**  
  - GitHub with trunk-based development  
  - GitHub Actions: ESLint, Jest tests, migration checks on PRs  
  - Hosting:  
    - Backend: Heroku or Render (Node)  
    - Database: Heroku Postgres or AWS RDS  
    - Frontend: Vercel or Netlify  
  - Migrations: Sequelize CLI  
  - Testing: Jest + Supertest (backend), React Testing Library (frontend), worker unit tests

---

## Setup & Deployment

### Prerequisites  
- Node.js v16+  
- npm or yarn  
- PostgreSQL v13+ (local or hosted)  
- Redis (for worker)  
- Git  
- SendGrid Account (API key)  
- (Optional) Firebase Project for FCM

### 1. Clone & Configure  
```bash
git clone https://github.com/<your-org>/matchhub.git
cd matchhub