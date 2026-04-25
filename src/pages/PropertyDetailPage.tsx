// src/pages/PropertyDetailPage.tsx
import { useEffect, useState } from "react"
import { useParams } from "@tanstack/react-router"
import { getPropertyById } from "@/services/properties"
import {  getRandomImages } from "@/mocks/demoImages"

export default function PropertyDetailPage() {
  const { propertyId } = useParams({ from: "/_app/properties/$propertyId" })

  const [property, setProperty] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState(0)
  const [images, setImages] = useState<string[]>([])

    useEffect(() => {
    const fetchData = async () => {
        try {
        const res = await getPropertyById(propertyId)
        setProperty(res.data)

        const imgs =
            res.data.images?.length > 0
            ? res.data.images
            : getRandomImages(5)

        setImages(imgs)

        } catch (err) {
        console.error(err)
        } finally {
        setLoading(false)
        }
    }

    fetchData()
    }, [propertyId])

  if (loading) return <div className="p-6">Cargando...</div>
  if (!property) return <div className="p-6">No encontrada</div>

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-semibold">Detalle de propiedad</h1>

      {/* GALERÍA */}
      <div className="bg-card p-4 rounded-2xl space-y-4">

        <img
          src={images[activeImage]}
          className="w-full h-[400px] object-cover rounded-xl"
        />

        <div className="flex gap-2 overflow-x-auto">
          {images.map((img: string, i: number) => (
            <img
              key={i}
              src={img}
              onClick={() => setActiveImage(i)}
              className={`w-28 h-20 object-cover rounded-lg cursor-pointer border ${
                i === activeImage
                  ? "border-primary"
                  : "border-transparent"
              }`}
            />
          ))}
        </div>
      </div>

      {/* INFO + SIDEBAR */}
      <div className="grid grid-cols-3 gap-6">

        {/* IZQUIERDA */}
        <div className="col-span-2 space-y-6">

          {/* INFO GENERAL */}
          <div className="bg-card p-6 rounded-2xl flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">
                {property.title}
              </h2>

              <p className="text-sm text-muted mt-1">
                {property.address.street}, {property.address.city}
              </p>
            </div>

            <div className="text-right">
              <p className="text-2xl font-bold">
                {property.currency} {property.price.toLocaleString()}
              </p>
              <p className="text-sm text-muted">
                Expensas: {property.expenses ?? "-"}
              </p>
            </div>
          </div>

          {/* DESCRIPCIÓN */}
          <div className="bg-card p-6 rounded-2xl">
            <h3 className="font-semibold mb-2">Descripción</h3>
            <p className="text-sm text-muted">
              {property.description || "Sin descripción"}
            </p>
          </div>

        </div>

        {/* DERECHA (mock tipo “red”) */}
        <div className="bg-card p-6 rounded-2xl space-y-4 h-fit">

          <h3 className="font-semibold">Datos de la red</h3>

          <div className="text-sm text-muted">
            <p>Inmobiliaria</p>
            <p className="text-white font-medium">Palermo Prop</p>
          </div>

          <div className="bg-primary/10 p-3 rounded-lg flex justify-between">
            <span className="text-sm">Comisión</span>
            <span className="font-semibold">3%</span>
          </div>

          <button className="w-full bg-primary text-black py-3 rounded-lg font-semibold">
            Contactar inmobiliaria
          </button>

        </div>

      </div>
    </div>
  )
}