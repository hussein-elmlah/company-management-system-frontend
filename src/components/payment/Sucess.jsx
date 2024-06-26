import React from 'react';
import { useLocation } from 'react-router-dom';

const Success = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const sessionId = params.get('session_id');

  return (
    <div>
      <h1>Payment Successful</h1>
      <p>Your payment was successful. Your session ID is {sessionId}.</p>
      <a href="/">Back to home</a>
    </div>
  );
};

export default Success;
