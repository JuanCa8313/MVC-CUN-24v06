import { Toaster } from "@/components/ui/toaster"

export default function BackendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-lg font-semibold text-gray-800">
            Sistema de Administración de Reservas
          </h1>
        </div>
      </nav>
      <main>
        {children}
      </main>
      <Toaster />
    </div>
  );
}