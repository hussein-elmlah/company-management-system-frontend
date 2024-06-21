import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProject } from "../../store/slices/projectSlice";

const ProjectForm = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.projects);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    owner: "",
    plotNumber: "",
    planNumber: "",
    landPerimeter: "",
    landArea: "",
    program: "",
    type: "",
    numberOfFloors: "",
    buildingArea: "",
    totalBuildingArea: "",
    basement: false,
    groundAnnex: false,
    description: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Project name is required.";
    if (!formData.location) newErrors.location = "Project location is required.";
    if (!formData.owner) newErrors.owner = "Owner name is required.";
    if (!formData.plotNumber || !/^[a-zA-Z0-9]+$/.test(formData.plotNumber))
      newErrors.plotNumber = "Plot number is required and must be alphanumeric.";
    if (!formData.planNumber || !/^[a-zA-Z0-9]+$/.test(formData.planNumber))
      newErrors.planNumber = "Plan number is required and must be alphanumeric.";
    if (!formData.landPerimeter) newErrors.landPerimeter = "Land perimeter is required.";
    if (!formData.landArea) newErrors.landArea = "Land area is required.";
    if (!formData.program) newErrors.program = "Program type is required.";
    if (!formData.type) newErrors.type = "Project type is required.";
    if (!formData.numberOfFloors || isNaN(formData.numberOfFloors))
      newErrors.numberOfFloors = "Number of floors is required and must be a number.";
    if (!formData.buildingArea) newErrors.buildingArea = "Building area is required.";
    if (!formData.totalBuildingArea) newErrors.totalBuildingArea = "Total building area is required.";
    if (formData.basement === "") newErrors.basement = "Basement selection is required.";
    if (formData.groundAnnex === "") newErrors.groundAnnex = "Ground annex selection is required.";
    if (!formData.description) newErrors.description = "Description is required.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(createProject(formData))
        .then(() => {
          console.log("Project created successfully!");
          setFormData({
            name: "",
            location: "",
            owner: "",
            plotNumber: "",
            planNumber: "",
            landPerimeter: "",
            landArea: "",
            program: "",
            type: "",
            numberOfFloors: "",
            buildingArea: "",
            totalBuildingArea: "",
            basement: false,
            groundAnnex: false,
            description: "",
          });
          setErrors({});
        })
        .catch((error) => {
          if (error.response && error.response.data && error.response.data.errors) {
            setErrors(error.response.data.errors);
          } else {
            console.error("Error creating project:", error);
          }
        });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <div className="grid grid-cols-2 gap-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Project Name
          </label>
          <input
            className={`shadow appearance-none border ${errors.name ? "border-red-500" : "border-gray-200"} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            id="name"
            type="text"
            placeholder="Enter project name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
            Project Location
          </label>
          <input
            className={`shadow appearance-none border ${errors.location ? "border-red-500" : "border-gray-200"} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            id="location"
            type="text"
            placeholder="Enter project location"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
          {errors.location && <p className="text-red-500 text-xs italic">{errors.location}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="owner">
            Owner Name
          </label>
          <input
            className={`shadow appearance-none border ${errors.owner ? "border-red-500" : "border-gray-200"} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            id="owner"
            type="text"
            placeholder="Enter owner name"
            name="owner"
            value={formData.owner}
            onChange={handleChange}
          />
          {errors.owner && <p className="text-red-500 text-xs italic">{errors.owner}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="plotNumber">
            Plot Number
          </label>
          <input
            className={`shadow appearance-none border ${errors.plotNumber ? "border-red-500" : "border-gray-200"} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            id="plotNumber"
            type="text"
            placeholder="Enter plot number"
            name="plotNumber"
            value={formData.plotNumber}
            onChange={handleChange}
          />
          {errors.plotNumber && <p className="text-red-500 text-xs italic">{errors.plotNumber}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="planNumber">
            Plan Number
          </label>
          <input
            className={`shadow appearance-none border ${errors.planNumber ? "border-red-500" : "border-gray-200"} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            id="planNumber"
            type="text"
            placeholder="Enter plan number"
            name="planNumber"
            value={formData.planNumber}
            onChange={handleChange}
          />
          {errors.planNumber && <p className="text-red-500 text-xs italic">{errors.planNumber}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="landPerimeter">
            Land Perimeter
          </label>
          <input
            className={`shadow appearance-none border ${errors.landPerimeter ? "border-red-500" : "border-gray-200"} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            id="landPerimeter"
            type="text"
            placeholder="Enter land perimeter"
            name="landPerimeter"
            value={formData.landPerimeter}
            onChange={handleChange}
          />
          {errors.landPerimeter && <p className="text-red-500 text-xs italic">{errors.landPerimeter}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="landArea">
            Land Area
          </label>
          <input
            className={`shadow appearance-none border ${errors.landArea ? "border-red-500" : "border-gray-200"} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            id="landArea"
            type="text"
            placeholder="Enter land area"
            name="landArea"
            value={formData.landArea}
            onChange={handleChange}
          />
          {errors.landArea && <p className="text-red-500 text-xs italic">{errors.landArea}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="program">
            Program Type
          </label>
          <select
            className={`shadow appearance-none border ${errors.program ? "border-red-500" : "border-gray-200"} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
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
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
            Project Type
          </label>
          <select
            className={`shadow appearance-none border ${errors.type ? "border-red-500" : "border-gray-200"} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="">Select project type</option>
            <option value="villa">Villa</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
          </select>
          {errors.type && <p className="text-red-500 text-xs italic">{errors.type}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="numberOfFloors">
            Number of Floors
          </label>
          <input
            className={`shadow appearance-none border ${errors.numberOfFloors ? "border-red-500" : "border-gray-200"} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            id="numberOfFloors"
            type="number"
            placeholder="Enter number of floors"
            name="numberOfFloors"
            value={formData.numberOfFloors}
            onChange={handleChange}
          />
          {errors.numberOfFloors && <p className="text-red-500 text-xs italic">{errors.numberOfFloors}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="buildingArea">
            Building Area
          </label>
          <input
            className={`shadow appearance-none border ${errors.buildingArea ? "border-red-500" : "border-gray-200"} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            id="buildingArea"
            type="text"
            placeholder="Enter building area"
            name="buildingArea"
            value={formData.buildingArea}
            onChange={handleChange}
          />
          {errors.buildingArea && <p className="text-red-500 text-xs italic">{errors.buildingArea}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="totalBuildingArea">
            Total Building Area
          </label>
          <input
            className={`shadow appearance-none border ${errors.totalBuildingArea ? "border-red-500" : "border-gray-200"} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            id="totalBuildingArea"
            type="text"
            placeholder="Enter total building area"
            name="totalBuildingArea"
            value={formData.totalBuildingArea}
            onChange={handleChange}
          />
          {errors.totalBuildingArea && <p className="text-red-500 text-xs italic">{errors.totalBuildingArea}</p>}
        </div>
        <div className="mb-4 col-span-2">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Basement
          </label>
          <div className="flex items-center">
            <input
              className="mr-2 leading-tight"
              type="radio"
              id="basementYes"
              name="basement"
              value={true}
              onChange={handleChange}
            />
            <label className="text-gray-700 text-sm font-bold" htmlFor="basementYes">
              Yes
            </label>
            <input
              className="ml-4 mr-2 leading-tight"
              type="radio"
              id="basementNo"
              name="basement"
              value={false}
              onChange={handleChange}
              defaultChecked
            />
            <label className="text-gray-700 text-sm font-bold" htmlFor="basementNo">
              No
            </label>
          </div>
          {errors.basement && <p className="text-red-500 text-xs italic">{errors.basement}</p>}
        </div>
        <div className="mb-4 col-span-2">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Ground Annex
          </label>
          <div className="flex items-center">
            <input
              className="mr-2 leading-tight"
              type="radio"
              id="groundAnnexYes"
              name="groundAnnex"
              value={true}
              onChange={handleChange}
            />
            <label className="text-gray-700 text-sm font-bold" htmlFor="groundAnnexYes">
              Yes
            </label>
            <input
              className="ml-4 mr-2 leading-tight"
              type="radio"
              id="groundAnnexNo"
              name="groundAnnex"
              value={false}
              defaultChecked
              onChange={handleChange}
            />
            <label className="text-gray-700 text-sm font-bold" htmlFor="groundAnnexNo">
              No
            </label>
          </div>
          {errors.groundAnnex && <p className="text-red-500 text-xs italic">{errors.groundAnnex}</p>}
        </div>
        <div className="mb-4 col-span-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            className={`shadow appearance-none border ${errors.description ? "border-red-500" : "border-gray-200"} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            id="description"
            placeholder="Enter project description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          {errors.description && <p className="text-red-500 text-xs italic">{errors.description}</p>}
        </div>
        <div className="flex items-center justify-between col-span-2">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Create Project
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProjectForm;
