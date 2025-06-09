import Link from "next/link"
import { ArrowRight, Gift, Package, Truck, Zap, ShoppingCart, Monitor, Palette, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header/Navigation */}
      <header className="border-b">
        <div className="container flex items-center justify-between h-16 px-4 mx-auto md:px-6">
          <div className="flex items-center gap-2">
            <Package className="w-6 h-6 text-pink-500" />
            <span className="text-xl font-bold">PartyBox</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#" className="text-sm font-medium text-pink-500">
              Inicio
            </Link>
            <Link href="/catalogo" className="text-sm font-medium hover:text-pink-500 transition-colors">
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

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-white to-pink-50">
        <div className="container px-4 mx-auto md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Kits personalizados para tus eventos y fiestas
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl">
                  Crea la fiesta perfecta sin estrés. Personaliza tu kit de decoración y recíbelo listo para usar.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/personalizar">
                  <Button size="lg" className="bg-pink-500 hover:bg-pink-600">
                    Crear mi PartyBox
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/catalogo">
                  <Button size="lg" variant="outline">
                    Ver catálogo
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-md overflow-hidden rounded-lg shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&h=600&fit=crop&crop=center"
                  alt="Kit de fiesta personalizado"
                  className="object-cover w-full aspect-square"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* App Preview Section */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Así de fácil es crear tu PartyBox
              </h2>
              <p className="max-w-[600px] mx-auto text-gray-500 md:text-xl">
                Descubre cómo nuestra plataforma te ayuda a crear el kit perfecto en simples pasos
              </p>
            </div>
          </div>

          {/* Screenshot 1: Homepage Overview */}
          <div className="mb-16">
            <div className="grid gap-8 lg:grid-cols-2 items-center">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center font-bold">
                    1
                  </div>
                  <h3 className="text-2xl font-bold">Explora nuestras opciones</h3>
                </div>
                <p className="text-gray-600 text-lg">
                  Conoce todas las ventajas de PartyBox: ahorro de tiempo, personalización total, todo incluido y
                  entrega rápida. Descubre por qué somos la mejor opción para tus eventos.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Ahorra tiempo en la organización</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Personalización 100% adaptada a ti</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Todo incluido en un solo kit</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <img
                  src="/images/homepage-hero.png"
                  alt="Vista general de PartyBox"
                  className="w-full rounded-lg shadow-xl border"
                />
              </div>
            </div>
          </div>

          {/* Screenshot 2: Catalog */}
          <div className="mb-16">
            <div className="grid gap-8 lg:grid-cols-2 items-center">
              <div className="relative order-2 lg:order-1">
                <img
                  src="/images/catalog-page.png"
                  alt="Catálogo de kits PartyBox"
                  className="w-full rounded-lg shadow-xl border"
                />
              </div>
              <div className="space-y-4 order-1 lg:order-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center font-bold">
                    2
                  </div>
                  <h3 className="text-2xl font-bold">Explora nuestro catálogo</h3>
                </div>
                <p className="text-gray-600 text-lg">
                  Navega por nuestra amplia selección de kits prediseñados para diferentes ocasiones: cumpleaños, baby
                  showers, aniversarios, graduaciones y más.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Gift className="w-5 h-5 text-pink-500" />
                    <span>Kits para todas las ocasiones</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Monitor className="w-5 h-5 text-pink-500" />
                    <span>Filtros inteligentes para encontrar lo que buscas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-pink-500" />
                    <span>Precios transparentes y competitivos</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Screenshot 3: Personalization Step 1 */}
          <div className="mb-16">
            <div className="grid gap-8 lg:grid-cols-2 items-center">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center font-bold">
                    3
                  </div>
                  <h3 className="text-2xl font-bold">Elige tu temática</h3>
                </div>
                <p className="text-gray-600 text-lg">
                  Selecciona la temática perfecta para tu evento. Tenemos opciones para cumpleaños infantiles, baby
                  showers, aniversarios, despedidas y mucho más.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Palette className="w-5 h-5 text-pink-500" />
                    <span>Temáticas diseñadas por expertos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Selección visual e intuitiva</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Gift className="w-5 h-5 text-pink-500" />
                    <span>Adaptadas a diferentes edades y gustos</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <img
                  src="/images/personalize-step1.png"
                  alt="Selección de temática en PartyBox"
                  className="w-full rounded-lg shadow-xl border"
                />
              </div>
            </div>
          </div>

          {/* Screenshot 4: Color Selection */}
          <div className="mb-16">
            <div className="grid gap-8 lg:grid-cols-2 items-center">
              <div className="relative order-2 lg:order-1">
                <img
                  src="/images/personalize-colors.png"
                  alt="Selección de colores en PartyBox"
                  className="w-full rounded-lg shadow-xl border"
                />
              </div>
              <div className="space-y-4 order-1 lg:order-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center font-bold">
                    4
                  </div>
                  <h3 className="text-2xl font-bold">Personaliza los colores</h3>
                </div>
                <p className="text-gray-600 text-lg">
                  Elige hasta 3 colores principales para tu kit. Nuestra paleta de colores te permite crear
                  combinaciones únicas que reflejen tu estilo personal.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Palette className="w-5 h-5 text-pink-500" />
                    <span>Paleta de colores cuidadosamente seleccionada</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Combinaciones que siempre se ven bien</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-pink-500" />
                    <span>Vista previa en tiempo real</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Screenshot 5: Elements Selection */}
          <div className="mb-16">
            <div className="grid gap-8 lg:grid-cols-2 items-center">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center font-bold">
                    5
                  </div>
                  <h3 className="text-2xl font-bold">Selecciona elementos específicos</h3>
                </div>
                <p className="text-gray-600 text-lg">
                  Ajusta las cantidades y elige exactamente qué elementos quieres en tu kit. Desde globos hasta vajilla,
                  tienes control total sobre cada detalle.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-pink-500" />
                    <span>Amplia variedad de elementos decorativos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Control total sobre cantidades</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-pink-500" />
                    <span>Precios transparentes por elemento</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <img
                  src="/images/personalize-elements.png"
                  alt="Selección de elementos en PartyBox"
                  className="w-full rounded-lg shadow-xl border"
                />
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full mb-4">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">¡Y listo! Tu kit personalizado estará en camino</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">¿Listo para crear tu PartyBox?</h3>
            <Link href="/personalizar">
              <Button size="lg" className="bg-pink-500 hover:bg-pink-600">
                Comenzar ahora
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 mx-auto md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">¿Por qué elegir PartyBox?</h2>
              <p className="max-w-[600px] mx-auto text-gray-500 md:text-xl">
                Simplificamos la organización de tus eventos con kits personalizados y listos para usar.
              </p>
            </div>
          </div>
          <div className="grid gap-6 mt-12 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-white shadow-sm">
              <div className="p-3 rounded-full bg-pink-100">
                <Zap className="w-6 h-6 text-pink-500" />
              </div>
              <h3 className="text-xl font-bold">Ahorra tiempo</h3>
              <p className="text-center text-gray-500">
                Olvídate de recorrer tiendas buscando decoraciones. Todo en un solo lugar.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-white shadow-sm">
              <div className="p-3 rounded-full bg-pink-100">
                <Gift className="w-6 h-6 text-pink-500" />
              </div>
              <h3 className="text-xl font-bold">Personalización total</h3>
              <p className="text-center text-gray-500">Adapta cada elemento a tus gustos y necesidades específicas.</p>
            </div>
            <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-white shadow-sm">
              <div className="p-3 rounded-full bg-pink-100">
                <Package className="w-6 h-6 text-pink-500" />
              </div>
              <h3 className="text-xl font-bold">Todo incluido</h3>
              <p className="text-center text-gray-500">
                Desde decoraciones hasta utensilios, todo lo que necesitas en un solo kit.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-white shadow-sm">
              <div className="p-3 rounded-full bg-pink-100">
                <Truck className="w-6 h-6 text-pink-500" />
              </div>
              <h3 className="text-xl font-bold">Entrega rápida</h3>
              <p className="text-center text-gray-500">
                Recibe tu kit listo para usar directamente en la puerta de tu casa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">¿Cómo funciona?</h2>
              <p className="max-w-[600px] mx-auto text-gray-500 md:text-xl">
                En tres simples pasos tendrás tu kit personalizado listo para usar.
              </p>
            </div>
          </div>
          <div className="grid gap-8 mt-12 md:grid-cols-3">
            <div className="flex flex-col items-center space-y-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-pink-500 text-white font-bold text-xl">
                1
              </div>
              <h3 className="text-xl font-bold">Elige tu temática</h3>
              <p className="text-center text-gray-500">
                Selecciona entre nuestras temáticas prediseñadas o crea una completamente personalizada.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-pink-500 text-white font-bold text-xl">
                2
              </div>
              <h3 className="text-xl font-bold">Personaliza tu kit</h3>
              <p className="text-center text-gray-500">
                Ajusta colores, cantidades y elementos específicos según tus necesidades.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-pink-500 text-white font-bold text-xl">
                3
              </div>
              <h3 className="text-xl font-bold">Recibe y disfruta</h3>
              <p className="text-center text-gray-500">
                Tu kit llegará a tu puerta, listo para usar en tu evento o fiesta.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 mx-auto md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Lo que dicen nuestros clientes
              </h2>
              <p className="max-w-[600px] mx-auto text-gray-500 md:text-xl">
                Descubre por qué nuestros clientes aman PartyBox.
              </p>
            </div>
          </div>
          <div className="grid gap-6 mt-12 md:grid-cols-3">
            <div className="flex flex-col p-6 space-y-4 border rounded-lg bg-white shadow-sm">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
                    alt="Avatar de cliente"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <h4 className="font-bold">María García</h4>
                  <p className="text-sm text-gray-500">Cumpleaños infantil</p>
                </div>
              </div>
              <p className="text-gray-600">
                "¡Increíble servicio! Ahorré tanto tiempo y el kit para el cumpleaños de mi hijo quedó perfecto. Todos
                quedaron encantados."
              </p>
            </div>
            <div className="flex flex-col p-6 space-y-4 border rounded-lg bg-white shadow-sm">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                    alt="Avatar de cliente"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <h4 className="font-bold">Carlos Rodríguez</h4>
                  <p className="text-sm text-gray-500">Aniversario</p>
                </div>
              </div>
              <p className="text-gray-600">
                "La calidad de los productos es excelente y la personalización fue justo lo que necesitaba para
                sorprender a mi pareja."
              </p>
            </div>
            <div className="flex flex-col p-6 space-y-4 border rounded-lg bg-white shadow-sm">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=center"
                    alt="Avatar de cliente"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <h4 className="font-bold">Laura Mendoza</h4>
                  <p className="text-sm text-gray-500">Baby Shower</p>
                </div>
              </div>
              <p className="text-gray-600">
                "Organizar el baby shower fue tan sencillo con PartyBox. El kit llegó a tiempo y todo estaba
                perfectamente coordinado."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-pink-500 text-white">
        <div className="container px-4 mx-auto md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                ¿Listo para crear tu fiesta perfecta?
              </h2>
              <p className="max-w-[600px] mx-auto md:text-xl">
                Comienza a personalizar tu kit ahora y recíbelo en la puerta de tu casa.
              </p>
            </div>
            <Link href="/personalizar">
              <Button size="lg" className="bg-white text-pink-500 hover:bg-gray-100">
                Crear mi PartyBox
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="container px-4 py-8 mx-auto md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Package className="w-6 h-6 text-pink-500" />
                <span className="text-xl font-bold">PartyBox</span>
              </div>
              <p className="text-sm text-gray-500">
                Kits personalizados para eventos y fiestas. Haz que tu celebración sea única.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Productos</h3>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>
                  <Link href="#" className="hover:text-pink-500 transition-colors">
                    Cumpleaños
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-pink-500 transition-colors">
                    Baby Showers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-pink-500 transition-colors">
                    Aniversarios
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-pink-500 transition-colors">
                    Despedidas
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Empresa</h3>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>
                  <Link href="#" className="hover:text-pink-500 transition-colors">
                    Sobre nosotros
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-pink-500 transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-pink-500 transition-colors">
                    Contacto
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-pink-500 transition-colors">
                    Trabaja con nosotros
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>
                  <Link href="#" className="hover:text-pink-500 transition-colors">
                    Términos de servicio
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-pink-500 transition-colors">
                    Política de privacidad
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-pink-500 transition-colors">
                    Política de cookies
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 pt-8 mt-8 border-t md:flex-row">
            <p className="text-sm text-gray-500">© 2024 PartyBox. Todos los derechos reservados.</p>
            <div className="flex items-center gap-4">
              <Link href="#" className="text-gray-500 hover:text-pink-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-pink-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-pink-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
