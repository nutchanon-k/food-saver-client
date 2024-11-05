import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="flex items-center space-x-2 mt-4">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
            >
                Previous
            </button>
            {pageNumbers.map(number => (
                <button
                    key={number}
                    onClick={() => onPageChange(number)}
                    className={`p-2 rounded-s-full ${currentPage === number ? 'bg-primary text-white' : 'bg-gray-300 text-gray-600'}`}
                >
                    {number}
                </button>
            ))}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
