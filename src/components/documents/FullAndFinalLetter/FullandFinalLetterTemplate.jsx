import React from "react";

import WithoutPFFullandfinalTemplate from "./WithoutPF/WithoutPFFullandfinalTemplate";
import WithPFFullandfinalTemplate from "./WithPF/WithPFFullandfinalTemplate";


const FullandfinalLetterTemplate = ({ company, data }) => {
  // 🔑 This value must come from form / documentData
  const FinalType = data?.finalType; // "paid" | "unpaid"

  if (!FinalType) {
    return <div>Final type not selected</div>;
  }

  if (FinalType === "withPF") {
    return <WithPFFullandfinalTemplate company={company} data={data} />;
  }

  if (FinalType === "withoutPF") {
    return <WithoutPFFullandfinalTemplate company={company} data={data} />;
  }

  return <div>Invalid Offer type</div>;
};

export default FullandfinalLetterTemplate;
