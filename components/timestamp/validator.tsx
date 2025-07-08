"use client";
import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import Button from '../ui/Button';

interface ValidationResult {
  isValid: boolean;
  format: string;
  message: string;
  timestamp: string;
  convertedDate?: string;
}

export default function TimestampValidator() {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const [results, setResults] = useState<ValidationResult[]>([]);

  const validateTimestamp = (timestamp: string): ValidationResult => {
    const trimmed = timestamp.trim();
    
    if (!trimmed) {
      return {
        isValid: false,
        format: t('empty'),
        message: t('timestamp-cannot-be-empty'),
        timestamp: trimmed
      };
    }

    const num = parseInt(trimmed);
    if (isNaN(num)) {
      return {
        isValid: false,
        format: t('invalid-timestamp'),
        message: t('timestamp-must-be-valid-number'),
        timestamp: trimmed
      };
    }

    if (num < 0) {
      return {
        isValid: false,
        format: t('negative'),
        message: t('timestamp-cannot-be-negative'),
        timestamp: trimmed
      };
    }

    let format: string;
    let date: Date;
    let isValid = true;
    let message = t('valid-timestamp');

    switch (trimmed.length) {
      case 10:
        format = t('seconds');
        date = new Date(num * 1000);
        if (num > 2147483647) {
          isValid = false;
          message = t('timestamp-exceeds-32bit-limit');
        }
        break;
      case 13:
        format = t('milliseconds');
        date = new Date(num);
        if (num > 2147483647000) {
          isValid = false;
          message = t('timestamp-exceeds-reasonable-bounds');
        }
        break;
      case 16:
        format = t('microseconds');
        date = new Date(num / 1000);
        break;
      case 19:
        format = t('nanoseconds');
        date = new Date(num / 1e6);
        break;
      default:
        format = t('unknown');
        isValid = false;
        message = t('invalid-timestamp-length', { 0: trimmed.length });
        return {
          isValid,
          format,
          message,
          timestamp: trimmed
        };
    }

    // Check if the date is valid
    if (isValid && (isNaN(date.getTime()) || date.getFullYear() < 1970 || date.getFullYear() > 2100)) {
      isValid = false;
      message = t('timestamp-produces-invalid-date');
    }

    const convertedDate = isValid ? date.toLocaleString() : undefined;

    return {
      isValid,
      format,
      message,
      timestamp: trimmed,
      convertedDate
    };
  };

  const handleValidate = () => {
    const lines = input.split('\n').filter(line => line.trim());
    const validationResults: ValidationResult[] = [];
    
    lines.forEach(line => {
      const result = validateTimestamp(line);
      validationResults.push(result);
    });
    
    setResults(validationResults);
  };

  const handleClear = () => {
    setInput('');
    setResults([]);
  };

  const validCount = results.filter(r => r.isValid).length;
  const invalidCount = results.filter(r => !r.isValid).length;

  return (
    <div className="mb-10">
      <h2 className="text-lg font-bold mb-2">{t('timestamp-validator')}</h2>
      
      <div className="mb-4">
        <textarea
          placeholder={t('enter-timestamps-validate')}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border p-2 w-full h-32 resize-none"
          rows={6}
        />
        <div className="text-sm text-gray-600 mt-1">
          {t('enter-timestamps-validate')}.
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <Button onClick={handleValidate} disabled={!input.trim()}>
          {t('validate-timestamps')}
        </Button>
        {results.length > 0 && (
          <Button onClick={handleClear}>
            {t('clear-results')}
          </Button>
        )}
      </div>

      {results.length > 0 && (
        <>
          <div className="mb-4 p-4 bg-gray-50 rounded">
            <div className="flex gap-6 text-sm">
              <span className="text-green-600 font-semibold">
                ✓ {t('valid')}: {validCount}
              </span>
              <span className="text-red-600 font-semibold">
                ✗ {t('invalid')}: {invalidCount}
              </span>
              <span className="text-gray-600">
                {t('total')}: {results.length}
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    {t('status')}
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    {t('input')}
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    {t('format')}
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    {t('converted-date')}
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    {t('message')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {results.map((result, index) => (
                  <tr key={index} className={result.isValid ? 'bg-green-50' : 'bg-red-50'}>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <span className={`px-2 py-1 text-xs rounded font-semibold ${
                        result.isValid 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {result.isValid ? `✓ ${t('valid')}` : `✗ ${t('invalid')}`}
                      </span>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">
                        {result.timestamp}
                      </code>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      {result.format}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      {result.convertedDate || '-'}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      {result.message}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}