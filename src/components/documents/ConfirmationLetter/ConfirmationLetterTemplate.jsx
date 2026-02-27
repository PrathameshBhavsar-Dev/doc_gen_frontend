import React from "react";
import WithoutPFConfirmationLetterTemplate from "./WithoutPF/WithoutPFConfirmationLetterTemplate";
import WithPFConfirmationLetterTemplate from "./WithPF/WithPFConfirmationLetterTemplate";




const ConfirmationLetterTemplate = ({ company, data }) => {
  // 🔑 This value must come from form / documentData
  const ConfirmationType = data?.confirmationType; // "paid" | "unpaid"

  if (!ConfirmationType){
    return <div>appointment type not selected</div>;
  }

  if (ConfirmationType === "withPF") {
    return <WithPFConfirmationLetterTemplate company={company} data={data} />;
  }

  if (ConfirmationType === "withoutPF") {
    return <WithoutPFConfirmationLetterTemplate company={company} data={data} />;
  }

  return <div>Invalid Confirmation type</div>;
};

export default ConfirmationLetterTemplate;
