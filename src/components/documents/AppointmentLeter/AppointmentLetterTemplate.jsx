import React from "react";
import WithPFAppointmentLetterTemplate from "./WithPF/WithPFAppointmentLetterTemplate";
import WithoutPFAppointmentLetterTemplate from "./WithoutPF/WithoutPFAppointmentLetterTemplate";


const AppointmentLetterTemplate = ({ company, data }) => {
  // 🔑 This value must come from form / documentData
  const AppointmentType = data?.appointmentType; // "paid" | "unpaid"

  if (!AppointmentType) {
    return <div>appointment type not selected</div>;
  }

  if (AppointmentType === "withPF") {
    return <WithPFAppointmentLetterTemplate company={company} data={data} />;
  }

  if (AppointmentType === "withoutPF") {
    return <WithoutPFAppointmentLetterTemplate company={company} data={data} />;
  }

  return <div>Invalid Appointment type</div>;
};

export default AppointmentLetterTemplate;
