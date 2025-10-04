

import React, { useState } from 'react';
import { ChartBarIcon, UsersIcon, DollarIcon } from '../icons/Icons';
import { Tooltip } from '../Tooltip';

interface StatCardProps {
    icon: React.ReactNode;
    title: string;
    value: string;
    colorClass: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, colorClass }) => (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-5">
        <div className="flex items-center">
            <div className={`p-3 rounded-full ${colorClass}`}>
                {icon}
            </div>
            <div className="ml-4">
                <p className="text-sm font-medium text-slate-400">{title}</p>
                <p className="text-2xl font-bold text-white">{value}</p>
            </div>
        </div>
    </div>
);

const initialUsers = [
    { id: 1, name: 'Ethan Harper', email: 'ethan@example.com', plan: 'Premium', status: 'Active', lastLogin: '2024-07-29', avatar: 'https://i.pravatar.cc/150?u=ethan' },
    { id: 2, name: 'Sophia Bennett', email: 'sophia@example.com', plan: 'Free', status: 'Active', lastLogin: '2024-07-28', avatar: 'https://i.pravatar.cc/150?u=sophia' },
    { id: 3, name: 'Liam Carter', email: 'liam@example.com', plan: 'Premium', status: 'Inactive', lastLogin: '2024-07-25', avatar: 'https://i.pravatar.cc/150?u=liam' },
    { id: 4, name: 'Olivia Davis', email: 'olivia@example.com', plan: 'Free', status: 'Active', lastLogin: '2024-07-29', avatar: 'https://i.pravatar.cc/150?u=olivia' },
];

export const AdminDashboard: React.FC = () => {
    const [users, setUsers] = useState(initialUsers);

    const toggleUserStatus = (id: number) => {
        setUsers(users.map(user => 
            user.id === id ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' } : user
        ));
    };
    
    return (
        <div className="flex-1 bg-slate-900 text-white overflow-y-auto">
            <main className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 w-full">
                <h1 className="text-3xl font-bold text-white mb-8">Admin Dashboard</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <StatCard 
                        icon={<UsersIcon className="h-6 w-6 text-blue-400" />}
                        title="Total Users"
                        value="1,428"
                        colorClass="bg-blue-500/20"
                    />
                    <StatCard 
                        icon={<ChartBarIcon className="h-6 w-6 text-green-400" />}
                        title="Today's API Calls"
                        value="8,312"
                        colorClass="bg-green-500/20"
                    />
                    <StatCard 
                        icon={<DollarIcon className="h-6 w-6 text-yellow-400" />}
                        title="Monthly Cost (Est.)"
                        value="$315.72"
                        colorClass="bg-yellow-500/20"
                    />
                </div>

                <div className="bg-slate-800 border border-slate-700 rounded-lg">
                    <div className="p-4 sm:p-6 border-b border-slate-700">
                      <h2 className="text-xl font-semibold text-white">User Management</h2>
                    </div>
                    
                    <ul className="divide-y divide-slate-700">
                        {users.map(user => (
                            <li key={user.id} className="p-4 sm:p-6 flex items-center justify-between hover:bg-slate-800/50">
                                <div className="flex items-center">
                                    <img className="h-10 w-10 rounded-full" src={user.avatar} alt={`${user.name}'s avatar`} />
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-white">{user.name}</div>
                                        <div className="text-sm text-slate-400">{user.email}</div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                     <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === 'Active' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                                        {user.status}
                                    </span>
                                    <Tooltip text={user.status === 'Active' ? `Deactivate ${user.name}'s account` : `Activate ${user.name}'s account`}>
                                        <button 
                                            onClick={() => toggleUserStatus(user.id)}
                                            className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                                        >
                                            {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                                        </button>
                                    </Tooltip>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
        </div>
    );
};