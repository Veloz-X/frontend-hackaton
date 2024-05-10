"use client";

import { Button } from "@/components/ui/button";
import {
  CalendarDaysIcon,
  ChevronLeft,
  ChevronRight,
  EyeIcon,
  LogOut,
} from "lucide-react";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getProjects } from "@/actions";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Project } from "@/components/company/interface/project";

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  const getProjectsData = async () => {
    try {
      const { status, projects = [] } = await getProjects();
      setProjects(projects);
    } catch (error) {}
  };
  useEffect(() => {
    getProjectsData();
  }, []);

  return (
    <>
      <div className=" mx-auto flex justify-end  pt-4 px-4">
        <Button
          onClick={() => signOut()}
          className=" justify-start font-normal "
        >
          <LogOut className="mr-3 h-6 w-6 my-auto" />
          <p className="font-semibold text-base my-auto">Cerrar Sesión</p>
        </Button>
      </div>
      <div className="grid grid-cols-3 p-4 gap-4">
        {projects.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="font-semibold">Descipcion:</div>
              <CardDescription>{project.description}</CardDescription>
              <div className="font-semibold">Objetivo:</div>
              <CardDescription>{project.objective}</CardDescription>
              <div className="py-1 pt-2 ">
                <Badge>Presupuesto: {project.budget} </Badge>
              </div>
              <div className="py-1">
                <Badge variant={"outline"}>
                  Proyecto: {project.status === true ? "Activo" : "Inactivo"}{" "}
                </Badge>
              </div>
              <div className="pt-2">
                <Link href={`/company/${project.id}`} key={project.id}>
                <Button
                  className="font-semibold justify-end"
                  variant={"secondary"}
                >
                  <EyeIcon className="mr-2 h-6 w-6 my-auto" />
                  Ver Proyecto
                </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* <div>
        <pre>{JSON.stringify(projects, null, 2)}</pre>
      </div> */}
    </>
  );
}