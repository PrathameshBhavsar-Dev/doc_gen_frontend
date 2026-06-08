export const normalizeTemplateKey = (template) => {
  if (!template) return "";

  const normalized = template
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .replace(/[\s\-]+/g, "_")
    .toLowerCase();

  // ✅ Fix missing suffix cases
  const map = {
    internshipcertificate: "internship_certificate",
    internship_certificate: "internship_certificate",
    salaryslip: "salaryslip_letter",
    salary_slip: "salaryslip_letter",
    offer: "offer_letter",
    increment: "increment_letter",
    appointment: "appointment_letter",
    confirmation: "confirmation_letter",
    experience: "experience_letter",
    relieving: "relieving_letter",
    fullandfinal: "fullandfinal_letter",
  };

  return map[normalized] || normalized;
};

// if (baseData?.documentData?.INTERNSHIP_CERTIFICATE) {
//   const internship =
//     baseData.documentData.INTERNSHIP_CERTIFICATE;

//   freshData.internshipType = internship.internshipType;
//   freshData.startDate = internship.startDate;
//   freshData.endDate = internship.endDate;
//   freshData.issueDate = internship.issueDate;
// }

export const buildPayload = (
  key,
  previewData = {},
  user = {},
  previewCompany = {},
) => {
  const base = {
    company: previewCompany?.name,
    // issuedTo: user?.id,
    // employeeId: user.id,
    employeeId: previewData.employeeId,
    employeeName: previewData.employeeName,
    employeeEmail: previewData.employeeEmail,
    employeeNumber: previewData.employeeNumber || "EMP001",
    title: previewData.title || previewData.mrms,

    issuedTo: previewData.employeeId,
    issuedBy: user?._id,

    pfType:
      previewData.pfType === "withPF"
        ? "WITH_PF"
        : "WITHOUT_PF",
  };

  const validSalaryTypes = ["withPF", "withoutPF"];

  const payloadBuilders = {
    salaryslip_letter: () => ({
      ...base,
      title: previewData.mrms,
      designation: previewData.position || "Employee",
      totalSalary: Number(previewData.salary) || 0,
      doj: previewData.joiningDate || new Date(),
      salaryType: validSalaryTypes.includes(previewData.salaryType)
        ? previewData.salaryType
        : "withPF",
      department: previewData.department || "",
      pan: previewData.pan || "",
      gender: previewData.gender || "Other",
      workdays: previewData.workdays || 22,
      dob: previewData.dob || "1990-01-01",
      mode: previewData.mode || "Bank Transfer",
      accountNo: previewData.accountNo || "",
      month:
        previewData.month ||
        new Date().toLocaleString("default", { month: "long" }),
    }),

    offer_letter: () => ({
      ...base,
      title: previewData.mrms || previewData.title || "Mr/Ms",
      position: previewData.position || previewData.designation,
      department: previewData.department || "General",
      employmentType: previewData.appointmentType || "Full-time",
      salary: Number(previewData.salary) || 0,
      location: previewData.location || "Pune",
      offerValidTill:
        previewData.offerValidTill ||
        new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      offerType: previewData.offerType || "withPF",
      joiningDate: previewData.joiningDate,
      issueDate: previewData.issueDate,
    }),

    appointment_letter: () => ({
      ...base,
      title: previewData.mrms,
      position: previewData.position || previewData.designation,
      department: previewData.department || "General",
      joiningDate: previewData.joiningDate,
      issueDate: previewData.issueDate,
      salary: Number(previewData.salary) || 0,
      address: previewData.address || "",
      probationPeriod: previewData.probationPeriod || "3 months",
      workLocation: previewData.workLocation || previewData.location || "Pune",
      appointmentType: previewData.appointmentType || "Full-time",
    }),

    confirmation_letter: () => ({
      ...base,
      title: previewData.mrms,
      employeeEmail: previewData.employeeEmail,
      employeePhone: previewData.employeePhone,
      effectiveDate: previewData.effectiveDate,
      issueDate: previewData.issueDate,
      totalSalary: Number(previewData.totalSalary) || 0,
      address: previewData.address || "",
      position: previewData.position,
      department: previewData.department || "",
      confirmationType: previewData.confirmationType || "withPF",
    }),

    increment_letter: () => ({
      ...base,
      title: previewData.mrms,
      department: previewData.department || "",
      performanceYear:
        Number(previewData.performanceYear) || new Date().getFullYear(),
      newCTC: Number(previewData.newCTC) || 0,
      incrementPercentage: previewData.incrementPercentage
        ? Number(previewData.incrementPercentage)
        : undefined,
      effectiveDate: previewData.effectiveDate,
      issueDate: previewData.issueDate,
      incrementType: previewData.incrementType || "withPF",
    }),

    experience_letter: () => ({
      ...base,
      title: previewData.mrms,
      designation:
        previewData.position || previewData.designation || "Employee",
      department: previewData.department || "",
      joiningDate: previewData.joiningDate,
      relievingDate: previewData.lastWorkingDay || previewData.relievingDate,
      issueDate: previewData.issueDate,
    }),

    relieving_letter: () => ({
      ...base,
      title: previewData.mrms,
      designation: previewData.designation || "Employee",
      department: previewData.department || "",
      joiningDate: previewData.joiningDate,
      lastWorkingDay: previewData.lastWorkingDay,
      noticePeriod: previewData.noticePeriod || "",
      handoverStatus: previewData.handoverStatus || "Not Applicable",
      issueDate: previewData.issueDate,
    }),

    internshipcertificate_letter: () => ({
      ...base,
      title: previewData.mrms,
      designation: previewData.designation || "Intern",
      address: previewData.address || "",
      internshipType: previewData.internshipType || "unpaid",
      stipend: Number(previewData.stipend) || 0,
      startDate: previewData.startDate,
      endDate: previewData.endDate,
      issueDate: previewData.issueDate,
    }),

    completion_certificate: () => ({
      ...base,
      title: previewData.mrms,
      designation: previewData.designation || "Intern",
      department: previewData.department || "",
      projectName: previewData.projectName || "",
      startDate: previewData.startDate,
      completionDate: previewData.completionDate,
      roleinProject: previewData.roleinProject || previewData.role || "",
      technologies: Array.isArray(previewData.technologies)
        ? previewData.technologies
        : typeof previewData.technologies === "string"
          ? previewData.technologies.split(",").map((t) => t.trim())
          : [],
      achievements: Array.isArray(previewData.achievements)
        ? previewData.achievements
        : typeof previewData.achievements === "string"
          ? previewData.achievements.split(",").map((a) => a.trim())
          : [],
      clientName: previewData.clientName || "",
      issueDate: previewData.issueDate,
    }),

    fullandfinal_letter: () => ({
      ...base,
      title: previewData.mrms || "Mr.",
      designation:
        previewData.position || previewData.designation || "Employee",
      department: previewData.department || "",
      fnfDate: previewData.fnfDate || new Date(),
      month: previewData.month || new Date().toISOString().slice(0, 7),
      totalSalary: Number(previewData.salary || previewData.totalSalary) || 0,
      doj: previewData.joiningDate || new Date(),
      resignationDate: previewData.resignationDate || new Date(),
      leavingDate: previewData.leavingDate || new Date(),
      leaveEncashment: Number(previewData.leaveEncashment) || 0,
      paidDays: Number(previewData.paidDays) || 0,
      finalType: validSalaryTypes.includes(previewData.finalType)
        ? previewData.finalType
        : "withPF",
      workdays: Number(previewData.workdays) || 0,
    }),
  };

  if (!payloadBuilders[key]) {
    throw new Error(`Invalid document type: ${key}`);
  }

  return payloadBuilders[key]();
};
