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
    program: "autocad", // Default to a valid enum value
    type: "villa", // Default to a valid enum value
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
        if (error.response && error.response.data && error.response.data.errors) {
          setErrors(error.response.data.errors);
        } else {
          console.error("Error updating project:", error);
        }
      });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto mt-8">
      {/* Form structure similar to ProjectForm */}
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
            <option value="autocad">Autocad</option>
            <option value="revit">Revit</option>
          </select>
          {errors.program && <p className="text-red-500 text-xs italic">Please select a program.</p>}
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
            <option value="residential">Residential</option>
            <option value="administrative">Administrative</option>
            <option value="commercial">Commercial</option>
            <option value="other">Other</option>
          </select>
          {errors.type && <p className="text-red-500 text-xs italic">Please select a type.</p>}
        </div>
      </div>

      {/* Rest of the form fields similar to ProjectForm */}
      {/* Include all other fields in a similar manner, along with validation messages */}

      <button
        type="submit"
        className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
      >
        Update Project
      </button>
    </form>
  );
};

export default UpdateProjectForm;
