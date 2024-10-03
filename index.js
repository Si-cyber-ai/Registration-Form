let userForm = document.getElementById("user-form");

const retrieveEntries = () => {
  let entries = localStorage.getItem("user-entries");
  return entries ? JSON.parse(entries) : [];
};
let userEntries = retrieveEntries();
// Display entries
const displayEntries = () => {
  const tableEntries = userEntries.map((entry) => {
    const nameCell = `<td>${entry.name}</td>`;
    const emailCell = `<td>${entry.email}</td>`;
    const passwordCell = `<td class="text-center">${entry.password}</td>`;
    const dobCell = `<td>${entry.dob}</td>`;
    const acceptTermsCell = `<td>${entry.acceptedTermsAndConditions ? 'true' : 'false'}</td>`;

    const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell}</tr>`;
    return row;
  }).join("\n");

  document.getElementById("user-entries").innerHTML = tableEntries;
};
const isValidEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};
// Calculate age
const calculateAge = (dob) => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};
// Save form data 
const saveUserForm = (event) => {
  event.preventDefault();
  
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptedTermsAndConditions = document.getElementById("acceptTerms").checked;
  const age = calculateAge(dob);
  if (age < 18 || age > 55) {
    alert("Age must be between 18 and 55 years.");
    return;
  }
  if (!isValidEmail(email)) {
    alert("Please enter a valid email address."); 
    return;
  }
  const entry = {
    name,
    email,
    password,
    dob,
    acceptedTermsAndConditions,
  };

  userEntries.push(entry);
  localStorage.setItem("user-entries", JSON.stringify(userEntries));
  displayEntries();
  userForm.reset();
};
userForm.addEventListener("submit", saveUserForm);
displayEntries();
