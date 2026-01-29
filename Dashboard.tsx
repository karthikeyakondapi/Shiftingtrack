
import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { shiftService } from '../services/shiftService';
import { authService } from '../services/authService';
import { Shift, WorkMode } from '../types';

const Dashboard: React.FC = () => {
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [workMode, setWorkMode] = useState<WorkMode>(WorkMode.WFO);
  const [showModal, setShowModal] = useState(false);
  const [hasExistingShift, setHasExistingShift] = useState(false);
  const user = authService.getCurrentUser();

  const fetchShifts = async () => {
    if (user) {
      try {
        const data = await shiftService.getShifts(user.employeeId);
        setShifts(data);
      } catch (err) {
        console.error("Failed to fetch shifts:", err);
      }
    }
  };

  useEffect(() => {
    fetchShifts();
  }, []);

  const handleDateClick = (arg: any) => {
    const dateStr = arg.dateStr;
    setSelectedDate(dateStr);
    const existing = shifts.find(s => s.date === dateStr);
    if (existing) {
        setWorkMode(existing.workMode);
        setHasExistingShift(true);
    } else {
        setWorkMode(WorkMode.WFO);
        setHasExistingShift(false);
    }
    setShowModal(true);
  };

  const handleSave = async () => {
    if (user && selectedDate) {
      await shiftService.saveShift({
        employeeId: user.employeeId,
        date: selectedDate,
        workMode: workMode
      });
      setShowModal(false);
      fetchShifts();
    }
  };

  const handleDelete = async () => {
    if (user && selectedDate) {
      await shiftService.deleteShift(user.employeeId, selectedDate);
      setShowModal(false);
      fetchShifts();
    }
  };

  const events = shifts.map(shift => ({
    title: shift.workMode,
    start: shift.date,
    backgroundColor: shift.workMode === WorkMode.WFO ? '#f97316' : (shift.workMode === WorkMode.WFH ? '#22c55e' : '#3b82f6'),
    textColor: '#ffffff',
    allDay: true,
    className: 'hover:opacity-80 transition-opacity'
  }));

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto animate-in fade-in duration-700">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        <div className="p-8 bg-slate-50 border-b border-slate-200 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Shift Planner</h1>
            <p className="text-slate-500 font-medium mt-1">Select dates to manage your hybrid work schedule.</p>
          </div>
          <div className="flex flex-wrap gap-3">
             <div className="flex items-center bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm transition-hover hover:border-orange-200">
                <span className="w-3 h-3 bg-orange-500 rounded-full mr-3 ring-4 ring-orange-50"></span>
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Office</span>
             </div>
             <div className="flex items-center bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm transition-hover hover:border-green-200">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-3 ring-4 ring-green-50"></span>
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Home</span>
             </div>
             <div className="flex items-center bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm transition-hover hover:border-blue-200">
                <span className="w-3 h-3 bg-blue-500 rounded-full mr-3 ring-4 ring-blue-50"></span>
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Hybrid</span>
             </div>
          </div>
        </div>

        <div className="p-4 md:p-8">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            dateClick={handleDateClick}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth'
            }}
            height="auto"
            contentHeight="auto"
            fixedWeekCount={false}
            showNonCurrentDates={true}
            handleWindowResize={true}
            stickyHeaderDates={true}
          />
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 animate-in zoom-in duration-200">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-2xl font-black text-slate-900">Mark Attendance</h3>
                    <p className="text-slate-500 text-sm mt-1">Schedule for <span className="font-bold text-slate-900">{selectedDate}</span></p>
                </div>
                <button onClick={() => setShowModal(false)} className="text-slate-300 hover:text-slate-500 transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                {[
                    { mode: WorkMode.WFO, label: 'Work From Office', icon: '🏢', sub: 'On-site collaboration' },
                    { mode: WorkMode.WFH, label: 'Work From Home', icon: '🏠', sub: 'Remote focus work' },
                    { mode: WorkMode.HYBRID, label: 'Hybrid/Client Site', icon: '🌐', sub: 'External or flexible' }
                ].map((item) => (
                    <button
                        key={item.mode}
                        onClick={() => setWorkMode(item.mode)}
                        className={`group flex items-center p-4 rounded-2xl border-2 transition-all text-left ${
                            workMode === item.mode 
                            ? 'border-[#005691] bg-blue-50/50 shadow-lg shadow-blue-50/20' 
                            : 'border-slate-100 bg-slate-50 hover:border-slate-200'
                        }`}
                    >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl mr-4 transition-transform group-active:scale-90 ${
                            workMode === item.mode ? 'bg-[#005691] text-white' : 'bg-white text-slate-400'
                        }`}>
                            {item.icon}
                        </div>
                        <div className="flex-1">
                            <div className={`text-sm font-bold ${workMode === item.mode ? 'text-[#005691]' : 'text-slate-700'}`}>
                                {item.label}
                            </div>
                            <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{item.sub}</div>
                        </div>
                        {workMode === item.mode && (
                             <div className="w-5 h-5 rounded-full bg-[#005691] flex items-center justify-center">
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path></svg>
                             </div>
                        )}
                    </button>
                ))}
              </div>
              
              <div className="pt-6 flex gap-3">
                {hasExistingShift && (
                  <button
                    onClick={handleDelete}
                    className="flex-1 py-4 bg-white border-2 border-red-100 text-red-600 rounded-2xl text-base font-black hover:bg-red-50 hover:border-red-200 transition-all shadow-sm"
                  >
                    Delete
                  </button>
                )}
                <button
                  onClick={handleSave}
                  className={`${hasExistingShift ? 'flex-[2]' : 'w-full'} py-4 bg-[#005691] text-white rounded-2xl text-base font-black shadow-xl shadow-blue-100 hover:bg-[#004270] hover:-translate-y-0.5 active:translate-y-0 transition-all`}
                >
                  Confirm Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
