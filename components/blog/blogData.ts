// Blog post data - this would typically come from a CMS or API
export const blogPosts = {
  'unix-timestamp-complete-guide': {
    title: 'Unix Timestamp Complete Guide: Everything Developers Need to Know',
    publishDate: '2024-01-15',
    readTime: '12 min read',
    category: 'Development',
    featured: true,
    content: `
      <h2>What is a Unix Timestamp?</h2>
      <p>A Unix timestamp (also known as Unix time, POSIX time, or epoch time) is a system for describing a point in time. It is the number of seconds that have elapsed since the Unix Epoch – 00:00:00 UTC on 1 January 1970, minus leap seconds.</p>
      
      <h2>Why Use Unix Timestamps?</h2>
      <p>Unix timestamps provide several advantages for developers:</p>
      <ul>
        <li><strong>Standardization:</strong> Universal format across different systems and programming languages</li>
        <li><strong>Simplicity:</strong> Just a single integer representing time</li>
        <li><strong>Timezone Independence:</strong> Always represents UTC time</li>
        <li><strong>Easy Calculations:</strong> Simple arithmetic for time differences</li>
        <li><strong>Storage Efficiency:</strong> Compact representation in databases</li>
      </ul>

      <h2>Common Unix Timestamp Formats</h2>
      <p>While the standard Unix timestamp counts seconds, modern applications often use variations:</p>
      <ul>
        <li><strong>Seconds (10 digits):</strong> 1642204800 - Standard Unix timestamp</li>
        <li><strong>Milliseconds (13 digits):</strong> 1642204800000 - JavaScript Date.now() format</li>
        <li><strong>Microseconds (16 digits):</strong> 1642204800000000 - Higher precision timing</li>
        <li><strong>Nanoseconds (19 digits):</strong> 1642204800000000000 - Ultra-precise measurements</li>
      </ul>

      <h2>Programming Language Examples</h2>
      <h3>JavaScript</h3>
      <pre><code>// Get current timestamp in seconds
const timestamp = Math.floor(Date.now() / 1000);

// Convert timestamp to date
const date = new Date(timestamp * 1000);

// Format date
console.log(date.toISOString());</code></pre>

      <h3>Python</h3>
      <pre><code>import time
from datetime import datetime

# Get current timestamp
timestamp = int(time.time())

# Convert timestamp to datetime
dt = datetime.fromtimestamp(timestamp)

# Format datetime
print(dt.strftime('%Y-%m-%d %H:%M:%S'))</code></pre>

      <h3>PHP</h3>
      <pre><code>&lt;?php
// Get current timestamp
$timestamp = time();

// Convert timestamp to date
$date = date('Y-m-d H:i:s', $timestamp);

// Using DateTime class
$dt = new DateTime();
$dt->setTimestamp($timestamp);
echo $dt->format('Y-m-d H:i:s');
?&gt;</code></pre>

      <h2>Best Practices</h2>
      <ol>
        <li><strong>Always Store in UTC:</strong> Convert to user's timezone only for display</li>
        <li><strong>Use Appropriate Precision:</strong> Seconds for most applications, milliseconds for real-time systems</li>
        <li><strong>Validate Input:</strong> Check timestamp ranges and format</li>
        <li><strong>Handle Edge Cases:</strong> Consider leap seconds and timezone changes</li>
        <li><strong>Document Your Format:</strong> Clearly specify whether you're using seconds or milliseconds</li>
      </ol>

      <h2>Common Pitfalls</h2>
      <ul>
        <li><strong>Mixing Formats:</strong> Accidentally mixing seconds and milliseconds</li>
        <li><strong>Timezone Assumptions:</strong> Assuming local time instead of UTC</li>
        <li><strong>32-bit Limitations:</strong> The Year 2038 problem affects 32-bit systems</li>
        <li><strong>Precision Loss:</strong> JavaScript's Number type has precision limitations</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Unix timestamps are a fundamental concept in programming and system administration. Understanding how to work with them properly ensures your applications handle time correctly across different systems and timezones.</p>
    `
  },
  
  'timezone-handling-best-practices': {
    title: 'Timezone Handling Best Practices in Modern Applications',
    publishDate: '2024-01-10',
    readTime: '8 min read',
    category: 'Best Practices',
    content: `
      <h2>The Importance of Proper Timezone Handling</h2>
      <p>Timezone handling is one of the most challenging aspects of software development. Improper handling can lead to bugs, data inconsistencies, and poor user experience. This guide covers best practices for managing timezones in modern applications.</p>

      <h2>Core Principles</h2>
      <h3>1. Store Everything in UTC</h3>
      <p>Always store timestamps in UTC (Coordinated Universal Time) in your database. This provides a consistent reference point and eliminates ambiguity.</p>
      
      <h3>2. Convert at the Presentation Layer</h3>
      <p>Convert UTC timestamps to the user's local timezone only when displaying data to the user. Never store local times in your database.</p>

      <h3>3. Use Standard Libraries</h3>
      <p>Leverage well-tested timezone libraries instead of implementing your own:</p>
      <ul>
        <li><strong>JavaScript:</strong> date-fns-tz, moment-timezone, or native Intl.DateTimeFormat</li>
        <li><strong>Python:</strong> pytz or the built-in zoneinfo (Python 3.9+)</li>
        <li><strong>Java:</strong> java.time.ZonedDateTime</li>
        <li><strong>C#:</strong> TimeZoneInfo class</li>
      </ul>

      <h2>Implementation Examples</h2>
      <h3>JavaScript with date-fns-tz</h3>
      <pre><code>import { zonedTimeToUtc, utcToZonedTime, format } from 'date-fns-tz';

// Convert user input to UTC for storage
const userInput = '2024-01-15 14:30:00';
const userTimezone = 'America/New_York';
const utcTime = zonedTimeToUtc(userInput, userTimezone);

// Convert UTC back to user timezone for display
const localTime = utcToZonedTime(utcTime, userTimezone);
const formatted = format(localTime, 'yyyy-MM-dd HH:mm:ss zzz', { 
  timeZone: userTimezone 
});</code></pre>

      <h2>Key Takeaways</h2>
      <ol>
        <li>Always store times in UTC</li>
        <li>Convert to local time only for display</li>
        <li>Use established timezone libraries</li>
        <li>Handle DST transitions properly</li>
        <li>Test with multiple timezones</li>
        <li>Document your timezone handling approach</li>
      </ol>
    `
  },

  'year-2038-problem-explained': {
    title: 'The Year 2038 Problem: What Developers Should Know',
    publishDate: '2024-01-05',
    readTime: '6 min read',
    category: 'Technical Issues',
    content: `
      <h2>What is the Year 2038 Problem?</h2>
      <p>The Year 2038 problem, also known as the Unix Millennium Bug or Y2038, is a time formatting bug that will occur on January 19, 2038, at 03:14:07 UTC.</p>

      <h2>Technical Background</h2>
      <p>The problem arises because a signed 32-bit integer can only represent values from -2,147,483,648 to 2,147,483,647. When used to count seconds since the Unix epoch, this gives us a range from December 13, 1901, to January 19, 2038.</p>

      <h2>Systems at Risk</h2>
      <ul>
        <li><strong>Legacy Systems:</strong> Older Unix and Linux systems still using 32-bit timestamps</li>
        <li><strong>Embedded Systems:</strong> IoT devices, routers, and industrial control systems</li>
        <li><strong>Databases:</strong> Systems using 32-bit integer timestamp columns</li>
        <li><strong>Programming Languages:</strong> Applications using 32-bit time libraries</li>
      </ul>

      <h2>Solutions and Mitigation</h2>
      <p>The most comprehensive solution is migrating to 64-bit timestamp systems. A 64-bit signed integer can represent timestamps until the year 292,277,026,596.</p>

      <h2>Action Plan for Developers</h2>
      <ol>
        <li><strong>Audit Your Systems:</strong> Identify 32-bit timestamp usage</li>
        <li><strong>Update Libraries:</strong> Use modern time libraries</li>
        <li><strong>Database Migration:</strong> Plan timestamp column upgrades</li>
        <li><strong>Testing:</strong> Test applications with post-2038 dates</li>
      </ol>
    `
  },

  'javascript-date-handling-pitfalls': {
    title: 'Common JavaScript Date Handling Pitfalls and Solutions',
    publishDate: '2023-12-28',
    readTime: '10 min read',
    category: 'JavaScript',
    content: `
      <h2>Introduction</h2>
      <p>JavaScript's Date object is notoriously difficult to work with correctly. This comprehensive guide covers the most common pitfalls developers encounter and provides practical solutions.</p>

      <h2>Pitfall #1: Month Indexing Confusion</h2>
      <p>JavaScript months are zero-indexed (0-11), while days are one-indexed (1-31).</p>

      <h3>The Problem</h3>
      <pre><code>// This creates January 1st, not February 1st!
const date = new Date(2024, 1, 1);
console.log(date); // 2024-02-01 (February!)</code></pre>

      <h3>The Solution</h3>
      <pre><code>// Be explicit about month indexing
const MONTHS = {
  JANUARY: 0,
  FEBRUARY: 1,
  MARCH: 2,
  // ... etc
};

const date = new Date(2024, MONTHS.JANUARY, 1);</code></pre>

      <h2>Best Practices</h2>
      <ol>
        <li>Always validate date inputs</li>
        <li>Be explicit about timezones</li>
        <li>Remember JavaScript months are 0-indexed</li>
        <li>Avoid mutating date objects</li>
        <li>Use modern date libraries for complex operations</li>
      </ol>
    `
  },

  'database-timestamp-storage-strategies': {
    title: 'Database Timestamp Storage: UTC vs Local Time Strategies',
    publishDate: '2023-12-20',
    readTime: '9 min read',
    category: 'Database',
    content: `
      <h2>Introduction</h2>
      <p>Choosing the right timestamp storage strategy is crucial for maintaining data consistency and avoiding timezone-related bugs. This guide explores different approaches and their trade-offs.</p>

      <h2>Strategy 1: Store Everything in UTC</h2>
      <p>This is the most recommended approach for most applications.</p>

      <h3>Advantages</h3>
      <ul>
        <li>Consistent reference point across all data</li>
        <li>Eliminates timezone conversion bugs in storage layer</li>
        <li>Simplifies data analysis and reporting</li>
        <li>Works well with distributed systems</li>
      </ul>

      <h3>Implementation</h3>
      <pre><code>-- PostgreSQL
CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  event_time TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- MySQL
CREATE TABLE events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  event_time TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);</code></pre>

      <h2>Strategy 2: Store with Timezone Information</h2>
      <p>Store both the timestamp and the original timezone.</p>

      <pre><code>CREATE TABLE user_events (
  id SERIAL PRIMARY KEY,
  event_time_utc TIMESTAMP,
  original_timezone VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);</code></pre>

      <h2>Best Practices</h2>
      <ol>
        <li>Always store in UTC when possible</li>
        <li>Use TIMESTAMP WITH TIME ZONE in PostgreSQL</li>
        <li>Document your timezone handling strategy</li>
        <li>Consider business requirements for historical accuracy</li>
        <li>Test with different timezones and DST transitions</li>
      </ol>

      <h2>Common Mistakes to Avoid</h2>
      <ul>
        <li>Storing local times without timezone information</li>
        <li>Mixing UTC and local times in the same column</li>
        <li>Not handling DST transitions properly</li>
        <li>Forgetting to convert for display purposes</li>
      </ul>
    `
  },

  'api-timestamp-formats-comparison': {
    title: 'API Timestamp Formats: ISO 8601 vs Unix vs RFC 3339',
    publishDate: '2023-12-15',
    readTime: '7 min read',
    category: 'API Design',
    content: `
      <h2>Introduction</h2>
      <p>Choosing the right timestamp format for your API is crucial for interoperability and developer experience. This guide compares the most common formats and their use cases.</p>

      <h2>ISO 8601 Format</h2>
      <p>The international standard for date and time representation.</p>

      <h3>Examples</h3>
      <pre><code>// Basic format
"2024-01-15T14:30:00Z"

// With timezone offset
"2024-01-15T14:30:00-05:00"

// With milliseconds
"2024-01-15T14:30:00.123Z"</code></pre>

      <h3>Advantages</h3>
      <ul>
        <li>Human-readable</li>
        <li>Includes timezone information</li>
        <li>Widely supported across programming languages</li>
        <li>Self-documenting format</li>
      </ul>

      <h2>Unix Timestamp</h2>
      <p>Seconds since January 1, 1970, 00:00:00 UTC.</p>

      <h3>Examples</h3>
      <pre><code>// Seconds
1705327800

// Milliseconds (JavaScript style)
1705327800000</code></pre>

      <h3>Advantages</h3>
      <ul>
        <li>Compact representation</li>
        <li>Easy arithmetic operations</li>
        <li>No timezone ambiguity (always UTC)</li>
        <li>Efficient storage and transmission</li>
      </ul>

      <h2>RFC 3339 Format</h2>
      <p>A subset of ISO 8601 with stricter rules.</p>

      <h3>Example</h3>
      <pre><code>"2024-01-15T14:30:00.123Z"</code></pre>

      <h2>Recommendations by Use Case</h2>
      <table class="w-full border-collapse border border-gray-300 my-4">
        <thead>
          <tr class="bg-gray-50">
            <th class="border border-gray-300 p-2">Use Case</th>
            <th class="border border-gray-300 p-2">Recommended Format</th>
            <th class="border border-gray-300 p-2">Reason</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-gray-300 p-2">REST APIs</td>
            <td class="border border-gray-300 p-2">ISO 8601 / RFC 3339</td>
            <td class="border border-gray-300 p-2">Human-readable, widely supported</td>
          </tr>
          <tr>
            <td class="border border-gray-300 p-2">High-frequency data</td>
            <td class="border border-gray-300 p-2">Unix timestamp</td>
            <td class="border border-gray-300 p-2">Compact, efficient</td>
          </tr>
          <tr>
            <td class="border border-gray-300 p-2">Log files</td>
            <td class="border border-gray-300 p-2">ISO 8601</td>
            <td class="border border-gray-300 p-2">Human-readable for debugging</td>
          </tr>
        </tbody>
      </table>

      <h2>Implementation Examples</h2>
      <h3>JavaScript</h3>
      <pre><code>// Convert Unix timestamp to ISO 8601
const timestamp = 1705327800;
const isoString = new Date(timestamp * 1000).toISOString();

// Parse ISO 8601 to Unix timestamp
const isoString = "2024-01-15T14:30:00Z";
const timestamp = Math.floor(new Date(isoString).getTime() / 1000);</code></pre>

      <h2>Best Practices</h2>
      <ol>
        <li>Be consistent across your entire API</li>
        <li>Always include timezone information</li>
        <li>Document your chosen format clearly</li>
        <li>Consider providing multiple formats if needed</li>
        <li>Validate timestamp formats on input</li>
      </ol>
    `
  }
};

