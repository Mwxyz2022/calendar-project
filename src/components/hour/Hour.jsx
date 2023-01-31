import React from 'react';
import PropTypes from 'prop-types';
import RedLine from '../redLine/RedLine';
import Event from '../event/Event';
import { formatMins } from '../../../src/utils/dateUtils.js';

import moment from 'moment/moment.js';

const Hour = ({
	dataHour,
	hourEvents,
	setEvents,
	fullDayDate,
	dataDay,
	redlinePosition,
	setToggleModal,
	getSlotDate,
}) => {
	const showLine =
		dataDay === new Date().getDate() && dataHour === new Date().getHours();

	const openModal = () => {
		getSlotDate(fullDayDate, dataHour);
		setToggleModal(true);
	};

	return (
		<div
			className="calendar__time-slot"
			data-time={dataHour + 1}
			onClick={openModal}
		>
			{showLine && <RedLine redlinePosition={redlinePosition} />}

			{hourEvents.map(({ id, dateFrom, dateTo, title }) => {
				const eventStart = `${moment(dateFrom).get(
					'hour'
				)}:${formatMins(moment(dateFrom).get('minute'))}`;
				const eventEnd = `${moment(dateTo).get('hour')}:${formatMins(
					moment(dateTo).get('minute')
				)}`;

				return (
					<Event
						key={id}
						id={id}
						height={(dateTo - dateFrom) / (1000 * 60)}
						marginTop={moment(dateFrom).get('minute')}
						time={`${eventStart} - ${eventEnd}`}
						title={title}
						setEvents={setEvents}
					/>
				);
			})}
		</div>
	);
};

Hour.propTypes = {
	dataHour: PropTypes.number.isRequired,
	hourEvents: PropTypes.array.isRequired,
	setEvents: PropTypes.func.isRequired,
	dataDay: PropTypes.number.isRequired,
	redlinePosition: PropTypes.string.isRequired,
	setToggleModal: PropTypes.func.isRequired,
	getSlotDate: PropTypes.func.isRequired,
	fullDayDate: PropTypes.object.isRequired,
};

export default Hour;
