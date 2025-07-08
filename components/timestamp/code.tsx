"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from 'react-i18next';

export default function Code() {
    const { t } = useTranslation()
    const [tableCopied, setTableCopied] = useState<Record<string, boolean>>({});
  
    const languages = [
      { name: 'Go', code: 'int64(time.Now().Unix())' },
      { name: 'Java', code: 'System.currentTimeMillis() / 1000' },
      { name: 'JavaScript', code: 'Math.round(new Date() / 1000)' },
      { name: 'PHP', code: 'time()' },
      { name: 'MySQL', code: 'SELECT unix_timestamp(now())' },
      { name: 'SQLite', code: "SELECT strftime('%s', 'now')" },
      { name: 'Erlang', code: 'calendar:datetime_to_gregorian_seconds(calendar:universal_time())-719528*24*3600.' },
      { name: 'Python', code: 'time.time()' },
      { name: 'Ruby', code: 'Time.now.to_i' },
      { name: 'Objective-C', code: '[[NSDate date] timeIntervalSince1970]' },
      { name: 'Swift', code: 'NSDate().timeIntervalSince1970' },
      { name: 'Shell', code: 'date +%s' },
      { name: 'Groovy', code: '(new Date().time / 1000).longValue()' },
      { name: 'Lua', code: 'os.time()' },
      { name: '.NET/C#', code: 'DateTimeOffset.UtcNow.ToUnixTimeSeconds();' },
      { name: 'Dart', code: '(new DateTime.now().millisecondsSinceEpoch / 1000).truncate()' },
      { name: 'C++', code: 'std::chrono::duration_cast<std::chrono::seconds>(std::chrono::system_clock::now().time_since_epoch()).count()' },
      { name: 'C', code: 'time(NULL)' },
      { name: 'Perl', code: 'time()' },
      { name: 'PowerShell', code: '[int][double]::Parse((Get-Date -UFormat %s))' },
      { name: 'VB.NET', code: 'DateTimeOffset.UtcNow.ToUnixTimeSeconds()' },
      { name: 'Scala', code: 'System.currentTimeMillis() / 1000' },
      { name: 'Kotlin', code: 'System.currentTimeMillis() / 1000' },
      { name: 'Rust', code: 'std::time::SystemTime::now().duration_since(std::time::UNIX_EPOCH).unwrap().as_secs()' },
      { name: 'Haskell', code: 'import Data.Time.Clock.POSIX; getPOSIXTime >>= return . round' },
      { name: 'R', code: 'as.numeric(Sys.time())' },
      { name: 'MATLAB', code: 'posixtime(datetime("now"))' },
      { name: 'Julia', code: 'time()' },
      { name: 'Elixir', code: 'System.system_time(:second)' },
      { name: 'Clojure', code: '(quot (System/currentTimeMillis) 1000)' },
      { name: 'F#', code: 'DateTimeOffset.UtcNow.ToUnixTimeSeconds()' },
      { name: 'Bash', code: 'date +%s' },
      { name: 'PostgreSQL', code: 'SELECT extract(epoch from now())' },
      { name: 'Oracle', code: 'SELECT (sysdate - date\'1970-01-01\') * 24 * 60 * 60 FROM dual' },
      { name: 'Node.js', code: 'Math.floor(Date.now() / 1000)' },
      { name: 'TypeScript', code: 'Math.floor(Date.now() / 1000)' },
      { name: 'Delphi', code: 'DateTimeToUnix(Now)' }
    ];

    const copyToClipboard = (code: string, lang: string) => {
        navigator.clipboard.writeText(code);
        setTableCopied({ ...tableCopied, [lang]: true });
        setTimeout(() => setTableCopied({ ...tableCopied, [lang]: false }), 1000);
      };

    return (
        <table className="min-w-full leading-normal">
        <tbody>
          {languages.map((lang, idx) => (
            <tr key={idx}>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {lang.name}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div className="flex justify-between">
                  <code>{lang.code}</code>
                  <button onClick={() => copyToClipboard(lang.code, lang.name)} className="text-blue-500 hover:text-blue-700">
                    {tableCopied[lang.name] ? t('copied') : t('copy')}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
}