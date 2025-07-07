import { useState, useEffect, useCallback } from 'react';

export interface TimestampConversion {
  format: string;
  convertedTimestamp: string;
  gmt: string;
  yourTimezone: string;
  relative: string;
}

export interface DateTimeInputs {
  year?: number;
  month?: number;
  day?: number;
  hour?: number;
  minute?: number;
  second?: number;
}

export interface TimestampHookReturn {
  currentTimestamp: number;
  currentDateTime: string;
  timestamp: string;
  setTimestamp: (value: string) => void;
  dateInputs: DateTimeInputs;
  setDateInputs: (inputs: Partial<DateTimeInputs>) => void;
  timestampConversion: TimestampConversion | null;
  dateConversion: {
    convertedDate: string;
    gmt: string;
    yourTimezone: string;
    relative: string;
  } | null;
  setCurrentDateTimeToState: () => void;
  setCurrentTimestampToState: () => void;
  isValidDateTime: (year: number, month: number, day: number, hour: number, minute: number, second: number) => boolean;
}

export const useTimestamp = (): TimestampHookReturn => {
  const [currentTimestamp, setCurrentTimestamp] = useState<number>(0);
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [timestamp, setTimestamp] = useState("");
  const [dateInputs, setDateInputsState] = useState<DateTimeInputs>({});
  const [timestampConversion, setTimestampConversion] = useState<TimestampConversion | null>(null);
  const [dateConversion, setDateConversion] = useState<{
    convertedDate: string;
    gmt: string;
    yourTimezone: string;
    relative: string;
  } | null>(null);

  const setDateInputs = useCallback((inputs: Partial<DateTimeInputs>) => {
    setDateInputsState(prev => ({ ...prev, ...inputs }));
  }, []);

  const calculateRelativeTime = useCallback((date: Date): string => {
    const currentDate = new Date();
    const diffInMilliseconds = currentDate.getTime() - date.getTime();

    const seconds = Math.floor(diffInMilliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else {
      return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
    }
  }, []);

  const isValidDateTime = useCallback((year: number, month: number, day: number, hour: number, minute: number, second: number): boolean => {
    if (
      month < 1 ||
      month > 12 ||
      hour < 0 ||
      hour > 23 ||
      minute < 0 ||
      minute > 59 ||
      second < 0 ||
      second > 59
    ) {
      return false;
    }

    const date = new Date(year, month - 1, day, hour, minute, second);
    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day &&
      date.getHours() === hour &&
      date.getMinutes() === minute &&
      date.getSeconds() === second
    );
  }, []);

  const handleTimestampChange = useCallback(() => {
    const timestampValue = parseInt(timestamp);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timeZoneName: "short",
    };

    if (isNaN(timestampValue)) {
      setTimestampConversion({
        format: "Unknown format",
        convertedTimestamp: "Invalid timestamp",
        gmt: "",
        yourTimezone: "",
        relative: ""
      });
      return;
    }

    let dateString = "";
    let format = "";
    let gmt = "";
    let yourTimezone = "";
    let relative = "";
    let date: Date;

    switch (timestamp.length) {
      case 10:
        date = new Date(timestampValue * 1000);
        format = "Second";
        break;
      case 13:
        date = new Date(timestampValue);
        format = "Milliseconds (1/1,000 second)";
        break;
      case 16:
        date = new Date(timestampValue / 1000);
        format = "Microseconds (1/1,000,000 second)";
        break;
      case 19:
        date = new Date(timestampValue / 1e6);
        format = "Nanoseconds (1 billionth of a second)";
        break;
      default:
        format = "Unknown format";
        dateString = "Invalid timestamp";
        setTimestampConversion({
          format,
          convertedTimestamp: dateString,
          gmt: "",
          yourTimezone: "",
          relative: ""
        });
        return;
    }

    dateString = date.toLocaleString();
    gmt = date.toUTCString();
    yourTimezone = date.toLocaleString(undefined, options);
    relative = calculateRelativeTime(date);

    setTimestampConversion({
      format,
      convertedTimestamp: dateString,
      gmt,
      yourTimezone,
      relative
    });
  }, [timestamp, calculateRelativeTime]);

  const handleDateChange = useCallback(() => {
    const { year, month, day, hour, minute, second } = dateInputs;
    
    if (!year || !month || !day || hour === undefined || minute === undefined || second === undefined) {
      setDateConversion(null);
      return;
    }

    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timeZoneName: "short",
    };

    const date = new Date(year, month - 1, day, hour, minute, second);
    
    if (!isValidDateTime(year, month, day, hour, minute, second)) {
      setDateConversion({
        convertedDate: "Invalid date",
        gmt: "Invalid date",
        yourTimezone: "Invalid date",
        relative: "Invalid date"
      });
      return;
    }

    const convertedDate = String(Math.floor(date.getTime() / 1000));
    const gmt = date.toUTCString();
    const yourTimezone = date.toLocaleString(undefined, options);
    const relative = calculateRelativeTime(date);

    setDateConversion({
      convertedDate,
      gmt,
      yourTimezone,
      relative
    });
  }, [dateInputs, isValidDateTime, calculateRelativeTime]);

  const setCurrentDateTimeToState = useCallback(() => {
    const currentDate = new Date();
    setDateInputs({
      year: currentDate.getFullYear(),
      month: currentDate.getMonth() + 1,
      day: currentDate.getDate(),
      hour: currentDate.getHours(),
      minute: currentDate.getMinutes(),
      second: currentDate.getSeconds()
    });
  }, [setDateInputs]);

  const setCurrentTimestampToState = useCallback(() => {
    setTimestamp(String(Math.floor(Date.now() / 1000)));
  }, []);

  useEffect(() => {
    setCurrentTimestamp(Math.floor(Date.now() / 1000));
    setCurrentDateTime(new Date().toLocaleString());
    
    const interval = setInterval(() => {
      setCurrentTimestamp(Math.floor(Date.now() / 1000));
      setCurrentDateTime(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timestamp) {
      handleTimestampChange();
    } else {
      setTimestampConversion(null);
    }
  }, [timestamp, handleTimestampChange]);

  useEffect(() => {
    handleDateChange();
  }, [dateInputs, handleDateChange]);

  return {
    currentTimestamp,
    currentDateTime,
    timestamp,
    setTimestamp,
    dateInputs,
    setDateInputs,
    timestampConversion,
    dateConversion,
    setCurrentDateTimeToState,
    setCurrentTimestampToState,
    isValidDateTime
  };
};