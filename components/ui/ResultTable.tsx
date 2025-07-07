import React from 'react';

export interface ResultTableProps {
  data: Array<{
    label: string;
    value: string;
    className?: string;
  }>;
  className?: string;
}

const ResultTable: React.FC<ResultTableProps> = ({ 
  data, 
  className = "ui celled definition table timestamp-results" 
}) => {
  return (
    <table className={className}>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td className="w-48">{row.label}</td>
            <td className={row.className || ""}>{row.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ResultTable;