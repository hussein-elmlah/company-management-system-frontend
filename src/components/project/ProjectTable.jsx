import React from 'react';

const ProjectTable = ({ projects }) => {
  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Client</th>
            {/* Add more headers as needed */}
          </tr>
        </thead>
        <tbody>
          {projects.map(project => (
            <tr key={project.id}>
              <td>{project.name}</td>
              <td>{project.description}</td>
              {/* <td>{project.client.fullName}</td> */}
              {/* Display more project details as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;
