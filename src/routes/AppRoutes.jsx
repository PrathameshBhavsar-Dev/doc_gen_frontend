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

/* ======================= USER ======================= */
const UserDashboardPage = lazy(() => import("../pages/user/UserDashboardPage"));
const UserHistoryPage = lazy(() => import("../pages/user/UserHistoryPage"));
const UserProfilePage = lazy(() => import("../pages/user/UserProfilePage"));
const UserSettingsPage = lazy(() => import("../pages/user/UserSettingPage"));
const UserDetailPage = lazy(() => import("../pages/user/UserDetailPage"));
const UserDocumentFormPage = lazy(
  () => import("../pages/user/UserDocumentFormPage"),
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
        </Route>
      </Route>

      {/* ================= DOCUMENTS ROUTE ================= */}
    </Routes>
  );
};

export default AppRoutes;
