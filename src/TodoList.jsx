import React, { useState, useEffect } from 'react';

const LOCAL_STORAGE_KEY = 'familyCalendar.todos';

const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [hasLoaded, setHasLoaded] = useState(false); // NEW

    // Load tasks from localStorage on first load
    useEffect(() => {
        console.log('📥 Trying to load saved tasks...');
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                console.log('✅ Loaded tasks:', parsed);
                setTasks(parsed);
            } catch (e) {
                console.error('❌ Error parsing tasks:', e);
            }
        } else {
            console.log('❌ No tasks found in localStorage');
        }
        setHasLoaded(true); // mark that we've finished loading
    }, []);

    // Save tasks only after initial load is done
    useEffect(() => {
        if (hasLoaded) {
            console.log('💾 Saving tasks to localStorage:', tasks);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
        }
    }, [tasks, hasLoaded]);


    const handleAddTask = (e) => {
        e.preventDefault();
        if (newTask.trim() === '') return;
        setTasks([...tasks, newTask.trim()]);
        setNewTask('');
    };

    const handleDeleteTask = (index) => {
        const updated = tasks.filter((_, i) => i !== index);
        setTasks(updated);
    };

    return (
        <div className="bg-white p-4 rounded-xl shadow-md w-full max-w-sm">
            <h3 className="text-xl font-semibold mb-4">To-Do List</h3>
            <form onSubmit={handleAddTask} className="flex gap-2 mb-4">
                <input
                    type="text"
                    placeholder="New task..."
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    className="flex-1 border rounded px-2 py-1"
                />
                <button
                    className="bg-blue-500 text-white px-4 py-2 text-base rounded hover:bg-blue-600 min-h-[44px]"
                >
                    Add
</button>
            </form>
            <ul className="space-y-2">
                {tasks.map((task, index) => (
                    <li
                        key={index}
                        className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded"
                    >
                        {task}
                        <button
                            onClick={() => handleDeleteTask(index)}
                            className="text-red-500 hover:text-red-700"
                        >
                            ✕
            </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
