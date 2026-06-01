import React from "react";
import CubeageUnPaidInternshipLetter from "./CompanyWiseUnPaidInternshipLetter/CubeageUnPaidInternshipLetter";
import NeweageUnPaidInternshipLetter from "./CompanyWiseUnPaidInternshipLetter/NeweageUnPaidInternshipLetter";
import JDITUnPaidInternshipLetter from "./CompanyWiseUnPaidInternshipLetter/JDITUnPaidInternshipLetter";
// import NeweageUnPaidInternshipLetter from "./CompanyWiseUnPaidInternshipLetter/NeweageUnPaidInternshipLetter";
import PentaUnPaidInternshipLetter from "./CompanyWiseUnPaidInternshipLetter/PentaUnPaidInternshipLetter";
import RPUnPaidInternshipLetter from "./CompanyWiseUnPaidInternshipLetter/RPUnPaidInternshipLetter";
import SmartMatrixUnPaidInternshipLetter from "./CompanyWiseUnPaidInternshipLetter/SmartMatrixUnPaidInternshipLetter";
import SmartSoftwareUnPaidInternshipLetter from "./CompanyWiseUnPaidInternshipLetter/SmartSoftwareUnPaidInternshipLetter";
import NimbjaUnPaidInternshipLetter from "./CompanyWiseUnPaidInternshipLetter/NimbjaUnPaidInternshipLetter";
import DevconsUnpaidInternshipLetter from "./CompanyWiseUnPaidInternshipLetter/DevconsUnpaidInternshipLetter";
import QuickUnPaidInternshipLetter from "./CompanyWiseUnPaidInternshipLetter/QuickUnPaidInternshipLetter";

// same company ids, just Increment components
const companyComponentMap = {
  1: CubeageUnPaidInternshipLetter,
  2: NeweageUnPaidInternshipLetter,
  3: SmartMatrixUnPaidInternshipLetter,
  4: DevconsUnpaidInternshipLetter,
  5: RPUnPaidInternshipLetter,
  6: PentaUnPaidInternshipLetter,
  7: NimbjaUnPaidInternshipLetter,
  8: JDITUnPaidInternshipLetter,
  9: QuickUnPaidInternshipLetter,
  10:SmartSoftwareUnPaidInternshipLetter,
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
