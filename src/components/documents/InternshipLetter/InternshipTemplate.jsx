import React from "react";
import PaidInternshipLetterTemplate from "./PaidIntershipLetter/PaidInternshipTemplate";
import UnPaidInternshipLetterTemplate from "./UnpaidIntershipLetter/UnpaidinternshipTemplate";

const InternshipLetterTemplate = ({ company, data }) => {
  // 🔑 This value must come from form / documentData
  const internshipType = data?.internshipType; // "paid" | "unpaid"
  console.log("INTERNSHIP DATA", data);
  console.log("INTERNSHIP TYPE", data?.internshipType);

  if (!internshipType) {
    return <div>Internship type not selected</div>;
  }

  if (internshipType === "paid" || internshipType === "PAID") {
    return <PaidInternshipLetterTemplate company={company} data={data} />;
  }
 
  if (internshipType === "unpaid" || internshipType === "UNPAID") {
    return <UnPaidInternshipLetterTemplate company={company} data={data} />;
  }

  return <div>Invalid internship type</div>;
};

export default InternshipLetterTemplate;