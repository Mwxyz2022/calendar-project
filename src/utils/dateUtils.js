import moment from 'moment/moment';

import { getDefStartTime, getDefEndTime } from './timeUtils';

const currentMoment = moment();

export const defaultEventTime = {
  defaultEventDate: moment().format('YYYY-MM-DD'),
  defaultEventStartTime: getDefStartTime(currentMoment),
  defaultEventEndTime: getDefEndTime(getDefStartTime(currentMoment)),
};

// export const getWeekStartDate = date => {
//   const dateCopy = new Date(date);
//   const dayOfWeek = dateCopy.getDay();
//   const difference =
//     dayOfWeek === 0
//       ? -6 // for Sunday
//       : 1 - dayOfWeek;

//   const monday = new Date(dateCopy.setDate(date.getDate() + difference));
//   return new Date(monday.getFullYear(), monday.getMonth(), monday.getDate());
// };

// export const generateWeekRange = startDate => {
//   return new Array(7).fill(null).map((_, index) => {
//     const monday = new Date(startDate);

//     return new Date(monday.setDate(monday.getDate() + index));
//   });
// };

// export const getDateTime = (date, time) => {
//   const [hours, minutes] = time.split(':');
//   const withHours = new Date(new Date(date).setHours(Number(hours)));
//   const withMinutes = new Date(new Date(withHours).setMinutes(Number(minutes)));
//   return withMinutes;
// };

// export const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
// export const months = [
//   'Jan',
//   'Feb',
//   'Mar',
//   'Apr',
//   'May',
//   'Jun',
//   'Jul',
//   'Aug',
//   'Sep',
//   'Oct',
//   'Nov',
//   'Dec',
// ];

export const getWeekStartDate = date => {
  const dateCopy = moment(date);
  const dayOfWeek = dateCopy.day();
  const difference = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const monday = moment(dateCopy).add(difference, 'days');
  return monday.startOf('day').toDate(); // используем методы startOf() и toDate() для получения начальной даты недели
};

export const generateWeekRange = startDate => {
  return new Array(7).fill(null).map((_, index) => {
    const date = moment(startDate).add(index, 'days');
    return date.startOf('day').toDate(); // используем методы startOf() и toDate() для получения даты для каждого дня недели
  });
};

export const getDateTime = (date, time) => {
  const [hours, minutes] = time.split(':');
  const dateTime = moment(date).startOf('day').add(hours, 'hours').add(minutes, 'minutes');
  return dateTime.toDate(); // используем метод toDate() для получения даты и времени
};

export const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
