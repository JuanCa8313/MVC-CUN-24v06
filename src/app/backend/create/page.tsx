"use client";
import CreateBooking from "@/views/CreateBooking";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

export default function CreatePage() {
  const router = useRouter();

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Crear Nueva Reserva</h1>
        <Button variant="outline" onClick={() => router.push('/backend')}>
          Volver
        </Button>
      </div>
      <div className="max-w-2xl mx-auto">
        <CreateBooking />
      </div>
    </div>
  );
}