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
    <div>
        TEST
    </div>
    </>
  );
}
