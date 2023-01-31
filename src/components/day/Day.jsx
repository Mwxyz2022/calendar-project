import React from 'react';
import moment from 'moment/moment.js';
import PropTypes from 'prop-types';
import Hour from '../hour/Hour';

import './day.scss';

const Day = ({ dataDay, dayEvents, setEvents, redlinePosition }) => {
	const hours = Array(24)
		.fill()
		.map((val, index) => index);

	return (
		<div className="calendar__day" data-day={dataDay}>
			{hours.map((hour) => {
				const hourEvents = dayEvents.filter(
					(event) => moment(event.dateFrom).get('hour') === hour
				);
				return (
					<Hour
						key={dataDay + hour}
						dataHour={hour}
						hourEvents={hourEvents}
						setEvents={setEvents}
						dataDay={dataDay}
						redlinePosition={redlinePosition}
					/>
				);
			})}
		</div>
	);
};

Day.propTypes = {
	dataDay: PropTypes.number.isRequired,
	dayEvents: PropTypes.array.isRequired,
	setEvents: PropTypes.func.isRequired,
	redlinePosition: PropTypes.string.isRequired,
};

export default Day;
