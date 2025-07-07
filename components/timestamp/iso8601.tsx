"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaCalendar, FaClock } from "react-icons/fa";
import { useCopy } from '../../hooks/useCopy';
import ToolTemplate from '../ui/ToolTemplate';
import InputField from '../ui/InputField';
import Button from '../ui/Button';
import ResultTable from '../ui/ResultTable';

const ISO8601Converter: React.FC = () => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState('');
  const [inputType, setInputType] = useState<'iso' | 'timestamp'>('iso');
  const [results, setResults] = useState<any>(null);
  const { copied, copyText } = useCopy();

  const convertFromISO = (isoString: string) => {
    try {
      const date = new Date(isoString);
      if (isNaN(date.getTime())) {
        throw new Error('Invalid ISO string');
      }

      return {
        timestamp: Math.floor(date.getTime() / 1000),
        milliseconds: date.getTime(),
        utc: date.toUTCString(),
        local: date.toLocaleString(),
        components: {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate(),
          hour: date.getHours(),
          minute: date.getMinutes(),
          second: date.getSeconds(),
          millisecond: date.getMilliseconds()
        },
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      };
    } catch (error) {
      throw new Error('Invalid ISO 8601 format');
    }
  };

  const convertFromTimestamp = (timestamp: string) => {
    try {
      const ts = parseInt(timestamp);
      if (isNaN(ts)) {
        throw new Error('Invalid timestamp');
      }

      const date = new Date(ts * 1000);
      
      return {
        iso8601: date.toISOString(),
        iso8601Local: new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, -1),
        iso8601WithTZ: date.toISOString().replace('Z', '+00:00'),
        utc: date.toUTCString(),
        local: date.toLocaleString(),
        components: {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate(),
          hour: date.getHours(),
          minute: date.getMinutes(),
          second: date.getSeconds(),
          millisecond: date.getMilliseconds()
        }
      };
    } catch (error) {
      throw new Error('Invalid timestamp');
    }
  };

  const handleConvert = () => {
    if (!inputValue.trim()) return;

    try {
      if (inputType === 'iso') {
        const result = convertFromISO(inputValue);
        setResults(result);
      } else {
        const result = convertFromTimestamp(inputValue);
        setResults(result);
      }
    } catch (error) {
      alert((error as Error).message || 'Conversion failed');
    }
  };

  const useCurrentTime = () => {
    const now = new Date();
    if (inputType === 'iso') {
      setInputValue(now.toISOString());
    } else {
      setInputValue(Math.floor(now.getTime() / 1000).toString());
    }
  };

  const getTableData = () => {
    if (!results) return [];

    if (inputType === 'iso') {
      return [
        { label: 'Unix Timestamp', value: results.timestamp.toString(), className: 'font-mono' },
        { label: 'Milliseconds', value: results.milliseconds.toString(), className: 'font-mono' },
        { label: 'UTC String', value: results.utc, className: 'font-mono' },
        { label: 'Local Time', value: results.local, className: 'font-mono' },
        { label: 'Year', value: results.components.year.toString(), className: 'font-mono' },
        { label: 'Month', value: results.components.month.toString(), className: 'font-mono' },
        { label: 'Day', value: results.components.day.toString(), className: 'font-mono' },
        { label: 'Hour', value: results.components.hour.toString(), className: 'font-mono' },
        { label: 'Minute', value: results.components.minute.toString(), className: 'font-mono' },
        { label: 'Second', value: results.components.second.toString(), className: 'font-mono' },
        { label: 'Timezone', value: results.timezone, className: 'font-mono' }
      ];
    } else {
      return [
        { label: 'ISO 8601 (UTC)', value: results.iso8601, className: 'font-mono' },
        { label: 'ISO 8601 (Local)', value: results.iso8601Local, className: 'font-mono' },
        { label: 'ISO 8601 with TZ', value: results.iso8601WithTZ, className: 'font-mono' },
        { label: 'UTC String', value: results.utc, className: 'font-mono' },
        { label: 'Local Time', value: results.local, className: 'font-mono' },
        { label: 'Year', value: results.components.year.toString(), className: 'font-mono' },
        { label: 'Month', value: results.components.month.toString(), className: 'font-mono' },
        { label: 'Day', value: results.components.day.toString(), className: 'font-mono' },
        { label: 'Hour', value: results.components.hour.toString(), className: 'font-mono' },
        { label: 'Minute', value: results.components.minute.toString(), className: 'font-mono' },
        { label: 'Second', value: results.components.second.toString(), className: 'font-mono' }
      ];
    }
  };

  return (
    <ToolTemplate 
      title={t("iso8601-converter")}
      description={t("iso8601-description")}
    >
      <div className="space-y-6">
        <div className="flex gap-4 mb-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="iso"
              checked={inputType === 'iso'}
              onChange={(e) => setInputType(e.target.value as 'iso' | 'timestamp')}
              className="mr-2"
            />
            {t("iso-to-timestamp")}
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="timestamp"
              checked={inputType === 'timestamp'}
              onChange={(e) => setInputType(e.target.value as 'iso' | 'timestamp')}
              className="mr-2"
            />
            {t("timestamp-to-iso")}
          </label>
        </div>

        <InputField
          label={inputType === 'iso' ? t("enter-iso-date") : t("enter-unix-timestamp")}
          type="text"
          value={inputValue}
          onChange={setInputValue}
          placeholder={inputType === 'iso' ? '2024-01-01T12:00:00Z' : '1704110400'}
          className="input input-bordered w-full"
          icon={inputType === 'iso' ? <FaCalendar /> : <FaClock />}
        />

        <div className="flex gap-4">
          <Button onClick={handleConvert}>{t("convert")}</Button>
          <Button onClick={useCurrentTime} variant="secondary">{t("use-current-time")}</Button>
        </div>

        {results && (
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("conversion-results")}</h3>
            <ResultTable data={getTableData()} />
          </div>
        )}

        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">{t("about-iso8601")}</h3>
          <div className="space-y-4 text-gray-600">
            <p>
              {t("iso8601-international-standard")}
            </p>
            
            <div>
              <h4 className="font-semibold text-gray-800">{t("common-iso8601-formats")}</h4>
              <ul className="list-disc ml-5 mt-2 font-mono text-sm">
                <li>2024-01-01T12:00:00Z (UTC time)</li>
                <li>2024-01-01T12:00:00+05:30 (with timezone offset)</li>
                <li>2024-01-01T12:00:00.123Z (with milliseconds)</li>
                <li>2024-01-01 (date only)</li>
                <li>12:00:00 (time only)</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800">{t("advantages-iso8601")}</h4>
              <ul className="list-disc ml-5 mt-2">
                <li>{t("unambiguous-date")}</li>
                <li>{t("sortable-format")}</li>
                <li>{t("machine-readable")}</li>
                <li>{t("includes-timezone")}</li>
                <li>{t("international-standard")}</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800">{t("common-use-cases")}</h4>
              <ul className="list-disc ml-5 mt-2">
                <li>{t("api-data-exchange")}</li>
                <li>{t("database-storage")}</li>
                <li>{t("log-timestamps")}</li>
                <li>{t("config-files")}</li>
                <li>{t("international-sharing")}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ToolTemplate>
  );
};

export default ISO8601Converter;