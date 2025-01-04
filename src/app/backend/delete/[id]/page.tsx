"use client";
import DeleteBooking from "@/views/DeleteBooking";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

export default function DeletePage() {
  const router = useRouter();

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Eliminar Reserva</h1>
        <Button variant="outline" onClick={() => router.push('/backend')}>
          Volver
        </Button>
      </div>
      <div className="max-w-2xl mx-auto">
        <DeleteBooking />
      </div>
    </div>
  );
}