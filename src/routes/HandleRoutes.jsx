import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import PATHS from "../utils/constants";

const LoginPage = lazy(() => import("../Pages/AccessPoint/Login"));
const LoginTypesPage = lazy(() => import("../Pages/AccessPoint/LoginTypes"));
const PasswordPage = lazy(() => import("../Pages/AccessPoint/Password"));
const FacePage = lazy(() => import("../Pages/AccessPoint/Face"));
const MenuBar = lazy(() => import("../Pages/Global/MenuBar"));
const DashboardPage = lazy(() => import("../Pages/Port/Dashboard/Dashboard"));
const UserList = lazy(() => import("../Pages/Port/userManagement/UserList"));
const CreateUser = lazy(() =>
  import("../Pages/Port/userManagement/CreateUser"),
);
const UpdateUser = lazy(() =>
  import("../Pages/Port/userManagement/UpdateUser"),
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
      <Route
        path={PATHS.Ports.userManagement.usersList}
        element={<UserList />}
      />
      <Route
        path={PATHS.Ports.userManagement.createUser}
        element={<CreateUser />}
      />
      <Route
        path={PATHS.Ports.userManagement.updateUser}
        element={<UpdateUser />}
      />
    </Route>
  </Routes>
);

export default HandleRoutes;
