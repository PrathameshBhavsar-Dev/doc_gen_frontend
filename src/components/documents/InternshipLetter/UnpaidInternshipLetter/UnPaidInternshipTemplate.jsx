import React from "react";
import PentaUnPaidInternshipLetter from "./CompanyWiseUnpaidInternshipLetter/PentaUnPaidInternshipLetter"
import QuickUnPaidInternshipLetter from "./CompanyWiseUnpaidInternshipLetter/QuickUnPaidInternshipLetter";
import SmartSoftwareUnPaidInternshipLetter from "./CompanyWiseUnPaidInternshipLetter/SmartSoftwareUnPaidInternshipLetter";
import JDITUnPaidInternshipLetter from "./CompanyWiseUnPaidInternshipLetter/JDITUnPaidInternshipLetter"; // ✅ uncommented
import NeweageUnPaidInternshipLetter from "./CompanyWiseUnpaidInternshipLetter/NeweageUnPaidInternshipLetter";

const companyComponentMap = {
  // 1: CubeageUnPaidInternshipLetter,
  2: NeweageUnPaidInternshipLetter,
  // 3: SmartMatrixUnPaidInternshipLetter,
  // 4: DevconsUnPaidInternshipLetter,
  // 5: RPUnPaidInternshipLetter,
  6: PentaUnPaidInternshipLetter,
  // 7: NimbjaUnPaidInternshipLetter,
  8: JDITUnPaidInternshipLetter, // ✅ now defined
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