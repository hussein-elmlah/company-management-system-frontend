import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchDepartments } from '../../store/slices/departmentSlice';
import { fetchEmployees } from '../../store/slices/employeeSlice';
import { assignProject } from '../../store/slices/projectSlice';

const AssignProject = () => {
  const { projectId } = useParams();  
  const dispatch = useDispatch();
  const { departments, status: departmentsStatus } = useSelector((state) => state.departments);
  const { employees, status: employeesStatus } = useSelector((state) => state.employees);
  const loading = useSelector((state) => state.projects.loading);  
  const error = useSelector((state) => state.projects.error);  
  
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [hoursExpectedToComplete, setHoursExpectedToComplete] = useState('');

  useEffect(() => {
    dispatch(fetchDepartments());
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleDepartmentChange = (event) => {
    const { options } = event.target;
    const selected = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setSelectedDepartments(selected);
  };

  const handleEmployeeChange = (event) => {
    const { options } = event.target;
    const selected = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setSelectedEmployees(selected);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedDepartments.length || !selectedEmployees.length || !hoursExpectedToComplete) {
      alert('Please fill in all fields.');
      return;
    }

    const projectData = {
      departments: selectedDepartments,
      employees: selectedEmployees.map((username) => ({
        username,
        hoursWorked: 0,
      })),
      hoursExpectedToComplete: Number(hoursExpectedToComplete),
    };

    dispatch(assignProject({ projectId, assignmentData: projectData }))
      .then((result) => {
        if (result.type === 'projects/assignProject/fulfilled') {
          alert('Project assignments updated successfully');
        } else {
          console.error('Error:', result.error);
          alert(`Failed to assign project: ${result.error.message}`);
        }
      })
      .catch((error) => {
        console.error('Request failed:', error);
        alert(`Failed to assign project: ${error.message}`);
      });
  };

  if (departmentsStatus === 'loading' || employeesStatus === 'loading') {
    return <div>Loading...</div>;
  }

  if (departmentsStatus === 'failed' || employeesStatus === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="departments">Departments</label>
        <select multiple={true} id="departments" onChange={handleDepartmentChange}>
          {departments.map((department) => (
            <option key={department.id} value={department.name}>
              {department.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="employees">Employees</label>
        <select multiple={true} id="employees" onChange={handleEmployeeChange}>
          {employees.map((employee) => (
            <option key={employee.id} value={employee.username}>
              {employee.username}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="hoursExpectedToComplete">Hours Expected to Complete</label>
        <input
          type="number"
          id="hoursExpectedToComplete"
          value={hoursExpectedToComplete}
          onChange={(e) => setHoursExpectedToComplete(e.target.value)}
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Assigning...' : 'Assign Project'}
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default AssignProject;
