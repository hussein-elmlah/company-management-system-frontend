import React, { useState } from 'react';
import { createProject } from '../../store/slices/projectSlice';
import FormInput from './FormInput';
import { validateForm } from './validateForm';
import { useTranslation } from 'react-i18next';
import '../../i18n';
import { selectUser } from "../../store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

const ProjectForm = () => {
  const { t } = useTranslation();
  const user = useSelector(selectUser);
  console.log("user from project form: ", user);
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.projects);
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
  });
  const [errors, setErrors] = useState({});

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
      dispatch(createProject(formData))
        .then(() => {
          console.log('Project created successfully!');
          alert('Project created successfully');
          setFormData({
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
          });
          console.log('form data:', formData);
          setErrors({});
        })
        .catch((error) => {
          if (error.response && error.response.data && error.response.data.errors) {
            setErrors(error.response.data.errors);
          } else {
            console.error('Error creating project:', error);
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
            className="form-check-input"
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
            className="form-check-input"
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
      <button
        type="submit"
        className="btn btn-primary mt-3"
      >
        {t('createProject')}
      </button>
    </form>
  );
};

export default ProjectForm;
