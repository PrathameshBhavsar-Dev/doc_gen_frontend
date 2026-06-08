// import React from "react";
// import PaidInternshipLetterTemplate from "./PaidIntershipLetter/PaidInternshipTemplate";
// import UnPaidInternshipLetterTemplate from "./UnpaidIntershipLetter/UnpaidinternshipTemplate";

// const InternshipLetterTemplate = ({ company, data }) => {

//   const internshipData =
//     data?.documentData?.INTERNSHIP_CERTIFICATE;

//   const internshipType =
//     internshipData?.internshipType;

//   // console.log("INTERNSHIP DATA", data);
//   // console.log("INTERNSHIP CERTIFICATE", internshipData);
//   // console.log("INTERNSHIP TYPE", internshipType);
//   // console.log("FULL DATA RECEIVED", data);

//   if (!internshipType) {
//     return <div>Internship type not selected</div>;
//   }

//   if (
//     internshipType === "paid" ||
//     internshipType === "PAID"
//   ) {
//     return (
//       <PaidInternshipLetterTemplate
//         company={company}
//         data={{
//           ...data,
//           ...internshipData,
//         }}
//       />
//     );
//   }

//   if (
//     internshipType === "unpaid" ||
//     internshipType === "UNPAID"
//   ) {
//     return (
//       <UnPaidInternshipLetterTemplate
//         company={company}
//         data={{
//           ...data,
//           ...internshipData,
//         }}
//       />
//     );
//   }

//   return <div>Invalid internship type</div>;
// };

// export default InternshipLetterTemplate;

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
