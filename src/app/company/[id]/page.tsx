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

interface Props {
  params: { id: string };
}

export default function ProjectIdPage({ params }: Props) {
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

  return <>{params.id}</>;
}
