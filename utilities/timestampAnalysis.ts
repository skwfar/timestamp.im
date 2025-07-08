import { format as dateFormat, getYear, getMonth, getDate, isBefore, isAfter } from 'date-fns';

export interface HistoricalEvent {
  title: string;
  date: string;
  description: string;
  significance?: string;
}

export interface TimestampMeaning {
  description: string;
  format: string;
  precision: string;
  era: string;
  facts: string[];
}

// 历史事件数据（示例，可以扩展）
const HISTORICAL_EVENTS: { [key: string]: HistoricalEvent[] } = {
  '1970-01-01': [
    {
      title: 'Unix Epoch Begins',
      date: '1970-01-01',
      description: 'The Unix epoch timestamp begins at 00:00:00 UTC on January 1, 1970. This is the reference point for all Unix timestamps.',
      significance: 'This date marks the beginning of Unix time, making it one of the most important dates in computing history.'
    }
  ],
  '2000-01-01': [
    {
      title: 'Y2K Millennium Bug',
      date: '2000-01-01',
      description: 'The Y2K bug was a computer flaw related to the formatting and storage of calendar data for dates beginning in the year 2000.',
      significance: 'This date represents a significant moment in computing history when the world prepared for potential widespread computer failures.'
    }
  ],
  '2001-09-11': [
    {
      title: 'September 11 Attacks',
      date: '2001-09-11',
      description: 'A series of coordinated terrorist attacks carried out against the United States on September 11, 2001.',
      significance: 'This date changed the course of modern history and had profound impacts on global politics and security.'
    }
  ],
  '2008-10-31': [
    {
      title: 'Bitcoin Whitepaper Published',
      date: '2008-10-31',
      description: 'Satoshi Nakamoto published the Bitcoin whitepaper, introducing the concept of a peer-to-peer electronic cash system.',
      significance: 'This date marks the birth of cryptocurrency and blockchain technology.'
    }
  ],
  '2020-03-11': [
    {
      title: 'WHO Declares COVID-19 Pandemic',
      date: '2020-03-11',
      description: 'The World Health Organization declared COVID-19 a pandemic, marking the beginning of a global health crisis.',
      significance: 'This date represents the start of one of the most significant global events of the 21st century.'
    }
  ]
};

// 重要年份事件
const YEARLY_EVENTS: { [key: number]: HistoricalEvent[] } = {
  1969: [
    {
      title: 'Moon Landing',
      date: '1969-07-20',
      description: 'Apollo 11 successfully landed humans on the moon for the first time.',
      significance: 'One of humanity\'s greatest achievements in space exploration.'
    }
  ],
  1989: [
    {
      title: 'Fall of the Berlin Wall',
      date: '1989-11-09',
      description: 'The Berlin Wall fell, marking the beginning of the end of the Cold War.',
      significance: 'A pivotal moment in 20th century history that led to German reunification.'
    }
  ],
  1991: [
    {
      title: 'World Wide Web Goes Public',
      date: '1991-08-06',
      description: 'The World Wide Web was made available to the public for the first time.',
      significance: 'This event revolutionized information sharing and communication globally.'
    }
  ],
  2007: [
    {
      title: 'iPhone Launch',
      date: '2007-06-29',
      description: 'Apple launched the first iPhone, revolutionizing the smartphone industry.',
      significance: 'This product launch changed how people interact with technology and the internet.'
    }
  ]
};

