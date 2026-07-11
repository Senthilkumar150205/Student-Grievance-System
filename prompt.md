MASTER PROMPT

Act as a senior full-stack software engineer and build a complete production-ready web application named Student Grievance System using HTML, CSS, JavaScript, Python Flask, and MySQL. The website UI must look modern, clean, minimal, and premium like Google's design language with lots of white space, rounded cards, subtle shadows, smooth animations, and responsive layouts.

Project Goal

Create a grievance portal where students can register, log in, submit complaints, track complaint status, communicate with administrators, and receive updates. Administrators can manage users, view grievances, update status, reply to complaints, and view analytics.

Technology Stack

Frontend: HTML5, CSS3, JavaScript (Vanilla JS)

Backend: Python Flask

Database: MySQL

Authentication: Flask sessions

Password Security: Werkzeug password hashing

Icons: Font Awesome

Charts: Chart.js

Folder Structure

student-grievance-system/

│

├── app.py

├── config.py

├── requirements.txt

├── static/

│ ├── css/

│ │ └── style.css

│ ├── js/

│ │ └── script.js

│ └── uploads/

├── templates/

│ ├── base.html

│ ├── index.html

│ ├── login.html

│ ├── register.html

│ ├── dashboard.html

│ ├── submit_grievance.html

│ ├── my_grievances.html

│ ├── grievance_details.html

│ ├── admin_dashboard.html

│ ├── manage_users.html

│ ├── manage_grievances.html

│ └── profile.html

└── database.sql

Database Requirements

Create MySQL tables:

users (id, name, email, password, role, department, created_at)

grievances (id, user_id, title, category, description, attachment, status, priority, created_at, updated_at)

grievance_replies (id, grievance_id, sender_id, message, created_at)

notifications (id, user_id, message, is_read, created_at)

User Roles

Student

Admin

Authentication Features

User registration with validation

Login with email and password

Secure password hashing

Logout

Session management

Role-based access control

Forgot password page

Reset password functionality

Homepage Design

Design a Google-style landing page with:

Large centered logo/title

Clean navigation bar

Hero section

Search-style grievance tracking box

Feature cards

Statistics section

Footer

Smooth scroll animations

Student Dashboard

Include:

Welcome message

Total grievances count

Pending grievances

Resolved grievances

Recent activities

Quick action buttons

Responsive cards

Dark mode toggle

Grievance Submission Form

Fields:

Title

Category dropdown

Description textarea

Priority selection

File upload

Submit button

Add client-side and server-side validation.

Grievance Tracking

Students can:

View all grievances

Search grievances

Filter by status

Sort by date

View detailed conversation

Reply to admin messages

Admin Dashboard

Include analytics cards:

Total users

Total grievances

Pending grievances

In-progress grievances

Resolved grievances

Monthly grievance chart

Category distribution chart

Admin Features

View all grievances

Update status

Assign priority

Reply to students

Delete grievances

Manage users

Export reports

Search and filters

UI/UX Requirements

Fully responsive for mobile, tablet, and desktop

Google-inspired color palette

Rounded corners

Subtle shadows

Hover effects

Loading animations

Toast notifications

Skeleton loaders

Accessible design

CSS Requirements

Create a professional stylesheet with:

CSS variables

Flexbox and Grid

Media queries

Google Fonts

Button styles

Form styles

Card components

Modal components

Table styles

Animation utilities

JavaScript Features

Form validation

Search functionality

Filter functionality

Dark mode

Toast notifications

Auto-hide alerts

Character counters

Image preview

Responsive menu

Chart initialization

Flask Backend Requirements

Create routes for:

/

/register

/login

/logout

/dashboard

/submit-grievance

/my-grievances

/grievance/<id>

/profile

/admin

/admin/grievances

/admin/users

/admin/update-status/<id>

/admin/reply/<id>

Security Requirements

Use parameterized SQL queries

Prevent SQL injection

Escape user input

CSRF protection

Secure session handling

File upload validation

Role-based authorization

Password hashing

Additional Features

Email notifications (optional)

PDF grievance report generation

Real-time notification badge

Pagination

Profile photo upload

Activity logs

Responsive sidebar

Admin search panel

Code Quality

Write clean, modular code

Add comments

Follow best practices

Use reusable components

Keep consistent naming

Handle errors gracefully

Output Requirements

Generate the complete project file-by-file in the correct order. Start with database.sql, then app.py, then all HTML templates, then style.css, then script.js, and finally provide step-by-step instructions to run the project in VS Code using Flask and MySQL.