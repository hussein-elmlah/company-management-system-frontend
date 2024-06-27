import React, { useEffect, useState } from 'react';
import ProjectTable from './ProjectTable';
import { QueueSpinner } from "../reusables/LoadingSpinner";
import Pagination from "../../components/pagination/Pagination";
import { useTranslation } from 'react-i18next';
import { fetchProjectsWithParams } from "../../store/slices/projectSlice";
import { selectUser } from "../../store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

const ProjectList = () => {
  const { t } = useTranslation();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.projectList);
  const isLoading = useSelector((state) => state.projects.loading);
  const error = useSelector((state) => state.projects.error);
  const currentPage = useSelector((state) => state.projects.currentPage);
  const totalPages = useSelector((state) => state.projects.totalPages);
  const [pageNumber, setPageNumber] = useState(currentPage);
  const projectsPerPage = 5;

  useEffect(() => {
    handlePageChange(pageNumber);
  }, [dispatch, pageNumber]);

  const handlePageChange = (page) => {
    setPageNumber(page);
    const params = {
      page,
      limit: projectsPerPage,
      'client.fullName': user.username,
    };
    dispatch(fetchProjectsWithParams(params));
  };

  if (isLoading) {
    return <QueueSpinner />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container py-4">
      {projects.length > 0 ? (
        <>
          <h2 className="mb-4">{t('my projects')}</h2>
          <ProjectTable projects={projects} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <h2 className="mb-4">{t('no projects')}</h2>
      )}
    </div>
  );
};

export default ProjectList;
