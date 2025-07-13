Here is the **complete and ready-to-use `README.md`** content in proper Markdown format — no cuts, no explanations, just the raw `.md` file content:

---

````markdown
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
| HTML  | Static HTML with simulated FreeMarker tags |
| CSS   | Responsive, custom styling (no frameworks) |
| JS    | Vanilla JavaScript (ES6 modules, DOM API, `sessionStorage`) |

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
````

---

## 🔧 Installation & Setup

You can run this project locally in just a few steps.

### 1️⃣ Clone the repository

```bash
git clone https://github.com/psbcg433/Tacnique_Assignment.git
cd Tacnique_Assignment
```

### 2️⃣ Open in your browser

Since this is a pure static frontend project, there's **no build process**. Just open `index.html` directly:

```bash
# On VS Code or any code editor
# Right click on index.html → "Open with Live Server"
```

Or double-click the file:

```bash
open index.html     # Mac
start index.html    # Windows
```

---

### 🔁 Optional: Serve Locally (Recommended)

Use any static file server for better routing support (e.g., Live Server, Python, Node.js)

#### Python (if installed):

```bash
# Python 3
python -m http.server 3000
```

Then go to: `http://localhost:3000`

#### Node.js (if installed):

```bash
npx serve .
```



## 📌 Notes

* **No backend/database**: All state (employee data) is stored in `sessionStorage` and resets when browser is closed or refreshed.
* Follows **progressive enhancement** principles — works even without JS for the static structure, with enhanced features layered on.
* 100% **vanilla JavaScript** — no external libraries used.

---

