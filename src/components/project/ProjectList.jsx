import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProjects, setCurrentPage } from '../../store/slices/projectSlice';
import ProjectTable from './ProjectTable';
import Pagination from '../pagination/projectPagination';
import LoadingSpinner from '../reusables/LoadingSpinner';
import { useTranslation } from 'react-i18next';

const ProjectList = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { projectList, loading, error, currentPage, totalPages, projectsPerPage } = useSelector(state => state.projects);
  const [currentPageLocal, setCurrentPageLocal] = useState(currentPage);

  useEffect(() => {
    dispatch(fetchProjects(currentPageLocal));
  }, [dispatch, currentPageLocal]);

  const onPageChange = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
    setCurrentPageLocal(pageNumber);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const currentProjects = projectList;

  return (
    <div className="container py-4">
      <h1 className="mb-4">{t('allProjects')}</h1>
      <ProjectTable projects={currentProjects} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default ProjectList;
