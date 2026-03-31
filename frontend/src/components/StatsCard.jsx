import React from 'react';

const StatsCard = ({ title, value, icon, description, colorClass }) => {
  return (
    <div className={`bg-white rounded-xl shadow-sm p-6 border-l-4 ${colorClass}`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
          {description && <p className="text-xs text-gray-400 mt-2">{description}</p>}
        </div>
        <div className={`p-3 rounded-full bg-opacity-10 ${colorClass.replace('border-', 'bg-').replace('text-', 'text-')}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
