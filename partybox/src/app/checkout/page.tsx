"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Package, CreditCard, CheckCircle, ArrowLeft, ArrowRight, ShieldCheck, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"

// Datos de ejemplo
const cartItems = [
  {
    id: 1,
    nombre: "Kit Cumpleaños Infantil Superhéroes",
    precio: 120,
    cantidad: 1,
    imagen: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    nombre: "Kit Baby Shower Niña",
    precio: 150,
    cantidad: 1,
    imagen: "/placeholder.svg?height=100&width=100",
  },
]

const subtotal = cartItems.reduce((total, item) => total + item.precio * item.cantidad, 0)
const envio = 15
const total = subtotal + envio

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function CheckoutPage() {
  const router = useRouter()
  const [paso, setPaso] = useState(1)
  const [metodoPago, setMetodoPago] = useState("tarjeta")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const avanzarPaso = () => {
    if (paso < 3) {
      setPaso(paso + 1)
      window.scrollTo(0, 0)
    } else {
      // Simular procesamiento de pago
      setIsProcessing(true)
      setTimeout(() => {
        setIsProcessing(false)
        setIsComplete(true)
        setTimeout(() => {
          // Redirigir a la página de seguimiento
          router.push("/seguimiento")
        }, 2000)
      }, 2000)
    }
  }

  const retrocederPaso = () => {
    if (paso > 1) {
      setPaso(paso - 1)
      window.scrollTo(0, 0)
    }
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
            <Link href="/carrito">
              <Button variant="outline" size="sm">
                Volver al Carrito
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
            <h1 className="text-3xl font-bold">Finalizar Compra</h1>
            <p className="text-gray-500">Completa tu información para procesar tu pedido</p>
          </motion.div>

          {/* Pasos del checkout */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className={`flex items-center p-4 border rounded-lg ${paso >= 1 ? "bg-pink-50 border-pink-200" : "bg-white"}`}
            >
              <div className="flex items-center justify-center w-8 h-8 mr-4 rounded-full bg-pink-500 text-white">1</div>
              <div>
                <h3 className="font-medium">Información de Envío</h3>
                <p className="text-sm text-gray-500">Dirección de entrega</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className={`flex items-center p-4 border rounded-lg ${paso >= 2 ? "bg-pink-50 border-pink-200" : "bg-white"}`}
            >
              <div className="flex items-center justify-center w-8 h-8 mr-4 rounded-full bg-pink-500 text-white">2</div>
              <div>
                <h3 className="font-medium">Método de Pago</h3>
                <p className="text-sm text-gray-500">Selecciona cómo pagar</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className={`flex items-center p-4 border rounded-lg ${paso >= 3 ? "bg-pink-50 border-pink-200" : "bg-white"}`}
            >
              <div className="flex items-center justify-center w-8 h-8 mr-4 rounded-full bg-pink-500 text-white">3</div>
              <div>
                <h3 className="font-medium">Revisar y Confirmar</h3>
                <p className="text-sm text-gray-500">Finaliza tu pedido</p>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Formulario principal */}
            <div className="lg:col-span-2">
              {/* Paso 1: Información de Envío */}
              {paso === 1 && (
                <motion.div key="paso1" initial="hidden" animate="visible" variants={fadeIn}>
                  <Card>
                    <CardHeader>
                      <CardTitle>Información de Envío</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="nombre">Nombre</Label>
                          <Input
                            id="nombre"
                            placeholder="Tu nombre"
                            className="focus-within:border-pink-300 transition-colors"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="apellido">Apellido</Label>
                          <Input
                            id="apellido"
                            placeholder="Tu apellido"
                            className="focus-within:border-pink-300 transition-colors"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Correo Electrónico</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="tu@email.com"
                          className="focus-within:border-pink-300 transition-colors"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="telefono">Teléfono</Label>
                        <Input
                          id="telefono"
                          placeholder="Tu número de teléfono"
                          className="focus-within:border-pink-300 transition-colors"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="direccion">Dirección</Label>
                        <Input
                          id="direccion"
                          placeholder="Calle, número, etc."
                          className="focus-within:border-pink-300 transition-colors"
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div className="space-y-2">
                          <Label htmlFor="ciudad">Ciudad</Label>
                          <Input
                            id="ciudad"
                            placeholder="Ciudad"
                            className="focus-within:border-pink-300 transition-colors"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="distrito">Distrito</Label>
                          <Input
                            id="distrito"
                            placeholder="Distrito"
                            className="focus-within:border-pink-300 transition-colors"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="codigo-postal">Código Postal</Label>
                          <Input
                            id="codigo-postal"
                            placeholder="Código postal"
                            className="focus-within:border-pink-300 transition-colors"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="instrucciones">Instrucciones de entrega (opcional)</Label>
                        <Input
                          id="instrucciones"
                          placeholder="Instrucciones adicionales para la entrega"
                          className="focus-within:border-pink-300 transition-colors"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Paso 2: Método de Pago */}
              {paso === 2 && (
                <motion.div key="paso2" initial="hidden" animate="visible" variants={fadeIn}>
                  <Card>
                    <CardHeader>
                      <CardTitle>Método de Pago</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <RadioGroup value={metodoPago} onValueChange={setMetodoPago} className="space-y-4">
                        <div
                          className={`flex items-center space-x-2 border p-4 rounded-lg cursor-pointer transition-all ${metodoPago === "tarjeta" ? "border-pink-500 bg-pink-50" : "hover:border-gray-300"}`}
                        >
                          <RadioGroupItem value="tarjeta" id="tarjeta" />
                          <Label htmlFor="tarjeta" className="flex items-center gap-2 cursor-pointer flex-1">
                            <CreditCard className="w-5 h-5" />
                            <div>
                              <div>Tarjeta de Crédito/Débito</div>
                              <div className="text-sm text-gray-500">Visa, Mastercard, American Express</div>
                            </div>
                          </Label>
                          <div className="flex gap-2">
                            <div className="w-10 h-6 bg-blue-600 rounded"></div>
                            <div className="w-10 h-6 bg-red-500 rounded"></div>
                            <div className="w-10 h-6 bg-gray-800 rounded"></div>
                          </div>
                        </div>

                        <div
                          className={`flex items-center space-x-2 border p-4 rounded-lg cursor-pointer transition-all ${metodoPago === "yape" ? "border-pink-500 bg-pink-50" : "hover:border-gray-300"}`}
                        >
                          <RadioGroupItem value="yape" id="yape" />
                          <Label htmlFor="yape" className="flex items-center gap-2 cursor-pointer flex-1">
                            <div className="w-5 h-5 bg-purple-600 rounded-full"></div>
                            <div>
                              <div>Yape</div>
                              <div className="text-sm text-gray-500">Paga con tu aplicación Yape</div>
                            </div>
                          </Label>
                        </div>

                        <div
                          className={`flex items-center space-x-2 border p-4 rounded-lg cursor-pointer transition-all ${metodoPago === "plin" ? "border-pink-500 bg-pink-50" : "hover:border-gray-300"}`}
                        >
                          <RadioGroupItem value="plin" id="plin" />
                          <Label htmlFor="plin" className="flex items-center gap-2 cursor-pointer flex-1">
                            <div className="w-5 h-5 bg-blue-500 rounded-full"></div>
                            <div>
                              <div>Plin</div>
                              <div className="text-sm text-gray-500">Paga con tu aplicación Plin</div>
                            </div>
                          </Label>
                        </div>

                        <div
                          className={`flex items-center space-x-2 border p-4 rounded-lg cursor-pointer transition-all ${metodoPago === "transferencia" ? "border-pink-500 bg-pink-50" : "hover:border-gray-300"}`}
                        >
                          <RadioGroupItem value="transferencia" id="transferencia" />
                          <Label htmlFor="transferencia" className="flex items-center gap-2 cursor-pointer flex-1">
                            <div className="w-5 h-5 bg-green-600 rounded-full"></div>
                            <div>
                              <div>Transferencia Bancaria</div>
                              <div className="text-sm text-gray-500">BCP, Interbank, BBVA, Scotiabank</div>
                            </div>
                          </Label>
                        </div>
                      </RadioGroup>

                      {metodoPago === "tarjeta" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          transition={{ duration: 0.3 }}
                          className="mt-6 space-y-4"
                        >
                          <div className="space-y-2">
                            <Label htmlFor="numero-tarjeta">Número de Tarjeta</Label>
                            <Input
                              id="numero-tarjeta"
                              placeholder="1234 5678 9012 3456"
                              className="focus-within:border-pink-300 transition-colors"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="fecha-expiracion">Fecha de Expiración</Label>
                              <Input
                                id="fecha-expiracion"
                                placeholder="MM/AA"
                                className="focus-within:border-pink-300 transition-colors"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cvv">CVV</Label>
                              <Input
                                id="cvv"
                                placeholder="123"
                                className="focus-within:border-pink-300 transition-colors"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="nombre-tarjeta">Nombre en la Tarjeta</Label>
                            <Input
                              id="nombre-tarjeta"
                              placeholder="Como aparece en la tarjeta"
                              className="focus-within:border-pink-300 transition-colors"
                            />
                          </div>
                        </motion.div>
                      )}

                      {metodoPago === "yape" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          transition={{ duration: 0.3 }}
                          className="mt-6 p-4 bg-purple-50 rounded-lg text-center"
                        >
                          <div className="w-32 h-32 mx-auto bg-purple-100 rounded-lg mb-4 flex items-center justify-center">
                            <span className="text-purple-600 font-bold">Código QR</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">Escanea este código con tu app Yape</p>
                          <p className="font-medium">O envía a: 999-888-777</p>
                        </motion.div>
                      )}

                      {metodoPago === "plin" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          transition={{ duration: 0.3 }}
                          className="mt-6 p-4 bg-blue-50 rounded-lg text-center"
                        >
                          <div className="w-32 h-32 mx-auto bg-blue-100 rounded-lg mb-4 flex items-center justify-center">
                            <span className="text-blue-600 font-bold">Código QR</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">Escanea este código con tu app Plin</p>
                          <p className="font-medium">O envía a: 999-888-777</p>
                        </motion.div>
                      )}

                      {metodoPago === "transferencia" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          transition={{ duration: 0.3 }}
                          className="mt-6 p-4 bg-green-50 rounded-lg"
                        >
                          <h3 className="font-medium mb-2">Datos para transferencia:</h3>
                          <ul className="space-y-2 text-sm">
                            <li>
                              <span className="font-medium">Banco:</span> BCP
                            </li>
                            <li>
                              <span className="font-medium">Cuenta:</span> 123-456789-0-12
                            </li>
                            <li>
                              <span className="font-medium">Titular:</span> PartyBox S.A.C.
                            </li>
                            <li>
                              <span className="font-medium">RUC:</span> 20123456789
                            </li>
                          </ul>
                          <p className="mt-4 text-sm text-gray-600">
                            Una vez realizada la transferencia, envía el comprobante a{" "}
                            <span className="font-medium">pagos@partybox.com</span>
                          </p>
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Paso 3: Revisar y Confirmar */}
              {paso === 3 && (
                <motion.div key="paso3" initial="hidden" animate="visible" variants={fadeIn}>
                  <Card>
                    <CardHeader>
                      <CardTitle>Revisar y Confirmar</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Resumen de productos */}
                      <div>
                        <h3 className="font-medium mb-3">Productos</h3>
                        <div className="space-y-3">
                          {cartItems.map((item) => (
                            <div key={item.id} className="flex gap-3 p-3 border rounded-lg">
                              <div className="w-16 h-16 bg-gray-100 rounded">
                                <img
                                  src={item.imagen || "/placeholder.svg"}
                                  alt={item.nombre}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium">{item.nombre}</h4>
                                <div className="flex justify-between mt-1">
                                  <span className="text-sm text-gray-500">Cantidad: {item.cantidad}</span>
                                  <span className="font-medium">S/. {item.precio.toFixed(2)}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      {/* Dirección de envío */}
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="font-medium">Dirección de Envío</h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-pink-500 hover:text-pink-600 hover:bg-pink-50 transition-colors"
                            onClick={() => setPaso(1)}
                          >
                            Editar
                          </Button>
                        </div>
                        <div className="p-3 border rounded-lg">
                          <p className="font-medium">Juan Pérez</p>
                          <p className="text-sm text-gray-600">Av. Javier Prado 1234, San Isidro</p>
                          <p className="text-sm text-gray-600">Lima, Lima 15046</p>
                          <p className="text-sm text-gray-600">Teléfono: +51 999 888 777</p>
                        </div>
                      </div>

                      <Separator />

                      {/* Método de pago */}
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="font-medium">Método de Pago</h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-pink-500 hover:text-pink-600 hover:bg-pink-50 transition-colors"
                            onClick={() => setPaso(2)}
                          >
                            Editar
                          </Button>
                        </div>
                        <div className="p-3 border rounded-lg flex items-center gap-3">
                          {metodoPago === "tarjeta" && (
                            <>
                              <CreditCard className="w-5 h-5 text-blue-600" />
                              <div>
                                <p className="font-medium">Tarjeta de Crédito/Débito</p>
                                <p className="text-sm text-gray-600">**** **** **** 1234</p>
                              </div>
                            </>
                          )}
                          {metodoPago === "yape" && (
                            <>
                              <div className="w-5 h-5 bg-purple-600 rounded-full"></div>
                              <p className="font-medium">Yape</p>
                            </>
                          )}
                          {metodoPago === "plin" && (
                            <>
                              <div className="w-5 h-5 bg-blue-500 rounded-full"></div>
                              <p className="font-medium">Plin</p>
                            </>
                          )}
                          {metodoPago === "transferencia" && (
                            <>
                              <div className="w-5 h-5 bg-green-600 rounded-full"></div>
                              <p className="font-medium">Transferencia Bancaria</p>
                            </>
                          )}
                        </div>
                      </div>

                      <Separator />

                      {/* Información de entrega */}
                      <div>
                        <h3 className="font-medium mb-3">Información de Entrega</h3>
                        <div className="p-3 border rounded-lg space-y-2">
                          <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-pink-500" />
                            <div>
                              <p className="font-medium">Tiempo estimado de entrega</p>
                              <p className="text-sm text-gray-600">24-48 horas (días hábiles)</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <ShieldCheck className="w-5 h-5 text-pink-500" />
                            <div>
                              <p className="font-medium">Garantía de satisfacción</p>
                              <p className="text-sm text-gray-600">Si no estás satisfecho, te devolvemos tu dinero</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>

            {/* Resumen de compra */}
            <div>
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
                    <div className="space-y-2">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span>
                            {item.nombre} x{item.cantidad}
                          </span>
                          <span>S/. {(item.precio * item.cantidad).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>S/. {subtotal.toFixed(2)}</span>
                    </div>
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
                  <CardFooter>
                    {isComplete ? (
                      <div className="w-full text-center p-4">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200, damping: 10 }}
                          className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                        >
                          <CheckCircle className="w-10 h-10 text-green-600" />
                        </motion.div>
                        <h3 className="text-lg font-bold mb-2">¡Pago Completado!</h3>
                        <p className="text-sm text-gray-600 mb-4">Redirigiendo al seguimiento de tu pedido...</p>
                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 2 }}
                            className="h-full bg-pink-500"
                          />
                        </div>
                      </div>
                    ) : (
                      <Button
                        className="w-full bg-pink-500 hover:bg-pink-600 transition-colors group"
                        onClick={avanzarPaso}
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <div className="flex items-center gap-2">
                            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            <span>Procesando...</span>
                          </div>
                        ) : paso < 3 ? (
                          <>
                            Continuar
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </>
                        ) : (
                          <>
                            Confirmar y Pagar
                            <CheckCircle className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform" />
                          </>
                        )}
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </motion.div>
            </div>
          </div>

          {/* Navegación entre pasos */}
          {!isComplete && (
            <div className="flex justify-between mt-8">
              {paso > 1 ? (
                <Button variant="outline" onClick={retrocederPaso} className="hover:bg-pink-50 transition-colors group">
                  <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                  Anterior
                </Button>
              ) : (
                <Link href="/carrito">
                  <Button variant="outline" className="hover:bg-pink-50 transition-colors group">
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Volver al Carrito
                  </Button>
                </Link>
              )}

              <div></div>
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
