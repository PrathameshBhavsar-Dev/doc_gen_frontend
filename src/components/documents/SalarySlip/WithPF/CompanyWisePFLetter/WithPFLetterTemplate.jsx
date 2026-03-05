import React from "react";
import DevconsSalarySlip from "./DevconsSalarySlip";
import RPSalarySlip from "./RPSalarySlip";
import NimbjaSalarySlip from "./NimbjaSalarySlip";
//import CubeageSalarySlip from "./CubeageSalarySlip";
import JDITSalarySlip from "./JDITSalarySlip";
import NeweageSalarySlip from "./NeweageSalarySlip";
import SmartMatrixSalarySlip from "./SmartMatrixSalarySlip";
import SmartSoftwareSalarySlip from "./SmartSoftwareSalarySlip";
import PentaSalarySlip from "./PentaSalarySlip";
import QuickSalarySlip from "../../WithPF/CompanyWisePFLetter/QMSSalarySlip";

// same company ids, just Increment components
const companyComponentMap = {
  //   1: CubeageUnPaidInternshipLetter,
  //   2: NeweageUnPaidInternshipLetter,
  3: SmartMatrixSalarySlip,
  4: DevconsSalarySlip,

  5: RPSalarySlip,
  6: PentaSalarySlip,
  7: NimbjaSalarySlip,
  8: JDITSalarySlip,
    9: QuickSalarySlip,
  //   10:SmartSoftwareUnPaidInternshipLetter,
};

const WithPFLetterTemplate = ({ company, data }) => {
  if (!company) return null;

  const WithPFInternshipComponent = companyComponentMap[company.id];

  if (!WithPFInternshipComponent) {
    return <div>No WithPF template available for this company</div>;
  }

  return <WithPFInternshipComponent company={company} data={data} />;
};

export default WithPFLetterTemplate;
