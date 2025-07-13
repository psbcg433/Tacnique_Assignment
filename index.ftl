
<#assign employees = [
  {
    "name": "Alice Smith",
    "email": "alice@example.com",
    "department": "HR",
    "role": "Manager"
  },
  {
    "name": "Bob Johnson",
    "email": "bob@example.com",
    "department": "IT",
    "role": "Developer"
  },
  {
    "name": "Charlie Lee",
    "email": "charlie@example.com",
    "department": "Finance",
    "role": "Analyst"
  }
]>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Employee Directory</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <header class="top-style">
      <h1>Employee Directory</h1>
      <input type="text" placeholder="search by name or email" />
      <button>Filter</button>
    </header>

    <main>
      <nav>
        <div>
          <div>
            <label for="sort">Sort:</label>
            <select id="sort">
              <option value="select">--Select--</option>
              <option value="firstname">First Name</option>
              <option value="department">Department</option>
            </select>
          </div>
          <div>
            <label for="show">Show:</label>
            <select id="show">
              <option value="10">10</option>
            </select>
          </div>
        </div>
        <button>Add Employee</button>
      </nav>

      <!-- Simulated FreeMarker Template Output -->
      <section class="card-container">
        <#list employees as emp>
          <div class="card">
            <p><b>${emp.name}</b></p>
            <p><b>Email:</b> ${emp.email}</p>
            <p><b>Department:</b> ${emp.department}</p>
            <p><b>Role:</b> ${emp.role}</p>
            <div>
              <button>Edit</button>
              <button>Delete</button>
            </div>
          </div>
        </#list>
      </section>
    </main>

    <footer class="top-style">
      © 2025 Employee Directory App. All rights reserved.
    </footer>

    <script type="module" src="app.js"></script>
  </body>
</html>
