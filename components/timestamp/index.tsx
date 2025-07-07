"use client";
import React from "react";
import { useTranslation } from 'react-i18next';
import { useTimestamp } from '../../hooks/useTimestamp';
import { useCopy } from '../../hooks/useCopy';
import ToolTemplate from '../ui/ToolTemplate';
import InputField from '../ui/InputField';
import Button from '../ui/Button';
import ResultTable from '../ui/ResultTable';
import Code from "./code";
import RandomTimestamp from "./random";
import Faq from "./faq";

export default function Index() {
  const { t } = useTranslation();
  const {
    currentTimestamp,
    currentDateTime,
    timestamp,
    setTimestamp,
    dateInputs,
    setDateInputs,
    timestampConversion,
    dateConversion,
    setCurrentDateTimeToState,
    setCurrentTimestampToState
  } = useTimestamp();
  const { copied, copyText } = useCopy();

  const handleUse = () => {
    setCurrentDateTimeToState();
    setCurrentTimestampToState();
  };

  const handleCopy = () => {
    copyText(String(currentTimestamp));
  };

  const timestampTableData = timestampConversion ? [
    { label: t('format'), value: timestampConversion.format, className: "format" },
    { label: t('datetime'), value: timestampConversion.convertedTimestamp, className: "gmt" },
    { label: "GMT", value: timestampConversion.gmt, className: "gmt" },
    { label: t('your-timezone'), value: timestampConversion.yourTimezone, className: "local" },
    { label: t('relative'), value: timestampConversion.relative, className: "relative" }
  ] : [];

  const dateTableData = dateConversion ? [
    { label: t('timestamp'), value: dateConversion.convertedDate, className: "timestamp" },
    { label: "GMT", value: dateConversion.gmt, className: "gmt" },
    { label: t('your-timezone'), value: dateConversion.yourTimezone, className: "local" },
    { label: t('relative'), value: dateConversion.relative, className: "relative" }
  ] : [];

  return (
    <ToolTemplate title={t('site-name')}>
      <div className="mb-10 mt-4">
        <div className="flex mb-4">
          <div className="flex-1">
            <h2 className="text-lg font-bold mb-2">{t('enter-a-timestamp')}</h2>
            <input
              type="text"
              placeholder={t('timestamp')}
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
              <Button onClick={handleUse}>{t('use')}</Button>
              <Button onClick={handleCopy} disabled={copied}>
                {copied ? t('copied') : t('copy')}
              </Button>
            </div>
          </div>
        </div>
        {timestampConversion && (
          <ResultTable data={timestampTableData} />
        )}
      </div>

      <div className="mb-10">
        <h2 className="text-lg font-bold mb-2">{t('enter-a-date-and-time')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <InputField
            label={t('year')}
            type="number"
            value={dateInputs.year}
            onChange={(value) => setDateInputs({ year: value === "" ? undefined : parseInt(value, 10) })}
            placeholder={t('year')}
            min="1970"
            max="2038"
          />
          <InputField
            label={t('month')}
            type="number"
            value={dateInputs.month}
            onChange={(value) => setDateInputs({ month: value === "" ? undefined : parseInt(value, 10) })}
            placeholder={t('month')}
            min="1"
            max="12"
          />
          <InputField
            label={t('day')}
            type="number"
            value={dateInputs.day}
            onChange={(value) => setDateInputs({ day: value === "" ? undefined : parseInt(value, 10) })}
            placeholder={t('day')}
            min="1"
            max="31"
          />
          <InputField
            label={t('hour')}
            type="number"
            value={dateInputs.hour}
            onChange={(value) => setDateInputs({ hour: value === "" ? undefined : parseInt(value, 10) })}
            placeholder={t('hour')}
            min="0"
            max="23"
          />
          <InputField
            label={t('minute')}
            type="number"
            value={dateInputs.minute}
            onChange={(value) => setDateInputs({ minute: value === "" ? undefined : parseInt(value, 10) })}
            placeholder={t('minute')}
            min="0"
            max="59"
          />
          <InputField
            label={t('second')}
            type="number"
            value={dateInputs.second}
            onChange={(value) => setDateInputs({ second: value === "" ? undefined : parseInt(value, 10) })}
            placeholder={t('second')}
            min="0"
            max="59"
          />
        </div>
      </div>

      {dateConversion && (
        <ResultTable data={dateTableData} className="ui celled definition table timestamp-results mb-10" />
      )}

      <div className="overflow-x-auto">
        <Code/>
      </div>

      <div className="my-8">
        <Faq/>
      </div>

      <div className="my-8">
        <RandomTimestamp/>
      </div>
    </ToolTemplate>
  );
}