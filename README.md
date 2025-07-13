# 👥 Employee Directory App

A responsive, client-side **Employee Directory Web Application** that simulates FreeMarker templating using static HTML, CSS, and vanilla JavaScript — no backend or build tooling required.

---

## 🚀 Features

### ✅ Core Functionalities

- **FreeMarker Templating Simulation**  
  Uses `.ftl`-style comments and placeholder structures in HTML to mimic Java server-side rendering. Replaced entirely at runtime using JavaScript.

- **Dynamic Employee Card Rendering**
  - Add, edit, delete employees
  - Realtime DOM updates using `sessionStorage`

- **Search Functionality**
  - Case-insensitive
  - Debounced
  - Search by name or email

- **Filter Panel (Aside)**
  - Toggleable filter panel
  - Filter by first name, department, or role
  - Works independently of search

- **Sorting**
  - Sort by first name or department
  - Sorting applies to the currently rendered list (all, search, or filtered)

- **Pagination**
  - Automatically paginates lists > 10 items
  - Dynamic ranges (e.g. `1–10`, `11–20`, `21–25`)
  - Pagination respects search/filter results

- **Mobile Responsive UI**
  - Optimized for small and large screens
  - Filter and search layouts adapt responsively

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| HTML | Static HTML with simulated FreeMarker tags |
| CSS  | Responsive, custom styling (no frameworks) |
| JS   | Vanilla JavaScript (ES6 modules, DOM API, sessionStorage) |

---

## 📂 Project Structure

```bash
.
├── index.html          # Main Employee List Page
├── add_edit.html       # Add/Edit Employee Form
├── styles.css          # Unified Styling (Desktop + Mobile)
├── mock-data.js        # Default Employee Array (3 objects)
├── app.js              # Main logic (rendering, search, filters, pagination)
├── add_edit.js         # Form handling logic (edit or add mode)
└── README.md           # You're here
