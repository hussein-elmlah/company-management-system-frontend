import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProject } from '../../store/slices/projectSlice';
import FormInput from './FormInput';
import { validateForm } from './validateForm';
import { useTranslation } from 'react-i18next';
const ProjectForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.projects);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    owner: '',
    plotNumber: '',
    planNumber: '',
    landPerimeter: '',
    landArea: '',
    program: '',
    type: '',
    numberOfFloors: '',
    buildingArea: '',
    totalBuildingArea: '',
    basement: false,
    groundAnnex: false,
    description: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      dispatch(createProject(formData))
        .then(() => {
          console.log('Project created successfully!');
          setFormData({
            name: '',
            location: '',
            owner: '',
            plotNumber: '',
            planNumber: '',
            landPerimeter: '',
            landArea: '',
            program: '',
            type: '',
            numberOfFloors: '',
            buildingArea: '',
            totalBuildingArea: '',
            basement: false,
            groundAnnex: false,
            description: '',
          });
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
          label="Project Location"
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          errors={errors.location}
          placeholder="Enter project location"
        />
        <FormInput
          id="owner"
          label="Owner Name"
          type="text"
          name="owner"
          value={formData.owner}
          onChange={handleChange}
          errors={errors.owner}
          placeholder="Enter owner name"
        />
        <FormInput
          id="plotNumber"
          label="Plot Number"
          type="text"
          name="plotNumber"
          value={formData.plotNumber}
          onChange={handleChange}
          errors={errors.plotNumber}
          placeholder="Enter plot number"
        />
        <FormInput
          id="planNumber"
          label="Plan Number"
          type="text"
          name="planNumber"
          value={formData.planNumber}
          onChange={handleChange}
          errors={errors.planNumber}
          placeholder="Enter plan number"
        />
        <FormInput
          id="landPerimeter"
          label="Land Perimeter"
          type="text"
          name="landPerimeter"
          value={formData.landPerimeter}
          onChange={handleChange}
          errors={errors.landPerimeter}
          placeholder="Enter land perimeter"
        />
        <FormInput
          id="landArea"
          label="Land Area"
          type="text"
          name="landArea"
          value={formData.landArea}
          onChange={handleChange}
          errors={errors.landArea}
          placeholder="Enter land area"
        />
        <FormInput
          id="program"
          label="Program Type"
          type="select"
          name="program"
          value={formData.program}
          onChange={handleChange}
          errors={errors.program}
          options={[
            { value: 'autocad', label: 'AutoCAD' },
            { value: 'revit', label: 'Revit' },
          ]}
        />
        <FormInput
          id="type"
          label="Project Type"
          type="select"
          name="type"
          value={formData.type}
          onChange={handleChange}
          errors={errors.type}
          options={[
            { value: 'villa', label: 'Villa' },
            { value: 'residential', label: 'Residential' },
            { value: 'commercial', label: 'Commercial' },
          ]}
        />
        <FormInput
          id="numberOfFloors"
          label="Number of Floors"
          type="number"
          name="numberOfFloors"
          value={formData.numberOfFloors}
          onChange={handleChange}
          errors={errors.numberOfFloors}
          placeholder="Enter number of floors"
        />
        <FormInput
          id="buildingArea"
          label="Building Area"
          type="text"
          name="buildingArea"
          value={formData.buildingArea}
          onChange={handleChange}
          errors={errors.buildingArea}
          placeholder="Enter building area"
        />
        <FormInput
          id="totalBuildingArea"
          label="Total Building Area"
          type="text"
          name="totalBuildingArea"
          value={formData.totalBuildingArea}
          onChange={handleChange}
          errors={errors.totalBuildingArea}
          placeholder="Enter total building area"
        />
        <div className="mb-3 form-check">
          <label className="form-check-label" htmlFor="basement">
            Basement
          </label>
          <input
            type="checkbox"
            id="basement"
            name="basement"
            checked={formData.basement}
            onChange={handleChange}
            className="form-check-input"
          />
        </div>
        <div className="mb-3 form-check">
          <label className="form-check-label" htmlFor="groundAnnex">
            Ground Annex
          </label>
          <input
            type="checkbox"
            id="groundAnnex"
            name="groundAnnex"
            checked={formData.groundAnnex}
            onChange={handleChange}
            className="form-check-input"
          />
        </div>
        <FormInput
          id="description"
          label="Description"
          type="textarea"
          name="description"
          value={formData.description}
          onChange={handleChange}
          errors={errors.description}
          placeholder="Enter project description"
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary mt-3"
      >
        Create Project
      </button>
    </form>
  );
};

export default ProjectForm;
