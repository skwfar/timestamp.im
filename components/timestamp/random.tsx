import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

// 有意义的时间戳类型
type MeaningfulTimestamp = {
  timestamp: number;
  description: string;
  category: 'historical' | 'tech' | 'special' | 'recent' | 'future';
};

// 预定义的有意义时间戳
const MEANINGFUL_TIMESTAMPS: MeaningfulTimestamp[] = [
  // 历史重要事件
  { timestamp: 0, description: 'Unix Epoch Start', category: 'tech' },
  { timestamp: 946684800, description: 'Y2K - New Millennium', category: 'historical' },
  { timestamp: 1000000000, description: 'Billennium', category: 'special' },
  { timestamp: 1234567890, description: 'Sequential Digits', category: 'special' },
  { timestamp: 2147483647, description: '32-bit Unix Time Limit', category: 'tech' },
  
  // 科技历史
  { timestamp: -631152000, description: 'Moon Landing (1969)', category: 'historical' },
  { timestamp: 683683200, description: 'Berlin Wall Falls (1989)', category: 'historical' },
  { timestamp: 978307200, description: 'Web Goes Public (2001)', category: 'tech' },
  { timestamp: 1183852800, description: 'iPhone Launch (2007)', category: 'tech' },
  { timestamp: 1230768000, description: 'Bitcoin Genesis (2009)', category: 'tech' },
  
  // 特殊数字时间戳
  { timestamp: 1111111111, description: 'All Ones', category: 'special' },
  { timestamp: 1212121212, description: 'Pattern 1212', category: 'special' },
  { timestamp: 1313131313, description: 'Pattern 1313', category: 'special' },
  { timestamp: 1414141414, description: 'Pattern 1414', category: 'special' },
  { timestamp: 1515151515, description: 'Pattern 1515', category: 'special' },
  { timestamp: 1600000000, description: 'Round Number 1.6B', category: 'special' },
  { timestamp: 1700000000, description: 'Round Number 1.7B', category: 'special' },
  
  // 近期重要事件
  { timestamp: 1577836800, description: 'Start of 2020s', category: 'recent' },
  { timestamp: 1583280000, description: 'COVID-19 Pandemic Start', category: 'recent' },
  { timestamp: 1640995200, description: 'Start of 2022', category: 'recent' },
  { timestamp: 1672531200, description: 'Start of 2023', category: 'recent' },
  { timestamp: 1704067200, description: 'Start of 2024', category: 'recent' },
  { timestamp: 1735689600, description: 'Start of 2025', category: 'future' },
  
  // 节日和特殊日期 (使用近年的例子)
  { timestamp: 1609459200, description: 'New Year 2021', category: 'recent' },
  { timestamp: 1614556800, description: 'Leap Day 2020', category: 'special' },
  { timestamp: 1572566400, description: 'Halloween 2019', category: 'recent' },
  { timestamp: 1608249600, description: 'Christmas 2020', category: 'recent' },
];

// 生成动态有意义时间戳
const generateDynamicTimestamps = (): MeaningfulTimestamp[] => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const dynamic: MeaningfulTimestamp[] = [];
  
  // 添加今年的特殊日期
  dynamic.push({
    timestamp: Math.floor(new Date(currentYear, 0, 1).getTime() / 1000),
    description: `Start of ${currentYear}`,
    category: 'recent'
  });
  
  // 添加明年的开始
  dynamic.push({
    timestamp: Math.floor(new Date(currentYear + 1, 0, 1).getTime() / 1000),
    description: `Start of ${currentYear + 1}`,
    category: 'future'
  });
  
  // 添加当前时间的整数版本
  const currentTimestamp = Math.floor(now.getTime() / 1000);
  const roundedTimestamp = Math.floor(currentTimestamp / 1000000) * 1000000;
  dynamic.push({
    timestamp: roundedTimestamp,
    description: 'Recent Round Million',
    category: 'special'
  });
  
  // 添加一些最近的整数时间戳
  for (let i = 1; i <= 3; i++) {
    const base = Math.floor(currentTimestamp / 100000000) * 100000000;
    dynamic.push({
      timestamp: base + (i * 10000000),
      description: `Round ${(base + i * 10000000).toString().slice(0, 3)}M`,
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
    const params = useParams();
    const locale = typeof params?.locale === 'string' ? params.locale : Array.isArray(params?.locale) ? params?.locale[0] : '';
  
    useEffect(() => {
      setTimestamps(generateMeaningfulTimestamps());
    }, []); // Empty dependency array ensures this effect runs only once on mount
  
    return (
      <div>
        <h3 className="font-bold text-xl mb-4">Explore More Timestamps</h3>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">  
          {timestamps.map((item, index) => (
              <a
                  key={index}
                  href={`/${locale}/t/${item.timestamp}`}
                  className={`${getCategoryColor(item.category)} text-white font-medium py-3 px-4 rounded-lg text-center transition-colors duration-200 hover:shadow-lg`}
              >
                  <div className="text-sm font-mono mb-1">{formatDate(item.timestamp)}</div>
                  <div className="text-xs opacity-90">{item.description}</div>
                  <div className="text-xs font-mono mt-1 opacity-75">{item.timestamp}</div>
              </a>
          ))}
        </div>
        
        <div className="mt-4 text-xs text-gray-500">
          <div className="flex flex-wrap gap-3">
            <span className="flex items-center"><span className="w-3 h-3 bg-red-500 rounded mr-1"></span>Historical</span>
            <span className="flex items-center"><span className="w-3 h-3 bg-blue-500 rounded mr-1"></span>Technology</span>
            <span className="flex items-center"><span className="w-3 h-3 bg-purple-500 rounded mr-1"></span>Special Numbers</span>
            <span className="flex items-center"><span className="w-3 h-3 bg-green-500 rounded mr-1"></span>Recent Events</span>
            <span className="flex items-center"><span className="w-3 h-3 bg-orange-500 rounded mr-1"></span>Future Dates</span>
          </div>
        </div>
      </div>
    );
};
export default RandomTimestamp;
