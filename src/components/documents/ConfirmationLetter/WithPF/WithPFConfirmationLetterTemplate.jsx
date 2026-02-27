import React from "react";
import CubeageConfirmation from "../WithPF/CompanyWiseConfirmation/CubeageConfirmation";
import NeweageConfirmation from "../WithPF/CompanyWiseConfirmation/NeweageConfirmation";
import SmartMatrixConfirmation from "../WithPF/CompanyWiseConfirmation/SmartMatrixConfirmation";
import DevconsConfirmation from "../WithPF/CompanyWiseConfirmation/DevconsConfirmation";
import RPConfirmation from "../WithPF/CompanyWiseConfirmation/RPConfirmation";
import PentaConfirmation from "../WithPF/CompanyWiseConfirmation/PentaConfirmation";
import NimbjaConfirmation from "../WithPF/CompanyWiseConfirmation/NimbjaConfirmation";
import JDITConfirmation from "../WithPF/CompanyWiseConfirmation/JDITConfirmation";
import QuickConfirmation from "../WithPF/CompanyWiseConfirmation/QuickConfirmation";
import SmartsoftwareConfirmation from "../WithPF/CompanyWiseConfirmation/SmartsoftwareConfirmation";



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

const WithPFConfirmationLetterTemplate = ({ company, data }) => {
  if (!company) return null;

  const ConfirmationComponent = companyComponentMap[company.id];

  if (!ConfirmationComponent) {
    return <div>No WithPF-Confirmation template available for this company</div>;
  }

  return <ConfirmationComponent company={company} data={data} />;
};

export default WithPFConfirmationLetterTemplate;
