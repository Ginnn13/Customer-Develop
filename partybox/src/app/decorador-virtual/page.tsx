"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Package, Upload, RotateCcw, Save, Download, Palette, Move, Trash2, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Elementos decorativos disponibles
const elementosDecoracion = [
  {
    id: 1,
    nombre: "Globo Rojo",
    imagen: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=60&h=60&fit=crop&crop=center",
    categoria: "globos",
  },
  {
    id: 2,
    nombre: "Globo Azul",
    imagen: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=60&h=60&fit=crop&crop=center",
    categoria: "globos",
  },
  {
    id: 3,
    nombre: "Globo Rosa",
    imagen: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=60&h=60&fit=crop&crop=center",
    categoria: "globos",
  },
  {
    id: 4,
    nombre: "Guirnalda Colorida",
    imagen: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=60&h=60&fit=crop&crop=center",
    categoria: "guirnaldas",
  },
  {
    id: 5,
    nombre: "Guirnalda Dorada",
    imagen: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=60&h=60&fit=crop&crop=center",
    categoria: "guirnaldas",
  },
  {
    id: 6,
    nombre: "Banner Feliz Cumpleaños",
    imagen: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=60&h=60&fit=crop&crop=center",
    categoria: "banners",
  },
  {
    id: 7,
    nombre: "Estrella Dorada",
    imagen: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=60&h=60&fit=crop&crop=center",
    categoria: "figuras",
  },
  {
    id: 8,
    nombre: "Corazón Rosa",
    imagen: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=60&h=60&fit=crop&crop=center",
    categoria: "figuras",
  },
  {
    id: 9,
    nombre: "Mesa Decorada",
    imagen: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=60&h=60&fit=crop&crop=center",
    categoria: "muebles",
  },
  {
    id: 10,
    nombre: "Cortina Metálica",
    imagen: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=60&h=60&fit=crop&crop=center",
    categoria: "fondos",
  },
]

interface ElementoCanvas {
  id: string
  elementoId: number
  x: number
  y: number
  width: number
  height: number
  rotation: number
  zIndex: number
}

