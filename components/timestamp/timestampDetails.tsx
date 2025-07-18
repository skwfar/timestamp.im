"use client";
import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { useParams, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import ToDateTime from './toDateTime';
import InputField from '../ui/InputField';
import Button from '../ui/Button';
import RandomTimestamp from './random';

export default function TimestampDetails() {
  const { t } = useTranslation();
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const locale = typeof params?.locale === 'string' ? params.locale : Array.isArray(params?.locale) ? params?.locale[0] : 'en';
  
  const [timestamp, setTimestamp] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');
  const [currentTimestamp, setCurrentTimestamp] = useState<string>('');
  const [showDetails, setShowDetails] = useState<boolean>(false);

  useEffect(() => {
    const current = Math.floor(Date.now() / 1000).toString();
    setCurrentTimestamp(current);
    
    // 从 URL 参数获取时间戳
    const timestampParam = searchParams?.get('timestamp') || searchParams?.get('t');
    if (timestampParam) {
      setTimestamp(timestampParam);
      setInputValue(timestampParam);
      setShowDetails(true);
    } else {
      setTimestamp(current);
      setInputValue(current);
    }
  }, [searchParams]);

  const handleAnalyze = () => {
    if (!inputValue.trim()) return;
    
    const cleanValue = inputValue.trim();
    setTimestamp(cleanValue);
    setShowDetails(true);
    
    // 更新URL参数
    const newSearchParams = new URLSearchParams(searchParams || undefined);
    newSearchParams.set('timestamp', cleanValue);
    router.push(`/${locale}/t/details?${newSearchParams.toString()}`, { scroll: false });
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const handleUseCurrentTime = () => {
    const current = Math.floor(Date.now() / 1000).toString();
    setInputValue(current);
    setTimestamp(current);
    setCurrentTimestamp(current);
    setShowDetails(true);
    
    // 更新URL参数
    const newSearchParams = new URLSearchParams(searchParams || undefined);
    newSearchParams.set('timestamp', current);
    router.push(`/${locale}/t/details?${newSearchParams.toString()}`, { scroll: false });
  };

  const handleClear = () => {
    setInputValue('');
    setTimestamp('');
    setShowDetails(false);
    
    // 清除URL参数
    router.push(`/${locale}/t/details`, { scroll: false });
  };

  return (
    <div className="container mx-auto p-4 lg:w-1/2 xl:w-1/2">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{t('timestamp-details-title')}</h1>
        <p className="text-gray-600 mb-6">{t('timestamp-details-description')}</p>
        
        <div className="bg-white rounded-lg border p-6 shadow-sm">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <div className="flex-1">
                <InputField
                  label=""
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder={t('timestamp-input-placeholder')}
                  className="w-full"
                />
              </div>
              <div className="flex space-x-2">
                <Button
                  onClick={handleAnalyze}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={!inputValue.trim()}
                >
                  {t('analyze')}
                </Button>
                <Button
                  onClick={handleUseCurrentTime}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white"
                >
                  {t('use-current-time')}
                </Button>
                <Button
                  onClick={handleClear}
                  className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white"
                >
                  {t('clear')}
                </Button>
              </div>
            </div>
            
            <div className="text-sm text-gray-500">
              <p>{t('timestamp-input-help')}</p>
              <p>{t('current-timestamp')}: <span className="font-mono">{currentTimestamp}</span></p>
            </div>
          </div>
        </div>
      </div>

      {showDetails && timestamp && (
        <div>
          <ToDateTime timestamp={timestamp} embedded={true} />
        </div>
      )}
      
      {!showDetails && (
        <div className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">{t('timestamp-formats')}</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• {t('seconds-format')}: 1640995200</li>
                <li>• {t('milliseconds-format')}: 1640995200000</li>
                <li>• {t('microseconds-format')}: 1640995200000000</li>
              </ul>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">{t('what-you-get')}</h3>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• {t('human-readable-date')}</li>
                <li>• {t('multiple-timezones')}</li>
                <li>• {t('historical-events')}</li>
                <li>• {t('related-timestamps')}</li>
              </ul>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-900 mb-2">{t('use-cases')}</h3>
              <ul className="text-sm text-purple-800 space-y-1">
                <li>• {t('debug-applications')}</li>
                <li>• {t('analyze-logs')}</li>
                <li>• {t('understand-timestamps')}</li>
                <li>• {t('convert-formats')}</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8">
            <RandomTimestamp />
          </div>
        </div>
      )}
    </div>
  );
}