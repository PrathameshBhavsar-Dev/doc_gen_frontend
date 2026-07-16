import React from "react";
import NimbjaOfferPage1 from "../../../ExperienceLetter/CompanyWiseExperience/NimbjaOfferTemplates/NimbjaOfferPage1";
import NimbjaOfferPage2 from "../../../ExperienceLetter/CompanyWiseExperience/NimbjaOfferTemplates/NimbjaOfferPage2";
import A4Page from "../../../../layout/A4Page";

/**
 * NimbjaOffer
 * -------------------------
 * This component ONLY orchestrates pages.
 * No layout, no header/footer logic here.
 */
const NimbjaOffer = ({ company, data }) => {
  if (!company || !data) return null;

  // 👉 MOVE SALARY LOGIC HERE
  const round0 = (num) => Math.round(num);

  const annualCTC = round0(Number(data.joiningCTC || data.salary || 0));
  const monthlyCTC = round0(annualCTC / 12);

  const salaryRows = [
    ["Basic", round0(monthlyCTC * 0.4)],
    ["Bouqet Of Benefits", round0(monthlyCTC * 0.18)],
    ["HRA", round0(monthlyCTC * 0.12)],
    ["City Allowance", round0(monthlyCTC * 0.16)],
    ["Superannuation Fund", round0(monthlyCTC * 0.06)],
    ["Performance Bonus", round0(monthlyCTC * 0.08)],
  ].map(([name, monthly]) => [name, monthly, monthly * 12]);

  const totalMonthly = salaryRows.reduce((s, r) => s + r[1], 0);
  const totalAnnual = salaryRows.reduce((s, r) => s + r[2], 0);

  return (
    <>
      <NimbjaOfferPage1
        company={company}
        data={data}
        salaryRows={salaryRows}
        totalMonthly={totalMonthly}
        totalAnnual={totalAnnual}
      />

      <NimbjaOfferPage2
        company={company}
        data={data}
        salaryRows={salaryRows}
        totalMonthly={totalMonthly}
        totalAnnual={totalAnnual}
      />
    </>
  );
};

export default NimbjaOffer;
