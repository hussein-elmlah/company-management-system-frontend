import  { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import UserService from '../../axios/user';

const VerifyEmailComponent = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  console.log(token);
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (token) {
      UserService.verifyEmail(token)
        .then((response) => {
        console.log(response);
          setMessage('Email verified successfully. Redirecting to login...');
          setTimeout(() => {
            navigate('/login');
          }, 3000);  
        })
        .catch((error) => {
          setMessage('Email verification failed. Please try again.');
          console.error('Email verification error:', error);
        });
    } else {
      setMessage('Invalid verification token.');
    }
  }, [token, navigate]);

  return (
    <div className="verify-email-container">
      <h2>Verify Email</h2>
      <p>{message}</p>
    </div>
  );
};

export default VerifyEmailComponent;
