
import React from 'react';
import { authService } from '../services/authService';

const Profile: React.FC = () => {
  const user = authService.getCurrentUser();

  if (!user) return <div className="p-8 text-center text-slate-500">Session expired. Please log in again.</div>;

  const infoItems = [
    { label: 'Employee ID', value: user.employeeId, icon: '🆔' },
    { label: 'Email Address', value: user.email, icon: '📧' },
    { label: 'Department', value: user.department, icon: '🏢' },
    { label: 'Reporting Manager', value: user.manager, icon: '👤' },
    { label: 'Base Location', value: user.location, icon: '📍' },
  ];

  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Card: Profile Overview */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
            <div className="h-32 bg-gradient-to-br from-[#005691] to-[#0074c2] relative">
               <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold text-white uppercase tracking-tighter">
                 PRO VERIFIED
               </div>
            </div>
            <div className="px-6 pb-8 text-center">
              <div className="relative -mt-16 mb-4">
                <div className="h-32 w-32 rounded-3xl bg-white p-1.5 shadow-2xl mx-auto rotate-3 hover:rotate-0 transition-transform duration-300">
                  <div className="h-full w-full rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 text-5xl font-black border-4 border-white">
                    {user.name.charAt(0)}
                  </div>
                </div>
              </div>
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">{user.name}</h2>
              <p className="text-[#0074c2] font-bold text-sm mb-1 uppercase tracking-widest">{user.role}</p>
              <div className="flex justify-center mt-4">
                 <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2"></span>
                    ACTIVE EMPLOYEE
                 </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Card: Details & Stats */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
            <h3 className="text-xl font-bold text-slate-800 mb-8 border-b border-slate-50 pb-4">Professional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {infoItems.map((item, idx) => (
                <div key={idx} className="group border-b border-slate-50 pb-2 hover:border-[#005691] transition-all">
                  <dt className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{item.label}</dt>
                  <dd className="flex items-center text-slate-700 font-bold">
                    <span className="mr-2 text-lg grayscale group-hover:grayscale-0 transition-all">{item.icon}</span>
                    {item.value}
                  </dd>
                </div>
              ))}
            </div>

            <div className="mt-12 flex flex-col sm:flex-row gap-4">
               <button className="flex-1 py-3 bg-[#005691] text-white rounded-xl text-sm font-bold hover:bg-[#004270] transition-all shadow-lg shadow-blue-50">
                  Update Employment Info
               </button>
               <button className="flex-1 py-3 bg-white border-2 border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:border-slate-300 transition-all">
                  Security Settings
               </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
             {[
               { val: '14', lab: 'Annual Leaves' },
               { val: '82%', lab: 'WFO Compliance' },
               { val: '3', lab: 'Shift Requests' }
             ].map((stat, i) => (
               <div key={i} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm text-center">
                  <div className="text-2xl font-black text-[#005691]">{stat.val}</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{stat.lab}</div>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
