import dateFormat from 'dateformat';

export const toDate = dateTime => {
  return dateFormat(dateTime, `longDate`);
};
