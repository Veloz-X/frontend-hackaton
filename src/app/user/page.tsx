"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getDataUser } from "@/actions";
import Loading from "./loading";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { LinkIcon } from "lucide-react";

export default function UserPage() {
  const [userData, setUserData] = useState<any>();
  const [url, setUrl] = useState<any>("");
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
              <Input type="text" onChange={(e) => setUrl(e.target.value)} />
              <div className="py-2">
                <Link href={url}>
                  <Button className="font-semibold" disabled={!url}>
                    <LinkIcon size={24} className="mr-2" />
                    Aplicar
                  </Button>
                </Link>
              </div>
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
