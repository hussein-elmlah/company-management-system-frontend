import React from 'react';
import { useSelector } from 'react-redux';
// import { selectUser } from '../redux/userSlice';

const Home = () => {
  // const user = useSelector(selectUser);

  return (
    <div>
      <h1>Home</h1>
      {/* {user ? (
        <p>Welcome, {user?.name}!</p>
      ) : (
        <p>Please login.</p>
      )} */}
    </div>
  );
};

export default Home;
