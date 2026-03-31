import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const TaskForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    onAdd({ title, description, deadline });
    setTitle('');
    setDescription('');
    setDeadline('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-6">
      <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
        <Plus className="w-5 h-5 mr-1 text-indigo-500" />
        Add New Task
      </h2>
      <div className="space-y-4">
        <div>
          <input 
            type="text" 
            placeholder="Task Title *" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none"
            required
          />
        </div>
        <div>
          <textarea 
            placeholder="Description (optional)" 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none h-20 resize-none"
          />
        </div>
        <div>
          <input 
            type="date" 
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none text-gray-600"
          />
        </div>
        <button 
          type="submit" 
          disabled={!title.trim()}
          className="w-full bg-indigo-600 text-white font-medium py-2.5 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add Task
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
