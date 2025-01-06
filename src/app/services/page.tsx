"use client"

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CreateBooking from '@/views/CreateBooking';
import { Bed, Utensils, Dumbbell, Bath } from 'lucide-react';

interface Service {
  id: number;
  title: string;
  description: string;
  price: string;
  icon: React.ReactNode;
}

export const services: Service[] = [
  {
    id: 1,
    title: "Habitación Estándar",
    description: "Habitación cómoda con baño privado, TV y WiFi. Perfecta para viajeros individuales o parejas.",
    price: "150.000 COP / noche",
    icon: <Bed className="h-8 w-8" />
  },
  {
    id: 2,
    title: "Servicio de Restaurante",
    description: "Disfrute de nuestra cocina local e internacional con los mejores ingredientes frescos.",
    price: "Desde 35.000 COP",
    icon: <Utensils className="h-8 w-8" />
  },
  {
    id: 3,
    title: "Acceso a Gimnasio",
    description: "Mantenga su rutina de ejercicios en nuestro gimnasio completamente equipado.",
    price: "Incluido para huéspedes",
    icon: <Dumbbell className="h-8 w-8" />
  },
  {
    id: 4,
    title: "Servicio de Spa",
    description: "Relájese con nuestros tratamientos de spa y masajes terapéuticos.",
    price: "Desde 120.000 COP",
    icon: <Bath className="h-8 w-8" />
  }
];

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const handleBookingSuccess = () => {
    setSelectedService(null);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Nuestros Servicios</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Card
            key={service.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
          >
            <CardHeader>
              <div className="flex items-center justify-center mb-4">
                {service.icon}
              </div>
              <CardTitle className="text-center">{service.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-600">{service.description}</p>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <p className="text-center font-semibold">{service.price}</p>
              <Button
                className="w-full"
                onClick={() => setSelectedService(service)}
              >
                Reservar Ahora
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={selectedService !== null} onOpenChange={(open) => !open && setSelectedService(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {selectedService ? `Reservar ${selectedService.title}` : 'Reservar Servicio'}
            </DialogTitle>
          </DialogHeader>
          {selectedService && (
            <CreateBooking
              initialServiceId={selectedService.id}
              initialServiceName={selectedService.title}
              onBookingSuccess={handleBookingSuccess}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}