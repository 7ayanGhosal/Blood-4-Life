import React from "react";
const authContext = React.createContext({
  firstName: "",
  lastName: "",
  email: "",
  pass: "",
  gender: "",
  age: "",
  bloodGroup: "",
  rhFactor: "",
  isHospital: false,
  reqDonor: "",
  authenticated: false,
});

export default authContext;
