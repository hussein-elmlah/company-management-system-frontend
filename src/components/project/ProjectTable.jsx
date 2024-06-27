import React from 'react';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { deleteProject } from '../../store/slices/projectSlice';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next'; // Import useTranslation

const ProjectTable = ({ projects }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation(); // Initialize useTranslation

  const handleView = (projectId) => {
    navigate(`/projectdetails/${projectId}`);
  };

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

  return (
    <div className="table-responsive">
      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            <th>{t('planNumber')}</th>
            <th>{t('plotNumber')}</th>
            <th>{t('projectName')}</th>
            <th>{t('Status')}</th>
            <th>{t('description')}</th>
            <th>{t('ownerName')}</th>
            <th>{t('owner-mobile-number')}</th>
            <th>{t('expectedStartDate')}</th>
            <th>{t('expectedEndDate')}</th>
            <th>{t('actions')}</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>{project.plotNumber}</td>
              <td>{project.planNumber}</td>
              <td>{project.name}</td>
              <td>{project.projectStatus}</td>
              <td>{project.description}</td>
              <td>{project.owner?.fullName}</td>
              <td>{project.owner?.mobileNumber}</td>
              <td>{project.expectedStartDate}</td>
              <td>{project.expectedEndDate}</td>
              <td>
                <div className="d-flex justify-content-between">
                  <button className="btn btn-link text-primary" onClick={() => handleView(project.id)}>
                    <FaEye />
                  </button>
                  <button className="btn btn-link text-success" onClick={() => handleUpdate(project.id)} disabled={project.projectStatus === "accepted"}>
                    <FaEdit />
                  </button>
                  <button className="btn btn-link text-danger" onClick={() => handleDelete(project.id)} disabled={project.projectStatus === "accepted"}>
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;
