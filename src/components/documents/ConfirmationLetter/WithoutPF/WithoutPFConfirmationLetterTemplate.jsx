import React from "react";

import CubeageConfirmation from "../WithoutPF/CompanyWiseConfirmation/CubeageConfirmation";
import NeweageConfirmation from "../WithoutPF/CompanyWiseConfirmation/NeweageConfirmation";
import SmartMatrixConfirmation from "../WithoutPF/CompanyWiseConfirmation/SmartMatrixConfirmation";
import DevconsConfirmation from "../WithoutPF/CompanyWiseConfirmation/DevconsConfirmation";
import RPConfirmation from "../WithoutPF/CompanyWiseConfirmation/RPConfirmation";
import PentaConfirmation from "../WithoutPF/CompanyWiseConfirmation/PentaConfirmation";
import NimbjaConfirmation from "../WithoutPF/CompanyWiseConfirmation/NimbjaConfirmation";
import JDITConfirmation from "../WithoutPF/CompanyWiseConfirmation/JDITConfirmation";
import QuickConfirmation from "../WithoutPF/CompanyWiseConfirmation/QuickConfirmation";
import SmartsoftwareConfirmation from "../WithoutPF/CompanyWiseConfirmation/SmartsoftwareConfirmation";

// map company shortName OR id to component
const companyComponentMap = {
  1: CubeageConfirmation,
  2: NeweageConfirmation,
  3: SmartMatrixConfirmation,
  4: DevconsConfirmation,
  5: RPConfirmation,
  6: PentaConfirmation,
  7: NimbjaConfirmation,
  8: JDITConfirmation,
  9: QuickConfirmation,
  10: SmartsoftwareConfirmation,
};

const WithoutPFConfirmationLetterTemplate = ({ company, data }) => {
  if (!company) return null;

  const ConfirmationComponent = companyComponentMap[company.id];

  if (!ConfirmationComponent) {
    return <div>No WithoutPF-Confirmation template available for this company</div>;
  }

  return <ConfirmationComponent company={company} data={data} />;
};

export default WithoutPFConfirmationLetterTemplate;
