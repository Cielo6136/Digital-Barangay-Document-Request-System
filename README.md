# Digital-Barangay-Document-Request-System

A web-based document request and tracking system for barangay operations. Residents can submit document requests online and track their status in real time, while administrators can manage and update request progress through a dedicated dashboard.

---

## System Overview

The system supports two roles:

**User** — can register an account, submit document requests, and track the status of their requests through a step-by-step progress tracker.

**Admin** — can view all pending document requests, review request details, and update the status of each request as it moves through the workflow.

---

## Tech Scope

| Layer | Technology |
|---|---|
| Frontend | Vanilla HTML, CSS, JavaScript |
| Backend | Java 21, Spring Boot 4.0.6 |
| Build Tool | Gradle (Groovy) |
| Data Storage | In-memory (Java ArrayLists — no database) |
| Deployment | Frontend → Vercel, Backend → Railway (optional) |

---

## System Structure

```
Digital-Barangay-Document-Request-System/
├── frontend/
│   ├── assets/
│   │   └── images/
│   │       └── Northern_Samar_Provincial_Logo.png
│   ├── css/
│   │   └── styles.css
│   ├── html/
│   │   ├── admin/
│   │   │   ├── archives.html
│   │   │   ├── dashboard.html
│   │   │   ├── document-details.html
│   │   │   ├── manage-requests.html
│   │   │   └── users.html
│   │   ├── activities.html
│   │   ├── dashboard.html
│   │   ├── login.html
│   │   ├── profile.html
│   │   ├── request-form.html
│   │   ├── signup.html
│   │   └── status.html
│   ├── js/
│   │   ├── activities.js
│   │   ├── admin-dashboard.js
│   │   ├── admin-users.js
│   │   ├── archives.js
│   │   ├── auth.js
│   │   ├── document-details.js
│   │   ├── manage-requests.js
│   │   ├── profile.js
│   │   ├── request-form.js
│   │   ├── status.js
│   │   └── user-dashboard.js
│   └── index.html
├── src/
│   └── main/
│       ├── java/com/barangay/dbdrs/
│       │   ├── DbdrsApplication.java
│       │   ├── config/
│       │   │   └── CorsConfig.java
│       │   ├── controller/
│       │   │   ├── AuthController.java
│       │   │   └── RequestController.java
│       │   ├── model/
│       │   │   ├── DocumentRequest.java
│       │   │   └── User.java
│       │   ├── service/
│       │   │   ├── AuthService.java
│       │   │   └── RequestService.java
│       │   └── storage/
│       │       └── InMemoryStore.java
│       └── resources/
│           └── application.properties
├── build.gradle
├── README.md
├── Procfile
└── system.properties
```

---

## Running the System Locally

### Prerequisites
- Java 21 (Eclipse Temurin or Amazon Corretto recommended)
- IntelliJ IDEA
- A modern browser (Chrome or Edge)

### Guide

1. Open the project in IntelliJ IDEA
2. Let Gradle download dependencies automatically
3. Run `DbdrsApplication.java` using the green Run button
4. Wait for the console to show:
   ```
   Started DbdrsApplication in X seconds
   ```
5. Open `frontend/html/login.html` in your browser via IntelliJ's built-in server (right-click → Open In → Browser)

The backend runs on `http://localhost:8080` and the frontend communicates with it via `fetch()` calls in `auth.js`.

---

## Demo Credentials

| Role | Email | Password |
|---|---|---|
| Admin | admin@dbdrs.com | admin123 | #what you put if you want to login as admin
| User | register via signup | your chosen password |

The admin account is pre-seeded in `InMemoryStore.java` on server startup. All other accounts are created through the signup form.

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/login` | Login and return user with role |
| GET | `/api/auth/users` | Get all registered users (admin) |
| POST | `/api/requests` | Submit a document request |
| GET | `/api/requests` | Get all requests (admin) |
| GET | `/api/requests/{email}` | Get requests by user email |
| PUT | `/api/requests/{id}/status` | Update request status (admin) |

---

## Document Request Statuses

Requests move through the following statuses, updated by the admin:

```
PENDING → APPROVED → PROCESSING → READY → COMPLETED
```

Users can track this progress in real time on the Tracking Progress page.

---

## Key Design Decisions

**No database** — data is stored in Java `ArrayList` objects inside `InMemoryStore.java`, which acts as a singleton shared across all requests. This keeps the setup simple for a demo environment. All data resets when the server restarts.

**Single login form for both roles** — there is no role selector on the login screen. The backend determines the user's role from their credentials and the frontend redirects accordingly — admins go to the admin dashboard, users go to the user dashboard.

**Session management via `sessionStorage`** — logged-in user data (name, email, role) is stored in the browser's `sessionStorage`. Each browser tab holds its own session independently, allowing admin and user to be logged in simultaneously on different tabs or windows.

**CORS configuration** — `CorsConfig.java` allows the frontend (served from IntelliJ's built-in server on a different port) to make requests to the Spring Boot backend on port 8080.

**Separated CSS** — all shared styles (header, nav, footer, buttons) live in `styles.css`. Page-specific styles are scoped within each HTML file's `<style>` block.

---

## Limitations

- Data does not persist between server restarts
- No password hashing — passwords are stored as plain text (acceptable for demo only)
- No authentication tokens — API endpoints are accessible without a valid session if called directly
- Admin and user must share the same machine and browser for live data to be visible across sessions (unless backend is deployed to a live server)

---

## Deployment (Optional)

For a live demo accessible from multiple devices, deploy both layers:

**Frontend → Vercel**
- Push the repository to GitHub
- Connect to Vercel, set root directory to `frontend`
- Add `frontend/index.html` as an entry point redirect to `html/login.html`

## Members:
- Gallano, Mark Cielo
- Gumatay, Gian Carlos
- Capoquian, Jojo
- Estrada, Sahm
- Balading, Axl Jmaes
