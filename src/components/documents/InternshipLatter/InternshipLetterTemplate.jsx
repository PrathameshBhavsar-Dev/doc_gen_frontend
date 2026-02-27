import React from "react";
import NimbjaInternship from "./CompamyWiseInternship/NimbjaInternship.jsx";
import SmartMatrixInternship from "./CompamyWiseInternship/SmartMatrixInternship.jsx";
import CubeageInternship from "./CompamyWiseInternship/CubeageInternship.jsx";


// map company shortName OR id to component
const companyComponentMap = {
      1:CubeageInternship,
//   2: NeweageExperience,
  3: SmartMatrixInternship,
//   4: DevconsExperience,
//   5: RPExperience,
//   6: PentaExperience,
  7: NimbjaInternship,
//   8: JDITExperience,
//   10: SmartSoftwareExperience,
};

const InternshipLetterTemplate = ({ company, data }) => {
  // 🔑 This value must come from form / documentData
  const internshipType = data?.internshipType; // "paid" | "unpaid"

  if (!internshipType) {
    return <div>Internship type not selected</div>;
  }

  if (internshipType === "paid") {
    return <NimbjaPaidInternshipLetter company={company} data={data} />;
  }

  if (internshipType === "unpaid") {
    return <UnpaidinternshipTemplate company={company} data={data} />;
  }

  return <div>Invalid internship type</div>;
};

export default InternshipLetterTemplate;
