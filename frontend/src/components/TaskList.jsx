import React from 'react';
import TaskCard from './TaskCard';
import { ListTodo } from 'lucide-react';

const TaskList = ({ tasks, onToggle, onDelete, loading }) => {
  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading tasks...</div>;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 border-b bg-gray-50 flex items-center">
        <ListTodo className="w-5 h-5 text-indigo-500 mr-2" />
        <h2 className="font-bold text-gray-800">Your Tasks</h2>
      </div>
      {tasks.length === 0 ? (
        <div className="p-8 text-center text-gray-500 flex flex-col items-center">
          <ListTodo className="w-12 h-12 text-gray-300 mb-3" />
          <p>No tasks found. Add one to get started!</p>
        </div>
      ) : (
        <div className="divide-y">
          {tasks.map(task => (
            <TaskCard 
              key={task.id} 
              task={task} 
              onToggle={onToggle} 
              onDelete={onDelete} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
