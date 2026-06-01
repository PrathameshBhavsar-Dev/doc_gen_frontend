import React from "react";
// import PaidInternshipLetterTemplate from "./PaidIntershipLetter/PaidInternshipTemplate";
// import UnPaidInternshipLetterTemplate from "./UnpaidIntershipLetter/UnpaidinternshipTemplate";
import WithPFLetterTemplate from "./WithPF/CompanyWisePFLetter/WithPFLetterTemplate";
import WithoutPFLetterTemplate from "./WithoutPF/WithoutPFLetterTemplate";

const SalarySlipLetterTemplate = ({ company, data }) => {
  // 🔑 This value must come from form / documentData
  const SalaryType = data.salaryType || data.pfType; // "paid" | "unpaid"

  if (!SalaryType) {
    return <div>PFTypename type not selected</div>;
  }

  if (SalaryType === "withPF") {
    return <WithPFLetterTemplate company={company} data={data} />;
  }

  if (SalaryType === "withoutPF") {
    return <WithoutPFLetterTemplate company={company} data={data} />;
  }

  return <div>Invalid Salary type</div>;
};

export default SalarySlipLetterTemplate;
