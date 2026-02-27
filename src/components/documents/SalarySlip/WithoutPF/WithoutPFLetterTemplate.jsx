import React from "react";

 import CubeageSalarySlip from "../WithoutPF/CompanyWisePFLetter/CubeageSalarySlip";
 import JDITSalarySlip from "../WithoutPF/CompanyWisePFLetter/JDITSalarySlip";
 import NeweageSalarySlip from "../WithoutPF/CompanyWisePFLetter/NeweageSalarySlip";
 import PentaSalarySlip from "../WithoutPF/CompanyWisePFLetter/PentaSalarySlip";
import DevconsSalarySlip from "../WithoutPF/CompanyWisePFLetter/DevconsSalarySlip";
import RPSalarySlip from "../WithoutPF/CompanyWisePFLetter/RPSalarySlip";
import NimbjaSalarySlip from "../WithoutPF/CompanyWisePFLetter/NimbjaSalarySlip";
 import SmartMatrixSalarySlip from "../WithoutPF/CompanyWisePFLetter/SmartMatrixSalarySlip";
 import SmartSoftwareSalarySlip from "../WithoutPF/CompanyWisePFLetter/SmartSoftwareSalarySlip";
import QuickSalarySlip from "../WithoutPF/CompanyWisePFLetter/QuickSalarySlip";


const companyComponentMap = {
   1: CubeageSalarySlip,
   2: NeweageSalarySlip,
   3: SmartMatrixSalarySlip,
   4: DevconsSalarySlip,
   5: RPSalarySlip,
   6: PentaSalarySlip,
   7: NimbjaSalarySlip,
   8: JDITSalarySlip,
   9: QuickSalarySlip,
   10: SmartSoftwareSalarySlip,
};

const SalarySlipTemplate = ({ company, data }) => {
  if (!company) return null;

  const SalarySlipComponent = companyComponentMap[company.id];

  if (!SalarySlipComponent) {
    return <div>No salary slip template available</div>;
  }

  return <SalarySlipComponent company={company} data={data} />;
};

export default SalarySlipTemplate;
