export const buildCreateProfilePayload = (formData, selectedDocuments = []) => {
  // ================= ENUM MAPPINGS =================
  const identityMap = {
    Mr: "MR",
    "Mr.": "MR",

    Mrs: "MRS",
    "Mrs.": "MRS",

    Miss: "MISS",
    "Miss.": "MISS",

    Mx: "MX",
    "Mx.": "MX",
  };

  const pfTypeMap = {
    withPF: "WITH_PF",
    withoutPF: "WITHOUT_PF",
  };

  const internshipTypeMap = {
    paid: "PAID",
    unpaid: "UNPAID",
  };

  const companyMap = {
    "SmartMatrix Digital Services Pvt. Ltd.": "SMT",
    "Devcons Software Solutions Pvt. Ltd.": "DCS",
    "Penta Software Consultancy Services (I) Pvt Ltd": "PSS",
    "Cubeage Technologies Services Pvt. Ltd.": "CTS",
    "Quick Management Services": "QMS",
    "Neweage Cloud Solution Pvt. Ltd.": "NCS",
    "RP Business Solutions LLP": "RBS",
    "JDIT Software Solutions Pvt. Ltd.": "JDT",
    "NIMBJA SECURITY SOLUTIONS Pvt. Ltd.": "NSS",
    "Smart Software Services (I) Pvt. Ltd.": "SSS",
  };

  // ================= NORMALIZE DOCUMENTS =================

  const normalizedDocs = selectedDocuments
    .map((doc) =>
      doc?.name
        ?.trim()
        .toUpperCase()
        .replace(/&/g, "_AND_")
        .replace(/\s+/g, "_"),
    )
    .filter(Boolean);

  console.log("NORMALIZED DOCS:", normalizedDocs);

  const hasDocument = (docName) => normalizedDocs.includes(docName?.trim());

  const documentData = {};

  const rawIdentity = formData.mrms || formData.identity || "";

  const normalizedIdentity = rawIdentity.toString().trim();

  const getDocField = (docKey, fieldName) => {
    return formData?.[docKey]?.[fieldName] ?? null;
  };

  // ================= OFFER LETTER =================

  if (hasDocument("OFFER_LETTER")) {
    documentData["OFFER_LETTER"] = {
      issueDate: getDocField("offer_letter", "issueDate"),

      probationPeriod: getDocField("offer_letter", "probationPeriod")
        ? Number(getDocField("offer_letter", "probationPeriod"))
        : null,
    };
  }

  // ================= APPOINTMENT LETTER =================

  if (hasDocument("APPOINTMENT_LETTER")) {
    documentData["APPOINTMENT_LETTER"] = {
      issueDate: getDocField("appointment_letter", "issueDate"),

      probationPeriod: getDocField("appointment_letter", "probationPeriod")
        ? Number(getDocField("appointment_letter", "probationPeriod"))
        : null,
    };
  }

  // ================= INCREMENT LETTER =================

  if (hasDocument("INCREMENT_LETTER")) {
    documentData["INCREMENT_LETTER"] = {
      issueDate: formData.increment_letter?.issueDate || null,
    };
  }

  // ================= INTERNSHIP LETTER =================

  if (hasDocument("INTERNSHIP_CERTIFICATE")) {
    documentData["INTERNSHIP_CERTIFICATE"] = {
      internshipType: internshipTypeMap[formData.internshipType] || null,
      startDate: formData.startDate || null,
      endDate: formData.endDate || null,
      issueDate: formData.issueDate || null,
    };
  }

  // ================= COMPLETION LETTER =================

  if (hasDocument("COMPLETION_CERTIFICATE")) {
    documentData["COMPLETION_CERTIFICATE"] = {
      startDate: formData.startDate || null,

      completionDate: formData.completionDate || null,

      issueDate: formData.issueDate || null,
    };
  }

  // ================= CONFIRMATION LETTER =================

  // ================= CONFIRMATION LETTER =================

  if (hasDocument("CONFIRMATION_LETTER")) {
    documentData["CONFIRMATION_LETTER"] = {
      effectiveDate:
        formData.confirmation_letter?.effectiveDate ||
        formData.effectiveDate ||
        null,

      issueDate:
        formData.confirmation_letter?.issueDate || formData.issueDate || null,
    };
  }

  // ================= EXPERIENCE LETTER =================

  if (hasDocument("EXPERIENCE_LETTER")) {
    documentData["EXPERIENCE_LETTER"] = {
      relievingDate:
        formData.experience_letter?.relievingDate ||
        formData.experienceRelievingDate ||
        null,

      issueDate:
        formData.experience_letter?.issueDate ||
        formData.experienceIssueDate ||
        null,
    };
  }

  // ================= RELIEVING LETTER =================

  if (hasDocument("RELIEVING_LETTER")) {
    documentData["RELIEVING_LETTER"] = {
      relievingDate:
        formData.relieving_letter?.lastWorkingDay ||
        formData.relieving_letter?.relievingDate ||
        formData.lastWorkingDay ||
        formData.relievingDate ||
        null,

      issueDate:
        formData.relieving_letter?.issueDate || formData.issueDate || null,
    };
  }

  // ================= FULL & FINAL =================

  console.log("FORM DATA JSON", JSON.stringify(formData, null, 2));

  if (hasDocument("FULL_AND_FINAL_LETTER")) {
    documentData["FULL_AND_FINAL_LETTER"] = {
      fnfDate: formData.full_and_final_letter?.date || null,

      issueDate: formData.full_and_final_letter?.date || null,

      month: formData.full_and_final_letter?.month || null,

      resignationDate:
        formData.full_and_final_letter?.dateofresignation || null,

      leavingDate: formData.full_and_final_letter?.dateofleaving || null,

      paidDays: formData.full_and_final_letter?.paiddays
        ? Number(formData.full_and_final_letter.paiddays)
        : null,

      totalDaysInMonth: formData.full_and_final_letter?.workdays
        ? Number(formData.full_and_final_letter.workdays)
        : null,
    };
  }
  // ================= SALARY SLIP =================

  if (hasDocument("SALARY_SLIP")) {
    documentData["SALARY_SLIP"] = {
      startMonth: formData.salarySlipStartMonth || null,

      endMonth: formData.salarySlipEndMonth || null,

      salaryWorkdays: formData.salaryWorkdays || {},
    };
  }

  // ================= FINAL PAYLOAD =================

  return {
    // BASIC INFO
    employeeName: formData.employeeName || null,

    employeeId: formData.employeeId || null,

    email: formData.employeeEmail || formData.email || null,

    mobileNo: formData.mobile || formData.phone || formData.mobileNo || null,

    // PERSONAL INFO
    panNo: formData.pan || formData.panNo || null,

    dateOfBirth: formData.dob || formData.dateOfBirth || null,

    address: formData.currentAddress || formData.address || null,

    // JOB INFO
    designation:
      formData.currentDesignation ||
      formData.joiningDesignation ||
      formData.designation ||
      null,

    department: formData.department || null,

    offerDate: formData.offerDate || null,

    joiningDate: formData.joiningDate || null,

    // CTC
    CTC: formData.salary ? Number(formData.salary) : 0,

    // BANK INFO
    bankName: formData.bankName || null,

    accountNo: formData.accountNo || null,

    // ENUMS
    identity: identityMap[normalizedIdentity] || null,

    pfType: pfTypeMap[formData.offerType || formData.pfType] || null,

    company: companyMap[formData.company] || null,

    // DOCUMENTS
    documents: normalizedDocs,

    documentData,
  };
};
