"use server";

import { signIn } from "@/auth";

export const login = async (email: string, password: string) => {
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return {
      ok: true,
      message: "Inicio de sesión exitoso",
    };
  } catch (error) {
    return {
      ok: false,
      message: "No se pudo iniciar sesión",
    };
  }
};
