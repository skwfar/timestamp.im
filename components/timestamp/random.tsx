import React, { useEffect, useState } from 'react';

const generateUniqueTimestamps = () => {
    const uniqueTimestamps = new Set<number>();
  
    while (uniqueTimestamps.size < 12) {
        const currentTimestamp = new Date().getTime() / 1000;
        const randomTimestamp = Math.floor(Math.random() * currentTimestamp);
        uniqueTimestamps.add(randomTimestamp);
    }
  
    return Array.from(uniqueTimestamps);
  };
  
  
const RandomTimestamp: React.FC = () => {
    const [timestamps, setTimestamps] = useState<number[]>([]);
  
    useEffect(() => {
      setTimestamps(generateUniqueTimestamps());
    }, []); // Empty dependency array ensures this effect runs only once on mount
  
    return (
      <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 gap-6">  
        {timestamps.map((timestamp, index) => (
            <a
                key={index}
                href={`/t/${timestamp}`}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center"
            >
                {timestamp}
            </a>
        ))}
      </div>
    );
};
export default RandomTimestamp;
