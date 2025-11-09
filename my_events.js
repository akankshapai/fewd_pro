document.addEventListener('DOMContentLoaded', () => {
  const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
  if (!isLoggedIn) {
    alert('You must be logged in to view your registered events.');
    window.location.href = 'login.html';
    return;
  }

  const myEventsList = document.getElementById('my-events-list');
  let registeredEvents = JSON.parse(localStorage.getItem('registeredEvents')) || [];

  const displayRegisteredEvents = () => {
    myEventsList.innerHTML = ''; // Clear the list before displaying

    if (registeredEvents.length === 0) {
      myEventsList.innerHTML = '<p>You have not registered for any events yet.</p>';
      return;
    }

    registeredEvents.forEach(event => {
      const eventCard = document.createElement('div');
      eventCard.classList.add('event-card');
      eventCard.innerHTML = `
        <h3>${event.title}</h3>
        <p>${event.description}</p>
        <p><b>Date:</b> ${event.date}</p>
        <button class="btn unregister-btn">Unregister</button>
      `;
      myEventsList.appendChild(eventCard);

      const unregisterButton = eventCard.querySelector('.unregister-btn');
      unregisterButton.addEventListener('click', () => {
        // Remove the event from the array
        registeredEvents = registeredEvents.filter(e => e.title !== event.title);
        // Update localStorage
        localStorage.setItem('registeredEvents', JSON.stringify(registeredEvents));
        // Re-display the events
        displayRegisteredEvents();
      });
    });
  };

  displayRegisteredEvents();
});
