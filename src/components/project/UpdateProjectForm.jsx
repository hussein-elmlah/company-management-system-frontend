import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjectById, updateProject } from "../../store/slices/projectSlice";
import { useParams, useNavigate } from "react-router-dom";

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
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto mt-8">
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
            Project Name
          </label>
          <input
            className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errors.name ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
            id="name"
            type="text"
            placeholder="Enter project name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="location">
            Project Location
          </label>
          <input
            className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errors.location ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
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
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="owner">
            Owner Name
          </label>
          <input
            className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errors.owner ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
            id="owner"
            type="text"
            placeholder="Enter owner name"
            name="owner"
            value={formData.owner}
            onChange={handleChange}
          />
          {errors.owner && <p className="text-red-500 text-xs italic">{errors.owner}</p>}
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="plotNumber">
            Plot Number
          </label>
          <input
            className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errors.plotNumber ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
            id="plotNumber"
            type="text"
            placeholder="Enter plot number"
            name="plotNumber"
            value={formData.plotNumber}
            onChange={handleChange}
          />
          {errors.plotNumber && <p className="text-red-500 text-xs italic">{errors.plotNumber}</p>}
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="planNumber">
            Plan Number
          </label>
          <input
            className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errors.planNumber ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
            id="planNumber"
            type="text"
            placeholder="Enter plan number"
            name="planNumber"
            value={formData.planNumber}
            onChange={handleChange}
          />
          {errors.planNumber && <p className="text-red-500 text-xs italic">{errors.planNumber}</p>}
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="landPerimeter">
            Land Perimeter
          </label>
          <input
            className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errors.landPerimeter ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
            id="landPerimeter"
            type="text"
            placeholder="Enter land perimeter"
            name="landPerimeter"
            value={formData.landPerimeter}
            onChange={handleChange}
          />
          {errors.landPerimeter && <p className="text-red-500 text-xs italic">{errors.landPerimeter}</p>}
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="landArea">
            Land Area
          </label>
          <input
            className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errors.landArea ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
            id="landArea"
            type="text"
            placeholder="Enter land area"
            name="landArea"
            value={formData.landArea}
            onChange={handleChange}
          />
          {errors.landArea && <p className="text-red-500 text-xs italic">{errors.landArea}</p>}
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="program">
            Program
          </label>
          <select
            className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errors.program ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
            id="program"
            name="program"
            value={formData.program}
            onChange={handleChange}
          >
            <option value="autocad">AutoCAD</option>
            <option value="revit">Revit</option>
            <option value="archicad">ArchiCAD</option>
          </select>
          {errors.program && <p className="text-red-500 text-xs italic">{errors.program}</p>}
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="type">
            Type
          </label>
          <select
            className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errors.type ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="villa">Villa</option>
            <option value="apartment">Apartment</option>
            <option value="office">Office</option>
          </select>
          {errors.type && <p className="text-red-500 text-xs italic">{errors.type}</p>}
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="numberOfFloors">
            Number of Floors
          </label>
          <input
            className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errors.numberOfFloors ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
            id="numberOfFloors"
            type="number"
            placeholder="Enter number of floors"
            name="numberOfFloors"
            value={formData.numberOfFloors}
            onChange={handleChange}
          />
          {errors.numberOfFloors && <p className="text-red-500 text-xs italic">{errors.numberOfFloors}</p>}
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="buildingArea">
            Building Area
          </label>
          <input
            className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errors.buildingArea ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
            id="buildingArea"
            type="text"
            placeholder="Enter building area"
            name="buildingArea"
            value={formData.buildingArea}
            onChange={handleChange}
          />
          {errors.buildingArea && <p className="text-red-500 text-xs italic">{errors.buildingArea}</p>}
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="totalBuildingArea">
            Total Building Area
          </label>
          <input
            className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errors.totalBuildingArea ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
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
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errors.description ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
            id="description"
            placeholder="Enter project description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          {errors.description && <p className="text-red-500 text-xs italic">{errors.description}</p>}
        </div>
      </div>
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
