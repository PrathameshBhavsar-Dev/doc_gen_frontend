import React from "react";

 
// import DevconsExperience from "./CompanyWiseExperience/DevconsExperience";
// import JDITExperience from "./CompanyWiseExperience/JDITExperience";
// import NeweageExperience from "./CompanyWiseExperience/NeweageExperience";
// import RPExperience from "./CompanyWiseExperience/RPExperience";
import NeweageCertification from "./CompanyWiseCertification/NeweageCertification";
import JditCertification from "./CompanyWiseCertification/JditCertification";
import SmartSoftwareCertification from "./CompanyWiseCertification/SmartSoftwareCertification";
import DevconsCertification from "./CompanyWiseCertification/DevconsCertification";
import RPCertification from "./CompanyWiseCertification/RPCertification";
import PentaCertification from "./CompanyWiseCertification/PentaCertification";
import CubeageCertification from "./CompanyWiseCertification/CubeageCertification";
import SmartMatrixCertification from "./CompanyWiseCertification/SmartMatrixCertification";
import NimbjaCertification from "./CompanyWiseCertification/NimbjaCertification";
import QMSCertification from "./CompanyWiseCertification/QMSCertification";
// import SmartMatrixExperience from "./CompanyWiseExperience/SmartMatrixExperience";
// import SmartSoftwareExperience from "./CompanyWiseExperience/SmartSoftwareExperience";

// map company shortName OR id to component
const companyComponentMap = {
  1: CubeageCertification,
  2: NeweageCertification,
//   3: SmartMatrixExperience,
  4: DevconsCertification,
  5: RPCertification,
  6: PentaCertification,
  7: NimbjaCertification,
  8: JditCertification,
  9: QMSCertification,
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
