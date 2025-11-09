document.addEventListener('DOMContentLoaded', () => {
  const registerButtons = document.querySelectorAll('.event-card .btn');
  let registeredEvents = JSON.parse(localStorage.getItem('registeredEvents')) || [];
  const isLoggedIn = localStorage.getItem('loggedIn') === 'true';

  // Function to update button states based on localStorage
  const updateButtonStates = () => {
    registerButtons.forEach(button => {
      const card = button.closest('.event-card');
      const eventTitle = card.querySelector('h3').textContent;
      const isRegistered = registeredEvents.some(event => event.title === eventTitle);

      if (isRegistered) {
        button.textContent = 'Registered';
        button.style.backgroundColor = '#ccc';
        button.style.cursor = 'pointer';
      } else {
        button.textContent = 'Register';
        button.style.backgroundColor = '#3498db';
        button.style.cursor = 'pointer';
      }
    });
  };

  // Initial state update on page load
  updateButtonStates();

  registerButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();

      if (!isLoggedIn) {
        alert('You must be logged in to register for events.');
        window.location.href = 'login.html';
        return;
      }

      const card = button.closest('.event-card');
      const eventTitle = card.querySelector('h3').textContent;
      const isRegistered = registeredEvents.some(event => event.title === eventTitle);

      if (isRegistered) {
        // Unregister
        registeredEvents = registeredEvents.filter(event => event.title !== eventTitle);
        localStorage.setItem('registeredEvents', JSON.stringify(registeredEvents));
        button.textContent = 'Register';
        button.style.backgroundColor = '#3498db';
      } else {
        // Register
        const eventDescription = card.querySelector('p').textContent;
        const dateAndTimeText = card.querySelector('p > b').nextSibling.textContent.trim();
        const dateMatch = dateAndTimeText.match(/(\d{4}-\d{2}-\d{2}|\d{1,2} \w+ \d{4})/); // Matches YYYY-MM-DD or DD Month YYYY
        const timeMatch = dateAndTimeText.match(/(\d{1,2}:\d{2} (AM|PM))/); // Matches HH:MM AM/PM

        let eventDate = dateMatch ? dateMatch[0] : '';
        let eventTime = timeMatch ? timeMatch[0] : '';

        // Convert "DD Month YYYY" to "YYYY-MM-DD" if necessary
        if (eventDate && !/^\d{4}-\d{2}-\d{2}$/.test(eventDate)) {
          const parts = eventDate.split(' ');
          const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
          const monthIndex = monthNames.findIndex(name => name.startsWith(parts[1])); // Find month index
          if (monthIndex !== -1) {
            const day = String(parts[0]).padStart(2, '0');
            const year = parts[2];
            eventDate = `${year}-${String(monthIndex + 1).padStart(2, '0')}-${day}`;
          }
        }

        const event = {
          title: eventTitle,
          description: eventDescription,
          date: eventDate,
          time: eventTime,
        };
        registeredEvents.push(event);
        localStorage.setItem('registeredEvents', JSON.stringify(registeredEvents));
        button.textContent = 'Registered';
        button.style.backgroundColor = '#ccc';

        // Add notification for new event registration
        if (window.addNotification) {
          window.addNotification(`You have successfully registered for "${eventTitle}".`);
        }
      }
    });
  });
});
