import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProjectById, setSelectedProject } from '../../store/slices/projectSlice';
import LoadingSpinner from '../reusables/LoadingSpinner';
import { FaProjectDiagram, FaUser, FaPhone, FaInfoCircle, FaCalendarAlt, FaImages, FaDownload, FaUpload } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button'; // Assuming you're using Bootstrap for styling
import ProjectImagesModal from './ProjectImagesModal'; // Import the modal component
import { selectUser } from '../../store/slices/userSlice';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const ProjectDetails = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const project = useSelector(state => state.projects.selectedProject);
  const loading = useSelector(state => state.projects.loading);
  const error = useSelector(state => state.projects.error);
  const { t } = useTranslation();
  const [showImagesModal, setShowImagesModal] = useState(false);
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProjectById(projectId));

    return () => {
      dispatch(setSelectedProject(null));
    };
  }, [dispatch, projectId]);


  const handleUpdate = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  const handleDelete = (projectId) => {
    Swal.fire({
      title: t('deleteConfirmationTitle'),
      text: t('deleteConfirmationText'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: t('deleteConfirmationYes'),
      cancelButtonText: t('cancel')
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await dispatch(deleteProject(projectId)).unwrap();
          Swal.fire(
            t('deleteSuccessTitle'),
            t('deleteSuccessMessage'),
            'success'
          );
        } catch (error) {
          console.error("Error deleting project:", error);
          Swal.fire(
            t('deleteErrorTitle'),
            t('deleteErrorMessage'),
            'error'
          );
        }
      }
    });
  };

  const handleOpenImagesModal = () => {
    setShowImagesModal(true);
  };

  const handleCloseImagesModal = () => {
    setShowImagesModal(false);
  };

  const renderDownloadLink = (link, label) => {
    if (link) {
      return (
        <div className="d-flex align-items-center mb-2">
          <FaDownload className="text-muted mr-2" />
          <a href={link} target="_blank" rel="noopener noreferrer">{label}</a>
        </div>
      );
    }
    return null;
  };

  const renderUploadButton = (link) => {
    if (!link) {
      return (
        <Button variant="primary" size="sm">
          <FaUpload className="mr-2" />
          {t('uploadFinalLink')}
        </Button>
      );
    }
    return null;
  };

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
          {/* Manage Project Images */}
          {/* <div className="mb-3">
            <div className="d-flex align-items-center">
              <FaImages className="text-muted mr-2" />
              <p className="text-muted mb-0">{t('manageProjectImages')}</p>
            </div>
            <Button variant="primary" size="sm" className="mb-2" onClick={handleOpenImagesModal}>
              {t('manageImages')}
            </Button>
          </div> */}
          {/* Download Links */}
          {/* {renderDownloadLink(project.fileLinkOriginal, t('downloadOriginalFile'))}
          {renderDownloadLink(project.fileLinkFinal, t('downloadFinalFile'))} */}
          {/* Upload Final Link Button */}
          {/* {renderUploadButton(project.fileLinkFinal)} */}
          {/* Other Project Details */}
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
          <div>
      {user.role === 'branchManager' && (
        <button onClick={() => handleUpdate(projectId)} className='btn m-2 btn-info' >Update</button>
      )}

      {user.role === 'branchManager' && (
        <button onClick={() => handleDelete(projectId)} className='btn m-2 btn-danger' >Delete</button>
      )}
    </div>
        </div>
      </div>
      {/* Project Images Modal */}
      {showImagesModal && (
        <ProjectImagesModal project={project} onHide={handleCloseImagesModal} />
      )}
    </div>
  );
};

export default ProjectDetails;
