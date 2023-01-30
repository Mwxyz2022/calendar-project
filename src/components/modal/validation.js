import { EVENTMAXTIME } from '../../utils/variables';

export const isValidationEvent = (newEvent, events) => {
	let isValid = true;

	if (newEvent.dateFrom === newEvent.dateTo) {
		alert('error: Minimum duration of events, not less than 15 minutes!');
		isValid = false;
	}

	if (newEvent.dateFrom > newEvent.dateTo) {
		alert(`error: Start date can't be later than end date!`);
		isValid = false;
	}

	if (newEvent.dateTo - newEvent.dateFrom > EVENTMAXTIME) {
		alert(`error: Event cannot be longer than 6 hours!`);
		isValid = false;
	}

	const validEvent = events
		.map(
			(event) =>
				(newEvent.dateFrom < event.dateFrom &&
					newEvent.dateTo <= event.dateFrom) ||
				(newEvent.dateFrom >= event.dateTo &&
					newEvent.dateTo > event.dateTo)
		)
		.every((el) => el);

	if (!validEvent) {
		alert('error: You have another event planned for this time!');
		isValid = false;
	}
	return isValid;
};
