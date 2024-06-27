import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProjectById, setSelectedProject } from '../../store/slices/projectSlice';
import LoadingSpinner from '../reusables/LoadingSpinner';
import { FaProjectDiagram, FaUser, FaPhone, FaInfoCircle, FaCalendarAlt } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const ProjectDetails = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const project = useSelector(state => state.projects.selectedProject);
  const loading = useSelector(state => state.projects.loading);
  const error = useSelector(state => state.projects.error);
  const { t } = useTranslation();

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
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">{t('error')}: {error}</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container mt-4">
        <div className="alert alert-info">{t('noProjectFound')}</div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
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
              <p>{project.owner.fullName}</p>
            </div>
            <div className="col-md-6">
              <div className="d-flex align-items-center">
                <FaPhone className="text-muted mr-2" />
                <p className="text-muted mb-1">{t('ownerMobile')}</p>
              </div>
              <p>{project.owner.mobileNumber}</p>
            </div>
          </div>
          {/* Display Project Pictures */}
          {/* {project.projectPictures.length > 0 && (
            <div className="row mb-3">
              <div className="col-md-12">
                <p className="text-muted mb-1">{t('projectPictures')}</p>
                <div className="row">
                  {project.projectPictures.map((picture, index) => (
                    <div key={index} className="col-md-3 mb-3">
                      <div className="card">
                        <img src={`http://localhost:5173/${picture}`} className="card-img-top" alt={`Project Picture ${index}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )} */}
          
          {/* Display Other Project Details */}
          <div className="row mb-3">
            <div className="col-md-6">
              <p className="text-muted mb-1">{t('plotNumber')}</p>
              <p>{project.plotNumber}</p>
            </div>
            <div className="col-md-6">
              <p className="text-muted mb-1">{t('planNumber')}</p>
              <p>{project.planNumber}</p>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <p className="text-muted mb-1">{t('landPerimeter')}</p>
              <p>{project.landPerimeter}</p>
            </div>
            <div className="col-md-6">
              <p className="text-muted mb-1">{t('landArea')}</p>
              <p>{project.landArea}</p>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <p className="text-muted mb-1">{t('program')}</p>
              <p>{project.program}</p>
            </div>
            <div className="col-md-6">
              <p className="text-muted mb-1">{t('type')}</p>
              <p>{project.type}</p>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <p className="text-muted mb-1">{t('numberOfFloors')}</p>
              <p>{project.numberOfFloors}</p>
            </div>
            <div className="col-md-6">
              <p className="text-muted mb-1">{t('buildingArea')}</p>
              <p>{project.buildingArea}</p>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <p className="text-muted mb-1">{t('totalBuildingArea')}</p>
              <p>{project.totalBuildingArea}</p>
            </div>
            <div className="col-md-6">
              <div className="d-flex align-items-center">
                <FaInfoCircle className="text-muted mr-2" />
                <p className="text-muted mb-1">{t('annexUpper')}</p>
              </div>
              <p>{project.annex.upper ? t('yes') : t('no')}</p>
            </div>
            <div className="col-md-6">
              <div className="d-flex align-items-center">
                <FaInfoCircle className="text-muted mr-2" />
                <p className="text-muted mb-1">{t('annexLand')}</p>
              </div>
              <p>{project.annex.land ? t('yes') : t('no')}</p>
            </div>
          </div>
          <div className="mb-3">
            <div className="d-flex align-items-center">
              <FaInfoCircle className="text-muted mr-2" />
              <p className="text-muted mb-1">{t('description')}</p>
            </div>
            <p>{project.description}</p>
          </div>
          <div className="d-flex justify-content-between">
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
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
