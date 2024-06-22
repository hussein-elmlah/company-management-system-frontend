import axiosInstance from './config';
import React, { useState } from 'react';

// API functions
export const subscribeSource = (sourceToSubscribe) => {
  return axiosInstance.post('/sources/subscribe', sourceToSubscribe)
    .then(response => response.data)
    .catch(error => {
      console.error('Error subscribing to source:', error);
      throw error;
    });
};

export const unsubscribeSource = (sourceId) => {
  return axiosInstance.post(`/sources/unsubscribe/${sourceId}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error unsubscribing from source:', error);
      throw error;
    });
};

export const getTopFiveSources = () => {
  return axiosInstance.get('/sources/topFive')
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching top five sources:', error);
      throw error;
    });
};

export const getPaginatedSources = (page = 1, pageSize = 10) => {
  return axiosInstance.get(`/sources?page=${page}&pageSize=${pageSize}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching paginated sources:', error);
      throw error;
    });
};

export const getSubscribedArticles = (page = 1, pageSize = 10) => {
  return axiosInstance.get(`/articles/subscribed?page=${page}&pageSize=${pageSize}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching subscribed articles:', error);
      throw error;
    });
};

// React Component
const Pagination = ({ totalPages, currentPage, onPageChange }) => {
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

export default Pagination;
