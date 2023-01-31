import React from 'react';
import PropTypes from 'prop-types';
import Navigation from './../navigation/Navigation';
import Week from '../week/Week';
import Sidebar from '../sidebar/Sidebar';

import './calendar.scss';

const Calendar = ({
	weekDates,
	events,
	setEvents,
	setToggleModal,
	getSlotDate,
}) => {
	return (
		<section className="calendar">
			<Navigation weekDates={weekDates} />
			<div className="calendar__body">
				<div className="calendar__week-container">
					<Sidebar />
					<Week
						weekDates={weekDates}
						events={events}
						setEvents={setEvents}
						setToggleModal={setToggleModal}
						getSlotDate={getSlotDate}
					/>
				</div>
			</div>
		</section>
	);
};

Calendar.propTypes = {
	events: PropTypes.array.isRequired,
	weekDates: PropTypes.array.isRequired,
	setEvents: PropTypes.func.isRequired,
	setToggleModal: PropTypes.func.isRequired,
	getSlotDate: PropTypes.func.isRequired,
};

export default Calendar;
