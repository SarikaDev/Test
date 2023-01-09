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
      root: "userManagement",
      updateUser: "/userManagement/updateUser",
      createUser: "/userManagement/createUser",
      usersList: "/userManagement/usersList",
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

export default PATHS;
