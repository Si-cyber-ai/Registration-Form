let userForm = document.getElementById("user-form");
//Entry
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
    let formElement = document.getElementById("user-form");
    const getEntriesFromStorage = () => {
      let storedEntries = localStorage.getItem("user-entries");
      return storedEntries ? JSON.parse(storedEntries) : [];
    };
    // Load existing entries from localStorage
    let userRecords = getEntriesFromStorage();
    const renderEntries = () => {
      const rows = userRecords.map((record) => {
        const nameColumn = `<td>${record.name}</td>`;
        const emailColumn = `<td>${record.email}</td>`;
        const passwordColumn = `<td class="text-center">${record.password}</td>`;
        const dobColumn = `<td>${record.dob}</td>`;
        const termsColumn = `<td>${record.acceptedTermsAndConditions ? 'true' : 'false'}</td>`;
        return `<tr>${nameColumn} ${emailColumn} ${passwordColumn} ${dobColumn} ${termsColumn}</tr>`;
      }).join("\n");
    
      document.getElementById("user-entries").innerHTML = rows;
    };
    // Function to validate email format
    const validateEmail = (email) => {
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return pattern.test(email);
    };
    // Function to calculate age
    const getAgeFromDob = (dob) => {
      const birthDate = new Date(dob);
      const currentDate = new Date();
      let age = currentDate.getFullYear() - birthDate.getFullYear();
      const monthDifference = currentDate.getMonth() - birthDate.getMonth();
      if (monthDifference < 0 || (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    };
    //submission of data
    const handleFormSubmit = (event) => {
      event.preventDefault();
      const nameInput = document.getElementById("name").value;
      const emailInput = document.getElementById("email").value;
      const passwordInput = document.getElementById("password").value;
      const dobInput = document.getElementById("dob").value;
      const isTermsAccepted = document.getElementById("acceptTerms").checked;
      const userAge = getAgeFromDob(dobInput);
      // Validate age range
      if (userAge < 18 || userAge > 55) {
        alert("Age must be between 18 and 55 years.");
        return;
      }
      // Validate email
      if (!validateEmail(emailInput)) {
        alert("Please enter a valid email address."); 
        return;
      }
      // Create a new entry object
      const newEntry = {
        name: nameInput,
        email: emailInput,
        password: passwordInput,
        dob: dobInput,
        acceptedTermsAndConditions: isTermsAccepted,
      };
      userRecords.push(newEntry);
      localStorage.setItem("user-entries", JSON.stringify(userRecords));
      renderEntries();
      formElement.reset();
    };
    // Attach the form submit event handler
    formElement.addEventListener("submit", handleFormSubmit);
    // Initial call to display existing entries on page load
    renderEntries();
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

