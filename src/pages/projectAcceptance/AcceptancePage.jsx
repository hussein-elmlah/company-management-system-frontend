 


import   { useState, useEffect } from 'react';
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
  const [ownerName, setOwnerName] = useState('');
  const [expectedStartDate, setExpectedStartDate] = useState('');
  const [expectedCompletionDate, setExpectedCompletionDate] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');

  useEffect(() => {
    const fetchOwnerName = async (ownerId) => {
      try {
        const response = await axiosInstance.get(`/users/${ownerId}`);
        setOwnerName(response.data.user.firstName + ' ' + response.data.user.lastName);
      } catch (error) {
        console.error('Error fetching owner name:', error);
      }
    };

    if (project && project.owner) {
      fetchOwnerName(project.owner);
    }

    if (project) {
      setExpectedStartDate(project.expectedStartDate ? project.expectedStartDate.split('T')[0] : '');
      setExpectedCompletionDate(project.expectedCompletionDate ? project.expectedCompletionDate.split('T')[0] : '');
    }
  }, [project]);

  useEffect(() => {
    dispatch(fetchProjectById(id));
  }, [id, dispatch]);

  const handleAccept = async () => {
    try {
      await dispatch(updateProject({ projectId: id, updatedFields: { projectStatus: 'accepted' } }));
      dispatch(fetchProjectById(id));
      setAlertMessage('Project accepted successfully.');
      setAlertType('success');
    } catch (error) {
      console.error('Error accepting project:', error);
      setAlertMessage('Error accepting project.');
      setAlertType('danger');
    }
  };

  const handleReject = async () => {
    try {
      await dispatch(updateProject({ projectId: id, updatedFields: { projectStatus: 'rejected' } }));
      dispatch(fetchProjectById(id));
      setAlertMessage('Project rejected successfully.');
      setAlertType('success');
    } catch (error) {
      console.error('Error rejecting project:', error);
      setAlertMessage('Error rejecting project.');
      setAlertType('danger');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateProject({ 
        projectId: id, 
        updatedFields: { 
          expectedStartDate, 
          expectedCompletionDate 
        } 
      }));
      dispatch(fetchProjectById(id));
      setAlertMessage('Project dates updated successfully.');
      setAlertType('success');
    } catch (error) {
      console.error('Error updating project dates:', error);
      setAlertMessage('Error updating project dates.');
      setAlertType('danger');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!project) return <div>No project found</div>;

  return (
    <div className="container mt-4">
      {alertMessage && (
        <div className={`alert alert-${alertType} alert-dismissible fade show`} role="alert">
          {alertMessage}
          <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}
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
              <p>{ownerName}</p>
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
          <div className="row mb-3">
            <div className="col-md-6">
              <div className="d-flex align-items-center">
                <FaCalendarAlt className="text-muted mr-2" />
                <p className="text-muted small mb-0">{t('expectedStartDate')}: {expectedStartDate ? new Date(expectedStartDate).toLocaleDateString() : 'N/A'}</p>
              </div>
              <input 
                type="date" 
                id="expectedStartDate" 
                className="form-control" 
                value={expectedStartDate} 
                onChange={(e) => setExpectedStartDate(e.target.value)} 
              />
            </div>
            <div className="col-md-6">
              <div className="d-flex align-items-center">
                <FaCalendarAlt className="text-muted mr-2" />
                <p className="text-muted small mb-0">{t('expectedCompletionDate')}: {expectedCompletionDate ? new Date(expectedCompletionDate).toLocaleDateString() : 'N/A'}</p>
              </div>
              <input 
                type="date" 
                id="expectedCompletionDate" 
                className="form-control" 
                value={expectedCompletionDate} 
                onChange={(e) => setExpectedCompletionDate(e.target.value)} 
              />
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <button type="submit" className="btn btn-primary mb-3">Update Dates</button>
          </form>
          <button className="btn btn-success mr-2" onClick={handleAccept}>Accept Project</button>
          <button className="btn btn-danger" onClick={handleReject}>Reject Project</button>
        </div>
      </div>
    </div>
  );
};

export default ProjectAcceptance;

