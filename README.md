# Registration Form

A dynamic, responsive registration form built with **HTML**, **JavaScript**, and **Tailwind CSS**. This form allows users to submit their name, email, password, and date of birth, along with accepting terms & conditions. It includes validation for user input, calculates age, and stores data locally in the browser using **LocalStorage**. Submitted entries are displayed in a table below the form.

## Features

- **Client-side Validation**: 
  - Validates email format using regular expressions.
  - Ensures the user's age is between 18 and 55 years.
- **LocalStorage Integration**: User entries are saved in the browser’s `localStorage` and persist even after page reload.
- **Dynamic Table Display**: Submitted entries are automatically shown in a table below the form.
- **Clean UI**: Styled using **Tailwind CSS** for a modern, responsive look.
- **Age Calculation**: Automatically calculates the user's age based on their date of birth.
- **Background Image**: An attractive background enhances the form's visual appeal.

## Live Demo
[Try it here!](https://si-cyber-ai.github.io/Registration-Form/)

## Preview

![Form Preview](download.jpeg)

## Technologies Used

- **HTML5**: For the structure of the form.
- **JavaScript**: Handles form validation, age calculation, and localStorage integration.
- **Tailwind CSS**: Provides a sleek, responsive design.
- **LocalStorage**: Used to store user data between sessions.

## How It Works

1. **Form Fields**:
   - **Name**: User’s full name (required).
   - **Email**: User’s email address, validated with a regular expression (required).
   - **Password**: Secure password input (required).
   - **Date of Birth**: User’s birthdate to calculate age (required).
   - **Terms & Conditions**: Checkbox for terms acceptance (required).

2. **Validation**:
   - Email is validated using a regex pattern.
   - The age is calculated from the Date of Birth and must be between 18 and 55 years.

3. **LocalStorage**:
   - Entries are saved locally so that even if the page is refreshed, previously submitted data persists.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Si-cyber-ai/Registration-Form.git
    ```

2. Open the project folder:
    ```bash
    cd Registration-Form
    ```

3. Open the `index.html` file in your browser:
    - If you have a live server extension, right-click the `index.html` file and select "Open with Live Server."
    - Alternatively, double-click the `index.html` file to open it directly in your browser.

## Code Snippet: JavaScript Functions

### Displaying Entries in the Table

```javascript
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
