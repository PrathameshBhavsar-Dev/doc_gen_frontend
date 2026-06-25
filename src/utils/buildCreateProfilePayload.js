export const buildCreateProfilePayload = (formData) => {

  return {

    employeeId: formData.employeeId,

    employeeName: formData.employeeName,

    designation:
      formData.joiningDesignation ||
      formData.currentDesignation,

    employeeEmail: formData.employeeEmail,

    mobile: formData.mobile,

    department: formData.department,

    joiningDate: formData.joiningDate,

    company: formData.company,

    currentAddress: formData.currentAddress,

    address: formData.address,

    pan: formData.pan,

    dob: formData.dob,

    bankName: formData.bankName,

    accountNo: formData.accountNo,

    joiningCTC: formData.joiningCTC,

    salary: formData.salary,

    offerType: formData.offerType,
  };
};