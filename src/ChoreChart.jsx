import React, { useState, useEffect } from 'react';

const LOCAL_STORAGE_KEY = 'familyCalendar.chores';

const familyMembers = [
  { name: 'Mom', color: 'bg-purple-200', textColor: 'text-purple-700' },
  { name: 'Dad', color: 'bg-blue-200', textColor: 'text-blue-700' },
  { name: 'Griffin', color: 'bg-green-200', textColor: 'text-green-700' },
  { name: 'Nell', color: 'bg-pink-200', textColor: 'text-pink-700' },
  { name: 'Gemma', color: 'bg-orange-200', textColor: 'text-orange-700' }
];

const ChoreChart = () => {
  const [chores, setChores] = useState({});
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newChore, setNewChore] = useState('');
  const [selectedMember, setSelectedMember] = useState(familyMembers[0].name);
  const [repeatType, setRepeatType] = useState('daily');
  const [repeatDays, setRepeatDays] = useState([]);
  const [repeatMonthDay, setRepeatMonthDay] = useState(1);
  const [choreCompletion, setChoreCompletion] = useState({});

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        setChores(JSON.parse(stored));
      } catch (e) {
        console.error('Error loading chore data:', e);
      }
    }
    setHasLoaded(true);
  }, []);

  useEffect(() => {
    if (hasLoaded) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(chores));
    }
  }, [chores, hasLoaded]);

  const addNewChore = () => {
    if (!newChore.trim()) return;

    const newChoreData = {
      name: newChore,
      repeat: repeatType,
      repeatDays: repeatDays,
      repeatMonthDay: repeatMonthDay
    };

    setChores((prev) => ({
      ...prev,
      [selectedMember]: [...(prev[selectedMember] || []), newChoreData]
    }));

    setNewChore('');
    setRepeatType('daily');
    setRepeatDays([]);
    setRepeatMonthDay(1);
    setIsModalOpen(false);
  };

  const deleteChore = (member, choreName) => {
    setChores((prev) => ({
      ...prev,
      [member]: prev[member].filter((c) => c.name !== choreName)
    }));
  };

  const toggleChoreCompletion = (member, choreName) => {
    setChoreCompletion((prev) => ({
      ...prev,
      [`${member}_${choreName}`]: !prev[`${member}_${choreName}`]
    }));
  };

  const today = new Date();
  const todayDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][today.getDay()];
  const todayDate = today.getDate();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-4">Chore Chart</h2>

      {/* Chore Chart Grid - 3 Columns Per Row & Scrollable */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto max-h-[70vh] p-4">
        {familyMembers.map(({ name, color, textColor }) => {
          const memberChores = (chores[name] || []).filter((chore) => {
            if (chore.repeat === 'daily') return true;
            if (chore.repeat === 'weekly' && chore.repeatDays.includes(todayDay)) return true;
            if (chore.repeat === 'monthly' && chore.repeatMonthDay == todayDate) return true;
            return false;
          });

          const totalChores = memberChores.length;
          const completedChores = memberChores.filter(
            (chore) => choreCompletion[`${name}_${chore.name}`]
          ).length;

          return (
            <div key={name} className={`p-4 rounded-xl ${color} shadow-md`}>
              <h3 className={`text-lg font-bold ${textColor} mb-2`}>
                {name} <span className="text-gray-600 text-sm">({completedChores}/{totalChores})</span>
              </h3>
              <ul className="space-y-2">
                {memberChores.map((chore) => {
                  const key = `${name}_${chore.name}`;
                  return (
                    <li key={key} className="flex justify-between items-center bg-white p-2 rounded shadow">
                      <span>{chore.name}</span>
                      <div className="flex gap-2">
                        <button onClick={() => deleteChore(name, chore.name)} className="text-red-500 text-sm">
                          🗑️
                        </button>
                        <input
                          type="checkbox"
                          checked={choreCompletion[key] || false}
                          onChange={() => toggleChoreCompletion(name, chore.name)}
                          className="w-5 h-5 accent-current"
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Floating Add Chore Button - Above Nav */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-16 right-6 bg-blue-500 text-white text-3xl rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-blue-600"
      >
        +
      </button>

      {/* Add Chore Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Add New Chore</h2>
            <select
              value={selectedMember}
              onChange={(e) => setSelectedMember(e.target.value)}
              className="border p-2 rounded w-full mb-3"
            >
              {familyMembers.map(({ name }) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Chore name"
              value={newChore}
              onChange={(e) => setNewChore(e.target.value)}
              className="border p-2 rounded w-full mb-3"
            />

            {/* Repeat Option */}
            <label className="block text-sm font-medium text-gray-700">Repeat:</label>
            <select
              value={repeatType}
              onChange={(e) => setRepeatType(e.target.value)}
              className="border p-2 rounded w-full mb-3"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>

            {/* Weekly Selector */}
            {repeatType === 'weekly' && (
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">Select Days:</label>
                <div className="flex gap-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <label key={day} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={repeatDays.includes(day)}
                        onChange={() =>
                          setRepeatDays((prev) =>
                            prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
                          )
                        }
                      />
                      <span>{day}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <button onClick={addNewChore} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Add Chore
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChoreChart;
