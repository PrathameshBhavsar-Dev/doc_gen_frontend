import React from "react";
import { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import ROUTES from "../core/constants/routes.constant";
import { LazyLoad } from "../core";

import UserLayout from "../components/layout/UserLayout";
import AdminLayout from "../components/layout/AdminLayout";

/* ======================= AUTH ======================= */
const Login = lazy(() => import("../pages/auth/Login"));
const Signup = lazy(() => import("../pages/auth/Signup"));

/* ======================= ADMIN ======================= */
const AdminDashboard = lazy(() => import("../pages/admin/AdminDashboard"));
const AdminHistoryPage = lazy(() => import("../pages/admin/AdminHistoryPage"));
const AdminUserManagementPage = lazy(
  () => import("../pages/admin/AdminUserManagementPage"),
);
const AdminCompanyManagementPage = lazy(
  () => import("../pages/admin/AdminCompanyManagementPage"),
);
const AdminSettingPage = lazy(() => import("../pages/admin/AdminSettingPage"));
const AdminAddCompany = lazy(() => import("../components/admin/companyManagement/AddCompany"));

/* ======================= USER ======================= */
const UserDashboardPage = lazy(() => import("../pages/user/UserDashboardPage"));
const UserHistoryPage = lazy(() => import("../pages/user/UserHistoryPage"));
const UserProfilePage = lazy(() => import("../pages/user/UserProfilePage"));
const UserSettingsPage = lazy(() => import("../pages/user/UserSettingPage"));
const UserDetailPage = lazy(() => import("../pages/user/UserDetailPage"));
const UserDocumentFormPage = lazy(
  () => import("../pages/user/UserDocumentFormPage"),
);

/* ======================= DOCUMENT ======================= */
const DocumentCreate = lazy(
  () => import("../components/constant/DocumentCreate"),
);
const DocumentPreview = lazy(
  () => import("../components/constant/DocumentPreview"),
);

const AppRoutes = () => {
  return (
    <Routes>
      {/* ================= AUTH ROUTES ================= */}
      <Route path={ROUTES.LOGIN} element={<LazyLoad component={Login} />} />
      <Route path={ROUTES.SIGNUP} element={<LazyLoad component={Signup} />} />

      {/* ================= USER ROUTES ================= */}
      <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
        <Route element={<UserLayout />}>
          <Route
            path={ROUTES.USER_DASHBOARD}
            element={<LazyLoad component={UserDashboardPage} />}
          />
          <Route
            path={ROUTES.USER_HISTORY}
            element={<LazyLoad component={UserHistoryPage} />}
          />
          <Route
            path={ROUTES.USERDOCUMENT_DETAIL}
            element={<LazyLoad component={UserDetailPage} />}
          />
          <Route
            path={ROUTES.USER_FORM}
            element={<LazyLoad component={UserDocumentFormPage} />}
          />
          <Route
            path={ROUTES.USER_PROFILE}
            element={<LazyLoad component={UserProfilePage} />}
          />
          <Route
            path={ROUTES.USER_SETTINGS}
            element={<LazyLoad component={UserSettingsPage} />}
          />
        </Route>
      </Route>

      {/* ================= ADMIN ROUTES ================= */}
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route element={<AdminLayout />}>
          <Route
            path={ROUTES.ADMIN_DASHBOARD}
            element={<LazyLoad component={AdminDashboard} />}
          />
          <Route
            path={ROUTES.ADMIN_COMPANY_MANAGEMENT}
            element={<LazyLoad component={AdminCompanyManagementPage} />}
          />
          <Route
            path={`${ROUTES.ADMIN_USER_MANAGEMENT}/*`}
            element={<LazyLoad component={AdminUserManagementPage} />}
          />
          <Route
            path={ROUTES.ADMIN_HISTORY}
            element={<LazyLoad component={AdminHistoryPage} />}
          />
          <Route
            path={ROUTES.ADMIN_SETTINGS}
            element={<LazyLoad component={AdminSettingPage} />}
          />
        </Route>
      </Route>

      {/* ================= DOCUMENT ROUTES ================= */}
      <Route element={<ProtectedRoute allowedRoles={["user", "admin"]} />}>
        <Route
          path={ROUTES.DOCUMENT_CREATE}
          element={<LazyLoad component={DocumentCreate} />}
        />
        <Route
          path={ROUTES.DOCUMENT_PREVIEW}
          element={<LazyLoad component={DocumentPreview} />}
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
