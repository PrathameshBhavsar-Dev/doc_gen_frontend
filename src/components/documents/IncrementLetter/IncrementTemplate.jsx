import React from "react";
// import PaidInternshipLetterTemplate from "./PaidIntershipLetter/PaidInternshipTemplate";
// import UnPaidInternshipLetterTemplate from "./UnpaidIntershipLetter/UnpaidinternshipTemplate";
import WithPFIncrementLetterTemplate from "../IncrementLetter/WithPF/WithPFIncrementTemplate";
import WithoutPFIncrementLetterTemplate from "../IncrementLetter/WithoutPF/WithoutPFIncrementTemplate";


const IncrementTemplate = ({ company, data }) => {
  // 🔑 This value must come from form / documentData
  const IncrementType = data?.incrementType; // "paid" | "unpaid"

  if (!IncrementType) {
    return <div>PFTypename type not selected</div>;
  }

  if (IncrementType === "withPF") {
    return <WithPFIncrementLetterTemplate company={company} data={data} />;
  }

  if (IncrementType === "withoutPF") {
    return <WithoutPFIncrementLetterTemplate company={company} data={data} />;
  }

  return <div>Invalid Increment type</div>;
};

export default IncrementTemplate;
