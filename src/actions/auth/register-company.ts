"use server";

export const registerCompanyApi = async (
  email: string,
  fullName: string,
  roles: any,
  password: string,
  phone: string,
  hoursavailable: string,
  location: string,
  bio: string
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
        phone: phone,
        hoursavailable: hoursavailable,
        location: location,
        bio: bio,
      }),
    }
  );
  const message = await res.json();

  return {
    status: true,
    message: message.message,
  };
};
