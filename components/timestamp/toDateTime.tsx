"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from 'react-i18next';
import Code from "./code";

export default function ToDateTime({ timestamp }: { timestamp: string }) {
  const { t } = useTranslation()
  const [datetime, setDatetime] = useState('');
  const [currentTimestamp, setCurrentTimestamp] = useState<number | undefined>()
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [relative, setRelative] = useState("");

  const handleTimestampChange = useCallback(() => {
    setRelative(calculateRelativeTime(new Date(), convertTimestampToDate(timestamp)));
  }, [timestamp]);

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
          date = new Date();
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
    handleTimestampChange();
    const interval = setInterval(() => {
      setCurrentTimestamp(Math.floor(Date.now() / 1000));
      setCurrentDateTime(new Date().toLocaleString());
      handleTimestampChange();
    }, 1000);

    return () => clearInterval(interval);
  }, [timestamp, handleTimestampChange]);

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
                        {relative}
                    </div>
                </div>
            </div>
        </div>
        <div className="overflow-x-auto">
            <Code/>
      </div>
    </div>
  );
}
