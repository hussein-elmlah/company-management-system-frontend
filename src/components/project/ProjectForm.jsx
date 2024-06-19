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
    numberOfFloors: "",
    buildingArea: "",
    totalBuildingArea: "",
    basement: false,
    groundAnnex: false,
    description: "",
  });
  const [errors, setErrors] = useState({});

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
        setErrors({});
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.errors) {
          setErrors(error.response.data.errors);
        } else {
          console.error("Error creating project:", error);
        }
      });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto mt-8">
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
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
          {errors.location && <p className="text-red-500 text-xs italic">Please fill out this field.</p>}
        </div>
        <div className="w-full md:w-1/2 px-3">
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
          {errors.owner && <p className="text-red-500 text-xs italic">Please fill out this field.</p>}
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
          {errors.plotNumber && <p className="text-red-500 text-xs italic">Please fill out this field.</p>}
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
          {errors.planNumber && <p className="text-red-500 text-xs italic">Please fill out this field.</p>}
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
          {errors.landPerimeter && <p className="text-red-500 text-xs italic">Please fill out this field.</p>}
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
          {errors.landArea && <p className="text-red-500 text-xs italic">Please fill out this field.</p>}
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="program">
            Program Type
          </label>
          <select
            className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errors.program ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
            id="program"
            name="program"
            value={formData.program}
            onChange={handleChange}
          >
            <option value="">Select program type</option>
            <option value="autocad">AutoCAD</option>
            <option value="revit">Revit</option>
          </select>
          {errors.program && <p className="text-red-500 text-xs italic">Please select a program type.</p>}
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="type">
            Project Type
          </label>
          <select
            className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errors.type ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="">Select project type</option>
            <option value="villa">Villa</option>
            <option value="residential">Residential</option>
            <option value="administrative">Administrative</option>
            <option value="commercial">Commercial</option>
            <option value="other">Other</option>
          </select>
          {errors.type && <p className="text-red-500 text-xs italic">Please select a project type.</p>}
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
          {errors.numberOfFloors && <p className="text-red-500 text-xs italic">Please fill out this field.</p>}
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="buildingArea">
            Building Area
          </label>
          <input
            className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errors.buildingArea ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
            id="buildingArea"
            type="number"
            placeholder="Enter building area"
            name="buildingArea"
            value={formData.buildingArea}
            onChange={handleChange}
          />
          {errors.buildingArea && <p className="text-red-500 text-xs italic">Please fill out this field.</p>}
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
            type="number"
            placeholder="Enter total building area"
            name="totalBuildingArea"
            value={formData.totalBuildingArea}
            onChange={handleChange}
          />
          {errors.totalBuildingArea && <p className="text-red-500 text-xs italic">Please fill out this field.</p>}
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Basement</label>
          <div>
            <input
              type="radio"
              id="basement-yes"
              name="basement"
              value={true}
              checked={formData.basement === true}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="basement-yes" className="mr-4">
              Yes
            </label>
            <input
              type="radio"
              id="basement-no"
              name="basement"
              value={false}
              checked={formData.basement === false}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="basement-no">No</label>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Ground Annex</label>
          <div>
            <input
              type="radio"
              id="groundAnnex-yes"
              name="groundAnnex"
              value={true}
              checked={formData.groundAnnex === true}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="groundAnnex-yes" className="mr-4">
              Yes
            </label>
            <input
              type="radio"
              id="groundAnnex-no"
              name="groundAnnex"
              value={false}
              checked={formData.groundAnnex === false}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="groundAnnex-no">No</label>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="description">
          Project Description
        </label>
        <textarea
          className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errors.description ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
          id="description"
          name="description"
          placeholder="Enter project description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
        ></textarea>
        {errors.description && <p className="text-red-500 text-xs italic">Please fill out this field.</p>}
      </div>

      <button
        type="submit"
        className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
      >
        Add Project
      </button>
    </form>
  );
};

export default ProjectForm;
