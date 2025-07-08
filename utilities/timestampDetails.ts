import { format, getDay, getISOWeek, getQuarter, getDayOfYear, isLeapYear, differenceInCalendarDays, differenceInHours, differenceInCalendarYears, addDays, subDays, addYears, subYears, addMonths, subMonths, addWeeks, subWeeks, addHours, subHours, startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear, fromUnixTime, toDate, formatISO, formatRFC3339 } from 'date-fns';
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
    prevWeek: number;
    nextWeek: number;
    prevHour: number;
    nextHour: number;
    startOfDay: number;
    endOfDay: number;
    startOfWeek: number;
    endOfWeek: number;
    startOfMonth: number;
    endOfMonth: number;
    startOfYear: number;
    endOfYear: number;
    sameTimeLastWeek: number;
    sameTimeNextWeek: number;
    sameTimeLastMonth: number;
    sameTimeNextMonth: number;
    epochStart: number;
    y2k: number;
    millennium: number;
    roundNumbers: {
      nextRound: number;
      prevRound: number;
    };
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

  // 相关时间戳 - 大幅扩展
  const prevDay = Math.floor(addDays(date, -1).getTime() / 1000);
  const nextDay = Math.floor(addDays(date, 1).getTime() / 1000);
  const prevYear = Math.floor(addYears(date, -1).getTime() / 1000);
  const nextYear = Math.floor(addYears(date, 1).getTime() / 1000);
  const prevMonth = Math.floor(addMonths(date, -1).getTime() / 1000);
  const nextMonth = Math.floor(addMonths(date, 1).getTime() / 1000);
  const prevWeek = Math.floor(addWeeks(date, -1).getTime() / 1000);
  const nextWeek = Math.floor(addWeeks(date, 1).getTime() / 1000);
  const prevHour = Math.floor(addHours(date, -1).getTime() / 1000);
  const nextHour = Math.floor(addHours(date, 1).getTime() / 1000);
  
  // 时间边界
  const startOfDayTs = Math.floor(startOfDay(date).getTime() / 1000);
  const endOfDayTs = Math.floor(endOfDay(date).getTime() / 1000);
  const startOfWeekTs = Math.floor(startOfWeek(date).getTime() / 1000);
  const endOfWeekTs = Math.floor(endOfWeek(date).getTime() / 1000);
  const startOfMonthTs = Math.floor(startOfMonth(date).getTime() / 1000);
  const endOfMonthTs = Math.floor(endOfMonth(date).getTime() / 1000);
  const startOfYearTs = Math.floor(startOfYear(date).getTime() / 1000);
  const endOfYearTs = Math.floor(endOfYear(date).getTime() / 1000);
  
  // 相对时间
  const sameTimeLastWeek = Math.floor(addDays(date, -7).getTime() / 1000);
  const sameTimeNextWeek = Math.floor(addDays(date, 7).getTime() / 1000);
  const sameTimeLastMonth = Math.floor(addMonths(date, -1).getTime() / 1000);
  const sameTimeNextMonth = Math.floor(addMonths(date, 1).getTime() / 1000);
  
  // 特殊时间戳
  const epochStart = 0; // Unix epoch
  const y2k = 946684800; // 2000-01-01 00:00:00 UTC
  const millennium = 32503680000; // 3000-01-01 00:00:00 UTC
  
  // 整数时间戳
  const findNearestRoundNumber = (ts: number) => {
    const str = ts.toString();
    const len = str.length;
    
    // 寻找最近的整数（如1000000000, 1234567890等）
    let nextRound = ts;
    let prevRound = ts;
    
    if (len >= 8) {
      // 向上取整到下一个10的幂
      const power = Math.pow(10, len - 1);
      nextRound = Math.ceil(ts / power) * power;
      prevRound = Math.floor(ts / power) * power;
      
      // 如果相同，则寻找更大的整数
      if (nextRound === ts) {
        nextRound = ts + power;
      }
      if (prevRound === ts) {
        prevRound = ts - power;
      }
    }
    
    return { nextRound, prevRound };
  };
  
  const roundNumbers = findNearestRoundNumber(timestamp);

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
      prevWeek,
      nextWeek,
      prevHour,
      nextHour,
      startOfDay: startOfDayTs,
      endOfDay: endOfDayTs,
      startOfWeek: startOfWeekTs,
      endOfWeek: endOfWeekTs,
      startOfMonth: startOfMonthTs,
      endOfMonth: endOfMonthTs,
      startOfYear: startOfYearTs,
      endOfYear: endOfYearTs,
      sameTimeLastWeek,
      sameTimeNextWeek,
      sameTimeLastMonth,
      sameTimeNextMonth,
      epochStart,
      y2k,
      millennium,
      roundNumbers,
    },
    formats,
    timezones,
  };
} 