document.addEventListener('DOMContentLoaded', () => {
  const notificationBell = document.querySelector('.notification-bell');
  const notificationPopup = document.getElementById('notification-popup');
  const closePopup = document.getElementById('close-popup');
  const notificationBody = document.querySelector('.notification-body');

  // Load notifications from localStorage or initialize with a new event notification for the home page
  let notifications = JSON.parse(localStorage.getItem('notifications')) || [];

  // Check if the "Today's Special Event" notification already exists
  const todaysEventNotificationExists = notifications.some(
    (n) => n.message.includes('New event: Today\'s Special Event: Web Dev Meetup')
  );

  // If not, add it to the notifications array
  if (!todaysEventNotificationExists) {
    notifications.unshift({
      message: 'New event: Today\'s Special Event: Web Dev Meetup',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }

  // Add a visual indicator to the bell if there are notifications
  if (notifications.length > 0) {
    notificationBell.classList.add('has-new-notifications');
  }

  // Make addNotification globally available
  window.addNotification = function(message) {
    const newNotification = {
      message: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    notifications.unshift(newNotification); // Add to the beginning
    localStorage.setItem('notifications', JSON.stringify(notifications));
    
    // Add a visual indicator to the bell
    notificationBell.classList.add('has-new-notifications');
  }

  function displayNotifications() {
    notificationBody.innerHTML = '';
    if (notifications.length === 0) {
      notificationBody.innerHTML = '<p>No new notifications.</p>';
      return;
    }
    
    notifications.forEach(notification => {
      const notificationItem = document.createElement('div');
      notificationItem.classList.add('notification-item');
      notificationItem.innerHTML = `
        <p>${notification.message}</p>
        <span class="time">${notification.time}</span>
      `;
      notificationBody.appendChild(notificationItem);
    });
  }

  notificationBell.addEventListener('click', () => {
    if (notificationPopup.style.display === 'block') {
      notificationPopup.style.display = 'none';
    } else {
      notificationPopup.style.display = 'block';
      displayNotifications();
      // Remove the visual indicator when the popup is opened
      notificationBell.classList.remove('has-new-notifications');
      // The notifications will persist in localStorage until explicitly cleared by another mechanism.
      // For now, we just remove the visual indicator.
    }
  });

  closePopup.addEventListener('click', () => {
    notificationPopup.style.display = 'none';
  });

  // Close the popup if clicked outside
  window.addEventListener('click', (event) => {
    if (!notificationPopup.contains(event.target) && !notificationBell.contains(event.target)) {
      notificationPopup.style.display = 'none';
    }
  });
});
