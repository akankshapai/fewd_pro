document.addEventListener('DOMContentLoaded', () => {
  const loginLogoutLink = document.getElementById('login-logout-link');
  const myEventsNavLink = document.getElementById('my-events-nav-link');
  const isLoggedIn = localStorage.getItem('loggedIn') === 'true';

  if (isLoggedIn) {
    if (loginLogoutLink) {
      loginLogoutLink.textContent = 'Logout';
      loginLogoutLink.href = '#'; // Prevent default navigation
      loginLogoutLink.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('userEmailPrefix'); // Clear user email prefix on logout
        localStorage.removeItem('registeredEvents'); // Clear registered events on logout
        window.location.href = 'login.html';
      });
    }
    if (myEventsNavLink) {
      myEventsNavLink.style.display = 'block'; // Show "My Events" link
    }
  } else {
    if (loginLogoutLink) {
      loginLogoutLink.textContent = 'Login';
      loginLogoutLink.href = 'login.html';
    }
    if (myEventsNavLink) {
      myEventsNavLink.style.display = 'none'; // Hide "My Events" link
    }
  }
});
