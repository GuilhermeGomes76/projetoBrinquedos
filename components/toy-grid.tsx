"use client"

import { useState, useEffect } from "react"
import { ToyCard } from "./toy-card"
import type { Toy } from "@/types/toy"

interface ToyGridProps {
  searchQuery: string
}

export function ToyGrid({ searchQuery }: ToyGridProps) {
  const [toys, setToys] = useState<Toy[]>([])

  useEffect(() => {
    // Load toys from localStorage
    const storedToys = localStorage.getItem("toys")
    if (storedToys) {
      setToys(JSON.parse(storedToys))
    }
  }, [])

  // Filter toys based on search query
  const filteredToys = toys.filter((toy) => toy.name.toLowerCase().includes(searchQuery.toLowerCase()))

  if (filteredToys.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
          <span className="text-4xl">🧸</span>
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          {searchQuery ? "Nenhum brinquedo encontrado" : "Nenhum brinquedo disponível"}
        </h3>
        <p className="text-muted-foreground">
          {searchQuery ? "Tente buscar por outro nome" : "Seja o primeiro a anunciar um brinquedo!"}
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredToys.map((toy) => (
        <ToyCard key={toy.id} toy={toy} />
      ))}
    </div>
  )
}
