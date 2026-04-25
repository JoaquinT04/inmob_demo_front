// src/components/properties/PropertyCard.tsx
import { Button } from "@/components/ui/button"
import { getRandomImage } from "@/mocks/demoImages"
import { BedDouble,Bath,Ruler,MapPin } from "lucide-react"
import { Link } from "@tanstack/react-router"

type Props = {
  property: any
}

export default function PropertyCard({ property }: Props) {
  const image = property.images?.[0] || getRandomImage(property.id)

  return (
    <Link to="/properties/$propertyId" params={{ propertyId: property.id }}>
    <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg">
      {/* Image */}
      <div className="relative">
        <img
          src={image}
          className="w-full h-90 object-cover"
        />

        <span className="absolute top-3 left-3 text-xs px-2 py-1 rounded bg-black/70">
          {property.operationType === "SALE" ? "Venta" : "Alquiler"}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">

        <h3 className="text-sm text-primary">
          {property.title}
        </h3>

        <p className="text-xl font-semibold">
          {property.currency} {property.price.toLocaleString()}
        </p>

        <p className="text-sm">
          <MapPin className="inline-block w-3 h-3" text-primary /> {property.address.city}, {property.address.state}
        </p>

        {/* Features */}
        

        <div className="flex gap-4 text-xs text-muted justify-center  mt-3">
          <span>{property.features.rooms ?? "-"} <BedDouble className="inline-block w-4 h-4" /></span>
          <span>{property.features.bathrooms ?? "-"} <Bath className="inline-block w-4 h-4" /></span>
          <span>{property.features.coveredArea ?? "-"} <Ruler className="inline-block w-4 h-4" /></span>
        </div>

        {/* CTA */}
        <div className="flex justify-center">
            <Button className="w-80 mt-2 h-12 text-black text-sm font-bold" >
            Publicar
            </Button>
        </div>

        {/* Status */}
        <div className="text-xs text-center text-green-300">
          {property.status}
        </div>
      </div>
    </div>
    </Link>
  )
}