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

  return (
    <>
      {/* ================= PAGE 1 : OFFER LETTER ================= */}

      <NimbjaOfferPage1 company={company} data={data} />

      {/* ================= PAGE 2 : ANNEXURE / SALARY ================= */}
      <NimbjaOfferPage2 company={company} data={data} />
    </>
  );
};

export default NimbjaOffer;
