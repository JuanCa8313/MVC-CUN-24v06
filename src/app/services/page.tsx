"use client"

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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

const services: Service[] = [
  {
    id: 1,
    title: "Habitación Estándar",
    description: "Habitación cómoda con baño privado, TV y WiFi. Perfecta para viajeros individuales o parejas.",
    price: "150.000 COP / noche",
    icon: <Bed className="h-8 w-8" />
  },
  {
    id: 2,
    title: "Restaurante",
    description: "Disfrute de nuestra cocina local e internacional con los mejores ingredientes frescos.",
    price: "Desde 35.000 COP",
    icon: <Utensils className="h-8 w-8" />
  },
  {
    id: 3,
    title: "Gimnasio",
    description: "Mantenga su rutina de ejercicios en nuestro gimnasio completamente equipado.",
    price: "Incluido para huéspedes",
    icon: <Dumbbell className="h-8 w-8" />
  },
  {
    id: 4,
    title: "Spa",
    description: "Relájese con nuestros tratamientos de spa y masajes terapéuticos.",
    price: "Desde 120.000 COP",
    icon: <Bath className="h-8 w-8" />
  }
];

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Nuestros Servicios</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Dialog key={service.id}>
            <DialogTrigger asChild>
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
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
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Reservar {service.title}</DialogTitle>
              </DialogHeader>
              <CreateBooking initialServiceId={service.id} />
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}