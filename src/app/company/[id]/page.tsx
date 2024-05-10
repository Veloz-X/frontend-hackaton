"use client";

import { Button } from "@/components/ui/button";
import {
  CalendarDaysIcon,
  ChevronLeft,
  ChevronRight,
  CircleUserIcon,
  EyeIcon,
  LogOut,
  MapPinIcon,
  PhoneCallIcon,
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

interface Props {
  params: { id: string };
}

export default function ProjectIdPage({ params }: Props) {
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
      {project && (
        <div className="p-3 h-screen flex">
          <ResizablePanelGroup
            direction="horizontal"
            className="max-w-full rounded-lg border"
          >
            <ResizablePanel defaultSize={70}>
              <div className="grid grid-cols-3 p-3">
                {project.usersAdmitted.map((user) => (
                  <Card key={user.id}>
                    <CardHeader>
                      <CardTitle>{user.fullName}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="grid-cols-2 gap-2 grid">
                        <Badge className="flex ">{user.email}</Badge>
                        <Badge className="flex ">
                          <PhoneCallIcon className="mr-2 h-4 w-4 my-auto" />
                          {user.phone}
                        </Badge>
                        <Badge className="flex ">
                          Experiencia: {user.data.yearsofexp}
                        </Badge>
                        <Badge className="flex ">
                          <MapPinIcon className="mr-2 h-4 w-4 my-auto" />
                          {user.data.location}
                        </Badge>
                      </CardDescription>
                      <CardDescription className="pt-3">
                        {user.jobMatcherResponses.profile_summary}
                      </CardDescription>
                    </CardContent>
                    <CardFooter>
                      <Badge className="flex" variant={"default"}>
                        <CircleUserIcon className="mr-2 h-4 w-4 my-auto text-lg font-semibold" />
                        {user.jobMatcherResponses.job_description_match} de
                        compatibilidad
                      </Badge>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={30}>
              <div className="p-2">
                <Card>ss</Card>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      )}
    </>
  );
}
