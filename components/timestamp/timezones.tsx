"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from 'react-i18next';
import Button from '../ui/Button';

interface TimezoneInfo {
  name: string;
  offset: string;
  time: string;
}

export default function TimezoneConverter() {
  const { t } = useTranslation();
  const [timestamp, setTimestamp] = useState('');
  const [timezones, setTimezones] = useState<TimezoneInfo[]>([]);
  const [selectedTimezones, setSelectedTimezones] = useState<string[]>([
    'America/New_York',
    'Europe/London', 
    'Asia/Tokyo',
    'Asia/Shanghai',
    'Australia/Sydney'
  ]);

  const commonTimezones = [
    { value: 'UTC', label: 'UTC' },
    { value: 'America/New_York', label: 'New York (EST/EDT)' },
    { value: 'America/Los_Angeles', label: 'Los Angeles (PST/PDT)' },
    { value: 'America/Chicago', label: 'Chicago (CST/CDT)' },
    { value: 'Europe/London', label: 'London (GMT/BST)' },
    { value: 'Europe/Paris', label: 'Paris (CET/CEST)' },
    { value: 'Europe/Berlin', label: 'Berlin (CET/CEST)' },
    { value: 'Asia/Tokyo', label: 'Tokyo (JST)' },
    { value: 'Asia/Shanghai', label: 'Shanghai (CST)' },
    { value: 'Asia/Dubai', label: 'Dubai (GST)' },
    { value: 'Asia/Kolkata', label: 'Mumbai (IST)' },
    { value: 'Australia/Sydney', label: 'Sydney (AEST/AEDT)' },
    { value: 'Pacific/Auckland', label: 'Auckland (NZST/NZDT)' }
  ];

  const convertToTimezones = useCallback((inputTimestamp: string) => {
    const num = parseInt(inputTimestamp);
    if (isNaN(num)) return;

    let date: Date;
    switch (inputTimestamp.length) {
      case 10:
        date = new Date(num * 1000);
        break;
      case 13:
        date = new Date(num);
        break;
      case 16:
        date = new Date(num / 1000);
        break;
      case 19:
        date = new Date(num / 1e6);
        break;
      default:
        return;
    }

    const results: TimezoneInfo[] = selectedTimezones.map(tz => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: tz,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
      };
      
      const formatter = new Intl.DateTimeFormat('en-US', options);
      const time = formatter.format(date);
      
      // Get timezone offset
      const offset = new Intl.DateTimeFormat('en', {
        timeZone: tz,
        timeZoneName: 'longOffset'
      }).formatToParts(date).find(part => part.type === 'timeZoneName')?.value || '';

      return {
        name: tz,
        offset,
        time
      };
    });

    setTimezones(results);
  }, [selectedTimezones]);

  const handleTimezoneChange = (timezone: string, checked: boolean) => {
    if (checked) {
      setSelectedTimezones([...selectedTimezones, timezone]);
    } else {
      setSelectedTimezones(selectedTimezones.filter(tz => tz !== timezone));
    }
  };

  const handleUseCurrentTime = () => {
    const currentTimestamp = Math.floor(Date.now() / 1000).toString();
    setTimestamp(currentTimestamp);
    convertToTimezones(currentTimestamp);
  };

  useEffect(() => {
    if (timestamp) {
      convertToTimezones(timestamp);
    }
  }, [selectedTimezones, timestamp, convertToTimezones]);

  return (
    <div className="mb-10">
      <h2 className="text-lg font-bold mb-2">{t('timezone-converter-title')}</h2>
      
      <div className="mb-4">
        <input
          type="text"
          placeholder={t('enter-timestamp')}
          value={timestamp}
          onChange={(e) => setTimestamp(e.target.value)}
          className="border p-2 w-full mr-2"
        />
        <div className="text-sm text-gray-600 mt-1">
          {t('timezone-converter-description')}
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <Button onClick={handleUseCurrentTime}>
          {t('use-current-time')}
        </Button>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">{t('select-timezones')}:</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {commonTimezones.map(tz => (
            <label key={tz.value} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedTimezones.includes(tz.value)}
                onChange={(e) => handleTimezoneChange(tz.value, e.target.checked)}
                className="rounded"
              />
              <span className="text-sm">{tz.label}</span>
            </label>
          ))}
        </div>
      </div>

      {timezones.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  {t('timezone')}
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  {t('offset')}
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  {t('local-time')}
                </th>
              </tr>
            </thead>
            <tbody>
              {timezones.map((tz, index) => (
                <tr key={index}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {tz.name}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {tz.offset}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm font-mono">
                    {tz.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}