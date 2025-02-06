import React from 'react';

const tools = [
  { name: 'Timestamp Generator', description: 'Generate timestamps easily.', link: '/timestamp-generator' },
  { name: 'Timestamp Converter', description: 'Convert between different timestamp formats.', link: '/timestamp-converter' },
  { name: 'Timezone Converter', description: 'Convert time between different time zones.', link: '/timezone-converter' },
  // 添加更多工具...
];

const ToolsList: React.FC = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Available Tools</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <div key={tool.name} className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-semibold">{tool.name}</h3>
            <p className="text-gray-600 mb-2">{tool.description}</p>
            <a href={tool.link} className="text-blue-500 hover:underline">Try it now</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToolsList; 