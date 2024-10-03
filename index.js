let userForm = document.getElementById("user-form");

// Data from localStorage
const retrieveEntries = () => {
  let entries = localStorage.getItem("user-entries");
  if (entries) {
    entries = JSON.parse(entries); 
  } else {
    entries = [];
  }
  return entries;
};
let userEntries = retrieveEntries();
// Display entries
const displayEntries = () => {
    const tableEntries = userEntries.map((entry) => {
      const nameCell = <td>${entry.name}</td>;
      const emailCell = <td>${entry.email}</td>;
      const passwordCell = <td>${entry.password}</td>;
      const dobCell = <td>${entry.dob}</td>;
      const acceptTermsCell = <td>${entry.acceptedTermsAndConditions ? 'true' : 'false'}</td>;
  
      const row = <tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell}</tr>;
      return row;
    }).join("\n");
  
    document.getElementById("user-entries").innerHTML = tableEntries;
  };

//calculate age based on DOB
const calculateAge = (dob) => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  // Adjust if the birth date hasn't occurred this year yet
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

// Save data and validate age
const saveUserForm = (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value; 
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptedTermsAndConditions = document.getElementById("acceptTerms").checked;

  // Age validation
  const age = calculateAge(dob);
  if (age < 18 || age > 55) {
    alert("Age must be between 18 and 55 years.");
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
};

userForm.addEventListener("submit", saveUserForm);
displayEntries();
