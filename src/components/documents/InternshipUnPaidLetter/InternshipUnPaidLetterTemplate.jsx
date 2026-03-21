import React from "react";
import CubeageUnaidInternshipLetter from "./CompanyWiseUnPaidInternship/CubeageUnPaidInternshipLetter";
import NimbjaUnPaidInternship from "./CompanyWiseUnPaidInternship/NimbjaUnPaidInternship";
import SmartMatrixUnPaidInternship from "./CompanyWiseUnPaidInternship/SmartMatrixUnPaidInternship";
import CubeageUnPaidInternshipLetter from "../InternshipLetter/UnpaidIntershipLetter/CompanyWiseUnPaidInternshipLetter/CubeageUnPaidInternshipLetter";

// map company shortName OR id to component
const companyComponentMap = {
  1: CubeageUnPaidInternshipLetter,
  //   2: NeweageExperience,
  3: SmartMatrixUnPaidInternship,
  //   4: DevconsExperience,
  //   5: RPExperience,
  //   6: PentaExperience,
  7: NimbjaUnPaidInternship,
  //   8: JDITExperience,
  //   10: SmartSoftwareExperience,
};

const InternshipUnPaidLetterTemplate = ({ company, data }) => {
  if (!company) return null;

  const InternshipComponent = companyComponentMap[company.id];

  if (!InternshipComponent) {
    return <div>No experience template available for this company</div>;
  }

  return <InternshipComponent company={company} data={data} />;
};

export default InternshipUnPaidLetterTemplate;
