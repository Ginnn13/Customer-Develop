"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Check, Package, Plus, Trash2, ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Datos de ejemplo
const tematicas = [
  {
    id: 1,
    nombre: "Cumpleaños infantil",
    imagen: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=200&h=200&fit=crop&crop=center",
  },
  {
    id: 2,
    nombre: "Baby shower",
    imagen: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop&crop=center",
  },
  {
    id: 3,
    nombre: "Aniversario",
    imagen: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=200&h=200&fit=crop&crop=center",
  },
  {
    id: 4,
    nombre: "Despedida de soltero/a",
    imagen: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=200&h=200&fit=crop&crop=center",
  },
  {
    id: 5,
    nombre: "Fiesta temática",
    imagen: "https://images.unsplash.com/photo-1544531586-fbd96ceaff1e?w=200&h=200&fit=crop&crop=center",
  },
  {
    id: 6,
    nombre: "Graduación",
    imagen: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=200&h=200&fit=crop&crop=center",
  },
]

const colores = [
  { id: 1, nombre: "Rosa", hex: "#FF69B4" },
  { id: 2, nombre: "Azul", hex: "#1E90FF" },
  { id: 3, nombre: "Verde", hex: "#32CD32" },
  { id: 4, nombre: "Amarillo", hex: "#FFD700" },
  { id: 5, nombre: "Rojo", hex: "#FF4500" },
  { id: 6, nombre: "Morado", hex: "#9370DB" },
  { id: 7, nombre: "Naranja", hex: "#FF8C00" },
  { id: 8, nombre: "Turquesa", hex: "#40E0D0" },
]

const elementos = [
  {
    id: 1,
    nombre: "Globos",
    imagen: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=100&h=100&fit=crop&crop=center",
    precio: 15,
  },
  {
    id: 2,
    nombre: "Guirnaldas",
    imagen: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=100&h=100&fit=crop&crop=center",
    precio: 20,
  },
  {
    id: 3,
    nombre: "Platos decorativos",
    imagen: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&crop=center",
    precio: 25,
  },
  {
    id: 4,
    nombre: "Vasos temáticos",
    imagen: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&crop=center",
    precio: 18,
  },
  {
    id: 5,
    nombre: "Servilletas",
    imagen: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&crop=center",
    precio: 10,
  },
  {
    id: 6,
    nombre: "Manteles",
    imagen: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&crop=center",
    precio: 30,
  },
  {
    id: 7,
    nombre: "Figuras colgantes",
    imagen: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=100&h=100&fit=crop&crop=center",
    precio: 22,
  },
  {
    id: 8,
    nombre: "Confeti",
    imagen: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=100&h=100&fit=crop&crop=center",
    precio: 12,
  },
  {
    id: 9,
    nombre: "Velas decorativas",
    imagen: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop&crop=center",
    precio: 15,
  },
  {
    id: 10,
    nombre: "Cajitas sorpresa",
    imagen: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=100&h=100&fit=crop&crop=center",
    precio: 28,
  },
]

