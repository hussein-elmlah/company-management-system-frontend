 







import  { useState, useEffect } from 'react';
import axiosInstance from '../../axios/config';
// import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { FaProjectDiagram, FaUser, FaPhone, FaInfoCircle, FaCalendarAlt } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const ProjectAcceptance = () => {
    const { id } = useParams(); 
  const [project, setProject] = useState(null);
  const { t } = useTranslation();
//   const [hours, setHours] = useState({});
//   const [seniorEmployees, setSeniorEmployees] = useState({});
//   const [employees, setEmployees] = useState({});

  useEffect(() => {
    const fetchProject = async () => {
      const response = await axiosInstance.get(`/projects/${id}`);
      setProject(response.data);
    //   setHours(response.data.hoursExpectedPerDepartment || {});
    };
    fetchProject();
  }, [id]);

  

//   const handleAccept = async () => {
//     await axiosInstance.put(`/projects/${project.id} `, {
//     //   hoursExpectedPerDepartment: hours,
//     //   seniorEmployees,
//     projectStatus: 'tracked',
//     });
    
//     alert('Project accepted');
//   };

//   const handleReject = async () => {
//     await axiosInstance.put(`/projects/${project.id} `, {
//         //   hoursExpectedPerDepartment: hours,
//         //   seniorEmployees,
//         projectStatus: 'untracked',
//         });
//     alert('Project rejected');
//   };



  const handleAccept = async () => {
    try {
      const response = await axiosInstance.put(`/projects/${id}`, {
        projectStatus: 'accepted',
        
      });
      setProject(response.data);  
      alert('Project accepted');
    } catch (error) {
      console.error('Error accepting project:', error);
    }
  };

  const handleReject = async () => {
    try {
      const response = await axiosInstance.put(`/projects/${id}`, {
        projectStatus: 'rejected'
      });
      setProject(response.data);  
      alert('Project rejected');
    } catch (error) {
      console.error('Error rejecting project:', error);
    }
  };








  if (!project) return <div>Loading...</div>;

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

// ProjectAcceptance.propTypes = {
//   match: PropTypes.shape({
//     params: PropTypes.shape({
//       id: PropTypes.string.isRequired,
//     }).isRequired,
//   }).isRequired,
// };

// Define the getEmployeesOfDepartment function here
// const getEmployeesOfDepartment = async (departmentId) => {
//   try {
//     const response = await axiosInstance.get(`/departments/${departmentId}/employees`);
//     return response.data; // Assuming the API response contains the array of employees
//   } catch (error) {
//     console.error(`Error fetching employees for department ${departmentId}:`, error);
//     return [];
//   }
// };

export default ProjectAcceptance;










 