
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

const Login: React.FC = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (authService.getCurrentUser()) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const user = await authService.login(employeeId, password);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid Employee ID or Password');
    } finally {
      setLoading(false);
    }
  };

  return (
     <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg border border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-[#005691]">HybridShiftTracker</h2>
          <p className="mt-2 text-sm text-gray-500 font-medium tracking-tight">Enterprise Portal</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
                <input
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-4 py-3 border border-gray-200 placeholder-gray-400 text-gray-900 rounded-t-xl focus:outline-none focus:ring-2 focus:ring-[#005691] focus:border-transparent focus:z-10 sm:text-sm"
                placeholder="Employee ID"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-4 py-3 border border-gray-200 placeholder-gray-400 text-gray-900 rounded-b-xl focus:outline-none focus:ring-2 focus:ring-[#005691] focus:border-transparent focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-xs text-center font-medium bg-red-50 py-2 rounded-lg">{error}</p>}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-black rounded-xl text-white bg-[#005691] hover:bg-[#004270] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#005691] transition-all disabled:opacity-50 shadow-lg shadow-blue-100"
            >
              {loading ? 'Authenticating...' : 'SIGN IN'}
            </button>
          </div>
        </form>
        <div className="text-center text-[10px] text-gray-400 uppercase tracking-widest font-bold">
          HybridShiftTracker Enterprise
        </div>
      </div>
    </div>
  );
};

export default Login;
