import React from 'react';
import PropTypes from 'prop-types';
import { postEvent, fetchEvent } from '../../gateway/events';

import './modal.scss';

const MAXEVENTTIME = 21600000;

const Modal = ({ setToggleModal, setEvents, events }) => {
	const closeModal = () => {
		setToggleModal(false);
	};

	const createEvent = (e) => {
		e.preventDefault();

		const startEventDate = new Date(
			`${e.target.date.value} ${e.target.startTime.value}`
		);

		const endEventDate = new Date(
			`${e.target.date.value} ${e.target.endTime.value}`
		);

		const newEvent = {
			title: e.target.title.value,
			description: e.target.description.value,
			dateFrom: startEventDate.getTime(),
			dateTo: endEventDate.getTime(),
		};

		if (newEvent.dateFrom === newEvent.dateTo) {
			return alert(
				'error: Minimum duration of events, not less than 15 minutes!'
			);
		}

		if (newEvent.dateFrom > newEvent.dateTo) {
			return alert(`error: Start date can't be later than end date!`);
		}

		if (newEvent.dateTo - newEvent.dateFrom > MAXEVENTTIME) {
			return alert(`error: Event cannot be longer than 6 hours!`);
		}

		const intersect = events
			.map(
				(event) =>
					(newEvent.dateFrom < event.dateFrom &&
						newEvent.dateTo <= event.dateFrom) ||
					(newEvent.dateFrom >= event.dateTo &&
						newEvent.dateTo > event.dateTo)
			)
			.every((el) => el === true);

		if (!intersect) {
			return alert(
				'error: You have another event planned for this time!'
			);
		}

		postEvent(newEvent).then(() => {
			fetchEvent().then((response) => {
				setEvents(response);
			});
		});
		setToggleModal(false);
	};

	return (
		<div className="modal overlay">
			<div className="modal__content">
				<div className="create-event">
					<button
						className="create-event__close-btn"
						onClick={closeModal}
					>
						+
					</button>
					<form className="event-form" onSubmit={createEvent}>
						<input
							type="text"
							name="title"
							placeholder="Title"
							className="event-form__field"
							required
						/>
						<div className="event-form__time">
							<input
								type="date"
								name="date"
								className="event-form__field"
								required
							/>
							<input
								type="time"
								name="startTime"
								className="event-form__field"
								step="900"
								required
							/>
							<span>-</span>
							<input
								type="time"
								name="endTime"
								className="event-form__field"
								step="900"
								required
							/>
						</div>
						<textarea
							name="description"
							placeholder="Description"
							className="event-form__field"
							required
						></textarea>
						<button
							type="submit"
							className="event-form__submit-btn"
						>
							Create
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

Modal.propTypes = {
	events: PropTypes.array.isRequired,
	setEvents: PropTypes.func.isRequired,
	setToggleModal: PropTypes.func.isRequired,
};

export default Modal;
