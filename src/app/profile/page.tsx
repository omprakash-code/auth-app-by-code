'use client';
import { NextRequest } from 'next/server'; // this is used for making server requests
import { useEffect, useState } from 'react'; // this is used for managing component state
import axios from 'axios'; // this is use for making api calls
import Link from 'next/link'; // this is used for client side navigation
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function Profile() {
    const router = useRouter();
    const [user, setUser] = useState({
        username: '',
        email: ''   
    });

    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchUserData = async ()=>{
            try{
               const res = await axios.get('/api/user/me');
               console.log('User Data Fetched from API:', res.data);
               setUser(res.data.data)
            }catch(error){
                console.error('Failed to fetch user data:', error)
            }
        }
        fetchUserData();
    }, []);

    const logout = async () => {
        try{
            await axios.get('/api/user/logout');
            // Redirect to login page after logout
            toast.success('Logged out successfully');
            router.push('/login');
        }catch (error){
            console.error('Logout failed:', error);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
            <div className="max-w-md mx-auto bg-gray-800 rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-bold text-white mb-8 text-center">Profile</h1>
                
                <div className="space-y-6">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-200">{user.username == '' ? "No User" : <Link href={`/profile/${user.username}`}>{user.username}</Link>}</h2>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            value={user.username}
                            readOnly
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            value={user.email}
                            readOnly
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            value="********"
                            readOnly
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100"
                        />
                    </div>

                    <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition">
                        Edit Profile
                    </button>

                    <button onClick={logout} className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition">
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}