import React from "react";
import ButtonLogout from "../components/ButtonLogout/ButtonLogout";

const ProtectedPage = () => {
  return (
    <div>
      <h1>Protected</h1>
      <ButtonLogout />
    </div>
  );
};

export default ProtectedPage;
