import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import PATHS from "../utils/constants";

const LoginPage = lazy(() => import("../Pages/AccessPoint/Login"));
const LoginTypesPage = lazy(() => import("../Pages/AccessPoint/LoginTypes"));
const PasswordPage = lazy(() => import("../Pages/AccessPoint/Password"));
const FacePage = lazy(() => import("../Pages/AccessPoint/Face"));
const MenuBar = lazy(() => import("../Pages/Global/MenuBar"));
const DashboardPage = lazy(() => import("../Pages/Port/Dashboard/Dashboard"));
const UserList = lazy(() => import("../Pages/Port/UserManagement/UserList"));
const CreateUser = lazy(() =>
  import("../Pages/Port/UserManagement/CreateUser"),
);
const UpdateUser = lazy(() =>
  import("../Pages/Port/UserManagement/UpdateUser"),
);
const RegistrationsPage = lazy(() =>
  import("../Pages/Port/Datasets/Registrations"),
);
const UsersPage = lazy(() => import("../Pages/Port/Datasets/Users"));
const AuditTrailsPage = lazy(() =>
  import("../Pages/Port/Datasets/AuditTrails"),
);
const DeviceRegistrationsPage = lazy(() =>
  import("../Pages/Port/DeviceRegistrations/Registrations"),
);
const ActivationPage = lazy(() =>
  import("../Pages/Port/DeviceRegistrations/Activation"),
);

// const RouteArr = [
//   { path: PATHS.AccessPoint.login, element: <LoginPage /> },
//   { path: PATHS.AccessPoint.loginTypes, element: <LoginTypesPage /> },
//   { path: PATHS.AccessPoint.password, element: <PasswordPage /> },
//   { path: "/dashboard", element: <DashboardPage /> },
//   { path: "/menubar", element: <MenuBar /> },
//   // {
//   //   element: <LoginPage />,
//   //   children: [
//   //     {
//   //       path: "/",
//   //       element: <LoginPage />,
//   //     },
//   //     { path: "/loginTypes", element: <LoginTypesPage /> },
//   //     {
//   //       element: <LoginPage />,
//   //       children: [
//   //         {
//   //           path: "/",
//   //           element: <LoginPage />,
//   //         },
//   //       ],
//   //     },
//   //   ],
//   // },
// ];

const HandleRoutes = () => (
  <Routes>
    <Route path={PATHS.AccessPoint.login} element={<LoginPage />} />

    <Route path={PATHS.AccessPoint.loginTypes} element={<LoginTypesPage />} />
    <Route path={PATHS.AccessPoint.password} element={<PasswordPage />} />
    <Route path={PATHS.AccessPoint.face} element={<FacePage />} />
    <Route element={<MenuBar />}>
      <Route path={PATHS.Ports.dashboard} element={<DashboardPage />} />
      <Route path={PATHS.Ports.userManagement.root} element={<UserList />} />
      <Route
        path={PATHS.Ports.userManagement.createUser}
        element={<CreateUser />}
      />
      <Route
        path={`${PATHS.Ports.userManagement.root}/edit/:mobileNumber`}
        element={<UpdateUser />}
      />
      <Route
        path={PATHS.Ports.datasets.registrations}
        element={<RegistrationsPage />}
      />
      <Route
        path={PATHS.Ports.datasets.registrations}
        element={<RegistrationsPage />}
      />
      <Route path={PATHS.Ports.datasets.users} element={<UsersPage />} />
      <Route
        path={PATHS.Ports.datasets.auditTrails}
        element={<AuditTrailsPage />}
      />
      <Route
        path={PATHS.Ports.deviceManagement.registrations}
        element={<DeviceRegistrationsPage />}
      />
      <Route
        path={PATHS.Ports.deviceManagement.Activation}
        element={<ActivationPage />}
      />
    </Route>
  </Routes>
);

export default HandleRoutes;
