import React from "react";

import CubeageFullandfinal from "../WithPF/CompanyWiseFullandfinal/CubeageFullandfinal";
import DevconsFullandfinal from "../WithPF/CompanyWiseFullandfinal/DevconsFullandfinal";
import JDITFullandfinal from "../WithPF/CompanyWiseFullandfinal/JDITFullandfinal";
import NeweageFullandfinal from "../WithPF/CompanyWiseFullandfinal/NeweageFullandfinal";
import PentaFullandfinal from "../WithPF/CompanyWiseFullandfinal/PentaFullandfinal";
import RPFullandfinal from "../WithPF/CompanyWiseFullandfinal/RPFullandfinal";
import SmartMatrixFullandfinal from "../WithPF/CompanyWiseFullandfinal/SmartMatrixFullandfinal";
import SmartsoftwareFullandfinal from "../WithPF/CompanyWiseFullandfinal/SmartsoftwareFullandfinal";
import QuickFullandfinal from "../WithPF/CompanyWiseFullandfinal/QuickFullandfinal";
import NimbjaFullandfinal from "../WithPF/CompanyWiseFullandfinal/NimbjaFullandfinal";


// map company shortName OR id to component
const companyComponentMap = {
  1: CubeageFullandfinal,
  2: NeweageFullandfinal,
  3: SmartMatrixFullandfinal,
  4: DevconsFullandfinal,
  5: RPFullandfinal,
  6: PentaFullandfinal,
  7: NimbjaFullandfinal,
  8: JDITFullandfinal,
  9: QuickFullandfinal,
  10: SmartsoftwareFullandfinal,
};

const WithPFFullandfinalTemplate = ({ company, data }) => {
  if (!company) return null;

  const FullandfinalComponent = companyComponentMap[company.id];

  if (!FullandfinalComponent) {
    return <div>No Fullandfinal template available for this company</div>;
  }

  return <FullandfinalComponent company={company} data={data} />;
};

export default WithPFFullandfinalTemplate;
