'use client';
import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(true);
    }else{
      setButtonDisabled(false);
    }
  }, [user]);
 
  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post('/api/user/login', user);
      console.log('Login Successful:', response.data);
      toast.success('Login Successful');
      router.push('/profile');
    } catch (error: any) {
      console.error('Login failed', error);
      toast.error('Login failed. Please check your credentials.');
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-100 py-8 px-4">
      <form onSubmit={onLogin} className="w-full max-w-md bg-slate-800/70 backdrop-blur-sm border border-slate-700 rounded-xl p-8 shadow-lg">
        <h1 className="text-2xl font-semibold mb-6 text-center">{loading ? "Logging in..." : "Log in"}</h1>

        <div className="flex flex-col gap-4">
          <label className="flex flex-col text-sm">
            <span className="mb-2 text-slate-300">Email</span>
            <input
              id="email"
              type="email"
              name="email"
              value={user.email}
              onChange={(e) => setUser({...user, email: e.target.value})}
              placeholder="email"
              className="w-full bg-slate-700 text-slate-100 border border-slate-600 p-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </label>

          <label className="flex flex-col text-sm">
            <span className="mb-2 text-slate-300">Password</span>
            <input
              id="password"
              type="password"
              name="password"
              value={user.password}
              onChange={(e) => setUser({...user, password: e.target.value})}
              placeholder="password"
              className="w-full bg-slate-700 text-slate-100 border border-slate-600 p-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </label>

          <button
            type="submit"
            className="w-full mt-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-md transition"
          >
            {buttonDisabled ? "Log in" : "Fill the form"}
          </button>

          <div className="text-center mt-2">
            <Link href="/signup" className="text-indigo-400 hover:underline text-sm">Don't have an account? Sign up</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
