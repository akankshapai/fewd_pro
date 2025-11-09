document.addEventListener('DOMContentLoaded', () => {
  // Display welcome message
  const welcomeUserSpan = document.getElementById('welcome-user');
  const userEmailPrefix = localStorage.getItem('userEmailPrefix');
  const isLoggedIn = localStorage.getItem('loggedIn') === 'true';

  if (isLoggedIn && userEmailPrefix) {
    welcomeUserSpan.textContent = userEmailPrefix;
  } else {
    welcomeUserSpan.textContent = 'Guest'; // Default for non-logged-in users or if not logged in
  }

  // Display today's events
  const todaysEventsContainer = document.getElementById('todays-events-container');

  // Display today's registered events
  const registeredEvents = JSON.parse(localStorage.getItem('registeredEvents')) || [];
  const today = new Date();
  const formattedToday = today.toISOString().slice(0, 10); // YYYY-MM-DD format for comparison

  const todaysRegisteredEvents = registeredEvents.filter(event => {
    // Assuming event.date is in YYYY-MM-DD format or can be parsed
    const eventDate = new Date(event.date);
    return eventDate.toISOString().slice(0, 10) === formattedToday;
  });

  if (todaysRegisteredEvents.length > 0) {
    todaysRegisteredEvents.forEach(event => {
      const eventDiv = document.createElement('div');
      eventDiv.classList.add('event'); // Assuming 'event' class for styling

      eventDiv.innerHTML = `
        <h3>${event.title}</h3>
        <p>${event.description}</p>
        <p><b>Date:</b> ${event.date}</p>
        <p><b>Time:</b> ${event.time}</p>
        <p><b>Location:</b> ${event.location}</p>
      `;
      todaysEventsContainer.appendChild(eventDiv);
    });
  } else {
    todaysEventsContainer.innerHTML = '<p>No registered events for today.</p>';
  }
});
