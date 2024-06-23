import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FaProjectDiagram, FaUser, FaPhone, FaInfoCircle, FaCalendarAlt } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { updateProject, fetchProjectById } from '../../store/slices/projectSlice';
import axiosInstance from '../../axios/config';

const ProjectAcceptance = () => {
  const { id } = useParams(); 
  const dispatch = useDispatch();
  const { selectedProject: project, loading, error } = useSelector(state => state.projects);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchProjectById(id));
  }, [id, dispatch]);

  const handleAccept = async () => {
    try {
      await dispatch(updateProject({ projectId: id, updatedFields: { projectStatus: 'accepted' } }));
      dispatch(fetchProjectById(id));
      alert('Project accepted');
    } catch (error) {
      console.error('Error accepting project:', error);
    }
  };

  const handleReject = async () => {
    try {
      await dispatch(updateProject({ projectId: id, updatedFields: { projectStatus: 'rejected' } }));
      dispatch(fetchProjectById(id));
      alert('Project rejected');
    } catch (error) {
      console.error('Error rejecting project:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!project) return <div>No project found</div>;

  return (
    <div>
      <div className="container mt-4">
        <div className="card shadow-sm mb-5">
          <div className="card-body">
            <div className="d-flex align-items-center mb-3">
              <FaProjectDiagram className="text-primary mr-2" />
              <h2 className="card-title mb-0">{project.name}</h2>
            </div>
            <hr />
            <div className="row mb-3">
              <div className="col-md-6">
                <p className="text-muted mb-1">{t('projectNumber')}</p>
                <p>{project.number}</p>
              </div>
              <div className="col-md-6">
                <p className="text-muted mb-1">{t('projectStatus')}</p>
                <p>{project.projectStatus}</p>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <FaUser className="text-muted mr-2" />
                  <p className="text-muted mb-1">{t('ownerName')}</p>
                </div>
                <p>{project.owner}</p>
              </div>
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <FaPhone className="text-muted mr-2" />
                  <p className="text-muted mb-1">{t('ownerMobile')}</p>
                </div>
                <p>{project.client?.mobileNumber}</p>
              </div>
            </div>
            <div className="mb-3">
              <div className="d-flex align-items-center">
                <FaInfoCircle className="text-muted mr-2" />
                <p className="text-muted mb-1">{t('description')}</p>
              </div>
              <p>{project.description}</p>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <div>
                <div className="d-flex align-items-center">
                  <FaCalendarAlt className="text-muted mr-2" />
                  <p className="text-muted small mb-0">{t('createdAt')}: {new Date(project.createdAt).toLocaleString()}</p>
                </div>
                <div className="d-flex align-items-center">
                  <FaCalendarAlt className="text-muted mr-2" />
                  <p className="text-muted small mb-0">{t('updatedAt')}: {new Date(project.updatedAt).toLocaleString()}</p>
                </div>
              </div>
            </div>
            <button className="btn btn-success" onClick={handleAccept}>Accept Project</button>
            <button className="btn btn-danger" onClick={handleReject}>Reject Project</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectAcceptance;
