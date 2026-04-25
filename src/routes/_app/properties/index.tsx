import { createFileRoute } from "@tanstack/react-router"
import PropertiesPage from "@/pages/Poperties"

export const Route = createFileRoute("/_app/properties/")({
  component: PropertiesPage,
})