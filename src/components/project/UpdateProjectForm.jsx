import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProjectById, updateProject } from "../../store/slices/projectSlice";

const validateFormData = (data) => {
  const errors = {};

  if (!data.name) errors.name = "Project name is required.";
  if (!data.location) errors.location = "Project location is required.";
  if (!data.owner) errors.owner = "Owner name is required.";
  if (!data.plotNumber) errors.plotNumber = "Plot number is required.";
  if (!data.planNumber) errors.planNumber = "Plan number is required.";
  if (!data.landPerimeter || isNaN(data.landPerimeter)) errors.landPerimeter = "Valid land perimeter is required.";
  if (!data.landArea || isNaN(data.landArea)) errors.landArea = "Valid land area is required.";
  if (!data.numberOfFloors || isNaN(data.numberOfFloors)) errors.numberOfFloors = "Valid number of floors is required.";
  if (!data.buildingArea || isNaN(data.buildingArea)) errors.buildingArea = "Valid building area is required.";
  if (!data.totalBuildingArea || isNaN(data.totalBuildingArea)) errors.totalBuildingArea = "Valid total building area is required.";
  if (!data.program) errors.program = "Program is required.";
  if (!data.type) errors.type = "Type is required.";
  if (!data.description) errors.description = "Description is required.";

  return errors;
};

const UpdateProjectForm = () => {
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const navigate = useNavigate();
  const project = useSelector((state) => state.projects.projectList.find((p) => p.id === projectId));
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    owner: "",
    plotNumber: "",
    planNumber: "",
    landPerimeter: "",
    landArea: "",
    program: "autocad",
    type: "villa",
    numberOfFloors: "",
    buildingArea: "",
    totalBuildingArea: "",
    basement: false,
    groundAnnex: false,
    description: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!project) {
      dispatch(fetchProjectById(projectId));
    } else {
      setFormData(project);
    }
  }, [dispatch, projectId, project]);

  const handleChange = (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateFormData(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    dispatch(updateProject({ projectId, updatedFields: formData }))
      .then(() => {
        console.log("Project updated successfully!");
        navigate("/projects");
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.message) {
          setErrors({ ...errors, server: error.response.data.message });
        } else {
          console.error("Error updating project:", error);
          setErrors({ ...errors, general: "An error occurred while updating the project." });
        }
      });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto mt-8 p-8 bg-white rounded-lg shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Project Name
          </label>
          <input
            className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errors.name ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
            id="name"
            type="text"
            placeholder="Enter project name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
            Project Location
          </label>
          <input
            className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errors.location ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
            id="location"
            type="text"
            placeholder="Enter project location"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
          {errors.location && <p className="text-red-500 text-xs italic">{errors.location}</p>}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="owner">
            Owner Name
          </label>
          <input
            className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errors.owner ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
            id="owner"
            type="text"
            placeholder="Enter owner name"
            name="owner"
            value={formData.owner}
            onChange={handleChange}
          />
          {errors.owner && <p className="text-red-500 text-xs italic">{errors.owner}</p>}
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="plotNumber">
            Plot Number
          </label>
          <input
            className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errors.plotNumber ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
            id="plotNumber"
            type="text"
            placeholder="Enter plot number"
            name="plotNumber"
            value={formData.plotNumber}
            onChange={handleChange}
          />
          {errors.plotNumber && <p className="text-red-500 text-xs italic">{errors.plotNumber}</p>}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="planNumber">
            Plan Number
          </label>
          <input
            className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errors.planNumber ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
            id="planNumber"
            type="text"
            placeholder="Enter plan number"
            name="planNumber"
            value={formData.planNumber}
            onChange={handleChange}
          />
          {errors.planNumber && <p className="text-red-500 text-xs italic">{errors.planNumber}</p>}
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="landPerimeter">
            Land Perimeter
          </label>
          <input
            className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errors.landPerimeter ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
            id="landPerimeter"
            type="text"
            placeholder="Enter land perimeter"
            name="landPerimeter"
            value={formData.landPerimeter}
            onChange={handleChange}
          />
          {errors.landPerimeter && <p className="text-red-500 text-xs italic">{errors.landPerimeter}</p>}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="landArea">
            Land Area
          </label>
          <input
            className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errors.landArea ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
            id="landArea"
            type="text"
            placeholder="Enter land area"
            name="landArea"
            value={formData.landArea}
            onChange={handleChange}
          />
          {errors.landArea && <p className="text-red-500 text-xs italic">{errors.landArea}</p>}
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="numberOfFloors">
            Number of Floors
          </label>
          <input
            className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errors.numberOfFloors ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
            id="numberOfFloors"
            type="text"
            placeholder="Enter number of floors"
            name="numberOfFloors"
            value={formData.numberOfFloors}
            onChange={handleChange}
          />
          {errors.numberOfFloors && <p className="text-red-500 text-xs italic">{errors.numberOfFloors}</p>}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="buildingArea">
            Building Area
          </label>
          <input
            className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errors.buildingArea ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
            id="buildingArea"
            type="text"
            placeholder="Enter building area"
            name="buildingArea"
            value={formData.buildingArea}
            onChange={handleChange}
          />
          {errors.buildingArea && <p className="text-red-500 text-xs italic">{errors.buildingArea}</p>}
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="totalBuildingArea">
            Total Building Area
          </label>
          <input
            className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errors.totalBuildingArea ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
            id="totalBuildingArea"
            type="text"
            placeholder="Enter total building area"
            name="totalBuildingArea"
            value={formData.totalBuildingArea}
            onChange={handleChange}
          />
          {errors.totalBuildingArea && <p className="text-red-500 text-xs italic">{errors.totalBuildingArea}</p>}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="program">
            Program
          </label>
          <select
            className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errors.program ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
            id="program"
            name="program"
            value={formData.program}
            onChange={handleChange}
          >
            <option value="">Select program type</option>
            <option value="autocad">AutoCAD</option>
            <option value="revit">Revit</option>
          </select>
          {errors.program && <p className="text-red-500 text-xs italic">{errors.program}</p>}
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
          Project Type
          </label>
          <select
            className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errors.type ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
          ><option value="">Select project type</option>
            <option value="">Select project type</option>
            <option value="villa">Villa</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
          </select>
          {errors.type && <p className="text-red-500 text-xs italic">{errors.type}</p>}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errors.description ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
            id="description"
            placeholder="Enter project description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
          {errors.description && <p className="text-red-500 text-xs italic">{errors.description}</p>}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Basement
          </label>
          <input
            className="mr-2 leading-tight"
            type="checkbox"
            name="basement"
            checked={formData.basement}
            onChange={handleChange}
          />
          <span className="text-sm">Has basement</span>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Ground Annex
          </label>
          <input
            className="mr-2 leading-tight"
            type="checkbox"
            name="groundAnnex"
            checked={formData.groundAnnex}
            onChange={handleChange}
          />
          <span className="text-sm">Has ground annex</span>
        </div>
      </div>
      {errors.server && <p className="text-red-500 text-xs italic mb-4">{errors.server}</p>}
      {errors.general && <p className="text-red-500 text-xs italic mb-4">{errors.general}</p>}
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Update Project
        </button>
      </div>
    </form>
  );
};

export default UpdateProjectForm;
