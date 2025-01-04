// src/data/services.ts
export interface Service {
  id: number;
  name: string;
  description: string;
  price: string;
  icon?: string;
}

export const services: Service[] = [
  {
    id: 1,
    name: "Habitación Estándar",
    description: "Habitación cómoda con baño privado, TV y WiFi",
    price: "150.000 COP / noche",
  },
  {
    id: 2,
    name: "Servicio de Restaurante",
    description: "Acceso a nuestro restaurante con menú completo",
    price: "Desde 35.000 COP"
  },
  {
    id: 3,
    name: "Acceso a Gimnasio",
    description: "Acceso completo a instalaciones deportivas",
    price: "Incluido para huéspedes"
  },
  {
    id: 4,
    name: "Servicio de Spa",
    description: "Tratamientos de spa y masajes",
    price: "Desde 120.000 COP"
  },
];