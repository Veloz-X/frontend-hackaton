"use client";

import { login } from "@/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KeyRoundIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import Image from 'next/image';

export default function AuthLogin() {
  const { data: session, status } = useSession();
  const [errors, setErrors] = useState<string[]>([]);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("Abc123");

  useEffect(() => {
    verifyUser(status);
  }, [status]);

  const handleSubmit = async () => {
    setErrors([]);
    const resLogin = await login(email, password);
    console.log(resLogin);
    if (resLogin.ok) {
      window.location.replace('/dashboard');
      toast.success("Inicia sesión", { description: "Cuenta verificada." });
      return;
    }
    toast.error("Error", { description: resLogin.message });
  };
  const verifyUser = async (status: string) => {
    if (status === "authenticated") {
      window.location.replace('/dashboard');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Card className="md:w-[500px] ">
        <CardHeader>
          <div className="mx-auto py-3">
            {/* <LogoTheme /> */}
            LOGO
          </div>
          <CardTitle>Inicia sesión</CardTitle>
          <CardDescription>
            Ingresar el correo electrónico y la contraseña
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="login-email">Correo</Label>
            <Input
              id="login-email"
              type="text"
              placeholder="admin@gmail.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="login-password">Contraseña</Label>
            <Input
              id="login-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button variant={"outline"} onClick={handleSubmit} className="font-semibold my-auto">
            <KeyRoundIcon className="w-4 h-4 mr-3 my-auto" />
            <p className="my-auto">Inicia sesión</p>
          </Button>
          <div>v1.0.0</div>
        </CardFooter>
      </Card>
    </div>
  );
};
