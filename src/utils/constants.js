const PATHS = {
  AccessPoint: {
    login: "/",
    loginTypes: "/loginTypes",
    face: "/face",
    password: "/password",
  },
  Ports: {
    dashboard: "/dashboard",
    userManagement: {
      root: "/userManagement",
      updateUser: "/userManagement/updateUser",
      createUser: "/userManagement/createUser",
      usersList: "/userManagement/usersList",
    },
    datasets: {
      root: "/datasets",
      registrations: "/datasets/registrations",
      users: "/datasets/users",
      auditTrails: "/datasets/auditTrails",
    },
  },
};

export const URL = {
  AccessPoint: {
    login: "/user/credential",
    password: "/user/",
    face: "/user/",
    finger: "/user/",
  },
  Ports: {
    branch: "/profile/customer/branch",
    district: "/profile/customer/district",
  },
};

export const SM_WIDTH = 1100;

export default PATHS;
