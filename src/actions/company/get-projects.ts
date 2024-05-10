"use server";

import { auth } from "@/auth.config";

export const getProjects = async () => {
  const session = await auth();

  if (!session?.user) {
    return {
      status: false,
      message: "Debe de estar autenticado",
    };
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/projects`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user?.token}`,
    },
  });
  const projects = await res.json();
  console.log(projects);

  return {
    status: true,
    projects: projects,
  };
};
