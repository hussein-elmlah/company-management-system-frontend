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

  const renderPaginationButtons = () => {
    const maxVisiblePages = 5;
    const halfMaxVisiblePages = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(1, currentPage - halfMaxVisiblePages);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    const pages = [];
    for (let page = startPage; page <= endPage; page++) {
      pages.push(
        <button
          key={page}
          className={`join-item btn ${page === currentPage ? 'text-success h5' : ''}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      );
    }

    return (
      <>
        <button className="join-item btn" onClick={handlePrev} disabled={currentPage === 1}>«</button>
        {pages}
        <button className="join-item btn" onClick={handleNext} disabled={currentPage === totalPages}>»</button>
      </>
    );
  };

  return totalPages > 1 ? (
    <div className="join text-center">
      {renderPaginationButtons()}
    </div>
  ) : null;
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
