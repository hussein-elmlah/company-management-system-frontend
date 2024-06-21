import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center space-x-4">
      <Spinner color="primary" />
    </div>
  );
};

const Spinner = ({ color }) => {
  return (
    <div className={`inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] border-${color} motion-reduce:animate-[spin_1.5s_linear_infinite]`} role="status">
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
