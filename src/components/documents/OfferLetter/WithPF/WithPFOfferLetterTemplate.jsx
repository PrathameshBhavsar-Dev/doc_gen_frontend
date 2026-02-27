
import React from "react";

import CubeageOffer from "../WithPF/CompanyWiseOffer/CubeageOffer";
import DevconsOffer from "../WithPF/CompanyWiseOffer/DevconsOffer";
import JDITOffer from "../WithPF/CompanyWiseOffer/JDITOffer";
import NeweageOffer from "../WithPF/CompanyWiseOffer/NeweageOffer";
import PentaOffer from "../WithPF/CompanyWiseOffer/PentaOffer";
import RPOffer from "../WithPF/CompanyWiseOffer/RPOffer";
import SmartMatrixOffer from "../WithPF/CompanyWiseOffer/SmartMatrixOffer";
import SmartSoftwareOffer from "../WithPF/CompanyWiseOffer/SmartSoftwareOffer";
import QuickManagementOffer from "../WithPF/CompanyWiseOffer/QuickManagementOffer";
import NimbjaOffer from '../WithPF/CompanyWiseOffer/NimbjaOffer'

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

const WithPFOfferLetterTemplate = ({ company, data }) => {
  
  if (!company) return null;

  const OfferComponent = companyComponentMap[company.id];

  if (!OfferComponent) {
    return <div>No offer letter template available for this company</div>;
  }

  return <OfferComponent company={company} data={data} />;
};

export default WithPFOfferLetterTemplate;
