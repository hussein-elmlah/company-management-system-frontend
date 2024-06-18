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
    <div className="join pb-5 text-center">
      <button className="join-item btn" onClick={handlePrev} disabled={currentPage === 1}>«</button>
      {[...Array(totalPages).keys()].map(page => (
        <button key={page} className="join-item btn" onClick={() => onPageChange(page + 1)}>{page + 1}</button>
      ))}
      <button className="join-item btn" onClick={handleNext} disabled={currentPage === totalPages}>»</button>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
