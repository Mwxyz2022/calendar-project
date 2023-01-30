import React from 'react';
import PropTypes from 'prop-types';
import { postEvent, fetchEvent } from '../../gateway/events';
import { isValidationEvent } from './validation';

import './modal.scss';

const Modal = ({ setToggleModal, setEvents, events }) => {
	const closeModal = () => {
		setToggleModal(false);
	};

	const createEventHandler = (e) => {
		e.preventDefault();

		const newEvent = {
			title: e.target.title.value,

			description: e.target.description.value,

			dateFrom: new Date(
				`${e.target.date.value} ${e.target.startTime.value}`
			).getTime(),

			dateTo: new Date(
				`${e.target.date.value} ${e.target.endTime.value}`
			).getTime(),
		};

		if (isValidationEvent(newEvent, events)) {
			postEvent(newEvent).then(() => {
				fetchEvent().then((response) => {
					setEvents(response);
					setToggleModal(false);
				});
			});
		}
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
					<form className="event-form" onSubmit={createEventHandler}>
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
