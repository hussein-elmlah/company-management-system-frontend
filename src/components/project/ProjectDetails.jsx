import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'; 
import { fetchProjectById, deleteProject ,setSelectedProject} from '../../store/slices/projectSlice';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../reusables/LoadingSpinner';

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

  const handleDeleteProject = async () => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await dispatch(deleteProject(projectId));
        navigate('/projects'); 
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    }
  };

  if (loading) {
    return <LoadingSpinner/>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!project) {
    return <div>No project found.</div>;
  }

  return (
    <div>
      <h2>{project.name}</h2>
      <p>Location: {project.location}</p>
      <p>Owner: {project.owner}</p>
      {/* Render other project details as needed */}
      <button onClick={handleDeleteProject}>Delete Project</button>
    </div>
  );
};

export default ProjectDetails;
