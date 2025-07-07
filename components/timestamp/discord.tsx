"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaRegClock, FaRegCalendarAlt } from "react-icons/fa";
import { useCopy } from '../../hooks/useCopy';
import ToolTemplate from '../ui/ToolTemplate';
import InputField from '../ui/InputField';
import Button from '../ui/Button';

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
  const { copied, copyText } = useCopy(1200);

  const effectiveUnix = unix || (date ? String(toUnixTimestamp(date)) : "");

  const handleCopy = (text: string) => {
    copyText(text);
  };

  return (
    <ToolTemplate 
      title={t("discord-title", "Discord Timestamp Generator")}
      description={t("discord-description", "Generate Discord timestamp codes that display correctly in all timezones")}
    >
      <div className="mb-4 flex flex-col gap-4">
        <InputField
          label={t("discord-datetime", "Pick a date & time")}
          type="datetime-local"
          value={date}
          onChange={(value) => {
            setDate(value);
            setUnix("");
          }}
          className="input input-bordered w-full"
          icon={<FaRegCalendarAlt />}
        />
        
        <InputField
          label={t("discord-unix", "Or enter UNIX timestamp")}
          type="number"
          value={unix}
          onChange={(value) => setUnix(value)}
          placeholder="e.g. 1712345678"
          className="input input-bordered w-full"
          icon={<FaRegClock />}
        />
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
                  <span className="text-sm">{f.label}</span>
                  <Button 
                    onClick={() => handleCopy(code)}
                    variant="outline"
                    className="btn-xs ml-2"
                  >
                    {copied ? t("copied", "Copied!") : t("copy", "Copy")}
                  </Button>
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
            <div className="text-gray-500 text-sm">A Discord timestamp is a special code (like <code>&lt;t:TIMESTAMP:f&gt;</code>) that displays a formatted date/time in chat, auto-adjusted to each user&apos;s timezone.</div>
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
    </ToolTemplate>
  );
};

export default DiscordTimestampGenerator;