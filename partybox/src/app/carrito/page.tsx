"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Minus, Package, Plus, Trash2, MapPin, CreditCard, ArrowRight, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

// Datos de ejemplo del carrito
const initialCartItems = [
  {
    id: 1,
    nombre: "Kit Cumpleaños Infantil Superhéroes",
    precio: 120,
    cantidad: 1,
    imagen: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=100&h=100&fit=crop&crop=center",
    personalizaciones: ["Colores: Azul, Rojo", "Globos extra", "Guirnaldas temáticas"],
  },
  {
    id: 2,
    nombre: "Kit Baby Shower Niña",
    precio: 150,
    cantidad: 1,
    imagen: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop&crop=center",
    personalizaciones: ["Colores: Rosa, Dorado", "Figuras colgantes", "Manteles decorativos"],
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function CarritoPage() {
  const [cartItems, setCartItems] = useState(initialCartItems)
  const [codigoDescuento, setCodigoDescuento] = useState("")
  const [descuentoAplicado, setDescuentoAplicado] = useState(0)
  const [isApplyingCode, setIsApplyingCode] = useState(false)
  const [codeSuccess, setCodeSuccess] = useState(false)

  const actualizarCantidad = (id: number, nuevaCantidad: number) => {
    if (nuevaCantidad <= 0) {
      eliminarItem(id)
    } else {
      setCartItems(cartItems.map((item) => (item.id === id ? { ...item, cantidad: nuevaCantidad } : item)))
    }
  }

  const eliminarItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const aplicarDescuento = () => {
    setIsApplyingCode(true)

    // Simulamos una petición a servidor
    setTimeout(() => {
      if (codigoDescuento.toLowerCase() === "partybox10") {
        setDescuentoAplicado(0.1) // 10% de descuento
        setCodeSuccess(true)
        setTimeout(() => setCodeSuccess(false), 2000)
      }
      setIsApplyingCode(false)
    }, 800)
  }

  const subtotal = cartItems.reduce((total, item) => total + item.precio * item.cantidad, 0)
  const descuento = subtotal * descuentoAplicado
  const envio = 15
  const total = subtotal - descuento + envio

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b">
        <div className="container flex items-center justify-between h-16 px-4 mx-auto md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Package className="w-6 h-6 text-pink-500" />
            <span className="text-xl font-bold">PartyBox</span>
          </Link>
          <div className="flex items-center gap-4">
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
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold">Tu Carrito de Compras</h1>
            <p className="text-gray-500">Revisa tus kits seleccionados antes de proceder al pago</p>
          </motion.div>

          {cartItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-12"
            >
              <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Tu carrito está vacío</h2>
              <p className="text-gray-500 mb-6">¡Agrega algunos kits increíbles para tu próxima celebración!</p>
              <Link href="/catalogo">
                <Button className="bg-pink-500 hover:bg-pink-600">Explorar Catálogo</Button>
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Items del carrito */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Productos en tu carrito ({cartItems.length})</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <motion.div variants={container} initial="hidden" animate="show">
                      {cartItems.map((item) => (
                        <motion.div
                          key={item.id}
                          variants={item}
                          exit={{ opacity: 0, x: -100 }}
                          layout
                          className="flex items-start gap-4 p-4 border rounded-lg hover:border-pink-200 transition-colors"
                        >
                          <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden">
                            <img
                              src={item.imagen || "/placeholder.svg"}
                              alt={item.nombre}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold">{item.nombre}</h3>
                            <div className="text-sm text-gray-500 mt-1">
                              {item.personalizaciones.map((personalizacion, index) => (
                                <div key={index}>• {personalizacion}</div>
                              ))}
                            </div>
                            <div className="flex items-center justify-between mt-3">
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="w-8 h-8 hover:bg-pink-50 hover:text-pink-500 transition-colors"
                                  onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                                >
                                  <Minus className="w-4 h-4" />
                                </Button>
                                <span className="w-8 text-center">{item.cantidad}</span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="w-8 h-8 hover:bg-pink-50 hover:text-pink-500 transition-colors"
                                  onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                                >
                                  <Plus className="w-4 h-4" />
                                </Button>
                              </div>
                              <div className="flex items-center gap-4">
                                <span className="font-semibold">S/. {(item.precio * item.cantidad).toFixed(2)}</span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors"
                                  onClick={() => eliminarItem(item.id)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </CardContent>
                </Card>

                {/* Código de descuento */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Código de Descuento</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Ingresa tu código de descuento"
                          value={codigoDescuento}
                          onChange={(e) => setCodigoDescuento(e.target.value)}
                          className="focus-within:border-pink-300 transition-colors"
                        />
                        <Button
                          onClick={aplicarDescuento}
                          variant="outline"
                          disabled={isApplyingCode}
                          className="relative"
                        >
                          {isApplyingCode ? (
                            <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-pink-500" />
                          ) : codeSuccess ? (
                            <Check className="w-5 h-5 text-green-500" />
                          ) : (
                            "Aplicar"
                          )}
                        </Button>
                      </div>
                      {descuentoAplicado > 0 && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="text-green-600 text-sm mt-2"
                        >
                          ¡Descuento del {(descuentoAplicado * 100).toFixed(0)}% aplicado!
                        </motion.p>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Resumen de compra */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Card className="sticky top-4">
                  <CardHeader>
                    <CardTitle>Resumen de Compra</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>S/. {subtotal.toFixed(2)}</span>
                    </div>
                    {descuentoAplicado > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="flex justify-between text-green-600"
                      >
                        <span>Descuento</span>
                        <span>-S/. {descuento.toFixed(2)}</span>
                      </motion.div>
                    )}
                    <div className="flex justify-between">
                      <span>Envío</span>
                      <span>S/. {envio.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>S/. {total.toFixed(2)}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-3">
                    <Link href="/checkout" className="w-full">
                      <Button className="w-full bg-pink-500 hover:bg-pink-600 transition-colors group">
                        <CreditCard className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                        Proceder al Pago
                        <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </Button>
                    </Link>
                    <Link href="/catalogo" className="w-full">
                      <Button variant="outline" className="w-full hover:bg-pink-50 transition-colors">
                        Seguir Comprando
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>

                {/* Información de envío */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        Información de Envío
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-gray-600">
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-pink-500"></div>
                          Envío gratuito en pedidos mayores a S/. 200
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-pink-500"></div>
                          Entrega en 24-48 horas en Lima
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-pink-500"></div>
                          Seguimiento en tiempo real
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-pink-500"></div>
                          Empaque especial para eventos
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </div>
          )}
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
