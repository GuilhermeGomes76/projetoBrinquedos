"use client"

import type React from "react"

import { useState } from "react"
import { Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import type { Toy } from "@/types/toy"

export function AddToyForm() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    sellerName: "",
    name: "",
    phone: "",
    location: "",
    price: "",
    image: "",
  })
  const [imagePreview, setImagePreview] = useState<string>("")

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setImagePreview(result)
        setFormData({ ...formData, image: result })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!formData.sellerName || !formData.name || !formData.phone || !formData.location) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      })
      return
    }

    // Create new toy
    const newToy: Toy = {
      id: Date.now().toString(),
      sellerName: formData.sellerName,
      name: formData.name,
      phone: formData.phone,
      location: formData.location,
      price: formData.price ? Number.parseFloat(formData.price) : 0,
      image: formData.image,
      createdAt: new Date().toISOString(),
    }

    // Save to localStorage
    const storedToys = localStorage.getItem("toys")
    const toys = storedToys ? JSON.parse(storedToys) : []
    toys.unshift(newToy)
    localStorage.setItem("toys", JSON.stringify(toys))

    // Reset form
    setFormData({
      sellerName: "",
      name: "",
      phone: "",
      location: "",
      price: "",
      image: "",
    })
    setImagePreview("")

    toast({
      title: "Brinquedo anunciado!",
      description: "Seu anúncio foi publicado com sucesso.",
    })

    // Reload page to show new toy
    setTimeout(() => {
      window.location.reload()
    }, 1500)
  }

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="sellerName">Seu Nome *</Label>
            <Input
              id="sellerName"
              value={formData.sellerName}
              onChange={(e) => setFormData({ ...formData, sellerName: e.target.value })}
              placeholder="Como você gostaria de ser chamado?"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Nome do Brinquedo *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ex: Carrinho de controle remoto"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">WhatsApp *</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="(11) 99999-9999"
              required
            />
            <p className="text-xs text-muted-foreground">Interessados entrarão em contato por este número</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Local de Entrega *</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Ex: Bairro Centro, São Paulo - SP"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Preço (opcional)</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="Deixe vazio para doação"
            />
            <p className="text-xs text-muted-foreground">Deixe em branco se for doar o brinquedo</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Foto do Brinquedo</Label>
            <div className="flex flex-col gap-4">
              {imagePreview ? (
                <div className="relative aspect-square w-full max-w-xs mx-auto rounded-lg overflow-hidden bg-muted">
                  <img src={imagePreview || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="aspect-square w-full max-w-xs mx-auto rounded-lg border-2 border-dashed border-border bg-muted/50 flex items-center justify-center">
                  <div className="text-center">
                    <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Adicione uma foto</p>
                  </div>
                </div>
              )}
              <Input id="image" type="file" accept="image/*" onChange={handleImageChange} className="cursor-pointer" />
            </div>
          </div>

          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            Publicar Anúncio
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
