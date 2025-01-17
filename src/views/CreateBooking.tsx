import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { services } from '@/app/services/page';

interface CreateBookingProps {
  initialServiceId?: number;
  initialServiceName?: string;
  onBookingSuccess?: () => void;
}

export default function CreateBooking({ initialServiceId, initialServiceName, onBookingSuccess }: CreateBookingProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    document_type: 'CC',
    document_number: '',
    full_name: '',
    phone: '',
    email: '',
    service_id: initialServiceId?.toString() || '',
    service_name: initialServiceName?.toString() || '',
    booking_date: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast({
          title: "Reserva creada",
          description: "La reserva se ha creado exitosamente."
        });
        setFormData({
          document_type: 'CC',
          document_number: '',
          full_name: '',
          phone: '',
          email: '',
          service_id: '',
          service_name: '',
          booking_date: '',
        });

        onBookingSuccess?.();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo crear la reserva.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Crear Nueva Reserva</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Select
              value={formData.document_type}
              onValueChange={(value) =>
                setFormData({ ...formData, document_type: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Tipo de documento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CC">Cédula de Ciudadanía</SelectItem>
                <SelectItem value="CE">Cédula de Extranjería</SelectItem>
                <SelectItem value="PAS">Pasaporte</SelectItem>
              </SelectContent>
            </Select>

            <Input
              placeholder="Número de documento"
              value={formData.document_number}
              onChange={(e) =>
                setFormData({ ...formData, document_number: e.target.value })
              }
            />
          </div>

          <Input
            placeholder="Nombre completo"
            value={formData.full_name}
            onChange={(e) =>
              setFormData({ ...formData, full_name: e.target.value })
            }
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Teléfono"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
            <Input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <Select
            value={formData.service_id}
            onValueChange={(value) => {
              const selectedService = services.find((s) => s.id.toString() === value);
              setFormData({
                ...formData,
                service_id: value,
                service_name: selectedService?.title || '',
              });
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar servicio" />
            </SelectTrigger>
            <SelectContent>
              {services.map((service) => (
                <SelectItem key={service.id} value={service.id.toString()}>
                  {service.title} - {service.price}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button type="submit" className="w-full">
            Crear Reserva
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}