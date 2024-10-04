let form = document.getElementById("user-form");
// Retrieve
const getEntries = () => {
    let entries = localStorage.getItem("user-entries");
    return entries ? JSON.parse(entries) : [];
};
let entries = getEntries();
// Display entries in the table
const showEntries = () => {
    const tblEntries = entries.map((e) => {
        const nCell = `<td>${e.name}</td>`;
        const emCell = `<td>${e.email}</td>`;
        const pCell = `<td class="text-center">${e.password}</td>`;
        const dCell = `<td>${e.dob}</td>`;
        const tCell = `<td>${e.acceptedTermsAndConditions ? 'true' : 'false'}</td>`;
        const row = `<tr>${nCell} ${emCell} ${pCell} ${dCell} ${tCell}</tr>`;
        return row;
    }).join("\n");

    document.getElementById("user-entries").innerHTML = tblEntries;
};
// Validate email format
const isValidEmail = (em) => {
    const emPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple regex for email validation
    return emPattern.test(em); // Returns true if valid, false if invalid
};
// Calculate age
const calcAge = (dob) => {
    const bDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - bDate.getFullYear();
    const mDiff = today.getMonth() - bDate.getMonth();
    if (mDiff < 0 || (mDiff === 0 && today.getDate() < bDate.getDate())) {
        age--;
    }
    return age;
};
// Save form data 
const saveForm = (e) => {
    e.preventDefault();
    const n = document.getElementById("name").value;
    const em = document.getElementById("email").value;
    const p = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const t = document.getElementById("acceptTerms").checked;
    const age = calcAge(dob);
    
    // Validate age
    if (age < 18 || age > 55) {
        alert("Age must be between 18 and 55 years.");
        return;
    }

    // Validate email
    if (!isValidEmail(em)) {
        alert("Please enter a valid email address."); 
        return;
    }

    const entry = {
        name: n,
        email: em,
        password: p,
        dob,
        acceptedTermsAndConditions: t,
    };

    entries.push(entry);
    localStorage.setItem("user-entries", JSON.stringify(entries));
    showEntries();
    form.reset();
};
form.addEventListener("submit", saveForm);
showEntries();
