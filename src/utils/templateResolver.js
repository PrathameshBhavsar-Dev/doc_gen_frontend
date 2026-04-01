import ExperienceLetterTemplate from "../components/documents/ExperienceLetter/ExperienceLetterTemplate";
import RelievingLetterTemplate from "../components/documents/RelievingLetter/RelievingLetteTemplate";
import InternshipTemplate from "../components/documents/InternshipLetter/InternshipTemplate";
import CertificationLetterTemplate from "../components/documents/InternshipComplitionCertificate/CertificationLetterTemplate";
import SalarySlipLetterTemplate from "../components/documents/SalarySlip/SalarySlipTemplate";
import IncrementTemplate from "../components/documents/IncrementLetter/IncrementTemplate";
import OfferTemplate from "../components/documents/OfferLetter/OfferLetterTemplate";
import AppointmentLetterTemplate from "../components/documents/AppointmentLeter/AppointmentLetterTemplate";
import ConfirmationLetterTemplate from "../components/documents/ConfirmationLetter/ConfirmationLetterTemplate";
import FullandfinalLetterTemplate from "../components/documents/FullAndFinalLetter/FullandFinalLetterTemplate";

export const getTemplateComponent = (type) => {
  switch (type) {
    case "offer_letter":
      return OfferTemplate;

    case "appointment_letter":
      return AppointmentLetterTemplate;

    case "confirmation_letter":
      return ConfirmationLetterTemplate;

    case "increment_letter":
      return IncrementTemplate;

    case "experience_letter":
      return ExperienceLetterTemplate;

    case "relieving_letter":
      return RelievingLetterTemplate;

    case "internship_letter":
    case "internship_certificate":  // ✅ added
      return InternshipTemplate;

    case "completion_certificate":
      return CertificationLetterTemplate;

    case "salary_slip":             // ✅ fixed (was "salaryslip_letter")
    case "salaryslip_letter":       // ✅ kept for backwards compat
      return SalarySlipLetterTemplate;

    case "full_and_final_letter":   // ✅ fixed (was "fullandfinal_letter")
    case "fullandfinal_letter":     // ✅ kept for backwards compat
      return FullandfinalLetterTemplate;

    default:
      console.warn("No template found for type:", type); // ✅ helpful log
      return null;
  }
};