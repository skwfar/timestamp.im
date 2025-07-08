import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';

// 有意义的时间戳类型
type MeaningfulTimestamp = {
  timestamp: number;
  descriptionKey: string;
  category: 'historical' | 'tech' | 'special' | 'recent' | 'future';
};

// 预定义的有意义时间戳
const MEANINGFUL_TIMESTAMPS: MeaningfulTimestamp[] = [
  // 历史重要事件
  { timestamp: 0, descriptionKey: 'unix-epoch-start', category: 'tech' },
  { timestamp: 946684800, descriptionKey: 'y2k-new-millennium', category: 'historical' },
  { timestamp: 1000000000, descriptionKey: 'billennium', category: 'special' },
  { timestamp: 1234567890, descriptionKey: 'sequential-digits', category: 'special' },
  { timestamp: 2147483647, descriptionKey: '32bit-unix-time-limit', category: 'tech' },
  
  // 科技历史
  { timestamp: -631152000, descriptionKey: 'moon-landing-1969', category: 'historical' },
  { timestamp: 683683200, descriptionKey: 'berlin-wall-falls-1989', category: 'historical' },
  { timestamp: 978307200, descriptionKey: 'web-goes-public-2001', category: 'tech' },
  { timestamp: 1183852800, descriptionKey: 'iphone-launch-2007', category: 'tech' },
  { timestamp: 1230768000, descriptionKey: 'bitcoin-genesis-2009', category: 'tech' },
  
  // 特殊数字时间戳
  { timestamp: 1111111111, descriptionKey: 'all-ones', category: 'special' },
  { timestamp: 1212121212, descriptionKey: 'pattern-1212', category: 'special' },
  { timestamp: 1313131313, descriptionKey: 'pattern-1313', category: 'special' },
  { timestamp: 1414141414, descriptionKey: 'pattern-1414', category: 'special' },
  { timestamp: 1515151515, descriptionKey: 'pattern-1515', category: 'special' },
  { timestamp: 1600000000, descriptionKey: 'round-number-16b', category: 'special' },
  { timestamp: 1700000000, descriptionKey: 'round-number-17b', category: 'special' },
  
  // 近期重要事件
  { timestamp: 1577836800, descriptionKey: 'start-of-2020s', category: 'recent' },
  { timestamp: 1583280000, descriptionKey: 'covid19-pandemic-start', category: 'recent' },
  { timestamp: 1640995200, descriptionKey: 'start-of-2022', category: 'recent' },
  { timestamp: 1672531200, descriptionKey: 'start-of-2023', category: 'recent' },
  { timestamp: 1704067200, descriptionKey: 'start-of-2024', category: 'recent' },
  { timestamp: 1735689600, descriptionKey: 'start-of-2025', category: 'future' },
  
  // 节日和特殊日期 (使用近年的例子)
  { timestamp: 1609459200, descriptionKey: 'new-year-2021', category: 'recent' },
  { timestamp: 1614556800, descriptionKey: 'leap-day-2020', category: 'special' },
  { timestamp: 1572566400, descriptionKey: 'halloween-2019', category: 'recent' },
  { timestamp: 1608249600, descriptionKey: 'christmas-2020', category: 'recent' },
];

// 生成动态有意义时间戳
const generateDynamicTimestamps = (): MeaningfulTimestamp[] => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const dynamic: MeaningfulTimestamp[] = [];
  
  // 添加今年的特殊日期
  dynamic.push({
    timestamp: Math.floor(new Date(currentYear, 0, 1).getTime() / 1000),
    descriptionKey: 'start-of-year', // 这个需要动态处理年份
    category: 'recent'
  });
  
  // 添加明年的开始
  dynamic.push({
    timestamp: Math.floor(new Date(currentYear + 1, 0, 1).getTime() / 1000),
    descriptionKey: 'start-of-year', // 这个需要动态处理年份
    category: 'future'
  });
  
  // 添加当前时间的整数版本
  const currentTimestamp = Math.floor(now.getTime() / 1000);
  const roundedTimestamp = Math.floor(currentTimestamp / 1000000) * 1000000;
  dynamic.push({
    timestamp: roundedTimestamp,
    descriptionKey: 'recent-round-million',
    category: 'special'
  });
  
  // 添加一些最近的整数时间戳
  for (let i = 1; i <= 3; i++) {
    const base = Math.floor(currentTimestamp / 100000000) * 100000000;
    dynamic.push({
      timestamp: base + (i * 10000000),
      descriptionKey: 'round-million', // 这个需要动态处理数字
      category: 'special'
    });
  }
  
  return dynamic;
};

