# Prambh 2nd Year CTF

Audience:
2nd-year college students

Duration:
3 hours

Difficulty:
Beginner → Medium

> **CONFIDENTIAL - CTF ORGANIZERS & DEVELOPERS ONLY**  
> This document details the architectural foundation, development workflow, intentional reconnaissance artifacts, and future challenge roadmap for the **Prambh 2nd Year** collegiate cybersecurity competition.

---

## 1. Project Purpose & Scope

The **Blackout College Technology Club** web application serves as the legitimate-looking web surface for **Prambh 2nd Year**, a controlled cybersecurity Capture The Flag (CTF) training competition for second-year university students.

### Ethical & Safety Boundary
- **Organizer Document Isolation:** This file (`CTF_DEVELOPMENT.md`) is kept **outside** the public `website/` root so that organizer notes and future challenge solutions are never accessible via HTTP.
- **100% Fictional Context:** All persons (e.g. Dr. Arjun Mehta, student leads), emails (`@blackout-college.local`), phone numbers (`+91 00000 00000`), and campus locations are completely fictional.
- **Zero Real Targets / Zero External Infrastructure:** No external APIs, third-party CDNs, tracking telemetry, or public network targets are referenced.
- **Controlled Scope:** The application runs exclusively in a sandboxed/local environment.
- **Separation of Phases:** In this foundational release, future complex vulnerabilities (SQL Injection, arbitrary file upload execution, Linux privilege escalation) have **NOT** been deployed yet. The frontend is a clean, realistic, fully responsive static website designed to be inspected during reconnaissance.

---

## 2. Directory Structure

```
project/
├── website/                    # Public Web Root (Served via HTTP)
│   ├── index.html              # Main homepage (Hero, Focus Areas, Events, Projects, Announcements)
│   ├── about.html              # Mission, Core Values, Timeline (2023-2026), Faculty Coordinator
│   ├── events.html             # 4 Event Cards with badges, dates, and interactive registration triggers
│   ├── projects.html           # 4 Student Projects with tech stacks, status tags, and details
│   ├── team.html               # Leadership team cards with custom CSS avatars and fictional bios
│   ├── contact.html            # Campus contact details, map placeholder, client-validated contact form
│   ├── login.html              # Student Portal authentication UI with subtle developer staging comment
│   ├── portal.html             # Student dashboard (Stats, RSVP list, project status, notifications)
│   ├── 404.html                # Clean branded error page with 'Return Home' navigation
│   │
│   ├── robots.txt              # Web crawler rules disallowing /backup/ and /internal/
│   │
│   ├── assets/
│   │   ├── css/
│   │   │   └── style.css       # Complete design system (Dark navy, charcoal, lime-green, responsive)
│   │   ├── js/
│   │   │   └── main.js         # Navigation, form validation, modal alerts, and staging config comments
│   │   └── images/             # Directory reserved for static image assets (custom SVGs inline)
│   │
│   ├── backup/
│   │   ├── README.txt          # Archive notice pointing to deployment notes
│   │   └── deployment-notes.txt# Subtle note: docs moved to restricted operations area
│   │
│   ├── internal/
│   │   └── README.txt          # Internal audit document containing Challenge 1 flag
│   │
│   └── uploads/
│       └── .gitkeep            # Empty directory reserved for the future file upload vulnerability
│
└── CTF_DEVELOPMENT.md          # Organizer-only documentation (OUTSIDE public web root)
```

---

## 3. Local Setup & Testing Instructions

The public website is served from the `website/` directory.

### Launching the Web Server
From the `website/` directory:

```bash
# Navigate to the public website directory
cd website

# Launch Python 3 built-in HTTP server
python -m http.server 8000
```

### Accessing the Website
Open your browser and navigate to:
```
http://localhost:8000
```

### Verification Checklist
1. **Homepage (`/index.html` or `/`):** Verify hero illustration, focus areas, Prambh 2nd Year CTF event card, project links, date-neutral announcement, and footer.
2. **About Page (`/about.html`):** Check mission statement, core values, timeline milestones (Prambh 2nd Year CTF introduced), and faculty coordinator card.
3. **Events Page (`/events.html`):** Test Prambh 2nd Year CTF event registration triggers; verify status badges and date tags.
4. **Projects Page (`/projects.html`):** Verify project cards, category tags, and team size metadata.
5. **Team Page (`/team.html`):** Ensure avatars render smoothly and all leadership cards display without layout shifts.
6. **Contact Page (`/contact.html`):** Test client-side validation by submitting an empty form, then a valid form.
7. **Login Page (`/login.html`):** Test student ID and password field validation. Verify demo notice redirects safely to `portal.html`.
8. **Student Portal (`/portal.html`):** Verify dashboard statistics cards and Prambh 2nd Year CTF in upcoming schedule.
9. **404 Page (`/404.html`):** Test broken URL handling and the "Return Home" button.
10. **Robots Policy (`/robots.txt`):** Ensure `Disallow: /backup/` and `Disallow: /internal/` are accessible.
11. **Organizer Doc Isolation:** Verify `http://localhost:8000/CTF_DEVELOPMENT.md` returns 404 (File Not Found).

