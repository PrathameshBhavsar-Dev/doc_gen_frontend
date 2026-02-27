import { createContext, useState, useContext } from 'react';
import { companies as initialCompanies } from '../../components/constant/publicData/mockData.js';

const CompanyContext = createContext();

export { CompanyContext };
export const useCompany = () => useContext(CompanyContext);

export const CompanyProvider = ({ children }) => {
  const [companies, setCompanies] = useState(initialCompanies);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const selectCompany = (companyId) => {
    const company = companies.find((company) => company.id === companyId);
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
    
    // Update selected company if it's the one being updated
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