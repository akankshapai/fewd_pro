document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.querySelector('.signup-box form');
  const nameInput = document.getElementById('name');
  const phoneInput = document.getElementById('phone');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  const nameValidationMsg = document.getElementById('name-validation-msg');
  const phoneValidationMsg = document.getElementById('phone-validation-msg');
  const emailValidationMsg = document.getElementById('email-validation-msg');
  const passwordValidationMsg = document.getElementById('password-validation-msg');

  const emailRegex = /^nnm(23|24|25)cs([0-2][0-9]{2}|3[0-4][0-9]|350)@nmamit\.in$/;
  const phoneRegex = /^\d{10}$/;
  const passwordRegex = /^(?=.*[!@#$%^&*])(?=.{8,})/;

  function validateName() {
    const name = nameInput.value.trim();
    if (name.length < 3) {
      nameValidationMsg.textContent = 'Full Name must be at least 3 characters.';
      nameValidationMsg.style.color = 'red';
      return false;
    } else {
      nameValidationMsg.textContent = '';
      return true;
    }
  }

  function validatePhone() {
    const phone = phoneInput.value;
    if (!phoneRegex.test(phone)) {
      phoneValidationMsg.textContent = 'Phone number must be 10 digits.';
      phoneValidationMsg.style.color = 'red';
      return false;
    } else {
      phoneValidationMsg.textContent = '';
      return true;
    }
  }

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
      passwordValidationMsg.textContent = 'Password must be at least 8 characters and contain a special character.';
      passwordValidationMsg.style.color = 'red';
      return false;
    } else {
      passwordValidationMsg.textContent = 'Strong password';
      passwordValidationMsg.style.color = 'green';
      return true;
    }
  }

  nameInput.addEventListener('input', validateName);
  phoneInput.addEventListener('input', validatePhone);
  emailInput.addEventListener('input', validateEmail);
  passwordInput.addEventListener('input', validatePassword);

  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const isNameValid = validateName();
    const isPhoneValid = validatePhone();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (!isNameValid || !isPhoneValid || !isEmailValid || !isPasswordValid) {
      return; // Prevent form submission if validation fails
    }

    const name = nameInput.value;
    const phone = phoneInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;

    // Get existing users or initialize an empty array
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if user with this email already exists
    const userExists = users.some(user => user.email === email);

    if (userExists) {
      alert('An account with this email already exists. Please use a different email or log in.');
      return;
    }

    // Add new user
    users.push({ name, phone, email, password });
    localStorage.setItem('users', JSON.stringify(users));

    alert('Account created successfully! Please log in.');
    window.location.href = 'login.html';
  });
});
