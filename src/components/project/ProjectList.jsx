import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProjects } from '../../store/slices/projectSlice';
import ProjectTable from './ProjectTable';
import Pagination from '../pagination/Pagination';

const ProjectList = () => {
  const dispatch = useDispatch();
  const projects = useSelector(state => state.projects.projectList.data);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(10);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  if (!projects) {
    return <div>Loading...</div>;
  }

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

  const onPageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">All Projects</h1>
      <ProjectTable projects={currentProjects} />
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(projects.length / projectsPerPage)}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default ProjectList;