export default function DecoradorVirtualPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [imagenFondo, setImagenFondo] = useState<string | null>(null)
  const [elementosCanvas, setElementosCanvas] = useState<ElementoCanvas[]>([])
  const [elementoSeleccionado, setElementoSeleccionado] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [escalaCanvas, setEscalaCanvas] = useState(1) 

  // Cargar imagen de fondo
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagenFondo(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Agregar elemento al canvas
  const agregarElemento = (elementoId: number) => {
    const nuevoElemento: ElementoCanvas = {
      id: `elemento-${Date.now()}`,
      elementoId,
      x: 100,
      y: 100,
      width: 80,
      height: 80,
      rotation: 0,
      zIndex: elementosCanvas.length,
    }
    setElementosCanvas([...elementosCanvas, nuevoElemento])
  }

  // Eliminar elemento
  const eliminarElemento = (id: string) => {
    setElementosCanvas(elementosCanvas.filter((el) => el.id !== id))
    setElementoSeleccionado(null)
  }

  // Actualizar propiedades del elemento seleccionado
  const actualizarElemento = (id: string, propiedades: Partial<ElementoCanvas>) => {
    setElementosCanvas(elementosCanvas.map((el) => (el.id === id ? { ...el, ...propiedades } : el)))
  }

  // Limpiar canvas
  const limpiarCanvas = () => {
    setElementosCanvas([])
    setElementoSeleccionado(null)
  }

  // Guardar diseño
  const guardarDiseno = () => {
    const canvas = canvasRef.current
    if (canvas) {
      const link = document.createElement("a")
      link.download = "mi-decoracion-partybox.png"
      link.href = canvas.toDataURL()
      link.click()
    }
  }

  // Dibujar en canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Limpiar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Dibujar imagen de fondo
    if (imagenFondo) {
      const img = new Image()
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

        // Dibujar elementos decorativos
        elementosCanvas.forEach((elemento) => {
          ctx.save()
          ctx.translate(elemento.x + elemento.width / 2, elemento.y + elemento.height / 2)
          ctx.rotate((elemento.rotation * Math.PI) / 180)

          // Dibujar placeholder del elemento (en una implementación real cargarías las imágenes)
          ctx.fillStyle = elemento.id === elementoSeleccionado ? "#ff69b4" : "#e2e8f0"
          ctx.fillRect(-elemento.width / 2, -elemento.height / 2, elemento.width, elemento.height)

          // Texto del elemento
          ctx.fillStyle = "#374151"
          ctx.font = "12px Arial"
          ctx.textAlign = "center"
          const elementoData = elementosDecoracion.find((e) => e.id === elemento.elementoId)
          if (elementoData) {
            ctx.fillText(elementoData.nombre, 0, 0)
          }

          ctx.restore()

          // Dibujar borde de selección
          if (elemento.id === elementoSeleccionado) {
            ctx.strokeStyle = "#ff69b4"
            ctx.lineWidth = 2
            ctx.strokeRect(elemento.x - 2, elemento.y - 2, elemento.width + 4, elemento.height + 4)
          }
        })
      }
      img.src = imagenFondo
    }
  }, [imagenFondo, elementosCanvas, elementoSeleccionado])

  // Manejar clics en canvas
  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    // Buscar elemento clickeado
    const elementoClickeado = elementosCanvas
      .slice()
      .reverse()
      .find(
        (elemento) =>
          x >= elemento.x && x <= elemento.x + elemento.width && y >= elemento.y && y <= elemento.y + elemento.height,
      )

    setElementoSeleccionado(elementoClickeado?.id || null)
  }

  const elementoActual = elementosCanvas.find((el) => el.id === elementoSeleccionado)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
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
            <Link href="/catalogo" className="text-sm font-medium hover:text-pink-500 transition-colors">
              Catálogo
            </Link>
            <Link href="/decorador-virtual" className="text-sm font-medium text-pink-500">
              Decorador Virtual
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-pink-500 transition-colors">
              Contacto
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button onClick={guardarDiseno} variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Descargar
            </Button>
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
            <h1 className="text-3xl font-bold">Decorador Virtual</h1>
            <p className="text-gray-500">Visualiza cómo se verá tu espacio con nuestras decoraciones</p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
            {/* Panel de herramientas */}
            <div className="lg:col-span-1 space-y-6">
              {/* Subir imagen */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="w-5 h-5" />
                    Subir Foto
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Label htmlFor="imagen-upload">Sube una foto de tu espacio</Label>
                    <Input id="imagen-upload" type="file" accept="image/*" onChange={handleImageUpload} />
                    {!imagenFondo && (
                      <p className="text-sm text-gray-500">
                        Sube una foto de la habitación o espacio que quieres decorar
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Elementos decorativos */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="w-5 h-5" />
                    Decoraciones
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="globos">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="globos">Globos</TabsTrigger>
                      <TabsTrigger value="otros">Otros</TabsTrigger>
                    </TabsList>

                    <TabsContent value="globos" className="space-y-2">
                      {elementosDecoracion
                        .filter((el) => el.categoria === "globos")
                        .map((elemento) => (
                          <div
                            key={elemento.id}
                            className="flex items-center gap-2 p-2 border rounded-lg cursor-pointer hover:bg-gray-50"
                            onClick={() => agregarElemento(elemento.id)}
                          >
                            <div className="w-10 h-10 bg-gray-100 rounded">
                              <img
                                src={elemento.imagen || "/placeholder.svg"}
                                alt={elemento.nombre}
                                className="w-full h-full object-cover rounded"
                              />
                            </div>
                            <span className="text-sm">{elemento.nombre}</span>
                          </div>
                        ))}
                    </TabsContent>

                    <TabsContent value="otros" className="space-y-2">
                      {elementosDecoracion
                        .filter((el) => el.categoria !== "globos")
                        .map((elemento) => (
                          <div
                            key={elemento.id}
                            className="flex items-center gap-2 p-2 border rounded-lg cursor-pointer hover:bg-gray-50"
                            onClick={() => agregarElemento(elemento.id)}
                          >
                            <div className="w-10 h-10 bg-gray-100 rounded">
                              <img
                                src={elemento.imagen || "/placeholder.svg"}
                                alt={elemento.nombre}
                                className="w-full h-full object-cover rounded"
                              />
                            </div>
                            <span className="text-sm">{elemento.nombre}</span>
                          </div>
                        ))}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Propiedades del elemento seleccionado */}
              {elementoActual && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Move className="w-5 h-5" />
                      Propiedades
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Tamaño</Label>
                      <Slider
                        value={[elementoActual.width]}
                        onValueChange={([value]) =>
                          actualizarElemento(elementoActual.id, { width: value, height: value })
                        }
                        max={200}
                        min={20}
                        step={5}
                      />
                    </div>

                    <div>
                      <Label>Rotación</Label>
                      <Slider
                        value={[elementoActual.rotation]}
                        onValueChange={([value]) => actualizarElemento(elementoActual.id, { rotation: value })}
                        max={360}
                        min={0}
                        step={5}
                      />
                    </div>

                    <Button
                      variant="destructive"
                      size="sm"
                      className="w-full"
                      onClick={() => eliminarElemento(elementoActual.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Eliminar
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Acciones */}
              <Card>
                <CardHeader>
                  <CardTitle>Acciones</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full" onClick={limpiarCanvas}>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Limpiar Todo
                  </Button>

                  <Button variant="outline" size="sm" className="w-full" onClick={guardarDiseno}>
                    <Save className="w-4 h-4 mr-2" />
                    Guardar Diseño
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Canvas principal */}
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle>Tu Espacio Decorado</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                    {imagenFondo ? (
                      <canvas
                        ref={canvasRef}
                        width={800}
                        height={600}
                        className="w-full h-auto border rounded-lg cursor-crosshair"
                        onClick={handleCanvasClick}
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-96 text-gray-500">
                        <Upload className="w-16 h-16 mb-4" />
                        <h3 className="text-lg font-medium mb-2">Sube una foto de tu espacio</h3>
                        <p className="text-center">
                          Para comenzar a decorar, sube una foto de la habitación o área que quieres decorar
                        </p>
                      </div>
                    )}
                  </div>

                  {imagenFondo && (
                    <div className="mt-4 text-sm text-gray-600">
                      <p>• Haz clic en los elementos del panel izquierdo para agregarlos</p>
                      <p>• Haz clic en un elemento del canvas para seleccionarlo y editarlo</p>
                      <p>• Usa los controles para ajustar tamaño y rotación</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
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
