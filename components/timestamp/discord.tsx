"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaRegClock, FaRegCalendarAlt, FaCopy, FaCheck } from "react-icons/fa";
import { useCopy } from '../../hooks/useCopy';
import ToolTemplate from '../ui/ToolTemplate';
import InputField from '../ui/InputField';
import Button from '../ui/Button';

// 结构化数据
const discordJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Discord Timestamp Generator",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0"
  },
  "description": "Generate Discord timestamp codes for dynamic time display across all timezones"
};

const discordFormats = [
  { code: "<t:TIMESTAMP:d>", format: "d", name: "Short Date" },
  { code: "<t:TIMESTAMP:D>", format: "D", name: "Long Date" },
  { code: "<t:TIMESTAMP:t>", format: "t", name: "Short Time" },
  { code: "<t:TIMESTAMP:T>", format: "T", name: "Long Time" },
  { code: "<t:TIMESTAMP:f>", format: "f", name: "Short DateTime" },
  { code: "<t:TIMESTAMP:F>", format: "F", name: "Long DateTime" },
  { code: "<t:TIMESTAMP:R>", format: "R", name: "Relative" },
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

// 格式化时间显示函数
const formatTimePreview = (timestamp: number, format: string, locale: string) => {
  const date = new Date(timestamp * 1000);
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  const diffMinutes = Math.round(diffMs / 60000);
  const diffHours = Math.round(diffMs / 3600000);
  const diffDays = Math.round(diffMs / 86400000);

  const formatOptions: Record<string, Intl.DateTimeFormatOptions> = {
    'd': { month: 'numeric', day: 'numeric', year: 'numeric' },
    'D': { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
    't': { hour: 'numeric', minute: '2-digit' },
    'T': { hour: 'numeric', minute: '2-digit', second: '2-digit' },
    'f': { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit' },
    'F': { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit' }
  };

  if (format === 'R') {
    if (Math.abs(diffMinutes) < 1) return 'now';
    if (Math.abs(diffMinutes) < 60) {
      return diffMinutes > 0 ? `in ${diffMinutes} minutes` : `${Math.abs(diffMinutes)} minutes ago`;
    }
    if (Math.abs(diffHours) < 24) {
      return diffHours > 0 ? `in ${diffHours} hours` : `${Math.abs(diffHours)} hours ago`;
    }
    return diffDays > 0 ? `in ${diffDays} days` : `${Math.abs(diffDays)} days ago`;
  }

  try {
    return new Intl.DateTimeFormat(locale, formatOptions[format] || formatOptions['f']).format(date);
  } catch {
    return new Intl.DateTimeFormat('en-US', formatOptions[format] || formatOptions['f']).format(date);
  }
};

const DiscordTimestampGenerator: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [date, setDate] = useState(getNowLocal());
  const [unix, setUnix] = useState("");
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

  const effectiveUnix = unix || (date ? String(toUnixTimestamp(date)) : "");
  const currentLocale = i18n.language || 'en';

  const handleCopy = (text: string, format: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedStates(prev => ({ ...prev, [format]: true }));
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [format]: false }));
      }, 1200);
    });
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(discordJsonLd) }}
      />
      <ToolTemplate 
        title={t("discord-title")}
        description={t("discord-description")}
      >
        <div className="mb-4 flex flex-col gap-4">
          <InputField
            label={t("discord-datetime")}
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
            label={t("discord-unix")}
            type="number"
            value={unix}
            onChange={(value) => setUnix(value)}
            placeholder="e.g. 1712345678"
            className="input input-bordered w-full"
            icon={<FaRegClock />}
          />
        </div>

        {/* 预设时间快捷按钮 */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">{t("quick-times") || "Quick Times"}</h3>
          <div className="flex flex-wrap gap-2">
            <Button 
              onClick={() => setDate(getNowLocal())} 
              variant="outline" 
              className="btn-sm"
            >
              {t("now") || "Now"}
            </Button>
            <Button 
              onClick={() => {
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                tomorrow.setHours(9, 0, 0, 0);
                const pad = (n: number) => n.toString().padStart(2, '0');
                setDate(`${tomorrow.getFullYear()}-${pad(tomorrow.getMonth()+1)}-${pad(tomorrow.getDate())}T${pad(tomorrow.getHours())}:${pad(tomorrow.getMinutes())}`);
                setUnix("");
              }} 
              variant="outline" 
              className="btn-sm"
            >
              {t("tomorrow-9am") || "Tomorrow 9 AM"}
            </Button>
            <Button 
              onClick={() => {
                const nextWeek = new Date();
                nextWeek.setDate(nextWeek.getDate() + 7);
                nextWeek.setHours(14, 0, 0, 0);
                const pad = (n: number) => n.toString().padStart(2, '0');
                setDate(`${nextWeek.getFullYear()}-${pad(nextWeek.getMonth()+1)}-${pad(nextWeek.getDate())}T${pad(nextWeek.getHours())}:${pad(nextWeek.getMinutes())}`);
                setUnix("");
              }} 
              variant="outline" 
              className="btn-sm"
            >
              {t("next-week-2pm") || "Next Week 2 PM"}
            </Button>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold mb-4 text-purple-600">🎮 {t("discord-preview") || "Discord Timestamp Codes"}</h3>
          {effectiveUnix ? (
            <div className="space-y-3">
              {discordFormats.map(f => {
                const code = f.code.replace("TIMESTAMP", effectiveUnix);
                const timestamp = parseInt(effectiveUnix);
                const preview = formatTimePreview(timestamp, f.format, currentLocale);
                const isCopied = copiedStates[f.format];
                
                return (
                  <div key={f.code} className="border border-purple-200 rounded-lg p-4 bg-gradient-to-r from-purple-50 to-blue-50 hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded">
                          :{f.format}
                        </span>
                        <span className="font-semibold text-gray-800">{f.name}</span>
                      </div>
                      <button 
                        onClick={() => handleCopy(code, f.format)}
                        className={`flex items-center gap-1 px-3 py-1 rounded-md text-sm font-medium transition-all ${
                          isCopied 
                            ? 'bg-green-500 text-white' 
                            : 'bg-purple-600 text-white hover:bg-purple-700'
                        }`}
                      >
                        {isCopied ? <FaCheck className="w-3 h-3" /> : <FaCopy className="w-3 h-3" />}
                        {isCopied ? (t("copied") || "Copied!") : (t("copy") || "Copy")}
                      </button>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 uppercase tracking-wide">Discord Code:</span>
                        <code className="bg-gray-800 text-green-400 px-3 py-1 rounded font-mono text-sm font-bold select-all">
                          {code}
                        </code>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 uppercase tracking-wide">Preview:</span>
                        <span className="text-lg font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded">
                          {preview}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400 bg-gray-50 rounded-lg">
              <FaRegClock className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <div>{t("discord-tip") || "Select a date and time to generate Discord timestamp codes"}</div>
            </div>
          )}
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Discord Timestamp FAQ</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg">What is a Discord timestamp?</h3>
              <p className="text-gray-600 text-sm mt-2">A Discord timestamp is a special code (like <code>&lt;t:1234567890:f&gt;</code>) that displays a formatted date/time in Discord chat. It automatically adjusts to each user&apos;s timezone, making it perfect for global communities.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">How do I use Discord timestamp codes?</h3>
              <p className="text-gray-600 text-sm mt-2">Simply copy any timestamp code from above and paste it directly into your Discord message. When you send the message, Discord will automatically render it as a formatted date/time that appears correctly in every user&apos;s timezone.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">What Discord timestamp formats are available?</h3>
              <p className="text-gray-600 text-sm mt-2">Discord supports 7 timestamp formats:</p>
              <ul className="text-gray-600 text-sm mt-2 list-disc list-inside ml-4">
                <li><strong>:d</strong> - Short date (01/20/2024)</li>
                <li><strong>:D</strong> - Long date (January 20, 2024)</li>
                <li><strong>:t</strong> - Short time (2:30 PM)</li>
                <li><strong>:T</strong> - Long time (2:30:00 PM)</li>
                <li><strong>:f</strong> - Short date/time (January 20, 2024 2:30 PM)</li>
                <li><strong>:F</strong> - Long date/time (Saturday, January 20, 2024 2:30 PM)</li>
                <li><strong>:R</strong> - Relative time (in 2 hours)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Can I convert UNIX timestamp to Discord format?</h3>
              <p className="text-gray-600 text-sm mt-2">Yes! You can enter a UNIX timestamp directly in the &quot;UNIX timestamp&quot; field, or pick a date/time using the date picker. Both methods will generate all Discord timestamp codes for you.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Best practices for Discord timestamps</h3>
              <p className="text-gray-600 text-sm mt-2">Use relative timestamps (:R) for upcoming events, short date/time (:f) for most announcements, and long format (:F) when you need maximum clarity. Always test your timestamps before important announcements.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Why use Discord timestamps instead of regular text?</h3>
              <p className="text-gray-600 text-sm mt-2">Discord timestamps automatically display in each user&apos;s local timezone and preferred format, eliminating confusion about &quot;What time zone?&quot; This is especially important for global Discord servers and scheduled events.</p>
            </div>
          </div>
        </div>

        {/* 使用示例部分 */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Discord Timestamp Examples</h2>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">📅 Scheduling Events</h4>
              <p className="text-sm text-gray-600 mb-2">For server events, use the long format for clarity:</p>
              <code className="block bg-white p-2 rounded text-sm">🎮 Game Night starts &lt;t:1735689600:F&gt;!</code>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">⏰ Countdown Timers</h4>
              <p className="text-sm text-gray-600 mb-2">Use relative format for countdowns:</p>
              <code className="block bg-white p-2 rounded text-sm">🚀 Launch in &lt;t:1735689600:R&gt;</code>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">📊 Server Announcements</h4>
              <p className="text-sm text-gray-600 mb-2">Use short date/time for announcements:</p>
              <code className="block bg-white p-2 rounded text-sm">📢 Server maintenance on &lt;t:1735689600:f&gt;</code>
            </div>
          </div>
        </div>

        {/* 相关工具 */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold mb-2">Related Tools</h3>
          <div className="flex flex-wrap gap-2">
            <a href="/" className="text-blue-600 hover:underline text-sm">UNIX Timestamp Converter</a>
            <a href="/t/timezone" className="text-blue-600 hover:underline text-sm">Timezone Converter</a>
            <a href="/t/iso8601" className="text-blue-600 hover:underline text-sm">ISO 8601 Format</a>
          </div>
        </div>
      </ToolTemplate>
    </>
  );
};

export default DiscordTimestampGenerator;