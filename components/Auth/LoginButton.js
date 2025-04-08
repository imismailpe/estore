"use client"

import { signIn } from "next-auth/react";

const LoginButton = ({ method, ...rest }) => {
  const onLogin = async () => {
    await signIn(method, {
        redirectTo: "/",
        callbackUrl: "/"
      }).catch(e => console.log("signIn error:",e));
  }
  return <button onClick={onLogin}>{rest.children}</button>;
};
export default LoginButton;
