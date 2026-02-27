import React from "react";

import CubeageAppointment from "../WithPF/CompanyWiseAppointment/CubeageAppointment";
import DevconsAppointment from "../WithPF/CompanyWiseAppointment/DevconsAppointment";
import JDITAppointment from "../WithPF/CompanyWiseAppointment/JDITAppointment";
import NeweageAppointment from "../WithPF/CompanyWiseAppointment/NeweageAppointment";
import PentaAppointment from "../WithPF/CompanyWiseAppointment/PentaAppointment";
import RPAppointment from "../WithPF/CompanyWiseAppointment/RPAppointment";
import SmartMatrixAppointment from "../WithPF/CompanyWiseAppointment/SmartMatrixAppointment";
import SmartSoftwareAppointment from "../WithPF/CompanyWiseAppointment/SmartSoftwareAppointment";
import NimbjaAppointment from "../WithPF/CompanyWiseAppointment/NimbjaAppointment";
//import SmartMatrixAppointment from "../WithoutPF/CompanyWiseAppointment/SmartmatrixAppointment";
import QuickAppointment from "../WithPF/CompanyWiseAppointment/QuickAppointment";


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

const WithPFAppointmentLetterTemplate = ({ company, data }) => {
  if (!company) return null;

  const AppointmentComponent = companyComponentMap[company.id];

  if (!AppointmentComponent) {
    return <div>No WithoutPF-Appointment template available for this company</div>;
  }

  return <AppointmentComponent company={company} data={data} />;
};

export default WithPFAppointmentLetterTemplate;
