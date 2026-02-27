import React from "react";

import CubeageIncrement from "../WithoutPF/CompanyWiseIncrement/CubeageIncrement";
import DevconsIncrement from "../WithoutPF/CompanyWiseIncrement/DevconsIncrement";
import JDITIncrement from "../WithoutPF/CompanyWiseIncrement/JDITIncrement";
import NeweageIncrement from "../WithPF/CompanyWiseIncrement/NeweageIncrement";
import PentaIncrement from "../WithoutPF/CompanyWiseIncrement/PentaIncrement";
import RPIncrement from "../WithoutPF/CompanyWiseIncrement/RPIncrement";
import SmartMatrixIncrement from "../WithoutPF/CompanyWiseIncrement/SmartMatrixIncrement";
import SmartSoftwareIncrement from "../WithoutPF/CompanyWiseIncrement/SmartSoftwareIncrement";
//import QuickIncrement from "./CompanyWiseIncrement/QuickIncrement";

import NimbjaIncrement from "../WithoutPF/CompanyWiseIncrement/NimbjaIncrement";
// same company ids, just Increment components
const companyComponentMap = {
  1: CubeageIncrement,
  2: NeweageIncrement,
  3: SmartMatrixIncrement,
  4: DevconsIncrement,
  5: RPIncrement,
 6: PentaIncrement,
  7: NimbjaIncrement,
  8: JDITIncrement,
  //9: QuickIncrement,
  10: SmartSoftwareIncrement,
  
};

const WithoutPFIncrementLetterTemplate = ({ company, data }) => {
  if (!company) return null;

  const IncrementComponent = companyComponentMap[company.id];

  if (!IncrementComponent) {
    return <div>No increment template available for this company</div>;
  }

  return <IncrementComponent company={company} data={data} />;
};

export default WithoutPFIncrementLetterTemplate;
