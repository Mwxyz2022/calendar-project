const baseUrl = 'https://638a2fb34eccb986e8a68dd4.mockapi.io/api/v1/events';

export const postEvent = eventData =>
  fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventData),
  }).then(response => {
    if (!response.ok) {
      throw new Error(`Internal Server Error. Can't display events`);
    }
  });

export const fetchEvent = () =>
  fetch(baseUrl).then(response => {
    if (response.ok) {
      return response.json();
    }
  });

export const deleteEvent = eventId =>
  fetch(`${baseUrl}/${eventId}`, {
    method: 'DELETE',
  }).then(response => {
    if (!response.ok) {
      throw new Error(`Internal Server Error. Can't display events`);
    }
  });
