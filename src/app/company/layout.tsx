"use client";

import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import {
  FilePlusIcon,
  LogOut,
  PlusCircleIcon,
  UserSearchIcon,
} from "lucide-react";
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
import { useState, useEffect, Suspense } from "react";
import { createProject } from "@/actions";
import { toast } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [createProjectData, setCreateProjectData] = useState({
    startDate: "",
    finishDate: "",
    name: "",
    description: "",
    scopes: "",
    objective: "",
    budget: "",
    requirements: "",
    team_profile: "",
  });

  const handleSubmitUser = async () => {
    const message = await createProject(
      createProjectData.startDate,
      createProjectData.finishDate,
      createProjectData.description,
      createProjectData.budget,
      createProjectData.objective,
      createProjectData.requirements,
      createProjectData.team_profile
    );
    toast("Crear Project", {
      description: message.message,
      duration: 5000,
    });
  };

  const handleCreateProject = (field: any, value: any) => {
    setCreateProjectData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <html lang="es">
      <body className={inter.className}>
        <div className=" mx-auto flex justify-between  pt-4 px-4">
          <a href="/company">
            <div className="font-semibold my-auto px-3 text-xl flex">
              <UserSearchIcon className="w-8 h-8 mr-2 my-auto" />
              <p className="my-auto">TalentLink - Administrador</p>
            </div>
          </a>
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
                {/* <pre>{JSON.stringify(createProjectData)}</pre> */}
                <DialogHeader>
                  <DialogTitle>Cear Proyecto</DialogTitle>
                </DialogHeader>
                <div>
                  <div className="space-y-1">
                    <Label htmlFor="description">Presupuesto:</Label>
                    <Input
                      id="description"
                      type="text"
                      placeholder="$20000.00"
                      onChange={(e) => {
                        handleCreateProject("budget", e.target.value);
                      }}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="description">Nombre del Proyecto:</Label>
                    <Input
                      id="description"
                      type="text"
                      onChange={(e) => {
                        handleCreateProject("description", e.target.value);
                      }}
                    />
                  </div>
                  <div className="flex space-x-2">
                    <div className="space-y-1">
                      <Label htmlFor="data">Fecha Inicio:</Label>
                      <Input
                        id="data"
                        type="text"
                        placeholder="10/05/2024"
                        onChange={(e) => {
                          handleCreateProject("startDate", e.target.value);
                        }}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="data">Fecha Finalizacion:</Label>
                      <Input
                        id="data"
                        type="text"
                        placeholder="10/12/2024"
                        onChange={(e) => {
                          handleCreateProject("finishDate", e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="objetivo">Objetivo:</Label>
                    <Textarea
                      id="objetivo"
                      onChange={(e) => {
                        handleCreateProject("objective", e.target.value);
                      }}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="requerimiento">Requerimientos:</Label>
                    <Textarea
                      id="requerimiento"
                      onChange={(e) => {
                        handleCreateProject("requirements", e.target.value);
                      }}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="profilep">Perfil Profesional:</Label>
                    <Textarea
                      id="profilep"
                      onChange={(e) => {
                        handleCreateProject("team_profile", e.target.value);
                      }}
                    />
                  </div>
                </div>

                <DialogFooter>
                  <Button onClick={handleSubmitUser}>
                    <FilePlusIcon className="mr-2 h-6 w-6 my-auto" />
                    Crear
                  </Button>
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
