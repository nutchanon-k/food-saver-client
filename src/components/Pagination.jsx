import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const getPageNumbers = () => {
        const pages = [];
        const siblingCount = 1; // จำนวนหน้าที่แสดงรอบๆ หน้าปัจจุบัน
        const totalNumbers = siblingCount * 2 + 5; // หน้าปัจจุบัน, หน้าต้น, หน้าสุดท้าย, และ ... 
        const totalBlocks = totalNumbers;

        if (totalPages > totalBlocks) {
            const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
            const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

            const shouldShowLeftDots = leftSiblingIndex > 2;
            const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

            const firstPage = 1;
            const lastPage = totalPages;

            if (!shouldShowLeftDots && shouldShowRightDots) {
                let leftItemCount = 3 + 2 * siblingCount;
                for (let i = 1; i <= leftItemCount; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(lastPage);
            } else if (shouldShowLeftDots && !shouldShowRightDots) {
                pages.push(firstPage);
                pages.push('...');
                let rightItemCount = 3 + 2 * siblingCount;
                for (let i = totalPages - rightItemCount + 1; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else if (shouldShowLeftDots && shouldShowRightDots) {
                pages.push(firstPage);
                pages.push('...');
                for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(lastPage);
            }
        } else {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        }

        return pages;
    };

    const pages = getPageNumbers();

    return (
        <div className="flex items-center space-x-2 mt-4">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
            >
                Previous
            </button>
            {pages.map((page, index) => (
                page === '...' ? (
                    <span key={`dots-${index}`} className="p-2 text-gray-600">
                        ...
                    </span>
                ) : (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`p-2 rounded-full w-[3rem] h-[3rem] ${currentPage === page ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}`}
                    >
                        {page}
                    </button>
                )
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
