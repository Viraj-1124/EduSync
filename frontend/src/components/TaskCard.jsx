import React from 'react';
import { CheckCircle, Circle, Trash2, Calendar } from 'lucide-react';

const TaskCard = ({ task, onToggle, onDelete }) => {
  return (
    <div className={`p-4 border-b last:border-b-0 hover:bg-gray-50 flex items-start gap-4 transition ${task.completed ? 'opacity-60' : ''}`}>
      <button onClick={() => onToggle(task)} className="mt-1 focus:outline-none">
        {task.completed ? (
          <CheckCircle className="w-5 h-5 text-green-500" />
        ) : (
          <Circle className="w-5 h-5 text-gray-400 hover:text-indigo-500" />
        )}
      </button>
      <div className="flex-1">
        <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
          {task.title}
        </h3>
        {task.description && (
          <p className="text-sm text-gray-500 mt-1">{task.description}</p>
        )}
        {task.deadline && (
          <div className="flex items-center text-xs text-gray-400 mt-2">
            <Calendar className="w-3 h-3 mr-1" />
            {new Date(task.deadline).toLocaleDateString()}
          </div>
        )}
      </div>
      <button onClick={() => onDelete(task.id)} className="text-gray-400 hover:text-red-500 focus:outline-none p-1">
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};

export default TaskCard;
