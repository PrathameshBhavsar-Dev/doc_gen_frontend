import React from "react";
// import PaidInternshipLetterTemplate from "./PaidIntershipLetter/PaidInternshipTemplate";
// import UnPaidInternshipLetterTemplate from "./UnpaidIntershipLetter/UnpaidinternshipTemplate";
import WithPFLetterTemplate from "./WithPF/CompanyWisePFLetter/WithPFLetterTemplate";
import SalarySlipTemplate from "../../documents/SalarySlip/WithoutPF/WithoutPFLetterTemplate";


const SalarySlipLetterTemplate = ({ company, data }) => {
  // 🔑 This value must come from form / documentData
  const SalaryType = data?.salaryType; // "paid" | "unpaid"

  if (!SalaryType) {
    return <div>PFTypename type not selected</div>;
  }

  if (SalaryType === "withPF") {
    return <WithPFLetterTemplate company={company} data={data} />;
  }

  if (SalaryType === "withoutPF") {
    return <SalarySlipTemplate company={company} data={data} />;
  }

  return <div>Invalid Salary type</div>;
};

export default SalarySlipLetterTemplate;
