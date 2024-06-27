import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateProject, fetchProjectById } from '../../store/slices/projectSlice';
import FormInput from './FormInput';
import { validateForm } from './validateForm';
import { useTranslation } from 'react-i18next';
import { selectUser } from '../../store/slices/userSlice';

const UpdateProjectForm = () => {
  const { t } = useTranslation();
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const { selectedProject: project, error } = useSelector((state) => state.projects);
  const user = useSelector(selectUser);
  
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    owner: {
      fullName: '',
      mobileNumber: '',
    },
    plotNumber: '',
    planNumber: '',
    landPerimeter: '',
    landArea: '',
    program: '',
    type: '',
    numberOfFloors: '',
    buildingArea: '',
    totalBuildingArea: '',
    annex: {
      upper: false,
      land: false,
    },
    description: '',
    client: {
      user: user._id,
      fullName: user.username,
      mobileNumber: user.mobileNumber,
    },
    fileLinkOriginal: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (projectId) {
      dispatch(fetchProjectById(projectId));
    }
  }, [dispatch, projectId]);

  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name || '',
        location: project.location || '',
        owner: {
          fullName: project.owner.fullName || '',
          mobileNumber: project.owner.mobileNumber || '',
        },
        plotNumber: project.plotNumber || '',
        planNumber: project.planNumber || '',
        landPerimeter: project.landPerimeter || '',
        landArea: project.landArea || '',
        program: project.program || '',
        type: project.type || '',
        numberOfFloors: project.numberOfFloors || '',
        buildingArea: project.buildingArea || '',
        totalBuildingArea: project.totalBuildingArea || '',
        annex: {
          upper: project.annex?.upper || false,
          land: project.annex?.land || false,
        },
        description: project.description || '',
        client: {
          user: project.client.user || user._id,
          fullName: project.client.fullName || user.username,
          mobileNumber: project.client.mobileNumber || user.mobileNumber,
        },
        fileLinkOriginal: project.fileLinkOriginal || '',
      });
    }
  }, [project, user._id, user.username, user.mobileNumber]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;

    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: inputValue,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: inputValue,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      dispatch(updateProject({ projectId: projectId, updatedFields: formData }))
        .then(() => {
          console.log('Project updated successfully!');
          alert("Project updated successfully");
          setErrors({});
        })
        .catch((error) => {
          if (error.response && error.response.data && error.response.data.errors) {
            setErrors(error.response.data.errors);
          } else {
            console.error('Error updating project:', error);
          }
        });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4 p-4 bg-white shadow rounded">
      <div className="row g-3">
        <FormInput
          id="name"
          label={t('projectName')}
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          errors={errors.name}
          placeholder={t('enterProjectName')}
        />
        <FormInput
          id="location"
          label={t('projectLocation')}
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          errors={errors.location}
          placeholder={t('enterProjectLocation')}
        />
        <FormInput
          id="owner.fullName"
          label={t('ownerName')}
          type="text"
          name="owner.fullName"
          value={formData.owner.fullName}
          onChange={handleChange}
          errors={errors.owner && errors.owner.fullName}
          placeholder={t('enterOwnerName')}
        />
        <FormInput
          id="owner.mobileNumber"
          label={t('owner-mobile-number')}
          type="text"
          name="owner.mobileNumber"
          value={formData.owner.mobileNumber}
          onChange={handleChange}
          errors={errors.owner && errors.owner.mobileNumber}
          placeholder={t('enterOwnerMobileNumber')}
        />
        <FormInput
          id="plotNumber"
          label={t('plotNumber')}
          type="text"
          name="plotNumber"
          value={formData.plotNumber}
          onChange={handleChange}
          errors={errors.plotNumber}
          placeholder={t('enterPlotNumber')}
        />
        <FormInput
          id="planNumber"
          label={t('planNumber')}
          type="text"
          name="planNumber"
          value={formData.planNumber}
          onChange={handleChange}
          errors={errors.planNumber}
          placeholder={t('enterPlanNumber')}
        />
        <FormInput
          id="landPerimeter"
          label={t('landPerimeter')}
          type="text"
          name="landPerimeter"
          value={formData.landPerimeter}
          onChange={handleChange}
          errors={errors.landPerimeter}
          placeholder={t('enterLandPerimeter')}
        />
        <FormInput
          id="landArea"
          label={t('landArea')}
          type="text"
          name="landArea"
          value={formData.landArea}
          onChange={handleChange}
          errors={errors.landArea}
          placeholder={t('enterLandArea')}
        />
        <FormInput
          id="program"
          label={t('programType')}
          type="select"
          name="program"
          value={formData.program}
          onChange={handleChange}
          errors={errors.program}
          options={[
            { value: 'autocad', label: t('autocad') },
            { value: 'revit', label: t('revit') },
          ]}
        />
        <FormInput
          id="type"
          label={t('projectType')}
          type="select"
          name="type"
          value={formData.type}
          onChange={handleChange}
          errors={errors.type}
          options={[
            { value: 'villa', label: t('villa') },
            { value: 'residential', label: t('residential') },
            { value: 'commercial', label: t('commercial') },
          ]}
        />
        <FormInput
          id="numberOfFloors"
          label={t('numberOfFloors')}
          type="number"
          name="numberOfFloors"
          value={formData.numberOfFloors}
          onChange={handleChange}
          errors={errors.numberOfFloors}
          placeholder={t('enterNumberOfFloors')}
        />
        <FormInput
          id="buildingArea"
          label={t('buildingArea')}
          type="text"
          name="buildingArea"
          value={formData.buildingArea}
          onChange={handleChange}
          errors={errors.buildingArea}
          placeholder={t('enterBuildingArea')}
        />
        <FormInput
          id="totalBuildingArea"
          label={t('totalBuildingArea')}
          type="text"
          name="totalBuildingArea"
          value={formData.totalBuildingArea}
          onChange={handleChange}
          errors={errors.totalBuildingArea}
          placeholder={t('enterTotalBuildingArea')}
        />
        <div className="mb-3 form-check">
          <label className="form-check-label" htmlFor="annex.upper">
            {t('upperAnnex')}
          </label>
          <input
            type="checkbox"
            id="annex.upper"
            name="annex.upper"
            checked={formData.annex.upper}
            onChange={handleChange}
            className="form-check-input mx-2"
          />
        </div>
        <div className="mb-3 form-check">
          <label className="form-check-label" htmlFor="annex.land">
            {t('groundAnnex')}
          </label>
          <input
            type="checkbox"
            id="annex.land"
            name="annex.land"
            checked={formData.annex.land}
            onChange={handleChange}
            className="form-check-input mx-2"
          />
        </div>
        <FormInput
          id="description"
          label={t('description')}
          type="textarea"
          name="description"
          value={formData.description}
          onChange={handleChange}
          errors={errors.description}
          placeholder={t('enterProjectDescription')}
        />
      </div>

      <button type="submit" className="btn btn-primary mt-3">
        {t('updateProject')}
      </button>
    </form>
  );
};

export default UpdateProjectForm;
