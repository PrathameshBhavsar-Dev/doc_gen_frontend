import React from "react";
// import PaidInternshipLetterTemplate from "./PaidIntershipLetter/PaidInternshipTemplate";
// import UnPaidInternshipLetterTemplate from "./UnpaidIntershipLetter/UnpaidinternshipTemplate";
// import WithPFIncrementLetterTemplate from "../IncrementLetter/WithPF/WithPFIncrementTemplate";
// import WithoutPFIncrementLetterTemplate from "../IncrementLetter/WithoutPF/WithoutPFIncrementTemplate";
import WithoutPFOfferLetterTemplate from "./WithoutPF/WithoutPFOfferLetterTemplate";
import WithPFOfferLetterTemplate from "./WithPF/WithPFOfferLetterTemplate";


const OfferTemplate = ({ company, data }) => {
  // 🔑 This value must come from form / documentData
  const OfferType = data?.offerType; // "paid" | "unpaid"

  if (!OfferType) {
    return <div>PFTypename type not selected</div>;
  }

  if (OfferType === "withPF") {
    return <WithPFOfferLetterTemplate company={company} data={data} />;
  }

  if (OfferType === "withoutPF") {
    return <WithoutPFOfferLetterTemplate company={company} data={data} />;
  }

  return <div>Invalid Offer type</div>;
};

export default OfferTemplate;
