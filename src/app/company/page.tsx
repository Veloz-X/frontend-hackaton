"use client";

import { Button } from "@/components/ui/button";
import {
  CalendarDaysIcon,
  ChevronLeft,
  ChevronRight,
  EyeIcon,
  LogOut,
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
import { getProjects } from "@/actions";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Project } from "@/components/company/interface/project";
import Loading from "./loading";
import { ScrollArea } from "@radix-ui/react-scroll-area";

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
      <Suspense fallback={<Loading />}></Suspense>
      {projects.length > 0 && (
        <div className="grid grid-cols-3 p-4 gap-4">
          {projects.map((project) => (
            <Card key={project.id}>
              <CardContent>
              <CardTitle className="text-base uppercase pt-4 pb-2">
                  <ScrollArea className="line-clamp-5 ">{project.description}</ScrollArea>
                </CardTitle>
                <div className="font-semibold ">Objetivo:</div>
                <CardDescription>
                  <ScrollArea className="line-clamp-5 text-justify">{project.objective}</ScrollArea>
                </CardDescription>
                <div className="py-1 pt-2 ">
                  <Badge>Presupuesto: {project.budget} </Badge>
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
      )}
      {projects.length === 0 && (
        <div className="flex justify-center items-center h-screen">
          <div className="text-center">
            <div className="text-2xl font-semibold">No hay proyectos</div>
            <div className="text-lg">Cree un proyecto para comenzar</div>
          </div>
        </div>
      )}
    </>
  );
}
