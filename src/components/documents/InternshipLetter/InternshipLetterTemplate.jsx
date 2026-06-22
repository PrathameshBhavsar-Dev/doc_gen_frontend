import React from "react";
import PaidInternshipLetterTemplate from "./PaidIntershipLetter/PaidInternshipTemplate";
import UnPaidInternshipLetterTemplate from "./UnpaidIntershipLetter/UnpaidinternshipTemplate";

const InternshipLetterTemplate = ({ company, data }) => {
  const internshipType = (
    data?.internshipType ||
    data?.documentData?.INTERNSHIP_CERTIFICATE?.internshipType ||
    ""
  )
    .toString()
    .trim()
    .toUpperCase();

  console.log("INTERNSHIP TYPE =", internshipType);
  console.log("FULL DATA =", data);

  if (!internshipType) {
    return (
      <div>
        Internship type not selected
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    );
  }

  if (internshipType === "PAID") {
    return <PaidInternshipLetterTemplate company={company} data={data} />;
  }

  if (internshipType === "UNPAID") {
    return <UnPaidInternshipLetterTemplate company={company} data={data} />;
  }

  return <div>Invalid internship type: {internshipType}</div>;
};

export default InternshipLetterTemplate;
