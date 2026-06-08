import React from "react";

import CubeageSalarySlip from "./CompanyWisePFLetter/CubeageSalarySlip";
import JDITSalarySlip from "./CompanyWisePFLetter/JDITSalarySlip";
import NeweageSalarySlip from "./CompanyWisePFLetter/NeweageSalarySlip";
import PentaSalarySlip from "./CompanyWisePFLetter/PentaSalarySlip";
import DevconsSalarySlip from "./CompanyWisePFLetter/DevconsSalarySlip";
import RPSalarySlip from "./CompanyWisePFLetter/RPSalarySlip";
import NimbjaSalarySlip from "./CompanyWisePFLetter/NimbjaSalarySlip";
import SmartMatrixSalarySlip from "./CompanyWisePFLetter/SmartMatrixSalarySlip";
import SmartSoftwareSalarySlip from "./CompanyWisePFLetter/SmartSoftwareSalarySlip";
import QuickSalarySlip from "./CompanyWisePFLetter/QuickSalarySlip";

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
  const updatedData = {
    ...data,

    // ✅ keep already-converted monthly salary
    totalSalary: data.totalSalary || Math.round(Number(data.salary || 0) / 12),
  };

  // ✅ render actual salary slip component
  return <SalarySlipComponent company={company} data={updatedData} />;
};

export default SalarySlipTemplate;
