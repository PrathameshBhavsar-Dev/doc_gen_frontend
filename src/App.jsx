import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./core/contexts/AuthContext";
import { CompanyProvider } from "./core/contexts/CompanyContext";
import { DocumentProvider } from "./core/contexts/DocumentContext";
import ScrollToTop from "./pages/ScrollToTop";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <CompanyProvider>
        <DocumentProvider>
          <BrowserRouter>
            <ScrollToTop />
            <AppRoutes />
          </BrowserRouter>
        </DocumentProvider>
      </CompanyProvider>
    </AuthProvider>
  );
}

export default App;