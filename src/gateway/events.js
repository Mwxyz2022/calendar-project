const baseUrl = 'https://638a2fb34eccb986e8a68dd4.mockapi.io/api/v1/events';

export const createEvent = (eventData) =>
	fetch(baseUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(eventData),
	}).then((response) => {
		if (!response.ok) {
			throw new Error('Failed to create event');
		}
	});

export const fetchEvent = () =>
	fetch(baseUrl).then((res) => {
		if (res.ok) {
			return res.json();
		}
	});

export const deleteEvent = (eventId) =>
	fetch(`${baseUrl}/${eventId}`, {
		method: 'DELETE',
	}).then((response) => {
		if (!response.ok) {
			throw new Error('Failed to delete event');
		}
	});

// export const updateTask = (taskId, taskData) =>
// 	fetch(`${baseUrl}/${taskId}`, {
// 		method: 'PUT',
// 		headers: {
// 			'Content-Type': 'application/json',
// 		},
// 		body: JSON.stringify(taskData),
// 	}).then((response) => {
// 		if (!response.ok) {
// 			throw new Error('Failed to update task');
// 		}
// 	});
