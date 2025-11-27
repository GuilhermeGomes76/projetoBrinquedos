"use client"

import { useState } from "react"
import { Heart, Plus, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ToyGrid } from "@/components/toy-grid"
import { AddToyForm } from "@/components/add-toy-form"

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50 backdrop-blur-sm bg-card/95">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Heart className="w-6 h-6 text-primary-foreground fill-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Brinquedos Solidários</h1>
                <p className="text-sm text-muted-foreground">Compartilhe alegria</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="browse" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="browse" className="gap-2">
              <Search className="w-4 h-4" />
              Ver Brinquedos
            </TabsTrigger>
            <TabsTrigger value="add" className="gap-2">
              <Plus className="w-4 h-4" />
              Anunciar
            </TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar brinquedos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-base"
                />
              </div>
            </div>

            {/* Toy Grid */}
            <ToyGrid searchQuery={searchQuery} />
          </TabsContent>

          <TabsContent value="add">
            <div className="max-w-2xl mx-auto">
              <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold text-foreground mb-2">Anuncie seu Brinquedo</h2>
                <p className="text-muted-foreground">
                  Ajude outras famílias compartilhando brinquedos que não usa mais
                </p>
              </div>
              <AddToyForm />
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16 py-8 bg-card">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            Feito com <Heart className="w-4 h-4 inline text-primary fill-primary" /> para compartilhar alegria
          </p>
        </div>
      </footer>
    </div>
  )
}
