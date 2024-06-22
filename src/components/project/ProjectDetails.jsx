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
    return <div className="text-danger">Error: {error}</div>;
  }

  if (!project) {
    return <div className="text-muted">No project found.</div>;
  }

  return (
    <div className="container mt-4">
      <div className="card bg-light shadow-sm rounded">
        <div className="card-body">
          <div className="d-flex align-items-center mb-3">
            <FaProjectDiagram className="text-primary mr-2" />
            <h2 className="card-title">{project.name}</h2>
          </div>
          <div className="row mb-3">
            <div className="col-md-6 mb-3 mb-md-0">
              <p className="font-weight-bold">Project Number:</p>
              <p>{project.number}</p>
            </div>
            <div className="col-md-6">
              <p className="font-weight-bold">Project Status:</p>
              <p>{project.projectStatus}</p>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6 mb-3 mb-md-0">
              <div className="d-flex align-items-center">
                <FaUser className="text-muted mr-2" />
                <p className="font-weight-bold">Owner:</p>
              </div>
              <p>{project.client?.fullName}</p>
            </div>
            <div className="col-md-6">
              <div className="d-flex align-items-center">
                <FaPhone className="text-muted mr-2" />
                <p className="font-weight-bold">Owner's Mobile:</p>
              </div>
              <p>{project.client?.mobileNumber}</p>
            </div>
          </div>
          <div className="mb-3">
            <div className="d-flex align-items-center">
              <FaInfoCircle className="text-muted mr-2" />
              <p className="font-weight-bold">Description:</p>
            </div>
            <p>{project.description}</p>
          </div>
          <div className="d-flex justify-content-between mt-3">
            <div>
              <div className="d-flex align-items-center">
                <FaCalendarAlt className="text-muted mr-2" />
                <p className="text-muted small mb-0">Created At: {new Date(project.createdAt).toLocaleString()}</p>
              </div>
              <div className="d-flex align-items-center">
                <FaCalendarAlt className="text-muted mr-2" />
                <p className="text-muted small mb-0">Last Updated At: {new Date(project.updatedAt).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
