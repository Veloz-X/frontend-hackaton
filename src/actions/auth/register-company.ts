"use server";

export const registerCompanyApi = async (
  email: string,
  fullName: string,
  roles: any,
  password: string,
  data: any
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        fullName: fullName,
        roles: roles,
        password: password,
        data: data,
      }),
    }
  );
  const message = await res.json();

  return {
    status: true,
    message: message.message,
  };
};
