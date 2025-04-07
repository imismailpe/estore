"use server";

import { signIn, signOut } from "next-auth/react";

export const login = async (method) => {
  await signIn(method, {
    redirectTo: "/"
  });
};

export const logout = async () => {
  await signOut();
}