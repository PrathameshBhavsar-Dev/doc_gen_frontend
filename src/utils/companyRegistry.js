import { companies } from "../components/constant/publicData/mockData.js";
// ✅ Resolve full company object from name string
export const resolveCompany = (companyName) => {
  if (!companyName) return null;

  const lower = companyName.toLowerCase().trim();

  const match = companies.find((c) =>
    c.name.toLowerCase().includes(lower) ||
    lower.includes(c.name.toLowerCase()) ||
    c.shortName.toLowerCase().includes(lower) ||
    lower.includes(c.shortName.toLowerCase())
  );

  return match || null; // ✅ returns full company object with id, header, footer, etc.
};

// ✅ Resolve correct type field based on documentType
export const resolveTypeField = (item) => {
  const type = item?.documentType?.toLowerCase();

  if (type?.includes("offer"))        return item?.offerType;
  if (type?.includes("appointment"))  return item?.appointmentType;
  if (type?.includes("increment"))    return item?.incrementType;
  if (type?.includes("confirmation")) return item?.confirmationType;
  if (type?.includes("salary"))       return item?.salaryType;
  if (type?.includes("fullandfinal")) return item?.finalType;
  if (type?.includes("internshipcertificate_letter"))   return item?.internshipType;

  return null;
};