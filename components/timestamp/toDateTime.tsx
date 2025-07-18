"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from 'react-i18next';
import { useParams } from 'next/navigation';
import Code from "./code";
import RandomTimestamp from "./random";
import { getTimestampDetails } from '../../utilities/timestampDetails';
import Faq from "./faq";
import { getHistoricalEvents, getTimestampMeaning } from '../../utilities/timestampAnalysis';

export default function ToDateTime({ timestamp }: { timestamp: string }) {
  const { t } = useTranslation()
  const params = useParams();
  const locale = typeof params?.locale === 'string' ? params.locale : Array.isArray(params?.locale) ? params?.locale[0] : '';
  const [datetime, setDatetime] = useState('');
  const [currentTimestamp, setCurrentTimestamp] = useState<number | undefined>()
  const [currentDateTime, setCurrentDateTime] = useState('');


  const convertTimestampToDate = (timestamp: string) => {
    const timestampValue = parseInt(timestamp);
    let date: Date;
    switch (timestamp.length) {
        case 10:
          date = new Date(timestampValue * 1000);
          break;
        case 13:
          date = new Date(timestampValue);
          break;
        case 16:
          date = new Date(timestampValue / 1000);
          break;
        case 19:
          date = new Date(timestampValue / 1e6);
          break;
        default:
          date = new Date(timestampValue * 1000);
          break;
      }
      return date;
  }

  const calculateRelativeTime = (date1: Date, date2: Date) => {
    const diffInMilliseconds = date1.getTime() - date2.getTime();

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

  useEffect(() => {
    setDatetime(convertTimestampToDate(timestamp).toLocaleString());
    setCurrentTimestamp(Math.floor(Date.now() / 1000));
    setCurrentDateTime(new Date().toLocaleString());

    const interval = setInterval(() => {
      setCurrentTimestamp(Math.floor(Date.now() / 1000));
      setCurrentDateTime(new Date().toLocaleString());

    }, 1000);

    return () => clearInterval(interval);
  }, [timestamp]);

  const details = getTimestampDetails(Number(timestamp));
  const historicalEvents = getHistoricalEvents(details.date);
  const timestampMeaning = getTimestampMeaning(Number(timestamp));

  return (
    <div className="container mx-auto p-4 lg:w-1/2 xl:w-1/2">
        <h1 className="text-2xl font-bold my-6">{t('timestamp-converter')}</h1>
        <div className="mb-10 mt-4">
            <div className="flex flex-col md:flex-row mb-4 gap-4">
                <div className="flex-1 flex justify-center items-center flex-col">
                    <div className="font-bold text-4xl">
                        {timestamp}
                    </div>
                    <div className="font-bold mb-2">
                        {datetime}
                    </div>
                </div>
                <div className="flex-1 flex justify-center items-center flex-col">
                    <div className="font-bold text-4xl">
                        {currentTimestamp}
                    </div>
                    <div className="font-bold mb-2">
                        {currentDateTime}
                    </div>
                </div>
            </div>
            <div className="flex mb-4">
                <div className="flex-1 flex justify-center items-center flex-col">
                    <div className="font-bold text-4xl">
                        {details.formats.jp}
                    </div>
                </div>
            </div>
        </div>


      <div className="my-8">
        {/* 多种日期格式 */}
        <div className="mb-6">
          <h2 className="font-bold text-xl mb-4">{t('timestamp-multiple-formats')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="p-3 bg-blue-50 rounded border">
              <span className="block text-gray-600 font-medium text-sm">ISO:</span>
              <span className="font-mono text-sm">{details.formats.iso}</span>
            </div>
            <div className="p-3 bg-blue-50 rounded border">
              <span className="block text-gray-600 font-medium text-sm">RFC3339:</span>
              <span className="font-mono text-sm">{details.formats.rfc3339}</span>
            </div>
            <div className="p-3 bg-green-50 rounded border">
              <span className="block text-gray-600 font-medium text-sm">{t('timestamp-us')}:</span>
              <span className="font-mono text-sm">{details.formats.us}</span>
            </div>
            <div className="p-3 bg-green-50 rounded border">
              <span className="block text-gray-600 font-medium text-sm">{t('timestamp-eu')}:</span>
              <span className="font-mono text-sm">{details.formats.eu}</span>
            </div>
            <div className="p-3 bg-purple-50 rounded border">
              <span className="block text-gray-600 font-medium text-sm">{t('timestamp-cn')}:</span>
              <span className="font-mono text-sm">{details.formats.cn}</span>
            </div>
            <div className="p-3 bg-purple-50 rounded border">
              <span className="block text-gray-600 font-medium text-sm">{t('timestamp-jp')}:</span>
              <span className="font-mono text-sm">{details.formats.jp}</span>
            </div>
          </div>
        </div>
        
        {/* 常用时区 */}
        <div className="mb-6">
          <h2 className="font-bold text-xl mb-4">{t('timestamp-common-timezones')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.entries(details.timezones).map(([tz, val]) => (
              <div key={tz} className="p-3 bg-yellow-50 rounded border">
                <span className="block text-gray-600 font-medium text-sm">{tz}:</span>
                <span className="font-mono text-sm">{val}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* 时间戳详情 */}
        <div className="mb-6">
          <h3 className="font-bold text-xl mb-4">{t('timestamp-details')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="p-3 bg-indigo-50 rounded border">
              <span className="block text-gray-600 font-medium text-sm">{t('timestamp-weekday')}:</span>
              <span className="text-sm">{details.weekday}</span>
            </div>
            <div className="p-3 bg-indigo-50 rounded border">
              <span className="block text-gray-600 font-medium text-sm">{t('timestamp-quarter')}:</span>
              <span className="text-sm">{details.quarter}</span>
            </div>
            <div className="p-3 bg-indigo-50 rounded border">
              <span className="block text-gray-600 font-medium text-sm">{t('timestamp-week')}:</span>
              <span className="text-sm">{details.week}</span>
            </div>
            <div className="p-3 bg-pink-50 rounded border">
              <span className="block text-gray-600 font-medium text-sm">{t('timestamp-day-of-year')}:</span>
              <span className="text-sm">{details.dayOfYear}</span>
            </div>
            <div className="p-3 bg-pink-50 rounded border">
              <span className="block text-gray-600 font-medium text-sm">{t('timestamp-leap-year')}:</span>
              <span className="text-sm">{details.isLeapYear ? t('timestamp-yes') : t('timestamp-no')}</span>
            </div>
            <div className="p-3 bg-orange-50 rounded border">
              <span className="block text-gray-600 font-medium text-sm">{t('timestamp-from-now')}:</span>
              <span className="text-sm">{details.daysFromNow} {t('timestamp-days')}, {details.hoursFromNow} {t('timestamp-hours')}</span>
            </div>
          </div>
        </div>
        <h3 className="font-bold mt-4">{t('timestamp-related-timestamps')}</h3>
        <div className="space-y-6">
          {/* 基本时间导航 */}
          <div>
            <h4 className="font-semibold mb-3 text-lg">{t('basic-navigation')}</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
              <div className="p-2 bg-blue-50 rounded">
                <span className="block text-gray-600">{t('timestamp-prev-hour')}:</span>
                <a href={`/${locale}/t/${details.relatedTimestamps.prevHour}`} className="text-blue-600 hover:underline font-mono">{details.relatedTimestamps.prevHour}</a>
              </div>
              <div className="p-2 bg-blue-50 rounded">
                <span className="block text-gray-600">{t('timestamp-next-hour')}:</span>
                <a href={`/${locale}/t/${details.relatedTimestamps.nextHour}`} className="text-blue-600 hover:underline font-mono">{details.relatedTimestamps.nextHour}</a>
              </div>
              <div className="p-2 bg-green-50 rounded">
                <span className="block text-gray-600">{t('timestamp-prev-day')}:</span>
                <a href={`/${locale}/t/${details.relatedTimestamps.prevDay}`} className="text-blue-600 hover:underline font-mono">{details.relatedTimestamps.prevDay}</a>
              </div>
              <div className="p-2 bg-green-50 rounded">
                <span className="block text-gray-600">{t('timestamp-next-day')}:</span>
                <a href={`/${locale}/t/${details.relatedTimestamps.nextDay}`} className="text-blue-600 hover:underline font-mono">{details.relatedTimestamps.nextDay}</a>
              </div>
            </div>
          </div>
          
          {/* 周期导航 */}
          <div>
            <h4 className="font-semibold mb-3 text-lg">{t('periodic-navigation')}</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
              <div className="p-2 bg-purple-50 rounded">
                <span className="block text-gray-600">{t('timestamp-prev-week')}:</span>
                <a href={`/${locale}/t/${details.relatedTimestamps.prevWeek}`} className="text-blue-600 hover:underline font-mono">{details.relatedTimestamps.prevWeek}</a>
              </div>
              <div className="p-2 bg-purple-50 rounded">
                <span className="block text-gray-600">{t('timestamp-next-week')}:</span>
                <a href={`/${locale}/t/${details.relatedTimestamps.nextWeek}`} className="text-blue-600 hover:underline font-mono">{details.relatedTimestamps.nextWeek}</a>
              </div>
              <div className="p-2 bg-orange-50 rounded">
                <span className="block text-gray-600">{t('timestamp-prev-month')}:</span>
                <a href={`/${locale}/t/${details.relatedTimestamps.prevMonth}`} className="text-blue-600 hover:underline font-mono">{details.relatedTimestamps.prevMonth}</a>
              </div>
              <div className="p-2 bg-orange-50 rounded">
                <span className="block text-gray-600">{t('timestamp-next-month')}:</span>
                <a href={`/${locale}/t/${details.relatedTimestamps.nextMonth}`} className="text-blue-600 hover:underline font-mono">{details.relatedTimestamps.nextMonth}</a>
              </div>
            </div>
          </div>
          
          {/* 年度导航 */}
          <div>
            <h4 className="font-semibold mb-3 text-lg">{t('yearly-navigation')}</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="p-2 bg-red-50 rounded">
                <span className="block text-gray-600">{t('timestamp-prev-year')}:</span>
                <a href={`/${locale}/t/${details.relatedTimestamps.prevYear}`} className="text-blue-600 hover:underline font-mono">{details.relatedTimestamps.prevYear}</a>
              </div>
              <div className="p-2 bg-red-50 rounded">
                <span className="block text-gray-600">{t('timestamp-next-year')}:</span>
                <a href={`/${locale}/t/${details.relatedTimestamps.nextYear}`} className="text-blue-600 hover:underline font-mono">{details.relatedTimestamps.nextYear}</a>
              </div>
            </div>
          </div>
          
          {/* 时间边界 */}
          <div>
            <h4 className="font-semibold mb-3 text-lg">{t('time-boundaries')}</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
              <div className="p-2 bg-yellow-50 rounded">
                <span className="block text-gray-600">{t('start-of-day')}:</span>
                <a href={`/${locale}/t/${details.relatedTimestamps.startOfDay}`} className="text-blue-600 hover:underline font-mono">{details.relatedTimestamps.startOfDay}</a>
              </div>
              <div className="p-2 bg-yellow-50 rounded">
                <span className="block text-gray-600">{t('end-of-day')}:</span>
                <a href={`/${locale}/t/${details.relatedTimestamps.endOfDay}`} className="text-blue-600 hover:underline font-mono">{details.relatedTimestamps.endOfDay}</a>
              </div>
              <div className="p-2 bg-indigo-50 rounded">
                <span className="block text-gray-600">{t('start-of-week')}:</span>
                <a href={`/${locale}/t/${details.relatedTimestamps.startOfWeek}`} className="text-blue-600 hover:underline font-mono">{details.relatedTimestamps.startOfWeek}</a>
              </div>
              <div className="p-2 bg-indigo-50 rounded">
                <span className="block text-gray-600">{t('end-of-week')}:</span>
                <a href={`/${locale}/t/${details.relatedTimestamps.endOfWeek}`} className="text-blue-600 hover:underline font-mono">{details.relatedTimestamps.endOfWeek}</a>
              </div>
              <div className="p-2 bg-pink-50 rounded">
                <span className="block text-gray-600">{t('start-of-month')}:</span>
                <a href={`/${locale}/t/${details.relatedTimestamps.startOfMonth}`} className="text-blue-600 hover:underline font-mono">{details.relatedTimestamps.startOfMonth}</a>
              </div>
              <div className="p-2 bg-pink-50 rounded">
                <span className="block text-gray-600">{t('end-of-month')}:</span>
                <a href={`/${locale}/t/${details.relatedTimestamps.endOfMonth}`} className="text-blue-600 hover:underline font-mono">{details.relatedTimestamps.endOfMonth}</a>
              </div>
              <div className="p-2 bg-teal-50 rounded">
                <span className="block text-gray-600">{t('start-of-year')}:</span>
                <a href={`/${locale}/t/${details.relatedTimestamps.startOfYear}`} className="text-blue-600 hover:underline font-mono">{details.relatedTimestamps.startOfYear}</a>
              </div>
              <div className="p-2 bg-teal-50 rounded">
                <span className="block text-gray-600">{t('end-of-year')}:</span>
                <a href={`/${locale}/t/${details.relatedTimestamps.endOfYear}`} className="text-blue-600 hover:underline font-mono">{details.relatedTimestamps.endOfYear}</a>
              </div>
            </div>
          </div>
          
          {/* 特殊时间戳 */}
          <div>
            <h4 className="font-semibold mb-3 text-lg">{t('special-timestamps')}</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
              <div className="p-3 bg-gray-50 rounded border">
                <span className="block text-gray-600 font-medium">{t('unix-epoch')}:</span>
                <a href={`/${locale}/t/${details.relatedTimestamps.epochStart}`} className="text-blue-600 hover:underline font-mono">{details.relatedTimestamps.epochStart}</a>
                <p className="text-xs text-gray-500 mt-1">1970-01-01 00:00:00 UTC</p>
              </div>
              <div className="p-3 bg-gray-50 rounded border">
                <span className="block text-gray-600 font-medium">{t('y2k-timestamp')}:</span>
                <a href={`/${locale}/t/${details.relatedTimestamps.y2k}`} className="text-blue-600 hover:underline font-mono">{details.relatedTimestamps.y2k}</a>
                <p className="text-xs text-gray-500 mt-1">2000-01-01 00:00:00 UTC</p>
              </div>
              <div className="p-3 bg-gray-50 rounded border">
                <span className="block text-gray-600 font-medium">{t('millennium-timestamp')}:</span>
                <a href={`/${locale}/t/${details.relatedTimestamps.millennium}`} className="text-blue-600 hover:underline font-mono">{details.relatedTimestamps.millennium}</a>
                <p className="text-xs text-gray-500 mt-1">3000-01-01 00:00:00 UTC</p>
              </div>
            </div>
          </div>
          
          {/* 整数时间戳 */}
          {(details.relatedTimestamps.roundNumbers.nextRound !== Number(timestamp) || details.relatedTimestamps.roundNumbers.prevRound !== Number(timestamp)) && (
            <div>
              <h4 className="font-semibold mb-3 text-lg">{t('round-timestamps')}</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded border">
                  <span className="block text-gray-600 font-medium">{t('previous-round')}:</span>
                  <a href={`/${locale}/t/${details.relatedTimestamps.roundNumbers.prevRound}`} className="text-blue-600 hover:underline font-mono">{details.relatedTimestamps.roundNumbers.prevRound}</a>
                </div>
                <div className="p-3 bg-gradient-to-r from-green-50 to-green-100 rounded border">
                  <span className="block text-gray-600 font-medium">{t('next-round')}:</span>
                  <a href={`/${locale}/t/${details.relatedTimestamps.roundNumbers.nextRound}`} className="text-blue-600 hover:underline font-mono">{details.relatedTimestamps.roundNumbers.nextRound}</a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* 时间戳含义分析 */}
      <div className="my-8">
        <h3 className="font-bold text-xl mb-4">{t('timestamp-meaning')}</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-700 mb-2">{timestampMeaning.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <h4 className="font-semibold mb-2">{t('timestamp-technical-info')}</h4>
              <ul className="text-sm space-y-1">
                <li>{t('timestamp-format')}: {timestampMeaning.format}</li>
                <li>{t('timestamp-precision')}: {timestampMeaning.precision}</li>
                <li>{t('timestamp-era')}: {timestampMeaning.era}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">{t('timestamp-interesting-facts')}</h4>
              <ul className="text-sm space-y-1">
                {timestampMeaning.facts.map((fact, index) => (
                  <li key={index}>• {fact}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* 历史事件 */}
      {historicalEvents.length > 0 && (
        <div className="my-8">
          <h3 className="font-bold text-xl mb-4">{t('historical-events')}</h3>
          <div className="space-y-4">
            {historicalEvents.map((event, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4 bg-blue-50 p-4 rounded">
                <h4 className="font-semibold text-lg">{event.title}</h4>
                <p className="text-gray-600 text-sm mb-2">{event.date}</p>
                <p className="text-gray-700">{event.description}</p>
                {event.significance && (
                  <p className="text-blue-600 text-sm mt-2 italic">{event.significance}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* 时间戳转换工具 */}
      <div className="my-8">
        <h3 className="font-bold text-xl mb-4">{t('timestamp-conversion-tools')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white border rounded-lg p-4">
            <h4 className="font-semibold mb-2">{t('convert-to-other-formats')}</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">{t('milliseconds')}:</span>
                <code className="text-xs bg-gray-100 px-2 py-1 rounded">{Number(timestamp) * 1000}</code>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">{t('microseconds')}:</span>
                <code className="text-xs bg-gray-100 px-2 py-1 rounded">{Number(timestamp) * 1000000}</code>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">{t('nanoseconds')}:</span>
                <code className="text-xs bg-gray-100 px-2 py-1 rounded">{Number(timestamp) * 1000000000}</code>
              </div>
            </div>
          </div>
          <div className="bg-white border rounded-lg p-4">
            <h4 className="font-semibold mb-2">{t('programming-formats')}</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">JavaScript:</span>
                <code className="text-xs bg-gray-100 px-2 py-1 rounded">new Date({Number(timestamp) * 1000})</code>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Python:</span>
                <code className="text-xs bg-gray-100 px-2 py-1 rounded">datetime.fromtimestamp({timestamp})</code>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">PHP:</span>
                <code className="text-xs bg-gray-100 px-2 py-1 rounded">date(&apos;Y-m-d H:i:s&apos;, {timestamp})</code>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="my-8">
        <Faq/>
      </div>
      <div className="my-4">
          <RandomTimestamp/>
      </div>
    </div>
  );
}
