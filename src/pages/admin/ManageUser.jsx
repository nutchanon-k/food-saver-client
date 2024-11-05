import React, { useEffect, useState } from 'react';
import useUserStore from '../../stores/userStore';

const ManageUser = () => {
    const getAllUser = useUserStore(state => state.getAllUser);
    const [user, setUser] = useState([
        { id: 1, name: 'User 01', status: true },
        { id: 2, name: 'User 02', status: false },
        { id: 3, name: 'User 03', status: true },
        { id: 4, name: 'User 04', status: true },
        { id: 5, name: 'User 05', status: false },
        { id: 6, name: 'User 06', status: true },
        { id: 7, name: 'User 07', status: true },
        { id: 8, name: 'User 08', status: false },
        { id: 9, name: 'User 09', status: true },
        { id: 10, name: 'User 10', status: true },
    ]);
    const [users, setUsers] = useState('');
    
    
    useEffect(() => {
        const users = async () => {
            try {
                const result = await getAllUser();
                setUsers(result.data);
            } catch (error) {
                console.log(error);
            }
        }
        users();
    }, []);
    
    console.log(users)
    const toggleStatus = (id) => {
        setUser(
            user.map(user =>
                user.id === id ? { ...user, status: !user.status } : user
            )
        );
    };


    return (
        <div className="p-6 min-h-screen flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-4xl">
                <h2 className="text-2xl font-semibold mb-4">Manage User</h2>
                <table className="w-full text-left">
                    <thead>
                        <tr>
                            <th className="pb-2 border-b">User</th>
                            <th className="pb-2 border-b">View Profile</th>
                            <th className="pb-2 border-b">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user.map(user => (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="py-4 flex items-center space-x-4">
                                    <div className="w-12 h-12 rounded-full bg-orange-300 flex items-center justify-center">
                                        <img src="https://via.placeholder.com/40" alt="User Avatar" className="rounded-full" />
                                    </div>
                                    <span>{user.name}</span>
                                </td>
                                <td className="py-4">
                                    <button className="bg-yellow-200 text-yellow-800 px-4 py-1 rounded-full">
                                        View
                                    </button>
                                </td>
                                <td className="py-4 flex items-center space-x-4">
                                    {/* Toggle Switch */}
                                    <label className="flex cursor-pointer gap-2">
                                        <input
                                            type="checkbox"
                                            checked={user.status}
                                            onChange={() => toggleStatus(user.id)}
                                            className="toggle theme-controller"
                                        />
                                    </label>
                                    <span className={`text-sm font-medium ${user.status ? 'text-green-600' : 'text-red-500'}`}>
                                        {user.status ? 'Active' : 'Deactivate'}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUser;