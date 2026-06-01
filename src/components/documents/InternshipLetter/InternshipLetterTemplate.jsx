import React from "react";
import PaidInternshipLetterTemplate from "./PaidIntershipLetter/PaidInternshipTemplate";
import UnPaidInternshipLetterTemplate from "./UnpaidIntershipLetter/UnpaidinternshipTemplate";

const InternshipLetterTemplate = ({ company, data }) => {

  const internshipData =
    data?.documentData?.INTERNSHIP_CERTIFICATE;

  const internshipType =
    internshipData?.internshipType;

  console.log("INTERNSHIP DATA", data);
  console.log("INTERNSHIP CERTIFICATE", internshipData);
  console.log("INTERNSHIP TYPE", internshipType);
  console.log("FULL DATA RECEIVED", data);

  if (!internshipType) {
    return <div>Internship type not selected</div>;
  }

  if (
    internshipType === "paid" ||
    internshipType === "PAID"
  ) {
    return (
      <PaidInternshipLetterTemplate
        company={company}
        data={{
          ...data,
          ...internshipData,
        }}
      />
    );
  }

  if (
    internshipType === "unpaid" ||
    internshipType === "UNPAID"
  ) {
    return (
      <UnPaidInternshipLetterTemplate
        company={company}
        data={{
          ...data,
          ...internshipData,
        }}
      />
    );
  }

  return <div>Invalid internship type</div>;
};

export default InternshipLetterTemplate;