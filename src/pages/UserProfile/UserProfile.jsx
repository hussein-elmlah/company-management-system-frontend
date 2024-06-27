import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/slices/userSlice';
import { QueueSpinner } from "../../components/reusables/LoadingSpinner";

const UserProfile = () => {
  const user = useSelector(selectUser);

  if (!user) {
    return <QueueSpinner />;
  }

  return (
    <div className="container">
      <h2 className="mb-4">User Profile</h2>
      <div className="card">
        <div className="row card-body">
        <div className="col-md-6">
          <h5 className="card-title">Profile Details</h5>
          <p className="card-text py-2"><strong>Username:</strong> {user.username}</p>
          <p className="card-text py-2"><strong>Role:</strong> {user.role}</p>
          <p className="card-text py-2"><strong>Department:</strong> {user.department ? user.department.name : 'N/A'}</p>
          <p className="card-text py-2"><strong>First Name:</strong> {user.firstName}</p>
          <p className="card-text py-2"><strong>Last Name:</strong> {user.lastName}</p>
        </div>
        <div className="col-md-6">
          <p className="card-text py-2"><strong>Date of Birth:</strong> {user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : 'N/A'}</p>
          <p className="card-text py-2"><strong>Address:</strong> {user.address}</p>
          <p className="card-text py-2"><strong>Job Level:</strong> {user.jobLevel}</p>
          <p className="card-text py-2"><strong>Mobile Number:</strong> {user.mobileNumber}</p>
          <p className="card-text py-2"><strong>Email:</strong> {user.email}</p>
        </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
