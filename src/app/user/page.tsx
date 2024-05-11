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
import { Project, User } from "@/components/company/interface/project";
import Loading from "./loading";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function UserPage() {
  const [userData, setUserData] = useState<any>();
  const getUserData = async () => {
    const { ok, user } = await getDataUser();
    setUserData(user);
  };
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <Card className="m-3">
        <CardHeader>
          <CardTitle>Usuario</CardTitle>
        </CardHeader>
        {userData ? (
          <div className="grid grid-cols-2 gap-2">
            <CardContent className="space-y-2">
              <Label>Nombre</Label>
              <Input value={userData.fullName} disabled />
              <Label>Correo</Label>
              <Input value={userData.email} disabled />
              <Label>Telefono</Label>
              <Input value={userData.phone} disabled />
              <Label>Localidad</Label>
              <Input value={userData.location} disabled />
              <Label>Telefono</Label>
              <Input value={userData.phone} disabled />
            </CardContent>
            <CardContent className="space-y-2">
              <Label>Ingresa URL para aplicar al proyecto:</Label>
              <Input type="text"/>
             
            </CardContent>
          </div>
        ) : (
          <div className="flex justify-center items-center mb-20">
            <Loading />
          </div>
        )}
      </Card>
    </>
  );
}