export default function PersonalizarPage() {
  const [paso, setPaso] = useState(1)
  const [tematicaSeleccionada, setTematicaSeleccionada] = useState<number | null>(null)
  const [coloresSeleccionados, setColoresSeleccionados] = useState<number[]>([])
  const [elementosSeleccionados, setElementosSeleccionados] = useState<{ id: number; cantidad: number }[]>([])

  const avanzarPaso = () => {
    setPaso(paso + 1)
  }

  const retrocederPaso = () => {
    setPaso(paso - 1)
  }

  const seleccionarTematica = (id: number) => {
    setTematicaSeleccionada(id)
  }

  const toggleColor = (id: number) => {
    if (coloresSeleccionados.includes(id)) {
      setColoresSeleccionados(coloresSeleccionados.filter((colorId) => colorId !== id))
    } else {
      setColoresSeleccionados([...coloresSeleccionados, id])
    }
  }

  const agregarElemento = (id: number) => {
    if (elementosSeleccionados.some((elem) => elem.id === id)) {
      // Si ya existe, incrementar cantidad
      setElementosSeleccionados(
        elementosSeleccionados.map((elem) => (elem.id === id ? { ...elem, cantidad: elem.cantidad + 1 } : elem)),
      )
    } else {
      // Si no existe, agregar con cantidad 1
      setElementosSeleccionados([...elementosSeleccionados, { id, cantidad: 1 }])
    }
  }

  const eliminarElemento = (id: number) => {
    setElementosSeleccionados(elementosSeleccionados.filter((elem) => elem.id !== id))
  }

  const actualizarCantidad = (id: number, cantidad: number) => {
    if (cantidad <= 0) {
      eliminarElemento(id)
    } else {
      setElementosSeleccionados(elementosSeleccionados.map((elem) => (elem.id === id ? { ...elem, cantidad } : elem)))
    }
  }

  const calcularTotal = () => {
    return elementosSeleccionados.reduce((total, elem) => {
      const elemento = elementos.find((e) => e.id === elem.id)
      return total + (elemento?.precio || 0) * elem.cantidad
    }, 0)
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
            <Link href="/catalogo" className="text-sm font-medium hover:text-pink-500 transition-colors">
              Catálogo
            </Link>
            <Link href="/decorador-virtual" className="text-sm font-medium hover:text-pink-500 transition-colors">
              Decorador Virtual
            </Link>
            <Link href="/personalizar" className="text-sm font-medium text-pink-500">
              Personalizar
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
            <h1 className="text-3xl font-bold">Personaliza tu PartyBox</h1>
            <p className="text-gray-500">Crea el kit perfecto para tu evento en simples pasos</p>
          </div>

          {/* Pasos de personalización */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 mb-8">
            <div
              className={`flex items-center p-4 border rounded-lg ${paso >= 1 ? "bg-pink-50 border-pink-200" : "bg-white"}`}
            >
              <div className="flex items-center justify-center w-8 h-8 mr-4 rounded-full bg-pink-500 text-white">1</div>
              <div>
                <h3 className="font-medium">Elige tu temática</h3>
                <p className="text-sm text-gray-500">Selecciona el tipo de evento</p>
              </div>
            </div>
            <div
              className={`flex items-center p-4 border rounded-lg ${paso >= 2 ? "bg-pink-50 border-pink-200" : "bg-white"}`}
            >
              <div className="flex items-center justify-center w-8 h-8 mr-4 rounded-full bg-pink-500 text-white">2</div>
              <div>
                <h3 className="font-medium">Personaliza colores y elementos</h3>
                <p className="text-sm text-gray-500">Adapta tu kit a tus gustos</p>
              </div>
            </div>
            <div
              className={`flex items-center p-4 border rounded-lg ${paso >= 3 ? "bg-pink-50 border-pink-200" : "bg-white"}`}
            >
              <div className="flex items-center justify-center w-8 h-8 mr-4 rounded-full bg-pink-500 text-white">3</div>
              <div>
                <h3 className="font-medium">Revisa y confirma</h3>
                <p className="text-sm text-gray-500">Finaliza tu pedido</p>
              </div>
            </div>
          </div>

          {/* Contenido según el paso */}
          <div className="mb-8">
            {paso === 1 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Elige la temática para tu evento</h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {tematicas.map((tematica) => (
                    <div
                      key={tematica.id}
                      className={`border rounded-lg overflow-hidden cursor-pointer transition-all hover:shadow-md ${tematicaSeleccionada === tematica.id ? "ring-2 ring-pink-500" : ""}`}
                      onClick={() => seleccionarTematica(tematica.id)}
                    >
                      <div className="aspect-video bg-gray-100">
                        <img
                          src={tematica.imagen || "/placeholder.svg"}
                          alt={tematica.nombre}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="p-4 flex items-center justify-between">
                        <span className="font-medium">{tematica.nombre}</span>
                        {tematicaSeleccionada === tematica.id && (
                          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-pink-500 text-white">
                            <Check className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {paso === 2 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Personaliza tu kit</h2>

                <Tabs defaultValue="colores" className="mb-8">
                  <TabsList className="mb-4">
                    <TabsTrigger value="colores">Colores</TabsTrigger>
                    <TabsTrigger value="elementos">Elementos</TabsTrigger>
                  </TabsList>

                  <TabsContent value="colores">
                    <div className="mb-4">
                      <h3 className="text-lg font-medium mb-2">Selecciona los colores para tu kit</h3>
                      <p className="text-sm text-gray-500 mb-4">Puedes elegir hasta 3 colores principales</p>

                      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                        {colores.map((color) => (
                          <div
                            key={color.id}
                            className={`border rounded-lg p-3 cursor-pointer transition-all ${coloresSeleccionados.includes(color.id) ? "ring-2 ring-pink-500" : ""}`}
                            onClick={() => toggleColor(color.id)}
                          >
                            <div className="w-full h-12 rounded-md mb-2" style={{ backgroundColor: color.hex }} />
                            <div className="flex items-center justify-between">
                              <span>{color.nombre}</span>
                              {coloresSeleccionados.includes(color.id) && (
                                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-pink-500 text-white">
                                  <Check className="w-3 h-3" />
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="elementos">
                    <div className="mb-4">
                      <h3 className="text-lg font-medium mb-2">Selecciona los elementos para tu kit</h3>
                      <p className="text-sm text-gray-500 mb-4">Personaliza tu kit con los elementos que necesitas</p>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {elementos.map((elemento) => (
                          <div key={elemento.id} className="border rounded-lg overflow-hidden">
                            <div className="flex items-center p-3">
                              <div className="w-16 h-16 bg-gray-100 rounded-md mr-3">
                                <img
                                  src={elemento.imagen || "/placeholder.svg"}
                                  alt={elemento.nombre}
                                  className="object-cover w-full h-full"
                                />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium">{elemento.nombre}</h4>
                                <p className="text-sm text-gray-500">S/. {elemento.precio.toFixed(2)}</p>
                              </div>
                              <Button variant="ghost" size="icon" onClick={() => agregarElemento(elemento.id)}>
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>

                            {elementosSeleccionados.some((elem) => elem.id === elemento.id) && (
                              <div className="flex items-center justify-between p-3 bg-gray-50 border-t">
                                <div className="flex items-center">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="w-6 h-6"
                                    onClick={() => {
                                      const elem = elementosSeleccionados.find((e) => e.id === elemento.id)
                                      if (elem) actualizarCantidad(elemento.id, elem.cantidad - 1)
                                    }}
                                  >
                                    <span>-</span>
                                  </Button>
                                  <span className="mx-2">
                                    {elementosSeleccionados.find((elem) => elem.id === elemento.id)?.cantidad || 0}
                                  </span>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="w-6 h-6"
                                    onClick={() => {
                                      const elem = elementosSeleccionados.find((e) => e.id === elemento.id)
                                      if (elem) actualizarCantidad(elemento.id, elem.cantidad + 1)
                                    }}
                                  >
                                    <span>+</span>
                                  </Button>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-red-500"
                                  onClick={() => eliminarElemento(elemento.id)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}

            {paso === 3 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Revisa y confirma tu PartyBox</h2>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                  <div className="lg:col-span-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Resumen de tu kit personalizado</CardTitle>
                        <CardDescription>Revisa los detalles antes de confirmar</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div>
                          <h3 className="font-medium mb-2">Temática seleccionada</h3>
                          <div className="flex items-center p-3 border rounded-lg">
                            <div className="w-16 h-16 bg-gray-100 rounded-md mr-3">
                              <img
                                src={tematicas.find((t) => t.id === tematicaSeleccionada)?.imagen || ""}
                                alt="Temática"
                                className="object-cover w-full h-full"
                              />
                            </div>
                            <div>
                              <p className="font-medium">
                                {tematicas.find((t) => t.id === tematicaSeleccionada)?.nombre || "No seleccionada"}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-medium mb-2">Colores seleccionados</h3>
                          <div className="flex flex-wrap gap-2">
                            {coloresSeleccionados.map((colorId) => {
                              const color = colores.find((c) => c.id === colorId)
                              return color ? (
                                <div key={color.id} className="flex items-center p-2 border rounded-lg">
                                  <div className="w-6 h-6 rounded-full mr-2" style={{ backgroundColor: color.hex }} />
                                  <span>{color.nombre}</span>
                                </div>
                              ) : null
                            })}
                            {coloresSeleccionados.length === 0 && (
                              <p className="text-gray-500">No has seleccionado colores</p>
                            )}
                          </div>
                        </div>

                        <div>
                          <h3 className="font-medium mb-2">Elementos seleccionados</h3>
                          {elementosSeleccionados.length > 0 ? (
                            <div className="border rounded-lg overflow-hidden">
                              <div className="grid grid-cols-4 gap-4 p-3 bg-gray-50 font-medium">
                                <div className="col-span-2">Elemento</div>
                                <div className="text-center">Cantidad</div>
                                <div className="text-right">Precio</div>
                              </div>
                              <Separator />
                              {elementosSeleccionados.map((elem) => {
                                const elemento = elementos.find((e) => e.id === elem.id)
                                return elemento ? (
                                  <div key={elemento.id} className="grid grid-cols-4 gap-4 p-3 border-b last:border-0">
                                    <div className="col-span-2 flex items-center">
                                      <div className="w-10 h-10 bg-gray-100 rounded-md mr-2">
                                        <img
                                          src={elemento.imagen || "/placeholder.svg"}
                                          alt={elemento.nombre}
                                          className="object-cover w-full h-full"
                                        />
                                      </div>
                                      <span>{elemento.nombre}</span>
                                    </div>
                                    <div className="text-center">{elem.cantidad}</div>
                                    <div className="text-right">S/. {(elemento.precio * elem.cantidad).toFixed(2)}</div>
                                  </div>
                                ) : null
                              })}
                            </div>
                          ) : (
                            <p className="text-gray-500">No has seleccionado elementos</p>
                          )}
                        </div>

                        <div>
                          <h3 className="font-medium mb-2">Información de entrega</h3>
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                              <div>
                                <Label htmlFor="nombre">Nombre completo</Label>
                                <Input id="nombre" placeholder="Tu nombre completo" />
                              </div>
                              <div>
                                <Label htmlFor="telefono">Teléfono</Label>
                                <Input id="telefono" placeholder="Tu número de teléfono" />
                              </div>
                            </div>
                            <div>
                              <Label htmlFor="direccion">Dirección de entrega</Label>
                              <Input id="direccion" placeholder="Tu dirección completa" />
                            </div>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                              <div>
                                <Label htmlFor="ciudad">Ciudad</Label>
                                <Input id="ciudad" placeholder="Ciudad" />
                              </div>
                              <div>
                                <Label htmlFor="distrito">Distrito</Label>
                                <Input id="distrito" placeholder="Distrito" />
                              </div>
                              <div>
                                <Label htmlFor="codigo-postal">Código postal</Label>
                                <Input id="codigo-postal" placeholder="Código postal" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <Card>
                      <CardHeader>
                        <CardTitle>Resumen de compra</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between">
                          <span>Subtotal</span>
                          <span>S/. {calcularTotal().toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Envío</span>
                          <span>S/. 15.00</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-bold">
                          <span>Total</span>
                          <span>S/. {(calcularTotal() + 15).toFixed(2)}</span>
                        </div>

                        <div className="pt-4">
                          <Label htmlFor="metodo-pago">Método de pago</Label>
                          <Select defaultValue="tarjeta">
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona un método de pago" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="tarjeta">Tarjeta de crédito/débito</SelectItem>
                              <SelectItem value="yape">Yape</SelectItem>
                              <SelectItem value="plin">Plin</SelectItem>
                              <SelectItem value="transferencia">Transferencia bancaria</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button
                          className="w-full bg-pink-500 hover:bg-pink-600"
                          onClick={() => {
                            // Aquí agregarías la lógica para agregar al carrito
                            window.location.href = "/carrito"
                          }}
                        >
                          Agregar al Carrito
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navegación entre pasos */}
          <div className="flex justify-between">
            {paso > 1 ? (
              <Button variant="outline" onClick={retrocederPaso}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Anterior
              </Button>
            ) : (
              <div></div>
            )}

            {paso < 3 ? (
              <Button
                className="bg-pink-500 hover:bg-pink-600"
                onClick={avanzarPaso}
                disabled={
                  (paso === 1 && tematicaSeleccionada === null) || (paso === 2 && elementosSeleccionados.length === 0)
                }
              >
                Siguiente
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <div></div>
            )}
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
