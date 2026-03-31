import React, { useState } from 'react';
import { calculateAttendance } from '../services/api';
import { AlertTriangle, CheckCircle, Calculator } from 'lucide-react';

const AttendanceCard = ({ onStatsUpdate }) => {
  const [total, setTotal] = useState('');
  const [attended, setAttended] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCalculate = async (e) => {
    e.preventDefault();
    if (!total || !attended || Number(total) <= 0 || Number(attended) < 0) {
      setError('Please enter valid numbers');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const data = await calculateAttendance({ total: Number(total), attended: Number(attended) });
      setResult(data);
      if (onStatsUpdate) {
        onStatsUpdate({ attendance: data.percentage });
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to calculate attendance');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
        <Calculator className="w-5 h-5 mr-2 text-indigo-500" />
        Attendance Tracker
      </h2>
      
      <form onSubmit={handleCalculate} className="space-y-4 mb-6">
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Total</label>
            <input 
              type="number" 
              value={total}
              onChange={(e) => setTotal(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="e.g. 40"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Attended</label>
            <input 
              type="number" 
              value={attended}
              onChange={(e) => setAttended(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="e.g. 32"
            />
          </div>
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-indigo-600 text-white font-medium py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          {loading ? 'Calculating...' : 'Calculate'}
        </button>
      </form>

      {result && (
        <div className={`p-4 rounded-lg border flex items-start gap-4 ${result.is_safe ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
          <div className="mt-1">
            {result.is_safe ? (
              <CheckCircle className="w-6 h-6 text-green-500" />
            ) : (
              <AlertTriangle className="w-6 h-6 text-red-500" />
            )}
          </div>
          <div>
            <h3 className={`text-xl font-bold ${result.is_safe ? 'text-green-700' : 'text-red-700'}`}>
              {result.percentage}%
            </h3>
            
            <p className="mt-2 text-sm text-gray-700">
              {result.is_safe ? (
                <span>Safe! Can bunk up to <strong className="text-green-700">{result.bunk_allowed}</strong> more classes.</span>
              ) : (
                <span>Need <strong className="text-red-700">{result.required_lectures}</strong> more classes to reach 75%.</span>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceCard;
