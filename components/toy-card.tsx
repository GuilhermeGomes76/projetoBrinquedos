"use client"

import { MapPin, Phone } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Toy } from "@/types/toy"

interface ToyCardProps {
  toy: Toy
}

export function ToyCard({ toy }: ToyCardProps) {
  const handleWhatsAppClick = () => {
    // Remove non-numeric characters from phone
    const cleanPhone = toy.phone.replace(/\D/g, "")
    const message = encodeURIComponent(
      `Olá ${toy.sellerName}! Vi seu anúncio do brinquedo "${toy.name}" no Brinquedos Solidários e tenho interesse!`,
    )
    window.open(`https://wa.me/55${cleanPhone}?text=${message}`, "_blank")
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={toy.image || "/placeholder.svg?height=400&width=400&query=brinquedo"}
          alt={toy.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-lg text-foreground line-clamp-1">{toy.name}</h3>
          <p className="text-sm text-muted-foreground">por {toy.sellerName}</p>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 flex-shrink-0" />
          <span className="line-clamp-1">{toy.location}</span>
        </div>

        {toy.price && toy.price > 0 ? (
          <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
            R$ {toy.price.toFixed(2)}
          </Badge>
        ) : (
          <Badge className="bg-primary text-primary-foreground">Doação</Badge>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleWhatsAppClick}
          className="w-full gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Phone className="w-4 h-4" />
          Entrar em Contato
        </Button>
      </CardFooter>
    </Card>
  )
}
