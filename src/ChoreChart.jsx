import React, { useState, useEffect } from 'react';

const LOCAL_STORAGE_KEY = 'familyCalendar.chores';

const familyMembers = [
  { name: 'Mom', color: 'bg-purple-200', textColor: 'text-purple-700' },
  { name: 'Dad', color: 'bg-blue-200', textColor: 'text-blue-700' },
  { name: 'Griffin', color: 'bg-green-200', textColor: 'text-green-700' },
  { name: 'Nell', color: 'bg-pink-200', textColor: 'text-pink-700' },
  { name: 'Gemma', color: 'bg-orange-200', textColor: 'text-orange-700' }
];

const defaultChores = {
  Mom: ['Unload dishwasher', 'Pack lunches', 'Sweep + Vacuum'],
  Dad: ['Litter Box', 'Call Pest Control', 'Take Out Trash'],
  Griffin: ['Walk dog', 'Homework', 'Put away laundry'],
  Nell: ['Make bed', 'Tidy up game room'],
  Gemma: ['Organize toys', 'Help with dishes']
};

const ChoreChart = () => {
  const [chores, setChores] = useState({});
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newChore, setNewChore] = useState('');
  const [selectedMember, setSelectedMember] = useState(familyMembers[0].name);
  const [choreCompletion, setChoreCompletion] = useState({});

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        setChores(JSON.parse(stored));
      } catch (e) {
        console.error('Error loading chore data:', e);
        setChores(defaultChores);
      }
    } else {
      setChores(defaultChores);
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

    setChores((prev) => ({
      ...prev,
      [selectedMember]: [...(prev[selectedMember] || []), newChore]
    }));

    setNewChore('');
    setIsModalOpen(false);
  };

  const toggleChoreCompletion = (member, chore) => {
    setChoreCompletion((prev) => ({
      ...prev,
      [`${member}_${chore}`]: !prev[`${member}_${chore}`]
    }));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-4">Chore Chart</h2>

      {/* Chore Chart Grid - 3 Columns Per Row & Scrollable */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto max-h-[70vh] p-4">
        {familyMembers.map(({ name, color, textColor }) => {
          const memberChores = chores[name] || [];
          const totalChores = memberChores.length;
          const completedChores = memberChores.filter(
            (chore) => choreCompletion[`${name}_${chore}`]
          ).length;

          return (
            <div key={name} className={`p-4 rounded-xl ${color} shadow-md`}>
              <h3 className={`text-lg font-bold ${textColor} mb-2`}>
                {name} <span className="text-gray-600 text-sm">({completedChores}/{totalChores})</span>
              </h3>
              <ul className="space-y-2">
                {memberChores.map((chore) => {
                  const key = `${name}_${chore}`;
                  return (
                    <li key={key} className="flex justify-between items-center bg-white p-2 rounded shadow">
                      <span>{chore}</span>
                      <input
                        type="checkbox"
                        checked={choreCompletion[key] || false}
                        onChange={() => toggleChoreCompletion(name, chore)}
                        className="w-5 h-5 accent-current"
                      />
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
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={addNewChore}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChoreChart;
