'use client';

import { Button } from "@/components/ui/button";
import { CalendarDaysIcon, ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";


export default function DashboardPage() {

  return (
    <>
      <div>
      DashboardPage
      <Button  onClick={() => signOut()}
                  className="w-full justify-start font-normal "
                >
                  <LogOut className="mr-3 h-6 w-6 my-auto" />
                  <p className="font-semibold text-base my-auto">Cerrar Sesión</p>
                </Button>
      </div>
    </>
  );
}
