// src/pages/SettingsPage.tsx

import { useState } from "react"
import CompanyForm from "@/components/settings/CompanyForm"
import GeneralSettings from "@/components/settings/GeneralSettings"
import UserForm from "@/components/settings/UserForm"
import UsersList from "@/components/settings/UsersList"



export default function SettingsPage() {
const [tab, setTab] = useState<"company" | "users" | "general">("company")


  return (
    <div className="p-6 space-y-6">
      {/* Header */}
     <div className="flex gap-6 border-b border-border pb-2 text-sm">
        <button
            onClick={() => setTab("company")}
            className={tab === "company"
            ? "text-primary border-b-2 border-primary pb-2"
            : "text-muted"}
        >
            Inmobiliaria
        </button>

        <button
            onClick={() => setTab("users")}
            className={tab === "users"
            ? "text-primary border-b-2 border-primary pb-2"
            : "text-muted"}
        >
            Usuarios
        </button>

        <button
            onClick={() => setTab("general")}
            className={tab === "general"
            ? "text-primary border-b-2 border-primary pb-2"
            : "text-muted"}
        >
            Ajustes generales
        </button>
        </div>

      {/* Páginas */}
        {tab === "users" ? (
        <div className="grid grid-cols-3 gap-6">
            
            {/* IZQUIERDA */}
            <div className="col-span-1">
            <UsersList />
            </div>

            {/* DERECHA */}
            <div className="col-span-2">
            <UserForm />
            </div>

        </div>
        ) : (
        <div className="max-w-3xl space-y-6">
            {tab === "company" && <CompanyForm />}
            {tab === "general" && <GeneralSettings />}
        </div>
        )}
            

    </div>
  )
}