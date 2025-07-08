"use client";
import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import Button from '../ui/Button';
import { useCopy } from '../../hooks/useCopy';

interface BatchResult {
  input: string;
  output: string;
  format: string;
  isValid: boolean;
}

export default function BatchConversion() {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const [results, setResults] = useState<BatchResult[]>([]);
  const { copied, copyText } = useCopy();

  const detectFormat = (timestamp: string): string => {
    const num = parseInt(timestamp);
    if (isNaN(num)) return t('invalid-timestamp');
    
    switch (timestamp.length) {
      case 10: return t('seconds');
      case 13: return t('milliseconds');
      case 16: return t('microseconds');
      case 19: return t('nanoseconds');
      default: return t('unknown');
    }
  };

  const convertTimestamp = (timestamp: string): string => {
    const num = parseInt(timestamp);
    if (isNaN(num)) return t('invalid-timestamp');
    
    let date: Date;
    switch (timestamp.length) {
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
        return t('invalid-timestamp');
    }
    
    return date.toLocaleString();
  };

  const handleBatchConvert = () => {
    const lines = input.split('\n').filter(line => line.trim());
    const batchResults: BatchResult[] = [];
    
    lines.forEach(line => {
      const timestamp = line.trim();
      const format = detectFormat(timestamp);
      const output = convertTimestamp(timestamp);
      const isValid = format !== t('invalid-timestamp') && format !== t('unknown') && output !== t('invalid-timestamp');
      
      batchResults.push({
        input: timestamp,
        output,
        format,
        isValid
      });
    });
    
    setResults(batchResults);
  };

  const handleCopyResults = () => {
    const resultText = results.map(r => `${r.input} -> ${r.output}`).join('\n');
    copyText(resultText);
  };

  const handleClearAll = () => {
    setInput('');
    setResults([]);
  };

  return (
    <div className="mb-10">
      <h2 className="text-lg font-bold mb-2">{t('batch-conversion')}</h2>
      <div className="mb-4">
        <textarea
          placeholder={t('enter-multiple-timestamps')}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border p-2 w-full h-32 resize-none"
          rows={6}
        />
        <div className="text-sm text-gray-600 mt-1">
          {t('enter-multiple-timestamps')}.
        </div>
      </div>
      
      <div className="flex gap-2 mb-4">
        <Button onClick={handleBatchConvert} disabled={!input.trim()}>
          {t('convert-all')}
        </Button>
        {results.length > 0 && (
          <>
            <Button onClick={handleCopyResults} disabled={copied}>
              {copied ? t('copied') : t('copy-results')}
            </Button>
            <Button onClick={handleClearAll}>
              {t('clear-all')}
            </Button>
          </>
        )}
      </div>

      {results.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  {t('input')}
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  {t('format')}
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  {t('output')}
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  {t('status')}
                </th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={index} className={result.isValid ? '' : 'bg-red-50'}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <code className="text-xs">{result.input}</code>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {result.format}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {result.output}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <span className={`px-2 py-1 text-xs rounded ${
                      result.isValid 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {result.isValid ? t('valid') : t('invalid')}
                    </span>
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