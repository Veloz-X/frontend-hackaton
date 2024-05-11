"use server";

import { auth } from "@/auth.config";

export const getProjectId = async (id: string) => {
  try {
    const session = await auth();
    if (!session?.user) {
      throw new Error("Debe estar autenticado");
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/projects/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.user.token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Error al obtener el proyecto: ${res.statusText}`);
    }

    const project = await res.json();

    return {
      status: project.status,
      project: project.data,
    };
  } catch (error: any) {
    return {
      status: false,
      message: error.message || "Error al obtener el proyecto",
    };
  }
};
