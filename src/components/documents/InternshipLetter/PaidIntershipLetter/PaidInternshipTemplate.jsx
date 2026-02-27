import React from "react";
import CubeagePaidInternshipLetter from "./CompanyWisePaidInternshipLetter/CubeagePaidInternshipLetter";
import JDITPaidInternshipLetter from "./CompanyWisePaidInternshipLetter/JDITPaidInternshipLetter";
import NeweagePaidInternshipLetter from "./CompanyWisePaidInternshipLetter/NeweagePaidInternshipLetter";
import PentaPaidInternshipLetter from "./CompanyWisePaidInternshipLetter/PentaPaidInternshipLetter";
import RPPaidInternshipLetter from "./CompanyWisePaidInternshipLetter/RPPaidInternshipLetter";
import SmartMatrixPaidInternshipLetter from "./CompanyWisePaidInternshipLetter/SmartMatrixPaidInternshipLetter";
import SmartSoftwarePaidInternshipLetter from "./CompanyWisePaidInternshipLetter/SmartSoftwarePaidInternshipLetter";
import NimbjaPaidInternshipLetter from "./CompanyWisePaidInternshipLetter/NimbjaPaidInternshipLetter";
import DevconsPaidInternshipLetter from "./CompanyWisePaidInternshipLetter/DevconsPaidInternshipLetter";
import QuickPaidInternshipLetter from "./CompanyWisePaidInternshipLetter/QuickPaidInternshipLetter";



// same company ids, just Increment components
const companyComponentMap = {

  1: CubeagePaidInternshipLetter,
  2: NeweagePaidInternshipLetter,
  3: SmartMatrixPaidInternshipLetter,
  4: DevconsPaidInternshipLetter,
  5: RPPaidInternshipLetter,
  6: PentaPaidInternshipLetter,
  7: NimbjaPaidInternshipLetter,
  8: JDITPaidInternshipLetter,
  9: QuickPaidInternshipLetter,
  10:SmartSoftwarePaidInternshipLetter,

};

const PaidInternshipLetterTemplate = ({ company, data }) => {
  if (!company) return null;

  const PaidInternshipComponent = companyComponentMap[company.id];

  if (!PaidInternshipComponent) {
    return <div>No PaidInternship template available for this company</div>;
  }

  return <PaidInternshipComponent company={company} data={data} />;
};

export default PaidInternshipLetterTemplate;
