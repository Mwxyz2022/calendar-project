import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { postEvent, fetchEvent } from '../../gateway/events.js';
import { isValidationEvent } from '../../utils/validation';

import './modal.scss';

const Modal = ({ modalDefaultDate, setEvents, setToggleModal }) => {
  const { defaultEventDate, defaultEventStartTime, defaultEventEndTime } = modalDefaultDate;

  const [title, setTitle] = useState('');
  const [date, setDate] = useState(defaultEventDate);
  const [startTime, setStartTime] = useState(defaultEventStartTime);
  const [endTime, setEndTime] = useState(defaultEventEndTime);
  const [description, setDescription] = useState('');

  const titleHandler = e => {
    setTitle(e.target.value);
  };

  const dateHandler = e => {
    setDate(e.target.value);
  };

  const startTimeHandler = e => {
    setStartTime(e.target.value);
  };

  const endTimeHandler = e => {
    setEndTime(e.target.value);
  };

  const descriptionHandler = e => {
    setDescription(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();

    const payload = {
      title,
      description,
      dateFrom: new Date(`${date} ${startTime}`).getTime(),
      dateTo: new Date(`${date} ${endTime}`).getTime(),
    };

    fetchEvent().then(eventsArray => {
      if (isValidationEvent(payload, eventsArray)) {
        postEvent(payload).then(() => {
          fetchEvent().then(response => {
            setEvents(response);
            setToggleModal(false);
          });
        });
      }
    });
  };

  const closeModal = () => {
    setToggleModal(false);
  };

  return (
    <div className="modal overlay">
      <div className="modal__content">
        <div className="create-event">
          <button className="create-event__close-btn" onClick={closeModal}>
            +
          </button>
          <form className="event-form" onSubmit={onSubmit}>
            <input
              type="text"
              name="title"
              className="event-form__field"
              placeholder="Title"
              onChange={titleHandler}
              value={title}
              required
            />
            <div className="event-form__time">
              <input
                type="date"
                name="date"
                className="event-form__field"
                onChange={dateHandler}
                value={date}
                required
              />
              <input
                type="time"
                name="startTime"
                className="event-form__field"
                onChange={startTimeHandler}
                value={startTime}
                step="900"
                required
              />
              <span>-</span>
              <input
                type="time"
                name="endTime"
                className="event-form__field"
                onChange={endTimeHandler}
                value={endTime}
                step="900"
                required
              />
            </div>
            <textarea
              name="description"
              className="event-form__field"
              placeholder="Description"
              onChange={descriptionHandler}
              value={description}
              required
            ></textarea>
            <button type="submit" className="event-form__submit-btn">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  modalDefaultDate: PropTypes.object,
  setEvents: PropTypes.func.isRequired,
  setToggleModal: PropTypes.func.isRequired,
};

export default Modal;
