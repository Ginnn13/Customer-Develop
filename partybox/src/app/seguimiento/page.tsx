"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Package, Clock, CheckCircle, Truck, Home, Star, Phone, MessageCircle, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"

// Datos de ejemplo del pedido
const pedidoEjemplo = {
  id: "PB-2024-001",
  fecha: "2024-01-15",
  estado: "en_transito",
  total: 285.0,
  direccion: "Av. Javier Prado 1234, San Isidro, Lima",
  telefono: "+51 999 888 777",
  items: [
    { nombre: "Kit Cumpleaños Infantil Superhéroes", cantidad: 1, precio: 120 },
    { nombre: "Kit Baby Shower Niña", cantidad: 1, precio: 150 },
  ],
  tracking: [
    {
      estado: "confirmado",
      fecha: "2024-01-15 10:30",
      descripcion: "Pedido confirmado y en preparación",
      completado: true,
    },
    { estado: "preparando", fecha: "2024-01-15 14:20", descripcion: "Kit personalizado y empacado", completado: true },
    { estado: "en_transito", fecha: "2024-01-16 09:15", descripcion: "En camino a tu dirección", completado: true },
    { estado: "entregado", fecha: "", descripcion: "Entregado en destino", completado: false },
  ],
  ubicacionActual: {
    lat: -12.0464,
    lng: -77.0428,
    direccion: "Av. Arequipa 2500, Lince",
  },
  tiempoEstimado: "45 minutos",
  repartidor: {
    nombre: "Carlos Mendoza",
    foto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    calificacion: 4.8,
    telefono: "+51 987 654 321",
    vehiculo: "Moto - ABC-123",
  },
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function SeguimientoPage() {
  //const [numeroPedido, setNumeroPedido] = useState("PB-2024-001")
  const [pedido, setPedido] = useState(pedidoEjemplo)
  const [progreso, setProgreso] = useState(75)
  const [showChat, setShowChat] = useState(false)
  const [mensaje, setMensaje] = useState("")
  const [mensajes, setMensajes] = useState([
    { sender: "system", text: "Tu pedido está en camino. Tiempo estimado de llegada: 45 minutos.", timestamp: "09:15" },
  ])

  useEffect(() => {
    // Simular actualización en tiempo real
    const interval = setInterval(() => {
      setProgreso((prev) => {
        const newProgress = Math.min(prev + 1, 100)
        if (newProgress === 100 && pedido.estado === "en_transito") {
          // Actualizar estado a entregado
          setPedido((prev) => ({
            ...prev,
            estado: "entregado",
            tracking: prev.tracking.map((t, i) =>
              i === 3 ? { ...t, completado: true, fecha: "2024-01-16 10:05" } : t,
            ),
          }))

          // Agregar mensaje de entrega
          setMensajes((prev) => [
            ...prev,
            {
              sender: "system",
              text: "¡Tu pedido ha sido entregado! Gracias por confiar en PartyBox.",
              timestamp: "10:05",
            },
          ])

          // Limpiar intervalo
          clearInterval(interval)
        }
        return newProgress
      })
    }, 1000) // Actualizar cada segundo para la demo

    return () => clearInterval(interval)
  }, [pedido.estado])

  const getEstadoIcon = (estado: string, completado: boolean) => {
    if (completado) {
      return <CheckCircle className="w-5 h-5 text-green-500" />
    }

    switch (estado) {
      case "confirmado":
        return <Package className="w-5 h-5 text-gray-400" />
      case "preparando":
        return <Clock className="w-5 h-5 text-gray-400" />
      case "en_transito":
        return <Truck className="w-5 h-5 text-pink-500" />
      case "entregado":
        return <Home className="w-5 h-5 text-gray-400" />
      default:
        return <Clock className="w-5 h-5 text-gray-400" />
    }
  }

  const enviarMensaje = () => {
    if (!mensaje.trim()) return

    const now = new Date()
    const timestamp = now.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })

    // Agregar mensaje del usuario
    setMensajes([...mensajes, { sender: "user", text: mensaje, timestamp }])
    setMensaje("")

    // Simular respuesta del repartidor
    setTimeout(() => {
      const responseTime = new Date(now.getTime() + 1000).toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
      })
      setMensajes((prev) => [
        ...prev,
        {
          sender: "driver",
          text: "¡Gracias por tu mensaje! Estoy en camino, llegaré lo antes posible.",
          timestamp: responseTime,
        },
      ])
    }, 1000)
  }

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
            <Link href="/catalogo">
              <Button variant="outline" size="sm">
                Seguir Comprando
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
            <h1 className="text-3xl font-bold">Seguimiento de Pedido</h1>
            <p className="text-gray-500">Rastrea tu PartyBox en tiempo real</p>
          </motion.div>

          {/* Información del pedido */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-6 p-4 bg-pink-50 border border-pink-100 rounded-lg"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <Package className="w-5 h-5 text-pink-500" />
                  Pedido #{pedido.id}
                </h2>
                <p className="text-sm text-gray-600">Realizado el {pedido.fecha}</p>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    pedido.estado === "entregado" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {pedido.estado === "entregado" ? "Entregado" : "En tránsito"}
                </div>
                <Button variant="outline" size="sm" className="hover:bg-pink-50 transition-colors">
                  Ver Detalles
                </Button>
              </div>
            </div>
          </motion.div>

          {pedido && (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {/* Estado del pedido */}
              <motion.div variants={fadeIn} initial="hidden" animate="visible" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Truck className="w-5 h-5 text-pink-500" />
                      Estado del Pedido
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Progreso de entrega</span>
                      <span className="text-sm text-gray-500">{progreso}%</span>
                    </div>
                    <div className="relative">
                      <Progress value={progreso} className="h-2" />
                      {progreso === 100 && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200, damping: 10 }}
                          className="absolute -right-1 -top-1"
                        >
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        </motion.div>
                      )}
                    </div>

                    <div className="space-y-4">
                      {pedido.tracking.map((evento, index) => (
                        <motion.div
                          key={index}
                          className="flex items-start gap-3"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + 0.3 }}
                        >
                          {getEstadoIcon(evento.estado, evento.completado)}
                          <div className="flex-1">
                            <p className={`font-medium ${evento.completado ? "text-gray-900" : "text-gray-500"}`}>
                              {evento.descripcion}
                            </p>
                            {evento.fecha && <p className="text-sm text-gray-500">{evento.fecha}</p>}
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {pedido.estado === "en_transito" && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="p-4 bg-pink-50 rounded-lg"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Truck className="w-5 h-5 text-pink-500" />
                          <span className="font-medium text-pink-700">En camino</span>
                        </div>
                        <p className="text-sm text-pink-600">
                          Tu pedido llegará en aproximadamente {pedido.tiempoEstimado}
                        </p>
                        <p className="text-sm text-pink-600">Ubicación actual: {pedido.ubicacionActual.direccion}</p>
                      </motion.div>
                    )}

                    {pedido.estado === "entregado" && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-green-50 rounded-lg"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span className="font-medium text-green-700">¡Entregado!</span>
                        </div>
                        <p className="text-sm text-green-600">
                          Tu pedido fue entregado exitosamente el {pedido.tracking[3].fecha}
                        </p>
                        <div className="mt-3">
                          <Button size="sm" className="bg-green-500 hover:bg-green-600 transition-colors">
                            <Star className="w-4 h-4 mr-2" />
                            Calificar Entrega
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>

                {/* Detalles del pedido */}
                <motion.div variants={fadeIn} initial="hidden" animate="visible" transition={{ delay: 0.3 }}>
                  <Card>
                    <CardHeader>
                      <CardTitle>Detalles del Pedido</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Productos</h4>
                        {pedido.items.map((item, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span>
                              {item.nombre} x{item.cantidad}
                            </span>
                            <span>S/. {item.precio.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 border-t">
                        <div className="flex justify-between font-medium">
                          <span>Total</span>
                          <span>S/. {pedido.total.toFixed(2)}</span>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Dirección de Entrega</h4>
                        <p className="text-sm text-gray-600">{pedido.direccion}</p>
                        <p className="text-sm text-gray-600">{pedido.telefono}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>

              {/* Mapa y información del repartidor */}
              <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.4 }}
                className="space-y-6"
              >
                {/* Mapa de seguimiento */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Truck className="w-5 h-5" />
                      Ubicación en Tiempo Real
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-square bg-gradient-to-br from-blue-50 to-green-50 rounded-lg flex items-center justify-center mb-4 relative overflow-hidden">
                      {/* Mapa simulado con CSS */}
                      <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-4 left-4 w-8 h-8 bg-blue-500 rounded-full animate-pulse"></div>
                        <div className="absolute top-8 left-8 w-2 h-2 bg-blue-300 rounded-full"></div>
                        <div className="absolute top-12 left-12 w-2 h-2 bg-blue-300 rounded-full"></div>
                        <div className="absolute top-16 left-16 w-2 h-2 bg-blue-300 rounded-full"></div>
                        <div className="absolute bottom-4 right-4 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                          <Home className="w-4 h-4 text-white" />
                        </div>

                        {/* Líneas de ruta */}
                        <svg className="absolute inset-0 w-full h-full">
                          <path
                            d="M 32 32 Q 100 50 150 100 T 280 280"
                            stroke="#3B82F6"
                            strokeWidth="3"
                            fill="none"
                            strokeDasharray="5,5"
                            className="animate-pulse"
                          />
                        </svg>
                      </div>

                      <div className="text-center z-10">
                        <Truck className="w-12 h-12 mx-auto text-pink-500 mb-2 animate-bounce" />
                        <p className="text-sm text-gray-600 font-medium">Mapa en Tiempo Real</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Ubicación actual: {pedido.ubicacionActual.direccion}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <motion.div
                            className="w-3 h-3 bg-green-500 rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                          ></motion.div>
                          <span className="text-sm font-medium">Repartidor</span>
                        </div>
                        <span className="text-sm text-gray-600">{pedido.repartidor.nombre}</span>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <span className="text-sm font-medium">Vehículo</span>
                        </div>
                        <span className="text-sm text-gray-600">{pedido.repartidor.vehiculo}</span>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-pink-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <motion.div
                            className="w-3 h-3 bg-pink-500 rounded-full"
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                          ></motion.div>
                          <span className="text-sm font-medium">Tiempo estimado</span>
                        </div>
                        <span className="text-sm text-gray-600">{pedido.tiempoEstimado}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Información del repartidor */}
                <Card>
                  <CardHeader>
                    <CardTitle>Tu Repartidor</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden">
                        <img
                          src={pedido.repartidor.foto || "/placeholder.svg"}
                          alt={pedido.repartidor.nombre}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{pedido.repartidor.nombre}</h3>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600">{pedido.repartidor.calificacion}</span>
                        </div>
                        <p className="text-sm text-gray-500">{pedido.repartidor.vehiculo}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Phone className="w-4 h-4 mr-2" />
                        Llamar
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1" onClick={() => setShowChat(!showChat)}>
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Chat
                      </Button>
                    </div>

                    {/* Chat */}
                    {showChat && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 border rounded-lg overflow-hidden"
                      >
                        <div className="h-48 overflow-y-auto p-3 bg-gray-50 space-y-2">
                          {mensajes.map((msg, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                            >
                              <div
                                className={`max-w-xs p-2 rounded-lg text-sm ${
                                  msg.sender === "user"
                                    ? "bg-pink-500 text-white"
                                    : msg.sender === "driver"
                                      ? "bg-blue-500 text-white"
                                      : "bg-gray-200 text-gray-700"
                                }`}
                              >
                                <p>{msg.text}</p>
                                <p
                                  className={`text-xs mt-1 ${
                                    msg.sender === "user" || msg.sender === "driver" ? "text-white/70" : "text-gray-500"
                                  }`}
                                >
                                  {msg.timestamp}
                                </p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                        <div className="p-3 bg-white border-t flex gap-2">
                          <Input
                            placeholder="Escribe un mensaje..."
                            value={mensaje}
                            onChange={(e) => setMensaje(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && enviarMensaje()}
                            className="flex-1"
                          />
                          <Button size="sm" onClick={enviarMensaje} className="bg-pink-500 hover:bg-pink-600">
                            <Send className="w-4 h-4" />
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
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
