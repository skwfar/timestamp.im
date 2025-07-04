"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from 'react-i18next';
import Code from "./code";
import RandomTimestamp from "./random";
import { getTimestampDetails } from '../../utilities/timestampDetails';

export default function ToDateTime({ timestamp }: { timestamp: string }) {
  const { t } = useTranslation()
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

  return (
    <div className="container mx-auto p-4 lg:w-1/2 xl:w-1/2">
        <div className="mb-10 mt-20">
            <div className="flex mb-4">
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
      <h3 className="font-bold mt-4">多种日期格式</h3>
        <ul className="grid grid-cols-2 gap-2 text-base">
          <li>ISO: {details.formats.iso}</li>
          <li>RFC3339: {details.formats.rfc3339}</li>
          <li>美式: {details.formats.us}</li>
          <li>欧式: {details.formats.eu}</li>
          <li>中文: {details.formats.cn}</li>
          <li>日式: {details.formats.jp}</li>
        </ul>
        <h3 className="font-bold mt-4">常用时区</h3>
        <ul className="grid grid-cols-2 gap-2 text-base">
          {Object.entries(details.timezones).map(([tz, val]) => (
            <li key={tz}>{tz}: {val}</li>
          ))}
        </ul>
        <h3 className="font-bold mt-4">详细信息</h3>
        <ul className="grid grid-cols-2 gap-2 text-base">
          <li>星期几: {details.weekday}</li>
          <li>第几季度: {details.quarter}</li>
          <li>第几周: {details.week}</li>
          <li>第几天: {details.dayOfYear}</li>
          <li>是否闰年: {details.isLeapYear ? '是' : '否'}</li>
          <li>距今: {details.daysFromNow} 天, {details.hoursFromNow} 小时</li>
        </ul>
        <h3 className="font-bold mt-4">相关时间戳</h3>
        <ul className="grid grid-cols-2 gap-2 text-base">
          <li>前一天: <a href={`/t/${details.relatedTimestamps.prevDay}`}>{details.relatedTimestamps.prevDay}</a></li>
          <li>后一天: <a href={`/t/${details.relatedTimestamps.nextDay}`}>{details.relatedTimestamps.nextDay}</a></li>
          <li>去年同日: <a href={`/t/${details.relatedTimestamps.prevYear}`}>{details.relatedTimestamps.prevYear}</a></li>
          <li>明年同日: <a href={`/t/${details.relatedTimestamps.nextYear}`}>{details.relatedTimestamps.nextYear}</a></li>
        </ul>
      </div>
      <div className="my-4">
          <RandomTimestamp/>
      </div>
    </div>
  );
}
