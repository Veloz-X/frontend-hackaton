"use client";

import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { LogOut, PlusCircleIcon, UserSearchIcon } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ModeToggle } from "@/components/mode-toggle";

const inter = Inter({ subsets: ["latin"] });

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <div className=" mx-auto flex justify-between  pt-4 px-4">
          <div className="font-semibold my-auto px-3 text-xl flex">
          <UserSearchIcon className="w-8 h-8 mr-2 my-auto" />
            <p className="my-auto">TalentLink - Administrador</p>
          </div>
          <div className="flex space-x-2">
            <ModeToggle />
            <Dialog>
              <DialogTrigger asChild>
                <Button className="justify-start font-normal">
                  <PlusCircleIcon className="mr-2 h-6 w-6 my-auto" />
                  <p className="font-semibold text-base my-auto">
                    Crear Proyecto
                  </p>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Cear Proyecto</DialogTitle>
                </DialogHeader>
                <div>
                  <div className="space-y-1">
                    <Label htmlFor="description">Descripcion:</Label>
                    <Input id="description" type="text" />
                  </div>
                  <div className="flex space-x-2">
                    <div className="space-y-1">
                      <Label htmlFor="data">Fecha Inicio:</Label>
                      <Input id="data" type="text" placeholder="10/05/2024" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="data">Fecha Finalizacion:</Label>
                      <Input id="data" type="text" placeholder="10/12/2024" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="objetivo">Objetivo:</Label>
                    <Textarea
                      id="objetivo"
                      placeholder="Tengo 5 años de experiencia en desarrollo web..."
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="requerimiento">Requerimientos:</Label>
                    <Textarea
                      id="requerimiento"
                      placeholder="Tengo 5 años de experiencia en desarrollo web..."
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="profilep">Perfil Profesional:</Label>
                    <Textarea
                      id="profilep"
                      placeholder="Tengo 5 años de experiencia en desarrollo web..."
                    />
                  </div>
                </div>

                <DialogFooter>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button
              onClick={() => signOut()}
              className=" justify-start font-normal "
            >
              <LogOut className="mr-3 h-6 w-6 my-auto" />
              <p className="font-semibold text-base my-auto">Cerrar Sesión</p>
            </Button>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
