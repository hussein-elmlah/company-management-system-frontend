import   { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserService from '../../axios/user';

const roles = ["client", "junior", "senior", "branchManager"];

const UpdateUserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('');
  const [department, setDepartment] = useState('');
  const [departments, setDepartments] = useState([]);
  const [contract, setContract] = useState({
    number: '',
    startDate: '',
    endDate: '',
    salary: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const userData = await UserService.getUserById(userId);
        setUser(userData.user);
        setRole(userData.user.role);
        setDepartment(userData.user.department?._id || '');
      } catch (err) {
        setError('Error fetching user data');
      } finally {
        setLoading(false);
      }
    };

    const fetchDepartments = async () => {
      try {
        const data = await UserService.getDepartments();
        setDepartments(data.data);
      } catch (err) {
        setError('Error fetching departments');
      }
    };

    fetchUserData();
    fetchDepartments();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const updatedData = {
        role,
        department
      };
      await UserService.updateUser(userId, updatedData);
      setSuccess('User profile updated successfully');
    } catch (err) {
      setError('Error updating user profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 mb-5 w-50">
      <h2 className="mb-4">Update User Profile</h2>
      {success && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          {success}
          <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}
      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}
      {user && (
        <form onSubmit={handleSubmit}>
          <div className="card mb-4">
            <div className="card-header">
              User Information
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <strong>Name:</strong> {user.firstName} {user.lastName}
              </li>
              <li className="list-group-item">
                <strong>Email:</strong> {user.email}
              </li>
              <li className="list-group-item">
                <strong>Phone:</strong> {user.mobileNumber}
              </li>
            </ul>
          </div>
          <div className="form-group">
            <label htmlFor="role">Role:</label>
            <select
              id="role"
              className="form-control"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              {roles.map((roleOption) => (
                <option key={roleOption} value={roleOption}>
                  {roleOption}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="department">Department:</label>
            <select
              id="department"
              className="form-control"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              {departments.map((dept) => (
                <option key={dept._id} value={dept._id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Update</button>
        </form>
      )}
    </div>
  );
};

export default UpdateUserProfile;

