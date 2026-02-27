import React from "react";

 
// import DevconsExperience from "./CompanyWiseExperience/DevconsExperience";
// import JDITExperience from "./CompanyWiseExperience/JDITExperience";
// import NeweageExperience from "./CompanyWiseExperience/NeweageExperience";
// import PentaExperience from "./CompanyWiseExperience/PentaExperience";
// import RPExperience from "./CompanyWiseExperience/RPExperience";
import NeweageCertification from "./CompanyWiseCertification/NeweageCertification";
import JditCertification from "./CompanyWiseCertification/JditCertification";
import SmartSoftwareCertification from "./CompanyWiseCertification/SmartSoftwareCertification";
import DevconsCertification from "./CompanyWiseCertification/DevconsCertification";
import RPCertification from "./CompanyWiseCertification/RPCertification";
import CubeageCertification from "./CompanyWiseCertification/CubeageCertification";
import SmartMatrixCertification from "./CompanyWiseCertification/SmartMatrixCertification";
import NimbjaCertification from "./CompanyWiseCertification/NimbjaCertification";
// import SmartMatrixExperience from "./CompanyWiseExperience/SmartMatrixExperience";
// import SmartSoftwareExperience from "./CompanyWiseExperience/SmartSoftwareExperience";

// map company shortName OR id to component
const companyComponentMap = {
  1: CubeageCertification,
  2: NeweageCertification,
//   3: SmartMatrixExperience,
  4: DevconsCertification,
  5: RPCertification,
//   6: PentaExperience,
  8: JditCertification,
  10: SmartSoftwareCertification,
};

const CertificationLetterTemplate = ({ company, data }) => {
  if (!company) return null;

  const CertificateComponent = companyComponentMap[company.id];

  if (!CertificateComponent) {
    return <div>No Certificate template available for this company</div>;
  }

  return <CertificateComponent company={company} data={data} />;
};

export default CertificationLetterTemplate;
