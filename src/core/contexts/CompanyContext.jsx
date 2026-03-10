import { createContext, useState, useContext } from 'react';
import { companies as initialCompanies } from '../../components/constant/publicData/mockData.js';

const CompanyContext = createContext();

export { CompanyContext };
export const useCompany = () => useContext(CompanyContext);

export const CompanyProvider = ({ children }) => {
  const [companies, setCompanies] = useState(initialCompanies);
  const [selectedCompany, setSelectedCompany] = useState(null);

  // ✅ Removed useDocument() from here — caused circular context dependency.
  // Reset is now handled in DocumentCreate when company changes.
  // ✅ FIXED — coerce to number before comparing
  const selectCompany = (companyId) => {
    console.log("🔍 selectCompany called with:", companyId, typeof companyId);
    console.log("🔍 all company ids:", companies.map(c => `${c.id} (${typeof c.id})`));
    const company = companies.find((company) => company.id === Number(companyId));
    console.log("🔍 found company:", company);
    setSelectedCompany(company);
  };
  const updateCompany = (companyId, updatedData) => {
    setCompanies(prevCompanies =>
      prevCompanies.map(company =>
        company.id === companyId
          ? { ...company, ...updatedData }
          : company
      )
    );

    if (selectedCompany && selectedCompany.id === companyId) {
      setSelectedCompany({ ...selectedCompany, ...updatedData });
    }
  };

  const value = {
    companies,
    selectedCompany,
    selectCompany,
    updateCompany
  };

  return <CompanyContext.Provider value={value}>{children}</CompanyContext.Provider>;
};