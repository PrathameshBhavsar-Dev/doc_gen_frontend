import React from "react";

import NimbjaFullAndFinal from "./CompanyWiseFullAndFinal/NimbjaFullAndFinal";
import SmartMatrixFullAndFinal from "./CompanyWiseFullAndFinal/SmartMatrixFullAndFinal";
import CubeageFullAndFinal from "./CompanyWiseFullAndFinal/CubeageFullAndFinal";
// same company ids, just Increment components
const companyComponentMap = {
  1: CubeageFullAndFinal,
//   2: NeweageIncrement,
  3: SmartMatrixFullAndFinal,
//   4: DevconsIncrement,
//   5: RPIncrement,
//   6: PentaIncrement,
  7: NimbjaFullAndFinal,
//   8: JDITIncrement,
//   10: SmartSoftwareIncrement,
};

const FullAndFinalTemplate = ({ company, data }) => {
  if (!company) return null;

  const FullAndFinalComponent = companyComponentMap[company.id];

  if (!FullAndFinalComponent) {
    return <div>No increment template available for this company</div>;
  }

  return <FullAndFinalComponent company={company} data={data} />;
};

export default FullAndFinalTemplate;
