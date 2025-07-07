"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaGlobe, FaClock } from "react-icons/fa";
import { useCopy } from '../../hooks/useCopy';
import ToolTemplate from '../ui/ToolTemplate';
import InputField from '../ui/InputField';
import Button from '../ui/Button';
import ResultTable from '../ui/ResultTable';

const commonTimezones = [
  { value: 'UTC', label: 'UTC (Coordinated Universal Time)' },
  { value: 'America/New_York', label: 'Eastern Time (ET)' },
  { value: 'America/Chicago', label: 'Central Time (CT)' },
  { value: 'America/Denver', label: 'Mountain Time (MT)' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
  { value: 'Europe/London', label: 'London (GMT/BST)' },
  { value: 'Europe/Paris', label: 'Paris (CET/CEST)' },
  { value: 'Europe/Berlin', label: 'Berlin (CET/CEST)' },
  { value: 'Asia/Tokyo', label: 'Tokyo (JST)' },
  { value: 'Asia/Shanghai', label: 'Shanghai (CST)' },
  { value: 'Asia/Seoul', label: 'Seoul (KST)' },
  { value: 'Asia/Kolkata', label: 'India (IST)' },
  { value: 'Australia/Sydney', label: 'Sydney (AEST/AEDT)' },
];

const TimezoneConverter: React.FC = () => {
  const { t } = useTranslation();
  const [inputTime, setInputTime] = useState('');
  const [fromTimezone, setFromTimezone] = useState('UTC');
  const [toTimezone, setToTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [results, setResults] = useState<Array<{ timezone: string; time: string; timestamp: number }>>([]);
  const { copied, copyText } = useCopy();

  const convertTimezone = () => {
    if (!inputTime) return;

    try {
      // Parse the input time as if it's in the "from" timezone
      const date = new Date(inputTime);
      
      // Convert to all common timezones
      const conversions = commonTimezones.map(tz => {
        const convertedTime = new Intl.DateTimeFormat('en-US', {
          timeZone: tz.value,
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        }).format(date);

        return {
          timezone: tz.label,
          time: convertedTime,
          timestamp: Math.floor(date.getTime() / 1000)
        };
      });

      setResults(conversions);
    } catch (error) {
      console.error('Invalid date format');
    }
  };

  const getCurrentTimeInTimezone = (timezone: string) => {
    const now = new Date();
    return new Intl.DateTimeFormat('sv-SE', {
      timeZone: timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(now).replace(' ', 'T');
  };

  const useCurrentTime = () => {
    setInputTime(getCurrentTimeInTimezone(fromTimezone));
  };

  const tableData = results.map(result => ({
    label: result.timezone,
    value: `${result.time} (${result.timestamp})`,
    className: "font-mono"
  }));

  return (
    <ToolTemplate 
      title={t("timezone-converter")}
      description={t("timezone-description")}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">{t("from-timezone")}</label>
            <select
              value={fromTimezone}
              onChange={(e) => setFromTimezone(e.target.value)}
              className="w-full p-2 border rounded"
            >
              {commonTimezones.map(tz => (
                <option key={tz.value} value={tz.value}>{tz.label}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">{t("to-timezone")}</label>
            <select
              value={toTimezone}
              onChange={(e) => setToTimezone(e.target.value)}
              className="w-full p-2 border rounded"
            >
              {commonTimezones.map(tz => (
                <option key={tz.value} value={tz.value}>{tz.label}</option>
              ))}
            </select>
          </div>
        </div>

        <InputField
          label={t("enter-date-time")}
          type="datetime-local"
          value={inputTime}
          onChange={setInputTime}
          className="input input-bordered w-full"
          icon={<FaClock />}
        />

        <div className="flex gap-4">
          <Button onClick={convertTimezone}>{t("convert")}</Button>
          <Button onClick={useCurrentTime} variant="secondary">{t("use-current-time")}</Button>
        </div>

        {results.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("conversion-results")}</h3>
            <ResultTable data={tableData} />
          </div>
        )}

        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">{t("about-timezone-conversion")}</h3>
          <div className="space-y-4 text-gray-600">
            <p>
              {t("timezone-conversion-essential")}
            </p>
            
            <div>
              <h4 className="font-semibold text-gray-800">{t("common-use-cases")}</h4>
              <ul className="list-disc ml-5 mt-2">
                <li>{t("scheduling-meetings")}</li>
                <li>{t("coordinating-events")}</li>
                <li>{t("planning-travel")}</li>
                <li>{t("managing-teams")}</li>
                <li>{t("broadcasting-events")}</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800">{t("tips")}</h4>
              <ul className="list-disc ml-5 mt-2">
                <li>{t("consider-dst")}</li>
                <li>{t("double-check")}</li>
                <li>{t("use-24hour")}</li>
                <li>{t("account-abbreviations")}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ToolTemplate>
  );
};

export default TimezoneConverter;