"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaRegClock, FaRegCalendarAlt } from "react-icons/fa";

const discordFormats = [
  { code: "<t:TIMESTAMP:d>", label: "Short Date (01/01/1970)" },
  { code: "<t:TIMESTAMP:D>", label: "Long Date (January 1, 1970)" },
  { code: "<t:TIMESTAMP:t>", label: "Short Time (12:00 AM)" },
  { code: "<t:TIMESTAMP:T>", label: "Long Time (12:00:00 AM)" },
  { code: "<t:TIMESTAMP:f>", label: "Short DateTime (January 1, 1970 12:00 AM)" },
  { code: "<t:TIMESTAMP:F>", label: "Long DateTime (Thursday, January 1, 1970 12:00 AM)" },
  { code: "<t:TIMESTAMP:R>", label: "Relative (55 years ago)" },
];

function toUnixTimestamp(dateStr: string): number | null {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return null;
  return Math.floor(d.getTime() / 1000);
}

const getNowLocal = () => {
  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
};

const DiscordTimestampGenerator: React.FC = () => {
  const { t } = useTranslation();
  const [date, setDate] = useState(getNowLocal());
  const [unix, setUnix] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const effectiveUnix = unix || (date ? String(toUnixTimestamp(date)) : "");

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 1200);
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-base-100 rounded shadow mt-20">
      <h2 className="text-2xl font-bold my-6 items-center gap-2">{t("discord-title", "Discord Timestamp Generator")}</h2>
      <div className="mb-4 flex flex-col gap-4">
        <label className="font-semibold flex items-center gap-2"><FaRegCalendarAlt />{t("discord-datetime", "Pick a date & time")}</label>
        <div className="relative">
          <input
            type="datetime-local"
            className="input input-bordered w-full pl-10"
            value={date}
            onChange={e => {
              setDate(e.target.value);
              setUnix("");
            }}
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"><FaRegCalendarAlt /></span>
        </div>
        <label className="font-semibold flex items-center gap-2"><FaRegClock />{t("discord-unix", "Or enter UNIX timestamp")}</label>
        <div className="relative">
          <input
            type="number"
            className="input input-bordered w-full pl-10"
            placeholder="e.g. 1712345678"
            value={unix}
            onChange={e => setUnix(e.target.value)}
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"><FaRegClock /></span>
        </div>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold mb-2">{t("discord-preview", "Preview")}</h3>
        {effectiveUnix ? (
          <ul className="space-y-2">
            {discordFormats.map(f => {
              const code = f.code.replace("TIMESTAMP", effectiveUnix);
              return (
                <li key={f.code} className="flex items-center gap-2">
                  <code className="bg-neutral text-neutral-content px-2 py-1 rounded select-all">{code}</code>
                  <span className="text-sm text-gray-400">{f.label}</span>
                  <button
                    className="btn btn-xs btn-outline ml-2"
                    onClick={() => handleCopy(code)}
                  >
                    {copied === code ? t("copied", "Copied!") : t("copy", "Copy")}
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="text-gray-400">{t("discord-tip", "Pick a date or enter a timestamp above.")}</div>
        )}
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">FAQ</h3>
        <div className="space-y-4">
          <div>
            <div className="font-semibold">What is a Discord timestamp?</div>
            <div className="text-gray-500 text-sm">A Discord timestamp is a special code (like <code>&lt;t:TIMESTAMP:f&gt;</code>) that displays a formatted date/time in chat, auto-adjusted to each user's timezone.</div>
          </div>
          <div>
            <div className="font-semibold">How do I use these codes in Discord?</div>
            <div className="text-gray-500 text-sm">Copy any code above and paste it directly into your Discord message. Discord will render it as a formatted date/time for everyone.</div>
          </div>
          <div>
            <div className="font-semibold">What formats are supported?</div>
            <div className="text-gray-500 text-sm">Supported formats: short/long date, short/long time, short/long datetime, and relative time. See the preview list above for details.</div>
          </div>
          <div>
            <div className="font-semibold">Can I use a UNIX timestamp?</div>
            <div className="text-gray-500 text-sm">Yes! Enter a UNIX timestamp or pick a date/time. The tool will generate all Discord timestamp codes for you.</div>
          </div>
          <div>
            <div className="font-semibold">Why does the preview show numbers?</div>
            <div className="text-gray-500 text-sm">Discord only renders these codes inside Discord chat. Here you see the raw code to copy and paste.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscordTimestampGenerator; 