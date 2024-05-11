"use server";

import { auth } from "@/auth.config";

export const admissionsId = async (id: string) => {
  const session = await auth();
  if (!session?.user) {
    return {
      status: false,
      message: "Debe de estar autenticado",
    };
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/projects/postulate/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user?.token}`,
      },
    }
  );
  const mesage = await res.json();
  console.log(mesage);

  return {
    status: true,
    mesage: mesage,
  };
};
