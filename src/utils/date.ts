import dayjs from 'dayjs';
import ko from 'dayjs/locale/ko';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import relativeTime from 'dayjs/plugin/relativeTime';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);

dayjs.tz.setDefault('Asia/Seoul');
dayjs.locale(ko);

export const setDate = (date: number | string | Date) => {
  const diff = dayjs().diff(date, 'days');

  if (diff >= 7) {
    return dayjs(date).tz().format('YYYY년 M월 D일 HH:mm:ss');
  } else {
    return dayjs(date).tz().fromNow();
  }
};

export const stringToDate = (dateString: string) => {
  return dayjs(dateString, 'YYYY-MM-DD HH:mm:ss').toDate();
};

export const dateAddDay = (day: number = 0) => {
  const now = dayjs().tz().toDate();

  return dayjs(now).add(day, 'day').tz().toDate();
};

export const dateAddMonth = (month: number = 0) => {
  const now = dayjs().tz().toDate();

  return dayjs(now).add(month, 'month').tz().toDate();
};

export const dateAddYear = (year: number = 0) => {
  const now = dayjs().tz().toDate();

  return dayjs(now).add(year, 'year').tz().toDate();
};

export const dateAddHour = (hour: number = 0) => {
  const now = dayjs().tz().toDate();

  return dayjs(now).add(hour, 'hour').tz().toDate();
};
