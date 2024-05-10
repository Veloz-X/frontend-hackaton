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
import { getDataUser, getProjects } from "@/actions";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Project } from "@/components/company/interface/project";
import Loading from "./loading";

export default function UserPage() {
  const [userData, setUserData] = useState();
  const getUserData = async () => {
    const { ok, user } = await getDataUser();
    // setUserData(user);
  };
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <Suspense fallback={<Loading />}></Suspense>
      <Card className="m-3">
        <CardHeader>
          <CardTitle>Perfiil</CardTitle>
        </CardHeader>
        <CardContent>
        {JSON.stringify(userData)}
        </CardContent>
      </Card>
    </>
  );
}
