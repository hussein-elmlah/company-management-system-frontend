import React from 'react';
import { useSelector } from 'react-redux';
// import { selectUser } from '../redux/userSlice';

const Home = () => {
  // const user = useSelector(selectUser);

  return (
    <div className='text-center'>
      <div className='row justify-content-center align-items-center' style={{minHeight:400}}>
      <h1>Home</h1>
      {/* {user ? (
        <p>Welcome, {user?.name}!</p>
      ) : (
        <p>Please login.</p>
      )} */}
    </div>
      </div>
  );
};

export default Home;
