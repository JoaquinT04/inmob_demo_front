import { useEffect, useState } from "react"
import PropertyGrid from "@/components/properties/propertyGrid"
import PropertyTable from "@/components/properties/propertyTable"
import { getProperties } from "@/services/properties"
import { useNavigate } from "@tanstack/react-router"
import { Grid2X2,List } from "lucide-react"

export default function PropertiesPage() {
  const [properties, setProperties] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const [view, setView] = useState<"grid" | "list">("grid")
  const navigate = useNavigate()
  const total = properties.length
  const active = properties.filter(p => p.status === "active").length
  const draft = properties.filter(p => p.status === "draft").length
    
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProperties()
        console.log(res)
        setProperties(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <div className="p-6">Cargando propiedades...</div>
  }

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-2xl font-semibold">Mis propiedades</h1>
          <p className="text-muted text-sm">
            Administra tus listados y sincroniza con portales inmobiliarios.
          </p>
        </div>

        <div className="flex gap-2">
          <button 
            className="bg-primary text-black px-4 py-2 rounded-lg"
            onClick={() => navigate({ to: "/properties/new" })}
          >
            + Agregar propiedad
          </button>

        </div>
        
      </div>
      <div className="flex items-center justify-between flex-wrap gap-3">

      {/* LEFT → filtros por estado */}
      <div className="flex gap-2 flex-wrap">
        <span className="text-muted">Mostrando: </span>
        <span className="px-3 py-1 rounded-full text-xs bg-primary text-black">
          Todas ({total})
        </span>

        <span className="px-3 py-1 rounded-full text-xs bg-muted">
          Activas ({active})
        </span>

        <span className="px-3 py-1 rounded-full text-xs bg-muted">
          Borradores ({draft})
        </span>
      </div>

      {/* RIGHT → botones vista */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setView("grid")}
          className={`p-2 rounded-lg border ${
            view === "grid" ? "bg-primary text-black" : "bg-background"
          }`}
        >
          <Grid2X2 className="w-5 h-5" />
        </button>

        <button
          onClick={() => setView("list")}
          className={`p-2 rounded-lg border ${
            view === "list" ? "bg-primary text-black" : "bg-background"
          }`}
        >
          <List className="w-5 h-5" />
        </button>
      </div>

    </div>

    {/* Active Filters */}
    <div className="flex gap-2 flex-wrap">
      <span className="text-muted">Filtros activos: </span>
      <span className="bg-primary/20 text-primary px-3 py-1 rounded-sm  text-xs">
        Venta
      </span>
      <span className="bg-primary/20 text-primary px-3 py-1 rounded-sm  text-xs">
        Casa
      </span>
      <span className="bg-primary/20 text-primary px-3 py-1 rounded-sm text-xs">
        Tucumán
      </span>
    </div>

      {/* Grid / Table */}
      {view === "grid" ? (
        <PropertyGrid properties={properties} />
      ) : (
        <PropertyTable properties={properties} />
      )}

      <div className="text-center text-sm text-muted">
        Mostrando {properties.length} propiedades
      </div>
    </div>
  )
}