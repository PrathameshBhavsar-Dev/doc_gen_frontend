import React from "react";
import AdminHeroDashboardSection from "../../components/admin/AdminHeroDashboardSection";
import AnalyticSection from "../../components/user/userDashboard/AnalyticSection";
import GeneratedDocumentSection from "../../components/user/userDashboard/GeneratedDocumentSection";

const UserDashboardPage = () => {
  return (
    <div className="min-h-screen">
      <AdminHeroDashboardSection/>
      <AnalyticSection />
      <GeneratedDocumentSection />
    </div>
  );
};

export default UserDashboardPage;