const generateMeaningfulTimestamps = (): MeaningfulTimestamp[] => {
  const static_timestamps = [...MEANINGFUL_TIMESTAMPS];
  const dynamic_timestamps = generateDynamicTimestamps();
  const all_timestamps = [...static_timestamps, ...dynamic_timestamps];
  
  // 随机选择12个不重复的时间戳
  const shuffled = all_timestamps.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 12);
};
  

const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'historical': return 'bg-red-500 hover:bg-red-700';
    case 'tech': return 'bg-blue-500 hover:bg-blue-700';
    case 'special': return 'bg-purple-500 hover:bg-purple-700';
    case 'recent': return 'bg-green-500 hover:bg-green-700';
    case 'future': return 'bg-orange-500 hover:bg-orange-700';
    default: return 'bg-gray-500 hover:bg-gray-700';
  }
};

const RandomTimestamp: React.FC = () => {
    const [timestamps, setTimestamps] = useState<MeaningfulTimestamp[]>([]);
    const { t } = useTranslation();
    const params = useParams();
    const locale = typeof params?.locale === 'string' ? params.locale : Array.isArray(params?.locale) ? params?.locale[0] : '';

    const getDescription = (item: MeaningfulTimestamp) => {
      if (item.descriptionKey === 'start-of-year') {
        const year = new Date(item.timestamp * 1000).getFullYear();
        return t('start-of-year', { 0: year });
      } else if (item.descriptionKey === 'round-million') {
        const num = item.timestamp.toString().slice(0, 3);
        return t('round-million', { 0: num });
      } else {
        return t(item.descriptionKey);
      }
    };
  
    useEffect(() => {
      setTimestamps(generateMeaningfulTimestamps());
    }, []); // Empty dependency array ensures this effect runs only once on mount
  
    return (
      <div>
        <h3 className="font-bold text-xl mb-4">{t('explore-more-timestamps')}</h3>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">  
          {timestamps.map((item, index) => (
              <a
                  key={index}
                  href={`/${locale}/t/${item.timestamp}`}
                  className={`${getCategoryColor(item.category)} text-white font-medium py-3 px-4 rounded-lg text-center transition-colors duration-200 hover:shadow-lg`}
              >
                  <div className="text-sm font-mono mb-1">{formatDate(item.timestamp)}</div>
                  <div className="text-xs opacity-90">{getDescription(item)}</div>
                  <div className="text-xs font-mono mt-1 opacity-75">{item.timestamp}</div>
              </a>
          ))}
        </div>
        
        <div className="mt-4 text-xs text-gray-500">
          <div className="flex flex-wrap gap-3">
            <span className="flex items-center"><span className="w-3 h-3 bg-red-500 rounded mr-1"></span>{t('historical')}</span>
            <span className="flex items-center"><span className="w-3 h-3 bg-blue-500 rounded mr-1"></span>{t('technology')}</span>
            <span className="flex items-center"><span className="w-3 h-3 bg-purple-500 rounded mr-1"></span>{t('special-numbers')}</span>
            <span className="flex items-center"><span className="w-3 h-3 bg-green-500 rounded mr-1"></span>{t('recent-events')}</span>
            <span className="flex items-center"><span className="w-3 h-3 bg-orange-500 rounded mr-1"></span>{t('future-dates')}</span>
          </div>
        </div>
      </div>
    );
};
export default RandomTimestamp;
