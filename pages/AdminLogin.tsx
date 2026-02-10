import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { UserRole } from '../types';

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mock auth
    if (username === 'founder' && password === 'admin') {
      localStorage.setItem('userRole', UserRole.FOUNDER);
      navigate('/admin/dashboard');
    } else if (username === 'employee' && password === 'worker') {
      localStorage.setItem('userRole', UserRole.EMPLOYEE);
      navigate('/admin/dashboard');
    } else {
      alert('Invalid credentials. Try founder/admin or employee/worker');
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-stone-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-stone-900">LOOKERA</h1>
          <p className="text-stone-500 mt-2">Admin Portal Access</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Admin ID</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:ring-2 focus:ring-brand-dark focus:border-brand-dark outline-none transition-all"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter ID"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:ring-2 focus:ring-brand-dark focus:border-brand-dark outline-none transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          <Button type="submit" fullWidth size="lg">Login to Dashboard</Button>
        </form>

        <div className="mt-6 text-center text-xs text-stone-400">
          <p>Restricted access. Unauthorized attempts are logged.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;