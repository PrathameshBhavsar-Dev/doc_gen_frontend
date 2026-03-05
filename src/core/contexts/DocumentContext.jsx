import { createContext, useState, useContext } from 'react';
import { documentTypes } from '../../components/constant/publicData/mockData.js';

const DocumentContext = createContext();

export { DocumentContext };
export const useDocument = () => useContext(DocumentContext);

export const DocumentProvider = ({ children }) => {
  const [selectedDocType, setSelectedDocType] = useState(null);
  const [documentData, setDocumentData] = useState({});

  const selectDocumentType = (docTypeId) => {
    const docType = documentTypes.find((type) => type.id === docTypeId);
    setSelectedDocType(docType);
    setDocumentData({}); // ✅ Reset form data when doc type changes
  };

  // ✅ Call this from CompanyContext (or DocumentCreate) when company changes
  const resetOnCompanyChange = () => {
    setSelectedDocType(null);
    setDocumentData({});
  };

  const updateDocumentData = (fieldName, value) => {
    setDocumentData((prevData) => {
      const newData = { ...prevData, [fieldName]: value };

      // Auto-calculate Increment Percentage
      if (newData.currentCTC && newData.newCTC) {
        const oldCtc = parseFloat(newData.currentCTC);
        const newCtc = parseFloat(newData.newCTC);
        if (oldCtc > 0) {
          const increment = ((newCtc - oldCtc) / oldCtc) * 100;
          newData.incrementPercentage = increment.toFixed(2);
        } else {
          newData.incrementPercentage = '';
        }
      }

      return newData;
    });
  };

  const resetDocumentData = () => setDocumentData({});

  const value = {
    documentTypes,
    selectedDocType,
    selectDocumentType,
    resetOnCompanyChange,
    documentData,
    updateDocumentData,
    resetDocumentData
  };

  return (
    <DocumentContext.Provider value={value}>
      {children}
    </DocumentContext.Provider>
  );
};