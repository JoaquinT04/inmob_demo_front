import { useState } from "react"
import { useNavigate } from "@tanstack/react-router"
import { useAuth } from "@/context/AuthContext"
import { registerRequest, checkSlug } from "@/services/auth"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export default function RegisterPage() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [form, setForm] = useState({
    agencyName: "",
    slug: "",
    ownerEmail: "",
    ownerFirstName: "",
    ownerLastName: "",
    password: "",
  })

  const [slugAvailable, setSlugAvailable] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // 🧠 Auto generar slug
  const handleAgencyChange = async (value: string) => {
    const slug = value
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")

    setForm((prev) => ({ ...prev, agencyName: value, slug }))

    if (slug.length > 3) {
      try {
        const res = await checkSlug(slug)
        setSlugAvailable(res.available)
      } catch {
        setSlugAvailable(null)
      }
    }
  }

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    console.log("Submitting registration form with:", form)
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await registerRequest({
        ...form,
        country: "AR",
        timezone: "America/Argentina/Buenos_Aires",
      })
      console.log("Registration successful:", res)

      login({
        token: res.token,
        user: res.user,
        tenant: res.tenant,
        })

      navigate({ to: "/properties" })
    } catch (err: any) {
      setError(err.message || "Error al registrarse")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">

      <Card className="w-full max-w-lg">
        <CardContent className="p-8 space-y-6">

          <h1 className="text-2xl font-semibold text-center">
            Crear inmobiliaria
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <Label>Nombre de la inmobiliaria</Label>
              <Input  className="bg-background h-12 mt-1 border-none"
                value={form.agencyName}
                onChange={(e) => handleAgencyChange(e.target.value)}
              />
            </div>

            <div>
              <Label>Slug</Label>
              <Input  className="bg-background h-12 mt-1 border-none"
                value={form.slug}
                onChange={(e) =>
                  setForm({ ...form, slug: e.target.value })
                }
              />
              {slugAvailable === true && (
                <p className="text-green-500 text-xs">Disponible</p>
              )}
              {slugAvailable === false && (
                <p className="text-red-500 text-xs">No disponible</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label>Nombre</Label>
                <Input  className="bg-background h-12 mt-1 border-none"
                  value={form.ownerFirstName}
                  onChange={(e) =>
                    setForm({ ...form, ownerFirstName: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>Apellido</Label>
                <Input  className="bg-background h-12 mt-1 border-none"
                  value={form.ownerLastName}
                  onChange={(e) =>
                    setForm({ ...form, ownerLastName: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <Label>Email</Label>
              <Input  className="bg-background h-12 mt-1 border-none"
                type="email"
                value={form.ownerEmail}
                onChange={(e) =>
                  setForm({ ...form, ownerEmail: e.target.value })
                }
              />
            </div>

            <div>
              <Label>Contraseña</Label>
              <Input  className="bg-background h-12 mt-1 border-none"
                type="password" 
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <Button className="w-full h-12 bg-primary hover:bg-secondary text-black font-medium" disabled={loading} type="submit">
              {loading ? "Creando..." : "Crear cuenta"}
            </Button>

          </form>

        </CardContent>
      </Card>
    </div>
  )
}