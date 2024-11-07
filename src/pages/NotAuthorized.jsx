import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotAuthorized = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-4xl font-bold mb-4">403 - Not Authorized</h1>
            <p className="mb-8">You do not have permission to view this page.</p>
            <button
                onClick={() => navigate('/')}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Go to Home
            </button>
        </div>
    );
};

export default NotAuthorized;