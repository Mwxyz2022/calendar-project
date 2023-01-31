import React from 'react';
import moment from 'moment/moment.js';
import PropTypes from 'prop-types';
import Hour from '../hour/Hour';

import './day.scss';

const Day = ({
	fullDayDate,
	dataDay,
	dayEvents,
	setEvents,
	redlinePosition,
	setToggleModal,
	getSlotDate,
}) => {
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
						fullDayDate={fullDayDate}
						dataDay={dataDay}
						redlinePosition={redlinePosition}
						setToggleModal={setToggleModal}
						getSlotDate={getSlotDate}
					/>
				);
			})}
		</div>
	);
};

Day.propTypes = {
	fullDayDate: PropTypes.object.isRequired,
	dataDay: PropTypes.number.isRequired,
	dayEvents: PropTypes.array.isRequired,
	setEvents: PropTypes.func.isRequired,
	redlinePosition: PropTypes.string.isRequired,
	setToggleModal: PropTypes.func.isRequired,
	getSlotDate: PropTypes.func.isRequired,
};

export default Day;
