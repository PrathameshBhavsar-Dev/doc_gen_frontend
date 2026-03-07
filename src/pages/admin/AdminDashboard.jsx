import React from "react";
import HeroDashBoardSection from "../../components/user/userDashboard/HeroDashBoardSection";
import AnalyticSection from "../../components/user/userDashboard/AnalyticSection";
import GeneratedDocumentSection from "../../components/user/userDashboard/GeneratedDocumentSection";

const UserDashboardPage = () => {
  return (
    <div className="min-h-screen">
      <HeroDashBoardSection />
      
      <AnalyticSection />
      <GeneratedDocumentSection />
    </div>
  );
};

export default UserDashboardPage;
