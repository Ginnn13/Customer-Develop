import Link from "next/link"

export default function contactoPage(){
    return( 
        
    <div className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl font-bold mb-2 text-primary">Contacto</h1>
        <p className="text-muted-foreground mb-8">Esta es la página de contacto</p>
        
        <form className="space-y-6 bg-card p-8 rounded-lg shadow-sm border border-border">
            <div className="space-y-2">
                <label htmlFor="nombre" className="block text-sm font-medium">
                    Nombre
                </label>
                <input 
                    type="text" 
                    id="nombre"
                    placeholder="Tu nombre" 
                    required
                    className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-input transition-colors"
                />
            </div>
            
            <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">
                    Correo electrónico
                </label>
                <input 
                    type="email" 
                    id="email"
                    placeholder="tu@email.com" 
                    required
                    className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-input transition-colors"
                />
            </div>
            
            <div className="space-y-2">
                <label htmlFor="mensaje" className="block text-sm font-medium">
                    Mensaje
                </label>
                <textarea 
                    id="mensaje"
                    placeholder="Escribe tu mensaje aquí..." 
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-input transition-colors resize-none"
                />
            </div>
            
            <button 
                type="submit"
                className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-md hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
                Enviar mensaje
            </button>
        </form>
        
        <div className="mt-8 text-center">
            <Link href="/" className="text-primary hover:underline">
                Volver al inicio
            </Link>
        </div>
    </div>
    )
}