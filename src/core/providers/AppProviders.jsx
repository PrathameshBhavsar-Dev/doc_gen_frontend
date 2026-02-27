import React from "react";
import { AuthProvider } from "../contexts/AuthContext";
import { CompanyProvider } from "../contexts/CompanyContext";
import { DocumentProvider } from "../contexts/DocumentContext";

const AppProviders = ({ children }) => {
  return (
    <AuthProvider>
      <CompanyProvider>
        <DocumentProvider>
          {children}
        </DocumentProvider>
      </CompanyProvider>
    </AuthProvider>
  );
};

export default AppProviders;