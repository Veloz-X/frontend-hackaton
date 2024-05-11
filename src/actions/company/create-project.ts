"use server";

import { auth } from "@/auth.config";

export const createProject = async (
  startDate: string,
  finishDate: string,
  name: string,
  description: string,
  scopes: string,
  objective: string,
  budget: string,
  requirements: string,
  team_profile: string
) => {
  const session = await auth();
  if (!session?.user) {
    return {
      status: false,
      message: "Debe de estar autenticado",
    };
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/projects/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user?.token}`,
    },
    body: JSON.stringify({
      startDate: startDate,
      finishDate: finishDate,
      description: description,
      scopes: scopes,
      objective: objective,
      budget: budget,
      requirements: requirements,
      team_profile: team_profile,
    }),
  });
  const response = await res.json();

  console.log(response);

//   return {
//     status: true,
//     response: response,
//   };
};
