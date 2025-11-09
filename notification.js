document.addEventListener('DOMContentLoaded', () => {
  const notificationBell = document.querySelector('.notification-bell a');
  const notificationPopup = document.getElementById('notification-popup');
  const closePopup = document.getElementById('close-popup');
  const notificationBody = document.querySelector('.notification-body');

  let notifications = []; // Initialize as empty, notifications will be added dynamically

  function togglePopup() {
    notificationPopup.style.display = notificationPopup.style.display === 'block' ? 'none' : 'block';
  }

  function addNotification(message) {
    notifications.unshift({ message: message, read: false }); // Add new notification to the beginning
    renderNotifications();
    // Optionally, show the bell with a new notification indicator
    // For now, just re-render and assume user will open
  }

  // Make addNotification globally accessible
  window.addNotification = addNotification;

  function renderNotifications() {
    notificationBody.innerHTML = '';
    notifications.forEach(notification => {
      const notificationItem = document.createElement('div');
      notificationItem.classList.add('notification-item');
      notificationItem.innerHTML = `<p>${notification.message}</p>`;
      notificationBody.appendChild(notificationItem);
    });
  }

  notificationBell.addEventListener('click', (e) => {
    e.preventDefault();
    togglePopup();
    renderNotifications();
    // Mark all notifications as read when the popup is opened
    notifications.forEach(notification => notification.read = true);
  });

  closePopup.addEventListener('click', () => {
    togglePopup();
  });

  // Close popup if clicked outside
  window.addEventListener('click', (e) => {
    if (!notificationPopup.contains(e.target) && !notificationBell.contains(e.target)) {
      notificationPopup.style.display = 'none';
    }
  });
});
