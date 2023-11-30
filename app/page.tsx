"use client";
import React, { useState, useEffect, useCallback } from "react";

export default function Home() {
  const [currentTimestamp, setCurrentTimestamp] = useState<number | undefined>()
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [isTimestampResultVisible, setTimestampResultVisible] = useState(false);
  const [isDateResultVisible, setDateResultVisible] = useState(false);
  const [timestamp, setTimestamp] = useState("");
  const [year, setYear] = useState<number | undefined>();
  const [month, setMonth] = useState<number | undefined>();
  const [day, setDay] = useState<number | undefined>();
  const [hour, setHour] = useState<number | undefined>();
  const [minute, setMinute] = useState<number | undefined>();
  const [second, setSecond] = useState<number | undefined>();
  const [convertedTimestamp, setConvertedTimestamp] = useState("");
  const [convertedDate, setConvertedDate] = useState("");
  const [format, setFormat] = useState("");
  const [tGmt, setTGmt] = useState("");
  const [tYourTimezone, setTYourTimezone] = useState("");
  const [tRelative, setTRelative] = useState("");
  const [dGmt, setDGmt] = useState("");
  const [dYourTimezone, setDYourTimezone] = useState("");
  const [dRelative, setDRelative] = useState("");
  const [copied, setCopied] = useState(false);
  const [tableCopied, setTableCopied] = useState<Record<string, boolean>>({});

  const languages = [
    { name: 'Swift', code: 'NSDate().timeIntervalSince1970' },
    { name: 'Go', code: 'int64(time.Now().Unix())' },
    { name: 'Java', code: 'System.currentTimeMillis() / 1000' },
    { name: 'JavaScript', code: 'Math.round(new Date() / 1000)' },
    { name: 'Objective-C', code: '[[NSDate date] timeIntervalSince1970]' },
    { name: 'MySQL', code: 'SELECT unix_timestamp(now())' },
    { name: 'SQLite', code: "SELECT strftime('%s', 'now')" },
    { name: 'Erlang', code: 'calendar:datetime_to_gregorian_seconds(calendar:universal_time())-719528*24*3600.' },
    { name: 'PHP', code: 'time()' },
    { name: 'Python', code: 'time.time()' },
    { name: 'Ruby', code: 'Time.now.to_i' },
    { name: 'Shell', code: 'date +%s' },
    { name: 'Groovy', code: '(new Date().time / 1000).longValue()' },
    { name: 'Lua', code: 'os.time()' },
    { name: '.NET/C#', code: 'DateTimeOffset.UtcNow.ToUnixTimeSeconds();' },
    { name: 'Dart', code: '(new DateTime.now().millisecondsSinceEpoch / 1000).truncate()' }
  ];

  const copyToClipboard = (code: string, lang: string) => {
    navigator.clipboard.writeText(code);
    setTableCopied({ ...tableCopied, [lang]: true });
    setTimeout(() => setTableCopied({ ...tableCopied, [lang]: false }), 1000);
  };

  const handleTimestampChange = useCallback(() => {
    const timestampValue = parseInt(timestamp);
    const options = {
      weekday: "short" as const,
      year: "numeric" as const,
      month: "short" as const,
      day: "numeric" as const,
      hour: "numeric" as const,
      minute: "numeric" as const,
      second: "numeric" as const,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timeZoneName: "short" as const,
    };

    if (isNaN(timestampValue)) {
      setFormat("Unknown format");
      setConvertedTimestamp("Invalid timestamp");
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
        dateString = date.toLocaleString();
        gmt = date.toUTCString();
        yourTimezone = date.toLocaleString(undefined, options);
        relative = calculateRelativeTime(date);
        break;
      case 13:
        date = new Date(timestampValue);
        format = "Milliseconds (1/1,000 second)";
        dateString = date.toLocaleString();
        gmt = date.toUTCString();
        yourTimezone = date.toLocaleString(undefined, options);
        relative = calculateRelativeTime(date);
        break;
      case 16:
        date = new Date(timestampValue / 1000);
        format = "Microseconds (1/1,000,000 second)";
        dateString = date.toLocaleString();
        gmt = date.toUTCString();
        yourTimezone = date.toLocaleString(undefined, options);
        relative = calculateRelativeTime(date);
        break;
      case 19:
        date = new Date(timestampValue / 1e6);
        format = "Nanoseconds (1 billionth of a second)";
        dateString = date.toLocaleString();
        gmt = date.toUTCString();
        yourTimezone = date.toLocaleString(undefined, options);
        relative = calculateRelativeTime(date);
        break;
      default:
        format = "Unknown format";
        dateString = "Invalid timestamp";
        break;
    }

    setFormat(format);
    setConvertedTimestamp(dateString);
    setTGmt(gmt);
    setTYourTimezone(yourTimezone);
    setTRelative(relative);
  }, [timestamp]);

  const handleDateChange = useCallback(() => {
    const options = {
      weekday: "short" as const,
      year: "numeric" as const,
      month: "short" as const,
      day: "numeric" as const,
      hour: "numeric" as const,
      minute: "numeric" as const,
      second: "numeric" as const,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timeZoneName: "short" as const,
    };
    const date = new Date(
      Number(year),
      Number(month) - 1,
      Number(day),
      Number(hour),
      Number(minute),
      Number(second)
    );
    var convertedDate = String(Math.floor(date.getTime() / 1000));
    var gmt = date.toUTCString();
    var yourTimezone = date.toLocaleString(undefined, options);
    var relative = calculateRelativeTime(date);
    // If validation fails, set convertedDate to "Invalid date"
    if (!isValidDateTime(Number(year), Number(month), Number(day), Number(hour), Number(minute), Number(second))) {
      convertedDate = "Invalid date";
      gmt = "Invalid date";
      yourTimezone = "Invalid date";
      relative = "Invalid date";
    }
    setConvertedDate(convertedDate);
    setDGmt(gmt);
    setDYourTimezone(yourTimezone);
    setDRelative(relative);
  }, [year, month, day, hour, minute, second]);

  const setCurrentDateTimeToState = () => {
    const currentDate = new Date();

    setYear(currentDate.getFullYear());
    setMonth(currentDate.getMonth() + 1); // 月份从 0 开始，所以要加 1
    setDay(currentDate.getDate());
    setHour(currentDate.getHours());
    setMinute(currentDate.getMinutes());
    setSecond(currentDate.getSeconds());
  };

  const setCurrentTimestampToState = () => {
    setTimestamp(String(Math.floor(Date.now() / 1000)));
  };

  const handleUse = () => {
    setCurrentDateTimeToState();
    setCurrentTimestampToState();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(String(currentTimestamp));
    setCopied(true);

    // Reset the "Copied!" status after 2 seconds
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const calculateRelativeTime = (date: Date) => {
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
  };

  const isValidDateTime = (year: number, month: number, day: number, hour: number, minute: number, second: number) => {
    // 检查月份、小时、分钟和秒钟是否在有效范围内
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

    // 创建日期对象并检查日期是否有效
    const date = new Date(year, month - 1, day, hour, minute, second);
    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day &&
      date.getHours() === hour &&
      date.getMinutes() === minute &&
      date.getSeconds() === second
    );
  }

  useEffect(() => {
    setCurrentTimestamp(Math.floor(Date.now() / 1000));
    setCurrentDateTime(new Date().toLocaleString());
    if (timestamp) {
      setTimestampResultVisible(true);
      handleTimestampChange();
    } else {
      setTimestampResultVisible(false);
    }
    if (
      year &&
      month &&
      day &&
      hour != undefined &&
      minute != undefined &&
      second != undefined
    ) {
      setDateResultVisible(true);
      handleDateChange();
    } else {
      setDateResultVisible(false);
    }
    const interval = setInterval(() => {
      setCurrentTimestamp(Math.floor(Date.now() / 1000));
      setCurrentDateTime(new Date().toLocaleString());
      handleTimestampChange();
      handleDateChange();
    }, 1000);

    return () => clearInterval(interval);
  }, [
    timestamp,
    year,
    month,
    day,
    hour,
    minute,
    second,
    handleTimestampChange,
    handleDateChange,
  ]);

  return (
    <div className="container mx-auto p-4 lg:w-1/2 xl:w-1/2">
      <div className="mb-10 mt-10">
        <div className="flex mb-4">
          <div className="flex-1">
            <h2 className="text-lg font-bold mb-2">Enter a Timestamp</h2>
            <input
              type="text"
              placeholder="Timestamp"
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
              className="border p-2 w-full mr-2"
              min="0"
            />
          </div>
          <div className="flex-1 flex justify-center items-center flex-col">
            <div className="font-bold text-4xl"> {currentTimestamp}</div>
            <div className="font-bold mb-2"> {currentDateTime}</div>
            <div className="flex flex-row gap-4">
              <button
                onClick={handleUse}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Use
              </button>
              <button
                onClick={handleCopy}
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                  copied ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={copied}
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        </div>
        {isTimestampResultVisible && (
          <table className="ui celled definition table timestamp-results">
            <tbody>
              <tr>
                <td className="w-48">Format</td>
                <td className="format">{format}</td>
              </tr>
              <tr>
                <td className="w-48">DateTime</td>
                <td className="gmt">{convertedTimestamp}</td>
              </tr>
              <tr>
                <td className="w-48">GMT</td>
                <td className="gmt">{tGmt}</td>
              </tr>
              <tr>
                <td className="w-48">Your Time Zone</td>
                <td className="local">{tYourTimezone}</td>
              </tr>
              <tr>
                <td className="w-48">Relative</td>
                <td className="relative">{tRelative}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>

      <div className="mb-10">
        <h2 className="text-lg font-bold mb-2">Enter a Date & Time</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="col-span-1">
            <div className="flex flex-col items-center">
              <label htmlFor="year" className="text-sm mb-1">
                Year
              </label>
              <input
                type="number"
                id="year"
                placeholder="Year"
                value={year === undefined ? "" : year}
                onChange={(e) =>
                  setYear(
                    e.target.value === ""
                      ? undefined
                      : parseInt(e.target.value, 10)
                  )
                }
                className="border p-2 w-full"
                min="1970"
                max="2038"
              />
            </div>
          </div>

          <div className="col-span-1">
            <div className="flex flex-col items-center">
              <label htmlFor="month" className="text-sm mb-1">
                Month
              </label>
              <input
                type="number"
                id="month"
                placeholder="Month"
                value={month === undefined ? "" : month}
                onChange={(e) =>
                  setMonth(
                    e.target.value === ""
                      ? undefined
                      : parseInt(e.target.value, 10)
                  )
                }
                className="border p-2 w-full"
                min="1"
                max="12"
              />
            </div>
          </div>

          <div className="col-span-1">
            <div className="flex flex-col items-center">
              <label htmlFor="day" className="text-sm mb-1">
                Day
              </label>
              <input
                type="number"
                id="day"
                placeholder="Day"
                value={day === undefined ? "" : day}
                onChange={(e) =>
                  setDay(
                    e.target.value === ""
                      ? undefined
                      : parseInt(e.target.value, 10)
                  )
                }
                className="border p-2 w-full"
                min="1"
                max="31"
              />
            </div>
          </div>

          <div className="col-span-1">
            <div className="flex flex-col items-center">
              <label htmlFor="hour" className="text-sm mb-1">
                Hour
              </label>
              <input
                type="number"
                id="hour"
                placeholder="Hour"
                value={hour === undefined ? "" : hour}
                onChange={(e) =>
                  setHour(
                    e.target.value === ""
                      ? undefined
                      : parseInt(e.target.value, 10)
                  )
                }
                className="border p-2 w-full"
                min="0"
                max="24"
              />
            </div>
          </div>

          <div className="col-span-1">
            <div className="flex flex-col items-center">
              <label htmlFor="minute" className="text-sm mb-1">
                Minute
              </label>
              <input
                type="number"
                id="minute"
                placeholder="Minute"
                value={minute === undefined ? "" : minute}
                onChange={(e) =>
                  setMinute(
                    e.target.value === ""
                      ? undefined
                      : parseInt(e.target.value, 10)
                  )
                }
                className="border p-2 w-full"
                min="0"
                max="59"
              />
            </div>
          </div>

          <div className="col-span-1">
            <div className="flex flex-col items-center">
              <label htmlFor="second" className="text-sm mb-1">
                Second
              </label>
              <input
                type="number"
                id="second"
                placeholder="Second"
                value={second === undefined ? "" : second}
                onChange={(e) =>
                  setSecond(
                    e.target.value === ""
                      ? undefined
                      : parseInt(e.target.value, 10)
                  )
                }
                className="border p-2 w-full"
                min="0"
                max="59"
              />
            </div>
          </div>
        </div>
      </div>

      {isDateResultVisible && (
        <table className="ui celled definition table timestamp-results">
          <tbody>
            <tr>
              <td className="w-48">DateTime</td>
              <td className="timestamp">{convertedDate}</td>
            </tr>
            <tr>
              <td className="w-48">GMT</td>
              <td className="gmt">{dGmt}</td>
            </tr>
            <tr>
              <td className="w-48">Your Time Zone</td>
              <td className="local">{dYourTimezone}</td>
            </tr>
            <tr>
              <td className="w-48">Relative</td>
              <td className="relative">{dRelative}</td>
            </tr>
          </tbody>
        </table>
      )}

        <div className="overflow-x-auto">
        <table className="min-w-full leading-normal">
          <tbody>
            {languages.map((lang, idx) => (
              <tr key={idx}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {lang.name}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div className="flex justify-between">
                    <code>{lang.code}</code>
                    <button onClick={() => copyToClipboard(lang.code, lang.name)} className="text-blue-500 hover:text-blue-700">
                      {tableCopied[lang.name] ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
