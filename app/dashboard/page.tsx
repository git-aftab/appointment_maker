import {headers} from "next/headers";
import {redirect} from "next/navigation";
import { auth } from "@/lib/auth";

import React from 'react'

const DashboardPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if(!session){
        redirect("/login");
    }
    

  return (
    <div>
        <h1>Welcome, {session.user.name}</h1>
        <h1>Welcome, {session.user.email}</h1>
        <h1>Welcome, {session.user.id}</h1>
    </div>
  )
}

export default DashboardPage