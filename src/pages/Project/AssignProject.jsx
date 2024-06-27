import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserService from '../../axios/user';
import ProjectService from '../../axios/projects';
import React from "react";
import { MultiSelect } from "react-multi-select-component";

const AssignProjectToEmployees = () => {
  const [civilselected, setCivilSelected] = useState([]);
  const [mechselected, setMechSelected] = useState([]);
  const [elecselected, setElecSelected] = useState([]);
  const [archselected, setArchSelected] = useState([]);

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
        const newEmps = emps.map((empOne)=>({ 
            label: empOne.firstName,
            value: empOne._id
          })
        )
        setCivilEmployees(newEmps);
      } catch (err) {
        setError('Error fetching user data');
      } finally {
        setLoading(false);
      }
    };
    fetch_civilEmployees();
  }, [projectId]);

  useEffect(() => {
    // civil
    const fetch_archEmployees = async () => {
      try {
        setLoading(true);
        const emps = await UserService.getUsersOfDepartment('65f024ca7447e7f5d0285cc8');
        const newEmps = emps.map((empOne)=>({ 
            label: empOne.firstName,
            value: empOne._id
          })
        )
        setArchitectureEmployees(newEmps);
      } catch (err) {
        setError('Error fetching user data');
      } finally {
        setLoading(false);
      }
    };
    fetch_archEmployees();
  }, [projectId]);

  useEffect(() => {
    // civil
    const fetch_ElecEmployees = async () => {
      try {
        setLoading(true);
        const emps = await UserService.getUsersOfDepartment('65f024ca7447e7f5d0285ccb');
        const newEmps = emps.map((empOne)=>({ 
            label: empOne.firstName,
            value: empOne._id
          })
        )
        setElectricalEmployees(newEmps);
      } catch (err) {
        setError('Error fetching user data');
      } finally {
        setLoading(false);
      }
    };
    fetch_ElecEmployees();
  }, [projectId]);


  useEffect(() => {
    // civil
    const fetch_MechEmployees = async () => {
      try {
        setLoading(true);
        const emps = await UserService.getUsersOfDepartment('65f024ca7447e7f5d0285cca');
        const newEmps = emps.map((empOne)=>({ 
            label: empOne.firstName,
            value: empOne._id
          })
        )
        setMechanicalEmployees(newEmps);
      } catch (err) {
        setError('Error fetching user data');
      } finally {
        setLoading(false);
      }
    };
    fetch_MechEmployees();
  }, [projectId]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // big array of assigned users and project id to be set as separate documents in project-employee
      const updatedData = {
        civilEmployees,
        architectureEmployees,
        mechanicalEmployees,
        electricalEmployees
      };
      console.log(updatedData);
      // await UserService.updateUser(userId, updatedData);
      setSuccess('The project has been assigned successfully');
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

          <label htmlFor="role">Electrical Dept No.Emp:</label>
          <div>
            <MultiSelect
              options={electricalEmployees}
              value={elecselected}
              onChange={setElecSelected}
              labelledBy="Select"
            />
          </div>
          <br />

          <label htmlFor="role"> Architecture Dept No.Emp:</label>
          <div>
            <MultiSelect
              options={architectureEmployees}
              value={archselected}
              onChange={setArchSelected}
              labelledBy="Select"
            />
          </div>
          <br />

          <label htmlFor="role"> Mechanical Dept No.Emp:</label>
          <div>
            <MultiSelect
              options={mechanicalEmployees}
              value={mechselected}
              onChange={setMechSelected}
              labelledBy="Select"
            />
          </div>
          <br />

          <label htmlFor="role"> Civil Dept No.Emp:</label>
          <div>
            <MultiSelect
              options={civilEmployees}
              value={civilselected}
              onChange={setCivilSelected}
              labelledBy="Select"
            />
          </div>
          <br />

          <button type="submit" className="btn btn-primary">Update</button>
        </form>
      )}
    </div>
  );
};

export default AssignProjectToEmployees;

