"use client";

import { Button } from "@/components/ui/button";
import {
  BanknoteIcon,
  CalendarDaysIcon,
  ChevronLeft,
  ChevronRight,
  CircleUserIcon,
  EyeIcon,
  Link,
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
import { getProjectId, getProjects } from "@/actions";
import { Badge } from "@/components/ui/badge";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Project } from "@/components/company/interface/project";
import Loading from "../loading";
import { toast } from "sonner";

interface Props {
  params: { id: string };
}

export default function ProjectIdPage({ params }: Props) {
  const [copied, setCopied] = useState(false);
  const copyToClipboard = () => {
    toast("Link copiado al portapapeles");
    navigator.clipboard.writeText(
      "https://frontend-hackaton.vercel.app/user/admissions/" + params.id
    );
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  const [project, setProject] = useState<Project>();

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
      <Suspense fallback={<Loading />}></Suspense>
      {project ? (
        <div className="p-3 h-screen flex">
          <ResizablePanelGroup
            direction="horizontal"
            className="max-w-full rounded-lg border"
          >
            <ResizablePanel defaultSize={65}>
              <div className="grid grid-cols-2 p-3 gap-3">
                {project.usersAdmitted.map((user) => (
                  <Card key={user.id} className="mb-auto">
                    <CardHeader>
                      <CardTitle className="text-base">
                        {user.fullName}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="flex gap-2">
                        <Badge className="flex ">{user.email}</Badge>
                        <Badge className="flex ">
                          <PhoneCallIcon className="mr-2 h-4 w-4 my-auto" />
                          {user.phone}
                        </Badge>
                        <Badge className="flex ">
                          <MapPinIcon className="mr-2 h-4 w-4 my-auto" />
                          {user.location}
                        </Badge>
                      </CardDescription>
                      <CardDescription className="pt-3 text-justify">
                        {user.jobMatcherResponses.profile_summary}
                      </CardDescription>
                    </CardContent>
                    <CardFooter className="justify-end space-x-2">
                      <Button className="flex font-bold" variant={"default"}>
                        {user.jobMatcherResponses.job_description_match} de
                        compatibilidad
                      </Button>
                      <Button>
                        <EyeIcon className=" h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={35}>
              <div className="p-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      {project.description}
                    </CardTitle>
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
                        console.log("Editar");
                      }}
                    >
                      <Settings2Icon className="mr-2 h-4 w-4 my-auto" />
                      Editar
                    </Button>
                    <Button className="font-semibold" onClick={copyToClipboard}>
                      <Link className="mr-2 h-4 w-4 my-auto" />
                      Link de invitacion
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <Loading />
        </div>
      )}
    </>
  );
}
