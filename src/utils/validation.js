import moment from 'moment';

export const eventValidation = (newEvent, events) => {
  const { dateFrom, dateTo } = newEvent;

  const eventDuration = moment.duration(moment(dateTo).diff(moment(dateFrom)));
  const maxDuration = moment.duration({ hours: 6 });
  const isMultipleOf15 = value => value % 15 === 0;

  const exceptionTimeTo = moment(dateTo).format('HH:mm') === '23:59';

  if (
    !isMultipleOf15(moment(dateFrom).minute()) ||
    (!isMultipleOf15(moment(dateTo).minute()) && !exceptionTimeTo)
  ) {
    return 'error: Start and end times must be multiples of 15 minutes!';
  }

  if (moment(dateFrom).isSameOrAfter(moment(dateTo))) {
    return "error: Start date can't be later than end date!";
  }

  if (eventDuration > maxDuration) {
    return 'error: Event cannot be longer than 6 hours!';
  }

  const isValidEventTime = events.every(
    event =>
      moment(dateFrom).isSameOrAfter(event.dateTo) || moment(dateTo).isSameOrBefore(event.dateFrom),
  );

  if (!isValidEventTime) {
    return 'error: Event overlaps with an existing event!';
  }

  return false;
};

export const delValidation = dateEvent => {
  const eventTime = moment(dateEvent);
  const currentTime = moment();
  const diffMinutes = eventTime.diff(currentTime, 'minutes');

  const messageError = `Error: You can't delete events that are less than 15 minutes away!`;

  return diffMinutes >= 0 && diffMinutes <= 15 ? messageError : false;
};
