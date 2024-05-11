"use server";

import { auth } from "@/auth.config";

export const getProjectId = async (id: string) => {
  const session = await auth();
  if (!session?.user) {
    return {
      status: false,
      message: "Debe de estar autenticado",
    };
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/projects/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user?.token}`,
      },
      next: { revalidate: 10000 },
    }
  );
  const project = await res.json();
  console.log(res);

  return {
    status: true,
    project: project,
  };
};
