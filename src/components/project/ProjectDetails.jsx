import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProjectById, setSelectedProject } from '../../store/slices/projectSlice';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../reusables/LoadingSpinner';
import { FaProjectDiagram, FaUser, FaPhone, FaInfoCircle, FaCalendarAlt } from 'react-icons/fa';

const ProjectDetails = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const project = useSelector(state => state.projects.selectedProject);
  const loading = useSelector(state => state.projects.loading);
  const error = useSelector(state => state.projects.error);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProjectById(projectId));

    return () => {
      dispatch(setSelectedProject(null));
    };
  }, [dispatch, projectId]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!project) {
    return <div className="text-gray-500">No project found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <div className="bg-blue-100 overflow-hidden shadow-md rounded-lg">
        <div className="px-6 py-4">
          <div className="flex items-center mb-4">
            <FaProjectDiagram className="text-blue-500 mr-2" />
            <h2 className="text-2xl font-bold text-blue-700">{project.name}</h2>
          </div>
          <div className="flex flex-wrap mb-4">
            <div className="w-full md:w-1/2 mb-4 md:mb-0">
              <p className="text-gray-700 font-semibold">Project Number:</p>
              <p>{project.number}</p>
            </div>
            <div className="w-full md:w-1/2">
              <p className="text-gray-700 font-semibold">Project Status:</p>
              <p>{project.projectStatus}</p>
            </div>
          </div>
          <div className="flex flex-wrap mb-4">
            <div className="w-full md:w-1/2 mb-4 md:mb-0">
              <div className="flex items-center">
                <FaUser className="text-gray-700 mr-2" />
                <p className="text-gray-700 font-semibold">Owner:</p>
              </div>
              <p>{project.client.fullName}</p>
            </div>
            <div className="w-full md:w-1/2">
              <div className="flex items-center">
                <FaPhone className="text-gray-700 mr-2" />
                <p className="text-gray-700 font-semibold">Owner's Mobile:</p>
              </div>
              <p>{project.client.mobileNumber}</p>
            </div>
          </div>
          <div className="mb-4">
            <div className="flex items-center">
              <FaInfoCircle className="text-gray-700 mr-2" />
              <p className="text-gray-700 font-semibold">Description:</p>
            </div>
            <p>{project.description}</p>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div>
              <div className="flex items-center">
                <FaCalendarAlt className="text-gray-500 mr-2" />
                <p className="text-gray-500 text-sm">Created At: {new Date(project.createdAt).toLocaleString()}</p>
              </div>
              <div className="flex items-center">
                <FaCalendarAlt className="text-gray-500 mr-2" />
                <p className="text-gray-500 text-sm">Last Updated At: {new Date(project.updatedAt).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
