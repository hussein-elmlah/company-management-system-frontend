import React from 'react';
import { ClipLoader } from "react-spinners";

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

export const QueueSpinner = ({ isLoading }) => (
  <div className="sweet-loading text-center">
    <ClipLoader
      color={"#123abc"}
      css={`
        display: block;
        margin: 0 auto;
        border-color: red;
      `}
      size={150}
    />
  </div>
);

export default LoadingSpinner;
