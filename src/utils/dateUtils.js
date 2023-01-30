export const getWeekStartDate = (date) => {
	const dateCopy = new Date(date);
	const dayOfWeek = dateCopy.getDay();
	const difference =
		dayOfWeek === 0
			? -6 // for Sunday
			: 1 - dayOfWeek;

	const monday = new Date(dateCopy.setDate(date.getDate() + difference));
	return new Date(monday.getFullYear(), monday.getMonth(), monday.getDate());
};

export const generateWeekRange = (startDate) => {
	return new Array(7).fill(null).map((_, index) => {
		const monday = new Date(startDate);

		return new Date(monday.setDate(monday.getDate() + index));
	});
};

export const getDateTime = (date, time) => {
	const [hours, minutes] = time.split(':');
	const withHours = new Date(new Date(date).setHours(Number(hours)));
	const withMinutes = new Date(
		new Date(withHours).setMinutes(Number(minutes))
	);
	return withMinutes;
};

export const formatMins = (mins) => {
	return mins < 10 ? `0${mins}` : mins;
};

export const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const months = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec',
];
