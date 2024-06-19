import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProjects } from '../../store/slices/projectSlice';
import ProjectTable from './ProjectTable';
import Pagination from '../pagination/Pagination';
import LoadingSpinner from '../reusables/LoadingSpinner';

const ProjectList = () => {
  const dispatch = useDispatch();
  const projectsData = useSelector(state => state.projects.projectList); 
  const { data: projects, currentPage, totalPages } = projectsData || {};
  const [currentPageState, setCurrentPage] = useState(1);
  const projectsPerPage = 10; 

  useEffect(() => {
    dispatch(fetchProjects(currentPageState, projectsPerPage)); 
  }, [dispatch, currentPageState, projectsPerPage]);

  if (!projects) {
    return <LoadingSpinner />;
  }

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    dispatch(fetchProjects(pageNumber, projectsPerPage));
  };

  const indexOfLastProject = currentPageState * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">All Projects</h1>
      <ProjectTable projects={currentProjects} />
      <Pagination
        currentPage={currentPageState}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default ProjectList;
