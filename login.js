document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.querySelector('.login-box form');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const emailValidationMsg = document.getElementById('email-validation-msg');
  const passwordValidationMsg = document.getElementById('password-validation-msg');

  const emailRegex = /^nnm(23|24|25)cs([0-2][0-9]{2}|3[0-4][0-9]|350)@nmamit\.in$/;
  const passwordRegex = /^(?=.*[!@#$%^&*])(?=.{8,})/;

  function validateEmail() {
    const email = emailInput.value;
    if (!emailRegex.test(email)) {
      emailValidationMsg.textContent = 'Please enter a valid college email ID (nnmddcsxxx@nmamit.in)';
      emailValidationMsg.style.color = 'red';
      return false;
    } else {
      emailValidationMsg.textContent = '';
      return true;
    }
  }

  function validatePassword() {
    const password = passwordInput.value;
    if (!passwordRegex.test(password)) {
      passwordValidationMsg.textContent = 'Invalid password format.';
      passwordValidationMsg.style.color = 'red';
      return false;
    } else {
      passwordValidationMsg.textContent = ''; // Clear message if valid
      return true;
    }
  }

  emailInput.addEventListener('input', validateEmail);
  passwordInput.addEventListener('input', validatePassword);

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (!isEmailValid || !isPasswordValid) {
      return; // Prevent form submission if validation fails
    }

    const email = emailInput.value;
    const password = passwordInput.value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem('loggedIn', 'true');
      const emailPrefix = email.split('@')[0];
      localStorage.setItem('userEmailPrefix', emailPrefix); // Store email prefix
      alert('Login successful!'); // Keep alert for successful login
      window.location.href = 'events.html';
    } else {
      alert('Invalid email or password.'); // Keep alert for invalid credentials
    }
  });
});
