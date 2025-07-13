import { employees as baseEmployees } from './mock-data.js';

/**
 * This file handles the logic for `add_edit.html`:
 * - Determines whether to show the form in "Add" or "Edit" mode
 * - Populates form fields if editing
 * - Validates input
 * - Updates the shared employee list stored in `sessionStorage`
 * 
 * Since there is no backend, all data is stored in session memory across pages.
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const heading = form.querySelector('h2');
  const submitBtn = form.querySelector('.submit-btn');
  const cancelBtn = form.querySelector('.cancel-btn');

  // ========================================================================================
  // Load mode & employee data from sessionStorage (set in app.js)
  // ========================================================================================

  const formMode = sessionStorage.getItem('formMode'); 
  const formData = JSON.parse(sessionStorage.getItem('formData'));
  const editIndex = parseInt(sessionStorage.getItem('editIndex'), 10);

  // ========================================================================================
  // Load employee list from sessionStorage or fallback to mock data
  // ========================================================================================

  let employees = JSON.parse(sessionStorage.getItem('employees')) || [...baseEmployees];

  // ========================================================================================
  // Populate form for "Edit" mode or initialize for "Add" mode
  // ========================================================================================

  if (formMode === 'edit' && formData) {
    heading.textContent = 'Update Employee';
    submitBtn.textContent = 'Update';

  
    const [firstName = '', lastName = ''] = formData.name.split(' ');
    form.elements['firstName'].value = firstName;
    form.elements['lastName'].value = lastName;
    form.elements['email'].value = formData.email;
    form.elements['department'].value = formData.department;
    form.elements['role'].value = formData.role;
  } else {
    heading.textContent = 'Add Employee';
    submitBtn.textContent = 'Add';
  }

  // ========================================================================================
  // Cancel button → go back to homepage
  // ========================================================================================

  cancelBtn.addEventListener('click', () => {
    window.location.href = 'index.html';
  });

  // ========================================================================================
  // Email validation function
  // ========================================================================================

  const isValidEmail = (email) => {
  
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    return emailRegex.test(email);
  };

  // ========================================================================================
  // Form Submit Handler — Add or Edit
  // ========================================================================================

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const newEmployee = {
      name: `${form.elements['firstName'].value.trim()} ${form.elements['lastName'].value.trim()}`,
      email: form.elements['email'].value.trim(),
      department: form.elements['department'].value,
      role: form.elements['role'].value,
    };

   
    if (!isValidEmail(newEmployee.email)) {
      alert('Please enter a valid email address.');
      return;
    }


    if (formMode === 'edit' && !isNaN(editIndex)) {
      employees[editIndex] = newEmployee;
    } else {
      employees.push(newEmployee);
    }

  
    sessionStorage.setItem('employees', JSON.stringify(employees));

  
    sessionStorage.removeItem('formMode');
    sessionStorage.removeItem('formData');
    sessionStorage.removeItem('editIndex');

   
    window.location.href = 'index.html';
  });
});
