import React, { useState } from 'react';

import './event.scss';

const Event = ({ height, marginTop, title, time, setEvents, id }) => {
	const [modal, setModal] = useState(false);

	const openModal = () => {
		setModal(!modal);
	};

	const deleteEvent = (eventId) => {
		setEvents((prevValue) => prevValue.filter((event) => event.id !== id));

		setModal(false);
	};

	const eventStyle = {
		height,
		marginTop,
	};

	return (
		<>
			<div style={eventStyle} className="event" onClick={openModal}>
				<div className="event__title">{title}</div>
				<div className="event__time">{time}</div>
				{modal ? (
					<div className="delete" onClick={() => deleteEvent(id)}>
						<i className="delete__icon fas fa-solid fa-trash"></i>
						<span className="delete__title">Delete</span>
					</div>
				) : null}
			</div>
		</>
	);
};

export default Event;
