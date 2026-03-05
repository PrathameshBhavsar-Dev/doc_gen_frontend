// NimbjaOffer.jsx
import React from "react";
import SmartMatrixOfferPage1 from "../../../ExperienceLetter/CompanyWiseExperience/SmartMatrixOfferTemplates/SmartMatrixOfferPage1";
import SmartMatrixOfferPage2 from "../../../ExperienceLetter/CompanyWiseExperience/SmartMatrixOfferTemplates/SmartMatrixOfferPage2";

const SmartMatrixOffer = ({ company, data }) => {
  if (!company || !data) return null;

  return (
    <>
      {/* ================= PAGE 1 : OFFER LETTER ================= */}
      <SmartMatrixOfferPage1 company={company} data={data} />

      {/* ================= PAGE 2 : ANNEXURE / SALARY ================= */}
      <SmartMatrixOfferPage2 company={company} data={data} />
    </>
  );
};

export default SmartMatrixOffer;
