import React from 'react';
import moment from 'moment/moment';
import PropTypes from 'prop-types';

import { postEvent, fetchEvent } from '../../gateway/events.js';
import { isValidationEvent } from './validation.js';
import { getDefStartTime, getDefEndTime } from './defaultTimeUtils.js';

import './modal.scss';

const Modal = ({ events, defSlotDate, setEvents, setToggleModal, setDefSlotDate }) => {
  const currentMoment = moment();

  const defaultTime = {
    eventDate: moment().format('YYYY-MM-DD'),
    eventStartTime: getDefStartTime(currentMoment),
    eventEndTime: getDefEndTime(getDefStartTime(currentMoment)),
  };

  const closeModal = () => {
    setDefSlotDate(null);
    setToggleModal(false);
  };

  const createEventHandler = e => {
    e.preventDefault();

    const newEvent = {
      title: e.target.title.value,
      description: e.target.description.value,
      dateFrom: new Date(`${e.target.date.value} ${e.target.startTime.value}`).getTime(),
      dateTo: new Date(`${e.target.date.value} ${e.target.endTime.value}`).getTime(),
    };

    if (isValidationEvent(newEvent, events)) {
      postEvent(newEvent).then(() => {
        fetchEvent().then(response => {
          setEvents(response);
          setDefSlotDate(null);
          setToggleModal(false);
        });
      });
    }
  };

  return (
    <div className="modal overlay">
      <div className="modal__content">
        <div className="create-event">
          <button className="create-event__close-btn" onClick={closeModal}>
            +
          </button>
          <form className="event-form" onSubmit={createEventHandler}>
            <input
              type="text"
              name="title"
              className="event-form__field"
              placeholder="Title"
              required
            />
            <div className="event-form__time">
              <input
                type="date"
                name="date"
                className="event-form__field"
                defaultValue={defSlotDate ? defSlotDate.eventDate : defaultTime.eventDate}
                required
              />
              <input
                type="time"
                name="startTime"
                className="event-form__field"
                defaultValue={defSlotDate ? defSlotDate.eventStartTime : defaultTime.eventStartTime}
                step="900"
                required
              />
              <span>-</span>
              <input
                type="time"
                name="endTime"
                className="event-form__field"
                defaultValue={defSlotDate ? defSlotDate.eventEndTime : defaultTime.eventEndTime}
                step="900"
                required
              />
            </div>
            <textarea
              name="description"
              className="event-form__field"
              placeholder="Description"
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
  events: PropTypes.array.isRequired,
  defSlotDate: PropTypes.object,
  setEvents: PropTypes.func.isRequired,
  setToggleModal: PropTypes.func.isRequired,
  setDefSlotDate: PropTypes.func.isRequired,
};

export default Modal;
