import { Toaster } from "@/components/ui/toaster"

export default function BackendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <main>
        {children}
      </main>
      <Toaster />
    </div>
  );
}