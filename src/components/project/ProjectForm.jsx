import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProject } from "../../store/slices/projectSlice";

const ProjectForm = () => {
  const dispatch = useDispatch();
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
    buildingArea: "",
    numberOfFloors: "",
    totalBuildingArea: "",
    basement: false,
    groundAnnex: false,
    description: "",
  });

  const handleChange = (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
          buildingArea: "",
          numberOfFloors: "",
          totalBuildingArea: "",
          basement: false,
          groundAnnex: false,
          description: "",
        });
      })
      .catch((error) => {
        console.error("Error creating project:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-8">
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Project Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 block w-full sm:text-sm border-2 py-2 px-3"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
          Project Location:
        </label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
          className="border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 block w-full sm:text-sm border-2 py-2 px-3"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="owner" className="block text-sm font-medium text-gray-700 mb-1">
          Owner Name:
        </label>
        <input
          type="text"
          id="owner"
          name="owner"
          value={formData.owner}
          onChange={handleChange}
          className="border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 block w-full sm:text-sm border-2 py-2 px-3"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="plotNumber" className="block text-sm font-medium text-gray-700 mb-1">
          Plot Number:
        </label>
        <input
          type="text"
          id="plotNumber"
          name="plotNumber"
          value={formData.plotNumber}
          onChange={handleChange}
          className="border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 block w-full sm:text-sm border-2 py-2 px-3"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="planNumber" className="block text-sm font-medium text-gray-700 mb-1">
          Plan Number:
        </label>
        <input
          type="text"
          id="planNumber"
          name="planNumber"
          value={formData.planNumber}
          onChange={handleChange}
          className="border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 block w-full sm:text-sm border-2 py-2 px-3"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="landPerimeter" className="block text-sm font-medium text-gray-700 mb-1">
          Land Perimeter:
        </label>
        <input
          type="text"
          id="landPerimeter"
          name="landPerimeter"
          value={formData.landPerimeter}
          onChange={handleChange}
          className="border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 block w-full sm:text-sm border-2 py-2 px-3"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="landArea" className="block text-sm font-medium text-gray-700 mb-1">
          Land Area:
        </label>
        <input
          type="text"
          id="landArea"
          name="landArea"
          value={formData.landArea}
          onChange={handleChange}
          className="border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 block w-full sm:text-sm border-2 py-2 px-3"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="program" className="block text-sm font-medium text-gray-700 mb-1">
          Program Type:
        </label>
        <input
          type="text"
          id="program"
          name="program"
          value={formData.program}
          onChange={handleChange}
          className="border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 block w-full sm:text-sm border-2 py-2 px-3"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
          Project Type:
        </label>
        <input
          type="text"
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 block w-full sm:text-sm border-2 py-2 px-3"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="buildingArea" className="block text-sm font-medium text-gray-700 mb-1">
          Building Area:
        </label>
        <input
          type="text"
          id="buildingArea"
          name="buildingArea"
          value={formData.buildingArea}
          onChange={handleChange}
          className="border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 block w-full sm:text-sm border-2 py-2 px-3"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="numberOfFloors" className="block text-sm font-medium text-gray-700 mb-1">
          Number of Floors:
        </label>
        <input
          type="number"
          id="numberOfFloors"
          name="numberOfFloors"
          value={formData.numberOfFloors}
          onChange={handleChange}
          className="border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 block w-full sm:text-sm border-2 py-2 px-3"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="totalBuildingArea" className="block text-sm font-medium text-gray-700 mb-1">
          Total Building Areas:
        </label>
        <input
          type="text"
          id="totalBuildingArea"
          name="totalBuildingArea"
          value={formData.totalBuildingArea}
          onChange={handleChange}
          className="border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 block w-full sm:text-sm border-2 py-2 px-3"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Basement:
        </label>
        <div>
          <input
            type="radio"
            id="basement-yes"
            name="basement"
            value="true"
            checked={formData.basement === true}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="basement-yes" className="mr-4">Yes</label>
          <input
            type="radio"
            id="basement-no"
            name="basement"
            value="false"
            checked={formData.basement === false}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="basement-no">No</label>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Ground Annex:
        </label>
        <div>
          <input
            type="radio"
            id="groundAnnex-yes"
            name="groundAnnex"
            value="true"
            checked={formData.groundAnnex === true}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="groundAnnex-yes" className="mr-4">Yes</label>
          <input
            type="radio"
            id="groundAnnex-no"
            name="groundAnnex"
            value="false"
            checked={formData.groundAnnex === false}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="groundAnnex-no">No</label>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Project Description:
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className="border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 block w-full sm:text-sm border-2 py-2 px-3"
        ></textarea>
      </div>
      <button type="submit" className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
        Add Project
      </button>
    </form>
  );
};

export default ProjectForm;
