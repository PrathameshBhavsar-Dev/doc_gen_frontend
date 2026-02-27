import React from "react";

import CubeageAppointment from "../WithoutPF/CompanyWiseAppointment/CubeageAppointment";
import DevconsAppointment from "../WithoutPF/CompanyWiseAppointment/DevconsAppointment";
import JDITAppointment from "../WithoutPF/CompanyWiseAppointment/JDITAppointment";
import NeweageAppointment from "../WithoutPF/CompanyWiseAppointment/NeweageAppointment";
import PentaAppointment from "../WithoutPF/CompanyWiseAppointment/PentaAppointment";
import RPAppointment from "../WithoutPF/CompanyWiseAppointment/RPAppointment";
import SmartMatrixAppointment from "../WithoutPF/CompanyWiseAppointment/SmartmatrixAppointment";
import SmartSoftwareAppointment from "../WithoutPF/CompanyWiseAppointment/SmartsoftwareAppointment";
import NimbjaAppointment from "../WithoutPF/CompanyWiseAppointment/NimbjaAppointment";
import QuickAppointment from "../WithoutPF/CompanyWiseAppointment/QuickAppointment";


// map company shortName OR id to component
const companyComponentMap = {
  1: CubeageAppointment,
  2: NeweageAppointment,
  3: SmartMatrixAppointment,
  4: DevconsAppointment,
  5: RPAppointment,
  6: PentaAppointment,
  7: NimbjaAppointment,
  8: JDITAppointment,
  9: QuickAppointment,
  10: SmartSoftwareAppointment,
};

const WithoutPFAppointmentLetterTemplate = ({ company, data }) => {
  if (!company) return null;

  const AppointmentComponent = companyComponentMap[company.id];

  if (!AppointmentComponent) {
    return <div>No WithoutPF-Appointment template available for this company</div>;
  }

  return <AppointmentComponent company={company} data={data} />;
};

export default WithoutPFAppointmentLetterTemplate;
