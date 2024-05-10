"use client";

import { login, registerCompanyApi } from "@/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { redirect } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KeyRoundIcon, User } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

export default function AuthRegister() {
  const [errors, setErrors] = useState<string[]>([]);
  const [registerCompany, setRegisterCompany] = useState({
    email: "",
    fullName: "",
    roles: ["company"],
    password: "",
  });
  const [registerUser, setRegisterUser] = useState({
    email: "",
    fullName: "",
    roles: ["user"],
    data: {},
    password: "",
  });

  const handleSubmit = async () => {
    const resgisterComapyResponse = await registerCompanyApi(
      registerCompany.email,
      registerCompany.fullName,
      registerCompany.roles,
      registerCompany.password,
      {}
    );
    toast("Registrar", {
      description: resgisterComapyResponse.message,
      duration: 5000,
    });
  };

  const handleRegisterCompany = (field: any, value: any) => {
    setRegisterCompany((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  const handleRegisterUser = (field: any, value: any) => {
    setRegisterUser((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Card className="md:w-[500px] ">
        <CardHeader>
          <div className="mx-auto py-1 font-bold text-2xl">RedHack</div>
        </CardHeader>
        <CardContent className="space-y-2">
          <Tabs defaultValue="compay" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="compay">Empresa</TabsTrigger>
              <TabsTrigger value="user">Usuario</TabsTrigger>
            </TabsList>
            <TabsContent value="compay">
              <Card>
                <CardHeader>
                  <CardTitle>Registrar</CardTitle>
                  <CardDescription>
                    Ingresar el correo electrónico y la contraseña
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="username">Nombre de la Empresa</Label>
                    <Input
                      id="username"
                      placeholder="EMPRESA X S.A.S."
                      onChange={(e) => {
                        handleRegisterCompany("fullName", e.target.value);
                      }}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="email">Correo</Label>
                    <Input
                      id="email"
                      placeholder="empresa@gmail.com"
                      type="email"
                      onChange={(e) => {
                        handleRegisterCompany("email", e.target.value);
                      }}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="***********"
                      onChange={(e) => {
                        handleRegisterCompany("password", e.target.value);
                      }}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="font-semibold" onClick={handleSubmit}>
                    <KeyRoundIcon className="w-4 h-4 mr-2 my-auto" />
                    Registrar
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="user">
              <Card>
                <CardHeader>
                  <CardTitle>Registrar</CardTitle>
                  <CardDescription>
                    Ingresar el correo electrónico y la contraseña
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="fullNameUser">Nombre Completo</Label>
                    <Input id="fullNameuser" type="text" placeholder="" onChange={(e) => {
                        handleRegisterUser("fullName", e.target.value);
                      }} />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="emailUser">Correo</Label>
                    <Input id="emailUser" type="email" placeholder="" onChange={(e) => {
                        handleRegisterUser("email", e.target.value);
                      }} />
                  </div>
                  <div className="py-1 flex space-x-2">
                    <div>
                      <Label htmlFor="phoneUser">Telefono</Label>
                      <Input
                        id="phoneUser"
                        type="text"
                        placeholder="0999999999"
                      />
                    </div>
                    <div>
                      <Label htmlFor="horaUser">Horario Disponible</Label>
                      <Input
                        id="horaUser"
                        type="text"
                        placeholder="7:00AM - 13:00PM"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="locationUser">Ubicacion</Label>
                    <Input
                      id="locationUser"
                      type="text"
                      placeholder="Guayaquil, Samborondon"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="bioUser">
                      Hablanos sobre tu experiencia laboral
                    </Label>
                    <Textarea
                      id="bioUser"
                      placeholder="Tengo 5 años de experiencia en desarrollo web..."
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="font-semibold">
                    <KeyRoundIcon className="w-4 h-4 mr-2 my-auto" />
                    Registrar
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <div className="flex">
            <Button
              variant={"outline"}
              onClick={() => {
                window.location.replace("/auth/login");
              }}
              className="font-semibold my-auto"
            >
              <User className="w-4 h-4 mr-3 my-auto" />
              <p className="my-auto">Ya tengo cuenta</p>
            </Button>
          </div>
        </CardFooter>
        {JSON.stringify(registerUser)}
      </Card>
    </div>
  );
}
