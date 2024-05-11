"use client";

import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { LogOut, UserSearchIcon } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <div className=" mx-auto flex justify-between  pt-4 px-4">
          <a href="/user">
            <div className="font-semibold my-auto px-3 text-xl flex">
              <UserSearchIcon className="w-8 h-8 mr-2 my-auto" />
              <p className="my-auto">TalentLink - Administrador</p>
            </div>
          </a>
          <Button
            onClick={() => signOut()}
            className=" justify-start font-normal "
          >
            <LogOut className="mr-3 h-6 w-6 my-auto" />
            <p className="font-semibold text-base my-auto">Cerrar Sesión</p>
          </Button>
        </div>
        {children}
      </body>
    </html>
  );
}