---

## 4. Challenge 1: Digital Footprints

# Digital Footprints

This is the first challenge of the Prambh 2nd Year CTF.

Difficulty:
Very Easy / Easy

Points:
50

Expected solve time:
5–15 minutes

Skills:
- Web reconnaissance
- robots.txt
- directory discovery
- reading developer documentation

Intended path:

Website
↓
robots.txt
↓
/backup/
↓
deployment documentation
↓
infer restricted operations area
↓
/internal/
↓
/internal/README.txt
↓
THM{prambh_digital_footprints}

### Reconnaissance Breakdown
1. **`robots.txt` Disallow Rules:**
   - Mentions `Disallow: /backup/` and `Disallow: /internal/`.
   - Teaches students to check crawler policies.

2. **`/backup/README.txt` & `/backup/deployment-notes.txt`:**
   - Mentions: *"Security and compliance documentation was moved to the restricted operations area during the migration."*
   - Gives players a realistic breadcrumb to infer that the restricted operations area corresponds to `/internal/`.

3. **Audit Notes in `/internal/README.txt`:**
   - Contains the verification token for Challenge 1: `THM{prambh_digital_footprints}`.

---

## 5. Planned CTF Roadmap & Progression (12 Challenges)

```
PRAMBH 2ND YEAR
        │
        └── CTF
             │
             ├── Digital Footprints
             ├── Robots Don't Lie
             ├── What's In The Source?
             ├── Login Bypass
             ├── Upload Me
             ├── Find Your Way
             ├── One Step Higher
             ├── Packet Detective
             ├── Deleted Evidence
             ├── Caesar's Message
             ├── Broken Encryption
             └── Final Challenge
```

### Detailed Challenge Specifications

| # | Challenge Name | Difficulty | Core Concepts | Planned Implementation & Location |
|---|----------------|------------|---------------|-----------------------------------|
| **1** | **Digital Footprints** | Very Easy / Easy | Web reconnaissance, robots.txt, directory discovery | robots.txt -> /backup/ -> /internal/ -> `THM{prambh_digital_footprints}`. |
| **2** | **Robots Don't Lie** | Easy | `robots.txt` analysis, HTTP status codes | Students inspect crawler directives and learn HTTP response code behaviors on protected directories. |
| **3** | **What's In The Source?** | Easy | HTML/DOM inspection, JavaScript bundle reading | Students analyze developer notes in `main.js` and HTML comments to extract an obfuscated staging string. |
| **4** | **Login Bypass** | Easy / Medium | SQL Injection (`' OR '1'='1`) | When backend service is attached to `/login.html`, introduce an intentional unparameterized SQLite authentication query. |
| **5** | **Upload Me** | Medium | File upload vulnerability, MIME validation bypass | Introduce an upload endpoint in `/uploads/` that permits extension bypass (e.g. `.php5`, `.phtml`, double extensions). |
| **6** | **Find Your Way** | Easy | Linux enumeration, file system exploration | Students land shell access and enumerate `/var/www/`, SUID binaries, cron jobs, and hidden environment variables. |
| **7** | **One Step Higher** | Medium | Linux privilege escalation | Deliberately misconfigured `sudo` permission (e.g., `sudo /usr/bin/find` or a vulnerable Python script with writable library path). |
| **8** | **Packet Detective** | Easy | Wireshark / PCAP network analysis | A `.pcap` capture distributed to students containing cleartext HTTP or unencrypted FTP credentials transmitted across the fictional network. |
| **9** | **Deleted Evidence** | Medium | Digital forensics, file carving | A small corrupted/carved disk image or deleted memory dump containing a redacted configuration snippet. |
| **10** | **Caesar's Message** | Very Easy | Classical cryptography, Caesar/ROT cipher | An intercepted ciphertext message discovered during reconnaissance requiring frequency analysis or shift calculation. |
| **11** | **Broken Encryption** | Medium | Weak cryptography, ECB mode / weak XOR | A custom token generator employing repeated XOR keys or predictable PRNG seeds. |
| **12** | **Final Challenge** | Medium | Multi-stage final challenge | Capstone challenge combining web authentication bypass, log analysis, cryptographic key recovery, and privilege escalation to solve the final objective. |

---

## 6. Implementation Status Confirmation

> [!IMPORTANT]
> **Status:** The current repository represents **Phase 1 (Production-Ready Static Presentation Layer + Challenge 1 Reconnaissance Token)**.  
> **Confirmation:** Future exploitable vulnerabilities (SQL Injection, unrestricted file upload, privilege escalation vectors) have **NOT** been introduced into this build.  
> Each future challenge will be developed in an isolated, deliberately tested stage following this roadmap.
