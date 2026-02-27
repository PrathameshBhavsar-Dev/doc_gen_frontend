import React from "react";

import CubeageRelieving from "./CompanyWiseRelieving/CubeageRelieving";
import DevconsRelieving from "./CompanyWiseRelieving/DevconsRelieving";
import JDITRelieving from "./CompanyWiseRelieving/JDITRelieving";
import NeweageRelieving from "./CompanyWiseRelieving/NeweageRelieving";
import PentaRelieving from "./CompanyWiseRelieving/PentaRelieving";
import RPRelieving from "./CompanyWiseRelieving/RPRelieving";
import SmartMatrixRelieving from "./CompanyWiseRelieving/SmartMatrixRelieving";
import SmartSoftwareRelieving from "./CompanyWiseRelieving/SmartSoftwareRelieving";
import QuickRelieving from "./CompanyWiseRelieving/QuickRelieving";
import NimbjaRelieving from './CompanyWiseRelieving/NimbjaRelieving'

const companyComponentMap = {
  1: CubeageRelieving,
  2: NeweageRelieving,
  3: SmartMatrixRelieving,
  4: DevconsRelieving,
  5: RPRelieving,
  6: PentaRelieving,
  7: NimbjaRelieving, // ✅ ADD THIS
  8: JDITRelieving,
  9: QuickRelieving,
  10: SmartSoftwareRelieving,
};

const RelievingLetterTemplate = ({ company, data }) => {  
  if (!company) return null;  

  const RelievingComponent = companyComponentMap[company.id];

  if (!RelievingComponent) {
    return <div>No relieving letter template available for this company</div>;
  }

  return <RelievingComponent company={company} data={data} />;
};

export default RelievingLetterTemplate;
