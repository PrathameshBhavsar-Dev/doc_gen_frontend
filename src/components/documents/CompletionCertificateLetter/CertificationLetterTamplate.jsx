import React from "react";
import PentaCertificate from "./CompanyWiseCompletionCertificate/PentaCertificate";

// import CubeageExperience from "./CompanyWiseExperience/CubeageExperience";
// import DevconsExperience from "./CompanyWiseExperience/DevconsExperience";
// import JDITExperience from "./CompanyWiseExperience/JDITExperience";
// import NeweageExperience from "./CompanyWiseExperience/NeweageExperience";
// import PentaExperience from "./CompanyWiseExperience/PentaExperience";
// import RPExperience from "./CompanyWiseExperience/RPExperience";
// import SmartMatrixExperience from "./CompanyWiseExperience/SmartMatrixExperience";
// import SmartSoftwareExperience from "./CompanyWiseExperience/SmartSoftwareExperience";
// import QuickExperience from "./CompanyWiseExperience/QuickExperience";

// map company shortName OR id to component
const companyComponentMap = {
//   1: CubeageExperience,
//   2: NeweageExperience,
//   3: SmartMatrixExperience,
//   4: DevconsExperience,
//   5: RPExperience,
     6: PentaCertificate,
//   8: JDITExperience,
//   9: QuickExperience,
//   10: SmartSoftwareExperience,
//   11:QuickExperience,
};

const CertificationLetterTamplate= ({ company, data }) => {
  if (!company) return null;

  const CertificateComponent = companyComponentMap[company.id];

  if (!CertificateComponent) {
    return <div>No experience template available for this company</div>;
  }

  return <CertificateComponent company={company} data={data} />;
};

export default CertificationLetterTamplate;
