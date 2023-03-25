const EVENTS_API_URL = 'https://638a2fb34eccb986e8a68dd4.mockapi.io/api/v1/events';

export const fetchEvent = () =>
  fetch(EVENTS_API_URL)
    .then(response => {
      if (!response.ok) {
        throw new Error(
          `Failed to fetch events. Status: ${response.status} ${response.statusText}`,
        );
      }

      return response.json();
    })
    .catch(error => {
      throw new Error(error.message);
    });

export const postEvent = eventData =>
  fetch(EVENTS_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventData),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(
          `Failed to create event. Status: ${response.status} ${response.statusText}`,
        );
      }

      return response.json();
    })
    .catch(error => {
      throw new Error(error.message);
    });

export const deleteEvent = eventId =>
  fetch(`${EVENTS_API_URL}/${eventId}`, {
    method: 'DELETE',
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(
          `Failed to delete event. Status: ${response.status} ${response.statusText}`,
        );
      }

      return response.json();
    })
    .catch(error => {
      throw new Error(error.message);
    });
