
import React, { useState, useEffect } from 'react';
import { shiftService } from '../services/shiftService';
import { authService } from '../services/authService';
import { Shift, WorkMode } from '../types';

const MyShifts: React.FC = () => {
  const [shifts, setShifts] = useState<Shift[]>([]);
  const user = authService.getCurrentUser();

  useEffect(() => {
    const fetch = async () => {
      if (user) {
        const data = await shiftService.getShifts(user.employeeId);
        // Sort by date descending
        setShifts(data.sort((a, b) => b.date.localeCompare(a.date)));
      }
    };
    fetch();
  }, []);

  const getBadgeClass = (mode: WorkMode) => {
    switch (mode) {
      case WorkMode.WFO: return 'bg-orange-100 text-orange-800';
      case WorkMode.WFH: return 'bg-green-100 text-green-800';
      case WorkMode.HYBRID: return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Attendance History</h2>
          <span className="text-xs text-gray-500">{shifts.length} Records found</span>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Work Mode</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {shifts.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-10 text-center text-gray-500">No shifts recorded yet. Use the Dashboard to mark your attendance.</td>
                </tr>
              ) : (
                shifts.map((shift) => (
                  <tr key={shift.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {new Date(shift.date).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${getBadgeClass(shift.workMode)}`}>
                        {shift.workMode}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      Submitted
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyShifts;
