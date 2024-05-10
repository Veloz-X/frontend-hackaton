"use server";

import { auth } from "@/auth.config";

export const getDataUser = async () => {
  const session = await auth();

  if (!session?.user) {
    return {
      ok: false,
      message: "Debe de estar autenticado",
    };
  }
  return {
    ok: true,
    user: session?.user,
  };
};