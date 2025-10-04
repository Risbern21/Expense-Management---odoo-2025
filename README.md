<<<<<<< HEAD
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
=======
# Expense Management System

ExesMan is an automated expense reimbursement system designed to streamline the process of submitting, approving, and tracking company expenses. The system reduces manual effort, improves transparency, and provides flexible approval workflows.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [System Roles & Permissions](#system-roles--permissions)
- [Setup & Installation](#setup--installation)
  - [Backend (FastAPI)](#backend-fastapi)
  - [Frontend (React TypeScript)](#frontend-react-typescript)
- [API Integrations](#api-integrations)
- [OCR for Receipts](#ocr-for-receipts)
- [Mockups](#mockups)
- [Future Enhancements](#future-enhancements)

---

## Features

### Core Features

1. **Authentication & User Management**
   - On first signup/login:
     - A new Company is auto-created with the selected country’s currency.
     - Admin user is auto-created.
   - Admin can:
     - Create Employees & Managers
     - Assign roles: Employee, Manager
     - Define manager relationships for employees

2. **Expense Submission (Employee)**
   - Submit expenses with:
     - Amount (in any currency)
     - Category, Description, Date
   - View expense history (Approved/Rejected)

3. **Approval Workflow (Manager/Admin)**
   - Multi-step approval process
     - Example: Manager → Finance → Director
   - Conditional approval rules:
     - **Percentage rule**: e.g., 60% of approvers must approve
     - **Specific approver rule**: e.g., CFO approval auto-approves expense
     - **Hybrid rule**: Combination of above
   - Managers can approve/reject expenses with comments
   - Expense moves to next approver only after current approval

4. **Additional Features**
   - OCR for receipts to auto-extract:
     - Amount, Date, Description, Expense lines, Expense type, Vendor/Restaurant
   - Multi-currency support with currency conversion

---

## Tech Stack

- **Frontend**: React + TypeScript  
- **Backend**: Python + FastAPI  
- **Database**: PostgreSQL (SQLAlchemy + Alembic for migrations)  
- **Authentication**: JWT or session-based (customizable)  
- **OCR**: Python-based OCR (e.g., Tesseract or OpenCV)  
- **API Integrations**:
  - Country & Currency: `https://restcountries.com/v3.1/all?fields=name,currencies`
  - Currency Conversion: `https://api.exchangerate-api.com/v4/latest/{BASE_CURRENCY}`

---

## System Roles & Permissions

| Role     | Permissions                                                                 |
|----------|----------------------------------------------------------------------------|
| Admin    | Create company, manage users, set roles, configure approval rules, override approvals, view all expenses |
| Manager  | Approve/reject expenses (amount in company default currency), view team expenses, escalate according to rules |
| Employee | Submit expenses, view own expenses, check approval status                  |

---

## Setup & Installation

### Backend (FastAPI)

1. Clone the repository:
```bash
git clone <repo_url>
cd backend
>>>>>>> c31b02be4ca8605f67905db3db4e3d29060d9c91
