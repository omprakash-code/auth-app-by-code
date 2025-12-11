'use client';
import { useState } from 'react';

export default function Profile() {
    const [user] = useState({
        username: 'john_doe',
        email: 'john@example.com',
        password: '12345'
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
            <div className="max-w-md mx-auto bg-gray-800 rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-bold text-white mb-8 text-center">Profile</h1>
                
                <div className="space-y-6">
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
                            value={user.password}
                            readOnly
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100"
                        />
                    </div>

                    <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition">
                        Edit Profile
                    </button>
                </div>
            </div>
        </div>
    );
}