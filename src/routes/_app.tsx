import { createFileRoute, redirect } from "@tanstack/react-router"
import AppLayout from "@/components/layout/AppLayout"

export const Route = createFileRoute("/_app")({
  beforeLoad: () => {
    const token = localStorage.getItem("token")

    if (!token) {
      throw redirect({
        to: "/login",
      })
    }
  },
  component: AppLayout,
})