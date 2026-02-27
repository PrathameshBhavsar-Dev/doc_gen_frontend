import React from "react";
// import CubeageUnPaidInternshipLetter from "./CompanyWiseUnPaidInternshipLetter/CubeageUnPaidInternshipLetter";
   import PentaUnPaidInternshipLetter from "./CompanyWiseUnpaidInternshipLetter/PentaUnPaidInternshipLetter"
// import RPUnPaidInternshipLetter from "./CompanyWiseUnPaidInternshipLetter/RPUnPaidInternshipLetter";
// import SmartMatrixUnPaidInternshipLetter from "./CompanyWiseUnPaidInternshipLetter/SmartMatrixUnPaidInternshipLetter";
// import NimbjaUnPaidInternshipLetter from "./CompanyWiseUnPaidInternshipLetter/NimbjaUnPaidInternshipLetter";
// import DevconsUnPaidInternshipLetter from "./CompanyWiseUnPaidInternshipLetter/DevconsUnPaidInternshipLetter";
import QuickUnPaidInternshipLetter from "./CompanyWiseUnpaidInternshipLetter/QuickUnpaidInternshipLetter";
import SmartSoftwareUnPaidInternshipLetter from "./CompanyWiseUnPaidInternshipLetter/SmartSoftwareUnPaidInternshipLetter";
import JDITUnPaidInternshipLetter from "./CompanyWiseUnPaidInternshipLetter/JDITUnPaidInternshipLetter";
import  NeweageUnPaidInternshipLetter from "./CompanyWiseUnpaidInternshipLetter/NeweageUnPaidInternshipLetter";

// 
// same company ids, just Increment components
const companyComponentMap = {
  // 1: CubeageUnPaidInternshipLetter,
  2:  NeweageUnPaidInternshipLetter,
  // 3: SmartMatrixUnPaidInternshipLetter,
  // 4: DevconsUnPaidInternshipLetter,
  // 5: RPUnPaidInternshipLetter,
     6: PentaUnPaidInternshipLetter,
  // 7: NimbjaUnPaidInternshipLetter,
  8: JDITUnPaidInternshipLetter,
  9: QuickUnPaidInternshipLetter,
  10: SmartSoftwareUnPaidInternshipLetter,
   
  
};

const UnPaidInternshipLetterTemplate = ({ company, data }) => {
  if (!company) return null;

  const UnPaidInternshipComponent = companyComponentMap[company.id];

  if (!UnPaidInternshipComponent) {
    return <div>No PaidInternship template available for this company</div>;
  }

  return <UnPaidInternshipComponent company={company} data={data} />;
};

export default UnPaidInternshipLetterTemplate;