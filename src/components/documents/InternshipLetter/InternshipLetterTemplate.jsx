import React from "react";
import PaidInternshipLetterTemplate from "./PaidIntershipLetter/PaidInternshipTemplate";
import UnPaidInternshipLetterTemplate from "./UnpaidIntershipLetter/UnpaidinternshipTemplate";



const InternshipLetterTemplate = ({ company, data }) => {
  // 🔑 This value must come from form / documentData
  const internshipType = data?.internshipType; // "paid" | "unpaid"

  if (!internshipType) {
    return <div>Internship type not selected</div>;
  }

  if (internshipType === "paid") {
    return <PaidInternshipLetterTemplate company={company} data={data} />;
  }

  if (internshipType === "unpaid") {
    return <UnPaidInternshipLetterTemplate company={company} data={data} />;
  }

  return <div>Invalid internship type</div>;
};

export default InternshipLetterTemplate;