export function getHistoricalEvents(date: Date): HistoricalEvent[] {
  const dateString = dateFormat(date, 'yyyy-MM-dd');
  const year = getYear(date);
  const events: HistoricalEvent[] = [];

  // 检查具体日期的事件
  if (HISTORICAL_EVENTS[dateString]) {
    events.push(...HISTORICAL_EVENTS[dateString]);
  }

  // 检查年份事件
  if (YEARLY_EVENTS[year]) {
    events.push(...YEARLY_EVENTS[year]);
  }

  // 添加一些通用的历史背景
  if (year >= 1970 && year <= 1980) {
    events.push({
      title: 'The Dawn of Computing Era',
      date: `${year}`,
      description: 'This timestamp falls within the early computing era, when personal computers were being developed and Unix systems were emerging.',
      significance: 'This period laid the foundation for modern computing and the internet.'
    });
  } else if (year >= 1990 && year <= 2000) {
    events.push({
      title: 'The Internet Revolution',
      date: `${year}`,
      description: 'This timestamp is from the era of the internet boom, when the World Wide Web was rapidly expanding.',
      significance: 'This decade saw the birth of the modern internet and e-commerce.'
    });
  } else if (year >= 2000 && year <= 2010) {
    events.push({
      title: 'The Digital Millennium',
      date: `${year}`,
      description: 'This timestamp is from the early 2000s, a period of rapid technological advancement and social media emergence.',
      significance: 'This era saw the rise of social media, mobile computing, and digital transformation.'
    });
  } else if (year >= 2010 && year <= 2020) {
    events.push({
      title: 'The Mobile and Cloud Era',
      date: `${year}`,
      description: 'This timestamp is from the smartphone and cloud computing era, when mobile devices became ubiquitous.',
      significance: 'This decade was defined by mobile-first thinking and cloud-native technologies.'
    });
  } else if (year >= 2020) {
    events.push({
      title: 'The AI and Remote Work Era',
      date: `${year}`,
      description: 'This timestamp is from the era of artificial intelligence advancement and remote work normalization.',
      significance: 'This period is marked by AI breakthroughs and fundamental changes in work culture.'
    });
  }

  return events.slice(0, 3); // 限制返回数量
}

export function getTimestampMeaning(timestamp: number): TimestampMeaning {
  const date = new Date(timestamp * 1000);
  const now = new Date();
  const year = getYear(date);
  const facts: string[] = [];

  // 确定时间戳格式
  const timestampStr = timestamp.toString();
  let format = 'Unix timestamp (seconds)';
  let precision = 'Second precision';

  if (timestampStr.length === 13) {
    format = 'JavaScript timestamp (milliseconds)';
    precision = 'Millisecond precision';
  } else if (timestampStr.length === 16) {
    format = 'Microsecond timestamp';
    precision = 'Microsecond precision';
  } else if (timestampStr.length === 19) {
    format = 'Nanosecond timestamp';
    precision = 'Nanosecond precision';
  }

  // 确定时代
  let era = 'Modern era';
  if (year < 1970) {
    era = 'Pre-Unix era';
  } else if (year < 1980) {
    era = 'Early computing era';
  } else if (year < 1990) {
    era = 'Personal computer era';
  } else if (year < 2000) {
    era = 'Internet emergence era';
  } else if (year < 2010) {
    era = 'Digital millennium';
  } else if (year < 2020) {
    era = 'Mobile and cloud era';
  } else {
    era = 'AI and remote work era';
  }

  // 生成有趣的事实
  const daysSinceEpoch = Math.floor((timestamp - 0) / 86400);
  const yearsSinceEpoch = Math.floor(daysSinceEpoch / 365.25);
  
  facts.push(`This timestamp represents ${daysSinceEpoch.toLocaleString()} days since the Unix epoch`);
  facts.push(`It's been ${yearsSinceEpoch} years since the Unix epoch began`);
  
  if (isBefore(date, now)) {
    const daysPast = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    facts.push(`This date was ${daysPast.toLocaleString()} days ago`);
  } else if (isAfter(date, now)) {
    const daysFuture = Math.floor((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    facts.push(`This date is ${daysFuture.toLocaleString()} days in the future`);
  }

  // 特殊时间戳
  if (timestamp === 0) {
    facts.push('This is the Unix epoch - the beginning of Unix time!');
  } else if (timestamp === 1000000000) {
    facts.push('This is the "billennium" - exactly 1 billion seconds since Unix epoch!');
  } else if (timestamp === 1234567890) {
    facts.push('This is a sequential timestamp that occurred on February 13, 2009');
  }

  // 生成描述
  let description = `This timestamp (${timestamp}) represents ${dateFormat(date, 'MMMM d, yyyy')} at ${dateFormat(date, 'h:mm:ss a')}. `;
  
  if (isBefore(date, now)) {
    description += `This date occurred in the past, during the ${era.toLowerCase()}. `;
  } else if (isAfter(date, now)) {
    description += `This date is in the future, representing a time in the ${era.toLowerCase()}. `;
  } else {
    description += `This timestamp represents the current moment. `;
  }

  description += `The timestamp uses ${precision.toLowerCase()} and follows the ${format.toLowerCase()} format.`;

  return {
    description,
    format,
    precision,
    era,
    facts
  };
}