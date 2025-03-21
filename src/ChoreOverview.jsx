import React, { useState, useEffect } from 'react';

const LOCAL_STORAGE_KEY = 'familyCalendar.chores';

const familyMembers = [
  { name: 'Mom', color: 'bg-purple-200', textColor: 'text-purple-700' },
  { name: 'Dad', color: 'bg-blue-200', textColor: 'text-blue-700' },
  { name: 'Griffin', color: 'bg-green-200', textColor: 'text-green-700' },
  { name: 'Nell', color: 'bg-pink-200', textColor: 'text-pink-700' },
  { name: 'Gemma', color: 'bg-orange-200', textColor: 'text-orange-700' }
];

const ChoreOverview = () => {
  const [chores, setChores] = useState({});

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        setChores(JSON.parse(stored));
      } catch (e) {
        console.error('Error loading chore data:', e);
      }
    }
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-4">Chore Overview</h2>

      {/* Table Layout */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Family Member</th>
              <th className="p-3 text-left">Chore</th>
              <th className="p-3 text-left">Frequency</th>
              <th className="p-3 text-left">Days</th>
            </tr>
          </thead>
          <tbody>
            {familyMembers.map(({ name, textColor }) => (
              (chores[name] || []).map((chore, index) => (
                <tr key={`${name}_${index}`} className="border-t">
                  <td className={`p-3 font-semibold ${textColor}`}>{name}</td>
                  <td className="p-3">{chore.name}</td>
                  <td className="p-3">
                    {chore.repeat === 'daily' ? 'Daily' : chore.repeat === 'weekly' ? 'Weekly' : 'Monthly'}
                  </td>
                  <td className="p-3">
                    {chore.repeat === 'weekly'
                      ? chore.repeatDays.join(', ')
                      : chore.repeat === 'monthly'
                      ? `Day ${chore.repeatMonthDay}`
                      : '-'}
                  </td>
                </tr>
              ))
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ChoreOverview;
