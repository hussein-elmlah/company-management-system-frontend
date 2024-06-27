import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserService from '../../axios/user';
import ProjectService from '../../axios/projects';
import React from "react";
import { MultiSelect } from "react-multi-select-component";

const options = [
  { label: "Grapes 🍇", value: "grapes" },
  { label: "Mango 🥭", value: "mango" },
  { label: "Strawberry 🍓", value: "strawberry", disabled: true },
];

const roles = ["client", "junior", "senior", "branchManager"];

const AssignProjectToEmployees = () => {
  const [selected, setSelected] = useState([]);
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [electricalEmployees, setElectricalEmployees] = useState([]);
  const [mechanicalEmployees, setMechanicalEmployees] = useState([]);
  const [civilEmployees, setCivilEmployees] = useState([]);
  const [architectureEmployees, setArchitectureEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {

    const fetchProjectData = async () => {
      try {
        setLoading(true);
        const projectData = await ProjectService.getProjectById(projectId);
        setProject(projectData);
      } catch (err) {
        setError('Error fetching user data');
      } finally {
        setLoading(false);
      }
    };

    fetchProjectData();
  }, [projectId]);



  useEffect(() => {
    // civil
    const fetch_civilEmployees = async () => {
      try {
        setLoading(true);
        const emps = await UserService.getUsersOfDepartment('65f024ca7447e7f5d0285cc9');
        setCivilEmployees(emps);
      } catch (err) {
        setError('Error fetching user data');
      } finally {
        setLoading(false);
      }
    };
    fetch_civilEmployees();
  }, [projectId]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // big array of assigned users and project id to be set as separate documents in project-employee
      // const updatedData = {
      //   civilEmployees,
      //   architectureEmployees,
      //   mechanicalEmployees,
      //   electricalEmployees
      // };
      console.log(civilEmployees);
      // await UserService.updateUser(userId, updatedData);
      setSuccess('User profile updated successfully');
    } catch (err) {
      setError('Error updating user profile');
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="container mt-5 mb-5 w-50">
      <h2 className="mb-4">Assign Employees to projects</h2>
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
      {project && (
        <form onSubmit={handleSubmit}>
          <div className="card mb-2">
            <div className="card-header">
              Project Information
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <strong>Name:</strong> {project.name}
              </li>
              <li className="list-group-item">
                <strong>Type:</strong> {project.type}
              </li>
              <li className="list-group-item">
                <strong>Description:</strong> {project.description}
              </li>
            </ul>
          </div>

          <br />

          <div>
            <h1>Select Fruits</h1>
            <pre>{JSON.stringify(selected)}</pre>
            <MultiSelect
              options={options}
              value={selected}
              onChange={setSelected}
              labelledBy="Select"
            />
          </div>

          <div className="row">
            <div className="col-md-6">
              <label htmlFor="role">Electrical Dept No.Emp:</label>
            </div>

            <div className="col-md-6">
              <label htmlFor="role">Assignees:</label>
              <select
                id="role"
                className="form-control"
                onChange={(e) => setElectricalEmployees(Array.from(e.target.selectedOptions, option => option.value))}
                multiple // Add the 'multiple' attribute here
              >
                {electricalEmployees?.map((emp) => (
                  <option key={emp._id} value={emp._d}>
                    {emp.firstName} {emp.lastName}
                  </option>
                ))}
              </select>

            </div>

          </div>

          <br />
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="role">Mechanical Dept No.Emp:</label>
            </div>

            <div className="col-md-6">
              <label htmlFor="role">Assignees:</label>
              <select
                id="role"
                className="form-control"
                onChange={(e) => setElectricalEmployees(Array.from(e.target.selectedOptions, option => option.value))}
                multiple // Add the 'multiple' attribute here
              >
                {electricalEmployees?.map((emp) => (
                  <option key={emp._id} value={emp._d}>
                    {emp.firstName} {emp.lastName}
                  </option>
                ))}
              </select>
            </div>
          </div>


          <br />

          <div className="row">
            <div className="col-md-6">
              <label htmlFor="role">Civil	Dept No.Emp:</label>
            </div>

            <div className="col-md-6">
              <label htmlFor="role">Assignees:</label>
              <select
                id="role"
                className="form-control"
                onChange={(e) => setCivilEmployees(Array.from(e.target.selectedOptions, option => option.value))}
                multiple // Add the 'multiple' attribute here
              >
                {civilEmployees?.map((emp) => (
                  <option key={emp._id} value={emp._d}>
                    {emp.firstName} {emp.lastName}
                  </option>
                ))}
              </select>
            </div>
          </div>


          <br />

          <div className="row">
            <div className="col-md-6">
              <label htmlFor="role">Architecture Dept No.Emp:</label>
            </div>

            <div className="col-md-6">
              <label htmlFor="role">Assignees:</label>
              <select
                id="role"
                className="form-control"
                onChange={(e) => setElectricalEmployees(Array.from(e.target.selectedOptions, option => option.value))}
                multiple // Add the 'multiple' attribute here
              >
                {electricalEmployees?.map((emp) => (
                  <option key={emp._id} value={emp._d}>
                    {emp.firstName} {emp.lastName}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Update</button>
        </form>
      )}
    </div>
  );
};

export default AssignProjectToEmployees;

