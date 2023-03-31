import React, { useState } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import { postEvent, fetchEvent } from '../../gateway/events.js';
import { eventValidation } from '../../utils/validation';
import { getDefModalDataDate } from '../../utils/utils';

import './modal.scss';

const Modal = ({ selectData, setEvents, setToggleModal }) => {
  const { dateSelect, hourSelect } = selectData;
  const defDataDate = getDefModalDataDate(moment(), dateSelect, hourSelect);
  const { defDate, defStartTime, defEndTime } = defDataDate;

  const [formData, setFormData] = useState({
    title: '',
    date: defDate,
    startTime: defStartTime,
    endTime: defEndTime,
    description: '',
  });

  const onChangeForm = event => {
    const { name, value } = event.target;

    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = async e => {
    e.preventDefault();

    const payload = {
      title: formData.title,
      description: formData.description,
      dateFrom: moment(`${formData.date} ${formData.startTime}`, 'YYYY-MM-DD HH:mm').valueOf(),
      dateTo: moment(`${formData.date} ${formData.endTime}`, 'YYYY-MM-DD HH:mm').valueOf(),
    };

    // I'm getting all events because the POST API server doesn't support validation

    try {
      const events = await fetchEvent();
      const errorMessage = eventValidation(payload, events);

      if (errorMessage) {
        alert(errorMessage);
        return;
      }

      await postEvent(payload);
      const response = await fetchEvent();
      setEvents(response);
      setToggleModal(false);
    } catch (error) {
      console.error(error.message);
      alert('Error create event');
    }
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
              onChange={onChangeForm}
              value={formData.title}
              required
            />
            <div className="event-form__time">
              <input
                type="date"
                name="date"
                className="event-form__field"
                onChange={onChangeForm}
                value={formData.date}
                required
              />
              <input
                type="time"
                name="startTime"
                className="event-form__field"
                onChange={onChangeForm}
                value={formData.startTime}
                required
              />
              <span>-</span>
              <input
                type="time"
                name="endTime"
                className="event-form__field"
                onChange={onChangeForm}
                value={formData.endTime}
                required
              />
            </div>
            <textarea
              name="description"
              className="event-form__field"
              placeholder="Description"
              onChange={onChangeForm}
              value={formData.description}
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
  selectData: PropTypes.object,
  setEvents: PropTypes.func.isRequired,
  setToggleModal: PropTypes.func.isRequired,
};

export default Modal;
