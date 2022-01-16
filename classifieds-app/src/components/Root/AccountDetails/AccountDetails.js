import React, { useState } from "react";
import { useSelector } from "react-redux";

import Account from "../Account";
import Login from "../Login";
import SignUp from "../SignUp";

const AccountDetails = () => {
  const session = useSelector((state) => state.session);
  const [signingUp, setSigningUp] = useState(false);

  if (session) return <Account />;
  return signingUp ? (
    <SignUp onChangeToLogin={() => setSigningUp(false)} />
  ) : (
    <Login onChangeToSignUp={() => setSigningUp(true)} />
  );
};

export default AccountDetails;
