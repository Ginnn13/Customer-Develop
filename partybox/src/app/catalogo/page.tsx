"use client"

import { useState } from "react"
import Link from "next/link"
import { Filter, Package, Search, ShoppingCart, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Datos de ejemplo - Kits completos
const kits = [
  {
    id: 1,
    nombre: "Kit Cumpleaños Infantil",
    descripcion: "Kit completo para fiesta infantil con temática de superhéroes",
    precio: 120,
    imagen: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=300&h=300&fit=crop&crop=center",
    categoria: "Cumpleaños",
    incluye: ["20 globos", "Guirnaldas", "Platos y vasos", "Servilletas", "Manteles"],
  },
  {
    id: 2,
    nombre: "Kit Baby Shower Niña",
    descripcion: "Decoración completa para baby shower en tonos rosados",
    precio: 150,
    imagen: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop&crop=center",
    categoria: "Baby Shower",
    incluye: ["30 globos", "Banner", "Figuras colgantes", "Vajilla", "Decoración mesa"],
  },
  {
    id: 3,
    nombre: "Kit Aniversario Romántico",
    descripcion: "Decoración elegante para celebrar tu aniversario",
    precio: 180,
    imagen: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=300&h=300&fit=crop&crop=center",
    categoria: "Aniversario",
    incluye: ["Globos dorados", "Velas", "Pétalos", "Copas", "Manteles elegantes"],
  },
  {
    id: 4,
    nombre: "Kit Despedida de Soltera",
    descripcion: "Todo lo necesario para una despedida de soltera inolvidable",
    precio: 200,
    imagen: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=300&h=300&fit=crop&crop=center",
    categoria: "Despedida",
    incluye: ["Globos temáticos", "Accesorios", "Decoración", "Vajilla", "Juegos"],
  },
  {
    id: 5,
    nombre: "Kit Graduación",
    descripcion: "Celebra tu logro académico con estilo",
    precio: 160,
    imagen: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=300&h=300&fit=crop&crop=center",
    categoria: "Graduación",
    incluye: ["Globos académicos", "Banner graduación", "Decoración mesa", "Confeti", "Marcos fotos"],
  },
  {
    id: 6,
    nombre: "Kit Fiesta Tropical",
    descripcion: "Ambiente tropical para fiestas de verano",
    precio: 140,
    imagen: "https://images.unsplash.com/photo-1544531586-fbd96ceaff1e?w=300&h=300&fit=crop&crop=center",
    categoria: "Temáticos",
    incluye: ["Decoración tropical", "Globos coloridos", "Guirnaldas", "Vajilla temática", "Accesorios"],
  },
]

// Datos de ejemplo - Productos individuales con imágenes más específicas
const productos = [
  {
    id: 101,
    nombre: "Globos Látex Colores Surtidos",
    descripcion: "Pack de 30 globos de látex en colores variados",
    precio: 15,
    imagen: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=200&h=200&fit=crop&crop=center",
    categoria: "Globos",
    stock: 50,
  },
  {
    id: 102,
    nombre: "Guirnalda Feliz Cumpleaños",
    descripcion: "Guirnalda decorativa de papel con mensaje personalizable",
    precio: 25,
    imagen: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=200&h=200&fit=crop&crop=center",
    categoria: "Decoración",
    stock: 30,
  },
  {
    id: 103,
    nombre: "Platos Desechables Dorados",
    descripcion: "Set de 20 platos desechables color dorado",
    precio: 18,
    imagen: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=center",
    categoria: "Vajilla",
    stock: 25,
  },
  {
    id: 104,
    nombre: "Velas Numéricas",
    descripcion: "Velas con números del 0 al 9 disponibles",
    precio: 8,
    imagen: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop&crop=center",
    categoria: "Velas",
    stock: 100,
  },
  {
    id: 105,
    nombre: "Confeti Metálico",
    descripcion: "Confeti metálico en colores dorado y plateado",
    precio: 12,
    imagen: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=200&h=200&fit=crop&crop=center",
    categoria: "Decoración",
    stock: 40,
  },
  {
    id: 106,
    nombre: "Globos Metálicos Números",
    descripcion: "Globos metálicos con números, disponibles del 0-9",
    precio: 22,
    imagen: "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=200&h=200&fit=crop&crop=center",
    categoria: "Globos",
    stock: 35,
  },
  {
    id: 107,
    nombre: "Servilletas Temáticas",
    descripcion: "Pack de 40 servilletas con diseños temáticos",
    precio: 10,
    imagen: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=center",
    categoria: "Vajilla",
    stock: 60,
  },
  {
    id: 108,
    nombre: "Cortina Metálica Decorativa",
    descripcion: "Cortina metálica para fondo de fotos",
    precio: 35,
    imagen: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=200&h=200&fit=crop&crop=center",
    categoria: "Decoración",
    stock: 20,
  },
  {
    id: 109,
    nombre: "Vasos de Papel Coloridos",
    descripcion: "Set de 25 vasos de papel en colores vibrantes",
    precio: 12,
    imagen: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=center",
    categoria: "Vajilla",
    stock: 45,
  },
  {
    id: 110,
    nombre: "Globos de Helio Corazón",
    descripcion: "Globos en forma de corazón con helio incluido",
    precio: 28,
    imagen: "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=200&h=200&fit=crop&crop=center",
    categoria: "Globos",
    stock: 20,
  },
  {
    id: 111,
    nombre: "Manteles Desechables",
    descripcion: "Manteles de papel resistente en varios colores",
    precio: 16,
    imagen: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=center",
    categoria: "Vajilla",
    stock: 30,
  },
  {
    id: 112,
    nombre: "Velas de Cumpleaños Especiales",
    descripcion: "Velas decorativas con formas divertidas",
    precio: 14,
    imagen: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop&crop=center",
    categoria: "Velas",
    stock: 55,
  },
]

const categorias = ["Todos", "Globos", "Decoración", "Vajilla", "Velas"]
const categoriasKits = ["Todos", "Cumpleaños", "Baby Shower", "Aniversario", "Despedida", "Graduación", "Temáticos"]

export default function CatalogoPage() {
  const [tabActiva, setTabActiva] = useState("kits")

  const agregarAlCarrito = (item: any, tipo: "kit" | "producto") => {
    // Aquí iría la lógica para agregar al carrito
    console.log(`Agregando ${tipo}:`, item)
    // Podrías mostrar una notificación de éxito aquí
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header/Navigation */}
      <header className="border-b">
        <div className="container flex items-center justify-between h-16 px-4 mx-auto md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Package className="w-6 h-6 text-pink-500" />
            <span className="text-xl font-bold">PartyBox</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-pink-500 transition-colors">
              Inicio
            </Link>
            <Link href="/catalogo" className="text-sm font-medium text-pink-500">
              Catálogo
            </Link>
            <Link href="/decorador-virtual" className="text-sm font-medium hover:text-pink-500 transition-colors">
              Decorador Virtual
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-pink-500 transition-colors">
              Contacto
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/carrito">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <ShoppingCart className="w-4 h-4" />
                Carrito
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="sm">
                Iniciar sesión
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="bg-pink-500 hover:bg-pink-600">
                Registrarse
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 py-8">
        <div className="container px-4 mx-auto md:px-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Catálogo PartyBox</h1>
            <p className="text-gray-500">
              Explora nuestros kits completos o compra productos individuales para tu evento
            </p>
          </div>

          {/* Tabs para Kits vs Productos */}
          <Tabs value={tabActiva} onValueChange={setTabActiva} className="mb-8">
            <TabsList className="grid w-full grid-cols-2 max-w-md">
              <TabsTrigger value="kits">Kits Completos</TabsTrigger>
              <TabsTrigger value="productos">Productos Individuales</TabsTrigger>
            </TabsList>

            {/* Tab de Kits Completos */}
            <TabsContent value="kits" className="space-y-6">
              {/* Filtros y búsqueda para kits */}
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-col gap-4 md:flex-row md:items-center">
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input type="search" placeholder="Buscar kits..." className="pl-8" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium">Filtrar por:</span>
                    <Select defaultValue="todos">
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        {categoriasKits.map((categoria) => (
                          <SelectItem key={categoria} value={categoria.toLowerCase()}>
                            {categoria}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Ordenar por:</span>
                  <Select defaultValue="relevancia">
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Ordenar por" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevancia">Relevancia</SelectItem>
                      <SelectItem value="precio-asc">Precio: Menor a Mayor</SelectItem>
                      <SelectItem value="precio-desc">Precio: Mayor a Menor</SelectItem>
                      <SelectItem value="nombre">Nombre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Grid de Kits */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {kits.map((kit) => (
                  <Card key={kit.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-square bg-gray-100">
                      <img
                        src={kit.imagen || "/placeholder.svg"}
                        alt={kit.nombre}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="mb-2">
                        <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-pink-100 text-pink-800">
                          {kit.categoria}
                        </span>
                      </div>
                      <h3 className="font-bold">{kit.nombre}</h3>
                      <p className="text-sm text-gray-500 line-clamp-2 mt-1">{kit.descripcion}</p>

                      {/* Lo que incluye */}
                      <div className="mt-3">
                        <p className="text-xs font-medium text-gray-700 mb-1">Incluye:</p>
                        <div className="flex flex-wrap gap-1">
                          {kit.incluye.slice(0, 3).map((item, index) => (
                            <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                              {item}
                            </span>
                          ))}
                          {kit.incluye.length > 3 && (
                            <span className="text-xs text-gray-500">+{kit.incluye.length - 3} más</span>
                          )}
                        </div>
                      </div>

                      <div className="mt-3 font-bold text-lg">S/. {kit.precio.toFixed(2)}</div>
                    </CardContent>
                    <Separator />
                    <CardFooter className="p-4 flex justify-between">
                      <Link href="/decorador-virtual">
                        <Button variant="outline" size="sm">
                          Visualizar
                        </Button>
                      </Link>
                      <div className="flex gap-2">
                        <Link href="/personalizar">
                          <Button size="sm" variant="outline">
                            Personalizar
                          </Button>
                        </Link>
                        <Button
                          size="sm"
                          className="bg-pink-500 hover:bg-pink-600"
                          onClick={() => agregarAlCarrito(kit, "kit")}
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Tab de Productos Individuales */}
            <TabsContent value="productos" className="space-y-6">
              {/* Filtros y búsqueda para productos */}
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-col gap-4 md:flex-row md:items-center">
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input type="search" placeholder="Buscar productos..." className="pl-8" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium">Filtrar por:</span>
                    <Select defaultValue="todos">
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        {categorias.map((categoria) => (
                          <SelectItem key={categoria} value={categoria.toLowerCase()}>
                            {categoria}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Ordenar por:</span>
                  <Select defaultValue="relevancia">
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Ordenar por" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevancia">Relevancia</SelectItem>
                      <SelectItem value="precio-asc">Precio: Menor a Mayor</SelectItem>
                      <SelectItem value="precio-desc">Precio: Mayor a Menor</SelectItem>
                      <SelectItem value="nombre">Nombre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Grid de Productos */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {productos.map((producto) => (
                  <Card key={producto.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-square bg-gray-100">
                      <img
                        src={producto.imagen || "/placeholder.svg"}
                        alt={producto.nombre}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="mb-2">
                        <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                          {producto.categoria}
                        </span>
                      </div>
                      <h3 className="font-bold">{producto.nombre}</h3>
                      <p className="text-sm text-gray-500 line-clamp-2 mt-1">{producto.descripcion}</p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="font-bold text-lg">S/. {producto.precio.toFixed(2)}</div>
                        <div className="text-sm text-gray-500">Stock: {producto.stock}</div>
                      </div>
                    </CardContent>
                    <Separator />
                    <CardFooter className="p-4 flex justify-between">
                      <Button variant="outline" size="sm">
                        Ver detalles
                      </Button>
                      <Button
                        size="sm"
                        className="bg-pink-500 hover:bg-pink-600 flex items-center gap-2"
                        onClick={() => agregarAlCarrito(producto, "producto")}
                      >
                        <Plus className="w-4 h-4" />
                        Agregar
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <footer className="border-t bg-white">
        <div className="container px-4 py-6 mx-auto md:px-6">
          <p className="text-sm text-center text-gray-500">© 2024 PartyBox. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
