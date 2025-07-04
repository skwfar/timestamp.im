import { format, getDay, getISOWeek, getQuarter, getDayOfYear, isLeapYear, differenceInCalendarDays, differenceInHours, differenceInCalendarYears, addDays, subDays, addYears, subYears, fromUnixTime, toDate, formatISO, formatRFC3339 } from 'date-fns';
import { toZonedTime, format as tzFormat } from 'date-fns-tz';

export type TimestampDetails = {
  date: Date;
  iso: string;
  rfc3339: string;
  local: string;
  weekday: string;
  quarter: number;
  week: number;
  dayOfYear: number;
  isLeapYear: boolean;
  daysFromNow: number;
  hoursFromNow: number;
  yearsFromNow: number;
  ageIfBirthday: number;
  relatedTimestamps: {
    prevDay: number;
    nextDay: number;
    prevYear: number;
    nextYear: number;
    prevMonth: number;
    nextMonth: number;
  };
  formats: {
    iso: string;
    rfc3339: string;
    us: string;
    eu: string;
    cn: string;
    jp: string;
  };
  timezones: {
    [tz: string]: string;
  };
};

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function getTimestampDetails(timestamp: number, opts?: { birthdayMode?: boolean }) : TimestampDetails {
  const date = fromUnixTime(timestamp);
  const now = new Date();
  const iso = formatISO(date);
  const rfc3339 = formatRFC3339(date);
  const local = date.toLocaleString();
  const weekday = WEEKDAYS[getDay(date)];
  const quarter = getQuarter(date);
  const week = getISOWeek(date);
  const dayOfYear = getDayOfYear(date);
  const leap = isLeapYear(date);
  const daysFromNow = differenceInCalendarDays(date, now);
  const hoursFromNow = differenceInHours(date, now);
  const yearsFromNow = differenceInCalendarYears(date, now);
  const ageIfBirthday = opts?.birthdayMode ? differenceInCalendarYears(now, date) : 0;

  // 相关时间戳
  const prevDay = Math.floor(addDays(date, -1).getTime() / 1000);
  const nextDay = Math.floor(addDays(date, 1).getTime() / 1000);
  const prevYear = Math.floor(addYears(date, -1).getTime() / 1000);
  const nextYear = Math.floor(addYears(date, 1).getTime() / 1000);
  const prevMonth = Math.floor(addDays(date, -30).getTime() / 1000);
  const nextMonth = Math.floor(addDays(date, 30).getTime() / 1000);

  // 多种格式
  const formats = {
    iso,
    rfc3339,
    us: format(date, 'MM/dd/yyyy HH:mm:ss'),
    eu: format(date, 'dd/MM/yyyy HH:mm:ss'),
    cn: format(date, 'yyyy年MM月dd日 HH:mm:ss'),
    jp: format(date, 'yyyy/MM/dd HH:mm:ss'),
  };

  // 常用时区
  const timezones = {
    'UTC': tzFormat(toZonedTime(date, 'UTC'), 'yyyy-MM-dd HH:mm:ssXXX', { timeZone: 'UTC' }),
    'Asia/Shanghai': tzFormat(toZonedTime(date, 'Asia/Shanghai'), 'yyyy-MM-dd HH:mm:ssXXX', { timeZone: 'Asia/Shanghai' }),
    'America/New_York': tzFormat(toZonedTime(date, 'America/New_York'), 'yyyy-MM-dd HH:mm:ssXXX', { timeZone: 'America/New_York' }),
    'Europe/London': tzFormat(toZonedTime(date, 'Europe/London'), 'yyyy-MM-dd HH:mm:ssXXX', { timeZone: 'Europe/London' }),
    'Asia/Tokyo': tzFormat(toZonedTime(date, 'Asia/Tokyo'), 'yyyy-MM-dd HH:mm:ssXXX', { timeZone: 'Asia/Tokyo' }),
  };

  return {
    date,
    iso,
    rfc3339,
    local,
    weekday,
    quarter,
    week,
    dayOfYear,
    isLeapYear: leap,
    daysFromNow,
    hoursFromNow,
    yearsFromNow,
    ageIfBirthday,
    relatedTimestamps: {
      prevDay,
      nextDay,
      prevYear,
      nextYear,
      prevMonth,
      nextMonth,
    },
    formats,
    timezones,
  };
} 