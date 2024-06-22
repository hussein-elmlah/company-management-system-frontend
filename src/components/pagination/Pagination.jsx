import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center mt-5">
      <div className="inline-flex shadow-md rounded-lg">
        <button 
          className={`px-3 py-1 rounded-l-md border border-gray-300 ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white text-blue-600 hover:bg-blue-100'}`} 
          onClick={handlePrev} 
          disabled={currentPage === 1}
        >
          «
        </button>
        {[...Array(totalPages).keys()].map(page => (
          <button 
            key={page} 
            className={`px-3 py-1 border-t border-b border-gray-300 ${currentPage === page + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-600 hover:bg-blue-100'}`} 
            onClick={() => onPageChange(page + 1)}
          >
            {page + 1}
          </button>
        ))}
        <button 
          className={`px-3 py-1 rounded-r-md border border-gray-300 ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white text-blue-600 hover:bg-blue-100'}`} 
          onClick={handleNext} 
          disabled={currentPage === totalPages}
        >
          »
        </button>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
