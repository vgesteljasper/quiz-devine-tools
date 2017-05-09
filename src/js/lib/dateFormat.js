import dateFormat from 'dateformat';

export const toDate = date => {
  return dateFormat(date, `longDate`);
};

export const toYear = date => {
  return dateFormat(date, `yyyy`);
};
