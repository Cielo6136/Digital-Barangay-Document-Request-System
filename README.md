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
| Database | PostgreSQL (via Railway) |
| ORM | Spring Data JPA / Hibernate |
| Deployment | Frontend → Vercel, Backend + Database → Railway |

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
│       │   ├── repository/
│       │   │   ├── UserRepository.java
│       │   │   └── RequestRepository.java
│       │   └── service/
│       │       ├── AuthService.java
│       │       └── RequestService.java
│       └── resources/
│           └── application.properties
├── build.gradle
├── README.md
└── Procfile
```

---

## Deployment

The system is fully deployed and accessible online. No local setup is required.

| Layer | Platform | URL |
|---|---|---|
| Frontend | Vercel | https://digital-barangay-document-request-s-weld.vercel.app |
| Backend | Railway | https://web-production-3ca14.up.railway.app |
| Database | Railway (PostgreSQL) | Managed internally by Railway |

---

## Demo Credentials

| Role | Email | Password |
|---|---|---|
| Admin | dbdrs@gmail.com | iloveyou |
| User | register via signup | your chosen password |

The admin account is automatically seeded into the database on server startup if it does not already exist. All other accounts are created through the signup form and persist in the PostgreSQL database.

---

## Database

The system uses PostgreSQL hosted on Railway for persistent data storage. Tables are automatically created by Hibernate on first deployment.

| Table | Description |
|---|---|
| `users` | Stores registered user accounts and the pre-seeded admin |
| `document_requests` | Stores all submitted document requests and their statuses |

### Environment Variables

The following environment variable must be configured on Railway for the backend to connect to the database:

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection URL (referenced from Railway's Postgres service) |

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

**PostgreSQL on Railway** — data is persisted in a PostgreSQL database managed by Railway. All user accounts and document requests survive server restarts and redeployments. Tables are auto-created by Hibernate on startup via `spring.jpa.hibernate.ddl-auto=update`.

**Admin seeding on startup** — the default admin account is automatically inserted into the database on every server startup if it does not already exist, ensuring the admin is always accessible without manual setup.

**Single login form for both roles** — there is no role selector on the login screen. The backend determines the user's role from their credentials and the frontend redirects accordingly — admins go to the admin dashboard, users go to the user dashboard.

**Session management via `sessionStorage`** — logged-in user data (name, email, role) is stored in the browser's `sessionStorage`. Each browser tab holds its own session independently, allowing admin and user to be logged in simultaneously on different tabs or windows.

**CORS configuration** — `CorsConfig.java` explicitly allows requests from the Vercel frontend URL so the browser does not block cross-origin API calls to the Railway backend.

**Separated CSS** — all shared styles (header, nav, footer, buttons) live in `styles.css`. Page-specific styles are scoped within each HTML file's `<style>` block.

---

## Limitations

- No password hashing — passwords are stored as plain text (acceptable for demo only)
- No authentication tokens — API endpoints are accessible without a valid session if called directly

---

## Members

- Gallano, Mark Cielo
- Gumatay, Gian Carlos
- Capoquian, Jojo
- Estrada, Sahm
- Balading, Axl Jmaes