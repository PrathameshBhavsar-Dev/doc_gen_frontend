import React from "react";

import CubeageIncrement from "../WithPF/CompanyWiseIncrement/CubeageIncrement";
import DevconsIncrement from "../WithPF/CompanyWiseIncrement/DevconsIncrement";
import JDITIncrement from "../WithPF/CompanyWiseIncrement/JDITIncrement";
import NeweageIncrement from "../WithPF/CompanyWiseIncrement/NeweageIncrement";
import PentaIncrement from "../WithPF/CompanyWiseIncrement/PentaIncrement";
// import PentaIncrement from "../WithPF/CompanyWiseIncrement/PentaIncrement";
import RPIcrement from "../WithPF/CompanyWiseIncrement/RPIncrement";
import SmartMatrixIncrement from "../WithPF/CompanyWiseIncrement/SmartMatrixIncrement";
import SmartSoftwareIncrement from "../WithPF/CompanyWiseIncrement/SmartSoftwareIncrement";
import NimbjaIncrement from "../WithPF/CompanyWiseIncrement/NimbjaIncrement"
//import QuickIncrement from "./CompanyWiseIncrement/QuickIncrement";


// same company ids, just Increment components
const companyComponentMap = {
  1: CubeageIncrement,
  2: NeweageIncrement,
  3: SmartMatrixIncrement,
  4: DevconsIncrement,
  5: RPIcrement,
  6: PentaIncrement,
  7: NimbjaIncrement,
  8: JDITIncrement,
  //9: QuickIncrement,
  10: SmartSoftwareIncrement,
  
};

const WithPFIncrementLetterTemplate = ({ company, data }) => {
  if (!company) return null;

  const IncrementComponent = companyComponentMap[company.id];

  if (!IncrementComponent) {
    return <div>No increment template available for this company</div>;
  }

  return <IncrementComponent company={company} data={data} />;
};

export default WithPFIncrementLetterTemplate;
