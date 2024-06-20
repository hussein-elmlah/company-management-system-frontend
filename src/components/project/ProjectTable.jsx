import React from 'react';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { deleteProject } from '../../store/slices/projectSlice';
import { useDispatch } from 'react-redux';

const ProjectTable = ({ projects }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleView = (projectId) => {
    navigate(`/projectdetails/${projectId}`);
  };

  const handleUpdate = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  const handleDelete = (projectId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await dispatch(deleteProject(projectId)).unwrap();
          Swal.fire(
            'Deleted!',
            'Your project has been deleted.',
            'success'
          );
        } catch (error) {
          console.error("Error deleting project:", error);
          Swal.fire(
            'Error!',
            'Failed to delete the project.',
            'error'
          );
        }
      }
    });
  };

  return (
    <div className="table-responsive">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Name</th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Description</th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Client</th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {projects.map((project) => (
            <tr key={project.id}>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{project.name}</td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{project.description}</td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{project.client?.fullName}</td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                <div className="flex space-x-4">
                  <button className="text-blue-500 hover:text-blue-700" onClick={() => handleView(project.id)}>
                    <FaEye />
                  </button>
                  <button className="text-green-500 hover:text-green-700" onClick={() => handleUpdate(project.id)}>
                    <FaEdit />
                  </button>
                  <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(project.id)}>
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;
