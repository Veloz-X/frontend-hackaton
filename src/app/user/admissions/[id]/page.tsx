"use client";

import { Button } from "@/components/ui/button";
import {
  BanknoteIcon,
  BriefcaseBusinessIcon,
  CalendarDaysIcon,
  ChevronLeft,
  ChevronRight,
  CircleUserIcon,
  EyeIcon,
  LogOut,
  MapPinIcon,
  PhoneCallIcon,
  Settings2Icon,
} from "lucide-react";
import { useState, useEffect, Suspense } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { admissionsId, getProjectId, getProjects } from "@/actions";
import { Badge } from "@/components/ui/badge";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Project } from "@/components/company/interface/project";

interface Props {
  params: { id: string };
}

export default function AdmissionsIdPage({ params }: Props) {
  const [project, setProject] = useState<Project>();

  const aplicarClick = async () => {
    try {
      const { status, mesage } = await admissionsId(params.id);
      
    } catch (error) {}
  };

  const getProjectData = async () => {
    try {
      const { status, project } = await getProjectId(params.id);
      setProject(project);
    } catch (error) {}
  };
  useEffect(() => {
    getProjectData();
  }, []);

  return (
    <>
      <div className="p-10">
        {project && (
          <Card>
            <CardHeader>
              <CardTitle>{project.description}</CardTitle>
              <div className="flex space-x-1 py-2">
                <Badge className="flex">
                  <CalendarDaysIcon className="mr-2 h-4 w-4 my-auto" />
                  {project.startDate} - {project.finishDate}
                </Badge>
                <Badge className="flex">
                  <EyeIcon className="mr-2 h-4 w-4 my-auto" />
                  {project.status ? "Activo" : "Inactivo"}
                </Badge>
                <Badge className="flex">
                  <BanknoteIcon className="mr-2 h-4 w-4 my-auto" />
                  {project.budget}
                </Badge>
              </div>
              <p className="font-semibold text-sm">Descripcion:</p>
              <CardDescription>{project.description}</CardDescription>
              <p className="font-semibold text-sm">Objetivo:</p>
              <CardDescription>{project.objective}</CardDescription>
              <p className="font-semibold text-sm">Requerimiento:</p>
              <CardDescription>{project.requirements}</CardDescription>
              <p className="font-semibold text-sm">Perfil Profesional:</p>
              <CardDescription>{project.team_profile}</CardDescription>
            </CardHeader>
            <CardFooter className="space-x-2">
              <Button
                className="font-semibold"
                onClick={() => {
                  aplicarClick();
                }}
              >
                <BriefcaseBusinessIcon className="mr-2 h-4 w-4 my-auto" />
                Aplicar
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </>
  );
}
