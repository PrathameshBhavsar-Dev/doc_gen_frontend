import React from "react";

import CubeageOffer from "../WithoutPF/CompanyWiseOffer/CubeageOffer";
import DevconsOffer from "../WithoutPF/CompanyWiseOffer/DevconsOffer";
import JDITOffer from "../WithoutPF/CompanyWiseOffer/JDITOffer";
import NeweageOffer from "../WithoutPF/CompanyWiseOffer/NeweageOffer";
import PentaOffer from "../WithoutPF/CompanyWiseOffer/PentaOffer";
import RPOffer from "../WithoutPF/CompanyWiseOffer/RPOffer";
import SmartMatrixOffer from "../WithoutPF/CompanyWiseOffer/SmartMatrixOffer";
import SmartSoftwareOffer from "../WithoutPF/CompanyWiseOffer/SmartSoftwareOffer";
import QuickManagementOffer from "../WithoutPF/CompanyWiseOffer/QuickManagementOffer";
import NimbjaOffer from '../WithoutPF/CompanyWiseOffer/NimbjaOffer'

// same company ids, Offer components
const companyComponentMap = {
  1: CubeageOffer,
  2: NeweageOffer,
  3: SmartMatrixOffer,
  4: DevconsOffer,
  5: RPOffer,
  6: PentaOffer,
  7: NimbjaOffer,
  8: JDITOffer,
  9: QuickManagementOffer,
  10: SmartSoftwareOffer,
};

const WithoutPFOfferLetterTemplate = ({ company, data }) => {
  
  if (!company) return null;

  const OfferComponent = companyComponentMap[company.id];

  if (!OfferComponent) {
    return <div>No offer letter template available for this company</div>;
  }

  return <OfferComponent company={company} data={data} />;
};

export default WithoutPFOfferLetterTemplate;
