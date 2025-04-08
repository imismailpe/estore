"use client";

import { signIn, signOut } from "next-auth/react";

export const login = async (method) => {
  await signIn(method, {
    redirectTo: "/",
    callbackUrl: "/"
  }).catch(e => console.log("signIn error:",e));
};

export const logout = async () => {
  await signOut();
}