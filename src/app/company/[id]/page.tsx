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
import { getProjectId, getProjects } from "@/actions";
import { Badge } from "@/components/ui/badge";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

interface Props {
  params: { id: string };
}

export default function ProjectIdPage({ params }: Props) {
  const [project, setProject] = useState([]);

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
      <div className="p-3">
      <ResizablePanelGroup
        direction="horizontal"
        className="max-h-full max-w-full rounded-lg border"
      >
        <ResizablePanel defaultSize={70}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Sidebar</span>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={30}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Content</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
      </div>
    </>
  );
}
