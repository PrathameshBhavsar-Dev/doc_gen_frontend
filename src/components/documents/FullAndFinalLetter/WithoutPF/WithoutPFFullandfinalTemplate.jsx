import React from "react";

import CubeageFullandfinal from "../WithoutPF/CompanyWiseFullandfinal/CubeageFullandfinal";
import DevconsFullandfinal from "../WithoutPF/CompanyWiseFullandfinal/DevconsFullandfinal";
import JDITFullandfinal from "../WithoutPF/CompanyWiseFullandfinal/JDITFullandfinal";
import NeweageFullandfinal from "../WithoutPF/CompanyWiseFullandfinal/NeweageFullandfinal";
import PentaFullandfinal from "../WithoutPF/CompanyWiseFullandfinal/PentaFullandfinal";
import RPFullandfinal from "../WithoutPF/CompanyWiseFullandfinal/RPFullandfinal";
import SmartMatrixFullandfinal from "../WithoutPF/CompanyWiseFullandfinal/SmartMatrixFullandfinal";
import SmartsoftwareFullandfinal from "../WithoutPF/CompanyWiseFullandfinal/SmartsoftwareFullandfinal";
import QuickFullandfinal from "../WithoutPF/CompanyWiseFullandfinal/QuickFullandfinal";
import NimbjaFullandfinal from "../WithoutPF/CompanyWiseFullandfinal/NimbjaFullandfinal";


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

const WithoutPFFullandfinalTemplate = ({ company, data }) => {
  if (!company) return null;

  const FullandfinalComponent = companyComponentMap[company.id];

  if (!FullandfinalComponent) {
    return <div>No Fullandfinal template available for this company</div>;
  }

  return <FullandfinalComponent company={company} data={data} />;
};

export default WithoutPFFullandfinalTemplate;
