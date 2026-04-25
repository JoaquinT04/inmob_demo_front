// src/pages/LoginPage.tsx
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/context/AuthContext"
import { useNavigate } from "@tanstack/react-router"
import { useState } from "react"
import { loginRequest } from "@/services/auth"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [slug, setSlug] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      setLoading(true)
      setError("")

      const res = await loginRequest(email,slug, password)
      console.log("LOGIN RESPONSE 👉", res)
      // ✅ CORRECTO
      login({
        token: res.token,
        user: res.user,
        tenant: res.tenant,
      })

      navigate({ to: "/properties" })
    } catch (err: any) {
      console.error(err)
      setError("Credenciales incorrectas")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Card className="w-full max-w-md bg-card border-none rounded-2xl ">
        <CardContent className="p-8">
          <div className="flex justify-center mb-6">
            <div className="px-4 py-1 rounded-full bg-tertiary text-primary font-semibold">
              inmob
            </div>
          </div>

          <h1 className="text-2xl font-semibold text-center text-white mb-6">
            Ingrese sesión
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <Label className="text-sm">Correo electrónico</Label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nombre@ejemplo.com"
                className="bg-background h-12 mt-1 border-none"
              />
            </div>

            <div>
              <Label className="text-sm">Base de datos</Label>
              <Input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="nombre_de_tu_inmobiliaria"
                className="bg-background h-12 mt-1 border-none"
              />
            </div>

            <div>
              <Label className="text-sm">Contraseña</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-background h-12 mt-1 border-none"
              />
            </div>

            <Button
              className="w-full h-12 bg-primary hover:bg-secondary text-black font-medium"
              type="submit"
              disabled={loading}
            >
              {loading ? "Ingresando..." : "Iniciar sesión"}
            </Button>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
          </form>

          <div className="mt-6 text-center text-sm text-muted">
            ¿No tienes cuenta?{" "}
            <span
              className="text-primary cursor-pointer"
              onClick={() => navigate({ to: "/register" })}
            >
              Regístrate
            </span>
          </div>

        </CardContent>
      </Card>
    </div>
  )
}