// views/CreateBooking.tsx
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
import { services } from '@/data/services';

interface CreateBookingProps {
  initialServiceId?: number;
}

export default function CreateBooking({ initialServiceId }: CreateBookingProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    document_type: 'CC',
    document_number: '',
    full_name: '',
    phone: '',
    email: '',
    service_id: initialServiceId?.toString() || ''
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
        // Reset form
        setFormData({
          document_type: 'CC',
          document_number: '',
          full_name: '',
          phone: '',
          email: '',
          service_id: ''
        });
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
            onValueChange={(value) =>
              setFormData({ ...formData, service_id: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar servicio" />
            </SelectTrigger>
            <SelectContent>
              {services.map((service) => (
                <SelectItem key={service.id} value={service.id.toString()}>
                  {service.name} - {service.price}
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