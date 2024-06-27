// validateForm.js
export const validateForm = (formData) => {
  const errors = {};
  
  // Required fields
  if (formData.name.trim() === "") errors.name = "Project name is required.";
  if (formData.location.trim() === "") errors.location = "Project location is required.";
  if (formData.owner.fullName.trim() === "") errors.owner = "Owner name is required.";

  // Optional fields with validation
  if (formData.plotNumber && !/^[a-zA-Z0-9]+$/.test(formData.plotNumber.trim()))
    errors.plotNumber = "Plot number must be alphanumeric.";
  if (formData.planNumber && !/^[a-zA-Z0-9]+$/.test(formData.planNumber.trim()))
    errors.planNumber = "Plan number must be alphanumeric.";
  if (formData.landPerimeter && isNaN(formData.landPerimeter))
    errors.landPerimeter = "Valid land perimeter is required.";
  if (formData.landArea && isNaN(formData.landArea))
    errors.landArea = "Valid land area is required.";
  if (formData.numberOfFloors && isNaN(formData.numberOfFloors))
    errors.numberOfFloors = "Valid number of floors is required.";
  if (formData.buildingArea && isNaN(formData.buildingArea))
    errors.buildingArea = "Valid building area is required.";
  if (formData.totalBuildingArea && isNaN(formData.totalBuildingArea))
    errors.totalBuildingArea = "Valid total building area is required.";
  if (formData.description && formData.description.trim() === "")
    errors.description = "Description is required.";
  if (!formData.program) errors.program = "Program type is required.";
  if (!formData.type) errors.type = "Project type is required.";

  return errors;
};
