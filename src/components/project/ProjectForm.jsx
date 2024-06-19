import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProject } from "../../store/slices/projectSlice";

const ProjectForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    clientFullName: "", 
    owner: "", 
    participatingDepartments: [], 
    annexUpper: false, 
    annexLand: false, 
    projectStatus: "untracked",
    location: "", 
    planNumber: "", 
    plotNumber: "", 
    landPerimeter: null, 
    landArea: null, 
    program: null, 
    type: null, 
    numberOfFloors: null, 
    buildingArea: null, 
    totalBuildingArea: null, 
    projectPictures: [], 
    description: "", 
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProject(formData))
      .then(() => {
        console.log("Project created successfully!");
        setFormData({
          clientFullName: "",
          owner: "",
          participatingDepartments: [],
          annexUpper: false,
          annexLand: false,
          projectStatus: "untracked",
          location: "",
          planNumber: "",
          plotNumber: "",
          landPerimeter: null,
          landArea: null,
          program: null,
          type: null,
          numberOfFloors: null,
          buildingArea: null,
          totalBuildingArea: null,
          projectPictures: [],
          description: "",
        });
      })
      .catch((error) => {
        console.error("Error creating project:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-8 shadow-md p-6 rounded-lg bg-white">
      <div className="mb-4">
        <label htmlFor="clientFullName" className="block text-sm font-medium text-gray-700">Client Full Name:</label>
        <input
          type="text"
          id="clientFullName"
          name="clientFullName"
          value={formData.clientFullName}
          onChange={handleChange}
          required
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="owner" className="block text-sm font-medium text-gray-700">Owner:</label>
        <input
          type="text"
          id="owner"
          name="owner"
          value={formData.owner}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      {/* Add more fields for other project attributes */}
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        Create Project
      </button>
    </form>
  );
};

export default ProjectForm;
