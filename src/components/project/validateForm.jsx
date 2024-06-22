// validateForm.js
export const validateForm = (formData) => {
    const errors = {};
    if (!formData.name) errors.name = "Project name is required.";
    if (!formData.location) errors.location = "Project location is required.";
    if (!formData.owner) errors.owner = "Owner name is required.";
    if (!formData.plotNumber || !/^[a-zA-Z0-9]+$/.test(formData.plotNumber))
      errors.plotNumber = "Plot number is required and must be alphanumeric.";
    if (!formData.planNumber || !/^[a-zA-Z0-9]+$/.test(formData.planNumber))
      errors.planNumber = "Plan number is required and must be alphanumeric.";
    if (!formData.landPerimeter || isNaN(formData.landPerimeter))
      errors.landPerimeter = "Valid land perimeter is required.";
    if (!formData.landArea || isNaN(formData.landArea))
      errors.landArea = "Valid land area is required.";
    if (!formData.numberOfFloors || isNaN(formData.numberOfFloors))
      errors.numberOfFloors = "Valid number of floors is required.";
    if (!formData.buildingArea || isNaN(formData.buildingArea))
      errors.buildingArea = "Valid building area is required.";
    if (!formData.totalBuildingArea || isNaN(formData.totalBuildingArea))
      errors.totalBuildingArea = "Valid total building area is required.";
    if (!formData.program) errors.program = "Program type is required.";
    if (!formData.type) errors.type = "Project type is required.";
    if (!formData.description) errors.description = "Description is required.";
  
    return errors;
  };
  