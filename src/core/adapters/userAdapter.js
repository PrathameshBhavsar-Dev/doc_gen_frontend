export const buildCreateProfilePayload = (formData) => {
  return {
    employeeId: formData.employeeId,
    employeeName: formData.employeeName,
    designation: formData.designation,
  };
};