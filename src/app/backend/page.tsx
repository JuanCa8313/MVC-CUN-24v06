"use client";
import { Button } from "@/components/ui/button";
import ReadBookings from "@/views/ReadBookings";
import { useRouter } from 'next/navigation';

export default function BackendPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Panel de Administración</h1>
        <Button onClick={() => router.push('/backend/create')}>
          Nueva Reserva
        </Button>
      </div>
      <ReadBookings />
    </div>
  );
}