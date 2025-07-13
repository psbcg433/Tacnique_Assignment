import { employees as baseEmployees } from './mock-data.js';

// ========================================================================================
// Simulated FreeMarker Integration
// ========================================================================================
/**
 * NOTE:
 * FreeMarker templates (.ftl) are rendered server-side in Java.
 * Since we’re building a frontend-only static site (e.g., deployed on Netlify),
 * we simulate FreeMarker's placeholders using HTML + JavaScript.
 * 
 * Example: We write <#list employees as emp> in HTML and replace it entirely
 * using JS on page load. This allows mock templating behavior without Java.
 */

// ========================================================================================
// DOM Elements
// ========================================================================================

const container = document.querySelector('.card-container');
const addEmpBtn = document.getElementById('addEmp');
const filterBtn = document.getElementById('filterbtn');
const aside = document.querySelector('aside');
const applyBtn = document.getElementById('applybtn');
const resetBtn = document.getElementById('reserbtn');
const searchInput = document.getElementById('searchbar');
const sortSelect = document.getElementById('sort');
const showSelect = document.getElementById('show');

const firstNameInput = document.getElementById('firstnamefilter');
const departmentInput = document.getElementById('departmentfilter');
const roleInput = document.getElementById('rolefilter');

// ========================================================================================
// Application State
// ========================================================================================

let employees = JSON.parse(sessionStorage.getItem('employees')) || [...baseEmployees];
let currentList = [...employees]; // this is always the rendered list (filtered/searched/or all)
let currentPageRange = [0, 10]; // pagination bounds: start to end

// ========================================================================================
// Render Employee Cards into DOM
// ========================================================================================

function renderEmployeeCards(container, list) {
  container.innerHTML = '';
  const [start, end] = currentPageRange;
  const visibleItems = list.slice(start, end);

  visibleItems.forEach((emp, index) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <p><b>${emp.name}</b></p>
      <p><b>Email:</b> ${emp.email}</p>
      <p><b>Department:</b> ${emp.department}</p>
      <p><b>Role:</b> ${emp.role}</p>
      <div>
        <button class="edit-btn" data-index="${employees.indexOf(emp)}">Edit</button>
        <button class="delete-btn" data-index="${employees.indexOf(emp)}">Delete</button>
      </div>
    `;
    container.appendChild(card);
  });

  attachEditHandlers();
  attachDeleteHandlers();
}

// ========================================================================================
// Edit / Delete Handlers
// ========================================================================================

function attachEditHandlers() {
  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = e.target.dataset.index;
      const emp = employees[index];
      sessionStorage.setItem('formMode', 'edit');
      sessionStorage.setItem('editIndex', index);
      sessionStorage.setItem('formData', JSON.stringify(emp));
      window.location.href = 'add_edit.html';
    });
  });
}

function attachDeleteHandlers() {
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = e.target.dataset.index;
      employees.splice(index, 1);
      sessionStorage.setItem('employees', JSON.stringify(employees));
      updateCurrentList();
      renderEmployeeCards(container, currentList);
      updatePaginationOptions();
    });
  });
}

// ========================================================================================
// Add Employee Button Setup
// ========================================================================================

function setupAddEmployeeButton() {
  addEmpBtn.addEventListener('click', () => {
    sessionStorage.setItem('formMode', 'add');
    sessionStorage.removeItem('editIndex');
    sessionStorage.removeItem('formData');
    window.location.href = 'add_edit.html';
  });
}

// ========================================================================================
// Search (independent from filters)
// ========================================================================================

function setupSearchListener() {
  searchInput.addEventListener('keyup', debounce(() => {
    updateCurrentList(); // update list based on search and filters independently
    renderEmployeeCards(container, currentList);
    updatePaginationOptions();
  }, 300));
}

// ========================================================================================
// Aside Filters (independent from search)
// ========================================================================================

function setupFilterApply() {
  applyBtn.addEventListener('click', () => {
    aside.classList.remove('visible');
    updateCurrentList();
    resetPagination();
    renderEmployeeCards(container, currentList);
    updatePaginationOptions();
  });
}

function setupFilterReset() {
  resetBtn.addEventListener('click', () => {
    firstNameInput.value = '';
    departmentInput.value = '';
    roleInput.value = '';
    updateCurrentList();
    resetPagination();
    renderEmployeeCards(container, currentList);
    updatePaginationOptions();
  });
}

// ========================================================================================
// List Update Logic
// ========================================================================================

function updateCurrentList() {
  const searchQuery = searchInput.value.trim().toLowerCase();
  const firstName = firstNameInput.value.trim().toLowerCase();
  const department = departmentInput.value.trim().toLowerCase();
  const role = roleInput.value.trim().toLowerCase();

  if (searchQuery) {
    currentList = employees.filter(emp =>
      emp.name.toLowerCase().includes(searchQuery) ||
      emp.email.toLowerCase().includes(searchQuery)
    );
  } else if (firstName || department || role) {
    currentList = employees.filter(emp => {
      const [empFirst] = emp.name.toLowerCase().split(' ');
      return (!firstName || empFirst.includes(firstName)) &&
             (!department || emp.department.toLowerCase().includes(department)) &&
             (!role || emp.role.toLowerCase().includes(role));
    });
  } else {
    currentList = [...employees];
  }

  applySort();
}

// ========================================================================================
// Sorting (based on currentList)
// ========================================================================================

function setupSortListener() {
  sortSelect.addEventListener('change', () => {
    applySort();
    renderEmployeeCards(container, currentList);
  });
}

function applySort() {
  const sortBy = sortSelect.value;

  if (sortBy === 'firstname') {
    currentList.sort((a, b) => a.name.toLowerCase().split(' ')[0].localeCompare(b.name.toLowerCase().split(' ')[0]));
  } else if (sortBy === 'department') {
    currentList.sort((a, b) => a.department.toLowerCase().localeCompare(b.department.toLowerCase()));
  }
}

// ========================================================================================
// Pagination Setup
// ========================================================================================

function updatePaginationOptions() {
  const total = currentList.length;
  showSelect.innerHTML = '';
  showSelect.disabled = total <= 10;

  if (showSelect.disabled) return;

  for (let i = 0; i < total; i += 10) {
    const start = i + 1;
    const end = Math.min(i + 10, total);
    const option = document.createElement('option');
    option.value = `${i}-${end}`;
    option.textContent = `${start}–${end}`;
    showSelect.appendChild(option);
  }

  const [start, end] = currentPageRange;
  const match = `${start}-${end}`;
  const selected = [...showSelect.options].find(o => o.value === match);
  if (selected) showSelect.value = match;
}

function setupShowSelect() {
  showSelect.addEventListener('change', () => {
    const [start, end] = showSelect.value.split('-').map(Number);
    currentPageRange = [start, end];
    renderEmployeeCards(container, currentList);
  });
}

function resetPagination() {
  currentPageRange = [0, 10];
  showSelect.selectedIndex = 0;
}

// ========================================================================================
// Sidebar Toggle Logic
// ========================================================================================

function setupFilterToggle() {
  filterBtn.addEventListener('click', () => {
    aside.classList.toggle('visible');
  });
}

// ========================================================================================
// Utilities
// ========================================================================================

function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// ========================================================================================
// Init (on page load)
// ========================================================================================

document.addEventListener('DOMContentLoaded', () => {
  setupAddEmployeeButton();
  setupFilterToggle();
  setupSearchListener();
  setupFilterApply();
  setupFilterReset();
  setupSortListener();
  setupShowSelect();
  updateCurrentList();           
  renderEmployeeCards(container, currentList);
  updatePaginationOptions();
});
