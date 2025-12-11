'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useEffect } from 'react';
import {useRouter} from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';




export default function SignupPage() {
  const router = useRouter()
  const [user, setUser] = React.useState({
    username: '',
    email: '',
    password: ''
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  
  const onSignup = async () =>{
    try {
      setLoading(true);
      const response = await axios.post("/api/user/signup", user);
      console.log("Signup response:", response.data);
      router.push("/login"); 
      setLoading(false);
      
    }catch (error: any) {
      console.log("Signup error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Something went wrong");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-100 py-8 px-4">
      <form onSubmit={onSignup} className="w-full max-w-md bg-slate-800/70 backdrop-blur-sm border border-slate-700 rounded-xl p-8 shadow-lg">
        <h1 className="text-2xl font-semibold mb-6 text-center">{loading ? "Loading..." : "Create account"}</h1>
        <div className="flex flex-col gap-4">
          <label className="flex flex-col text-sm">
            <span className="mb-2 text-slate-300">Username</span>
            <input
              id="username"
              type="text"
              name="username"
              value={user.username}
              onChange={(e) => setUser({...user, username: e.target.value})}
              placeholder="username"
              className="w-full bg-slate-700 text-slate-100 border border-slate-600 p-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </label>

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
            className="w-full mt-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-md transition">
              {buttonDisabled ? 'Please fill all fields' : 'Sign Up'}
              </button>

          <div className="text-center mt-2">
            <Link href="/login" className="text-indigo-400 hover:underline text-sm">Already have an account? Log in</Link>
          </div>
        </div>
      </form>
    </div>
  );
}