export const blogPostsList = [
  {
    slug: 'unix-timestamp-complete-guide',
    title: 'Unix Timestamp Complete Guide: Everything Developers Need to Know',
    excerpt: 'A comprehensive guide to Unix timestamps, covering fundamentals, best practices, and common pitfalls in software development.',
    publishDate: '2024-01-15',
    readTime: '12 min read',
    category: 'Development',
    featured: true
  },
  {
    slug: 'timezone-handling-best-practices',
    title: 'Timezone Handling Best Practices in Modern Applications',
    excerpt: 'Learn how to properly handle timezones in your applications to avoid common bugs and ensure accurate time representation across different regions.',
    publishDate: '2024-01-10',
    readTime: '8 min read',
    category: 'Best Practices'
  },
  {
    slug: 'year-2038-problem-explained',
    title: 'The Year 2038 Problem: What Developers Should Know',
    excerpt: 'Understanding the Year 2038 problem, its impact on 32-bit systems, and how to prepare your applications for the future.',
    publishDate: '2024-01-05',
    readTime: '6 min read',
    category: 'Technical Issues'
  },
  {
    slug: 'javascript-date-handling-pitfalls',
    title: 'Common JavaScript Date Handling Pitfalls and Solutions',
    excerpt: 'Explore the most common issues developers face when working with dates in JavaScript and learn practical solutions.',
    publishDate: '2023-12-28',
    readTime: '10 min read',
    category: 'JavaScript'
  },
  {
    slug: 'database-timestamp-storage-strategies',
    title: 'Database Timestamp Storage: UTC vs Local Time Strategies',
    excerpt: 'Best practices for storing timestamps in databases, comparing UTC storage vs local time approaches with real-world examples.',
    publishDate: '2023-12-20',
    readTime: '9 min read',
    category: 'Database'
  },
  {
    slug: 'api-timestamp-formats-comparison',
    title: 'API Timestamp Formats: ISO 8601 vs Unix vs RFC 3339',
    excerpt: 'Compare different timestamp formats used in APIs and learn when to use each format for optimal interoperability.',
    publishDate: '2023-12-15',
    readTime: '7 min read',
    category: 'API Design'
  }
];