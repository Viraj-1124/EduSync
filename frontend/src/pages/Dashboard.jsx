import React, { useState, useEffect } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask } from '../services/api';
import StatsCard from '../components/StatsCard';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import AttendanceCard from '../components/AttendanceCard';
import { CheckCircle2, ListTodo, AlertCircle } from 'lucide-react';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ attendance: null });

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await fetchTasks();
      setTasks(data);
    } catch (error) {
      console.error("Failed to load tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleAddTask = async (taskData) => {
    try {
      const newTask = await createTask(taskData);
      setTasks([...tasks, newTask]);
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  const handleToggleTask = async (task) => {
    try {
      const updated = await updateTask(task.id, !task.completed);
      setTasks(tasks.map(t => t.id === task.id ? updated : t));
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(t => t.id !== id));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const handleStatsUpdate = (newStats) => {
    setStats({ ...stats, ...newStats });
  };

  // Calculate quick stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard 
          title="Total Tasks" 
          value={totalTasks} 
          icon={<ListTodo className="w-6 h-6 text-indigo-600" />}
          colorClass="border-indigo-500 text-indigo-500"
        />
        <StatsCard 
          title="Completed Tasks" 
          value={completedTasks} 
          icon={<CheckCircle2 className="w-6 h-6 text-green-600" />}
          colorClass="border-green-500 text-green-500"
        />
        <StatsCard 
          title="Attendance Status" 
          value={stats.attendance !== null ? `${stats.attendance}%` : '--'} 
          description={stats.attendance !== null && stats.attendance < 75 ? "Warning: Below 75%!" : "Maintain this."}
          icon={<AlertCircle className={`w-6 h-6 ${stats.attendance !== null && stats.attendance < 75 ? 'text-red-600' : 'text-blue-600'}`} />}
          colorClass={stats.attendance !== null && stats.attendance < 75 ? "border-red-500 text-red-500" : "border-blue-500 text-blue-500"}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <TaskForm onAdd={handleAddTask} />
          <TaskList 
            tasks={tasks} 
            loading={loading} 
            onToggle={handleToggleTask} 
            onDelete={handleDeleteTask} 
          />
        </div>
        <div>
          <AttendanceCard onStatsUpdate={handleStatsUpdate} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
