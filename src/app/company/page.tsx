"use client";

import { Button } from "@/components/ui/button";
import {
  CalendarDaysIcon,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getProjects } from "@/actions";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  const [projects, setProjects] = useState([]);

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
      <div className="grid grid-cols-3 p-4 gap-4">
        {projects.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
            </CardHeader>

            <CardContent>
              <CardDescription>{project.description}</CardDescription>
              <div className="py-1 ">
                <Badge>Presupuesto: {project.budget} </Badge>
              </div>
              <div className="py-1">
                <Badge variant={"outline"}>Proyecto: {project.status === true ? "Activo" : "Inactivo"
                } </Badge>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* <Button  onClick={() => signOut()}
                  className="w-full justify-start font-normal "
                >
                  <LogOut className="mr-3 h-6 w-6 my-auto" />
                  <p className="font-semibold text-base my-auto">Cerrar Sesión</p>
                </Button> */}
      </div>
      {/* <div>
        <pre>{JSON.stringify(projects, null, 2)}</pre>
      </div> */}
    </>
  );
}
