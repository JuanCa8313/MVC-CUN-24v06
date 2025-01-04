import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SelectItem } from '@radix-ui/react-select';
import { services } from '@/app/services/page';

interface Booking {
  id: number;
  document_type: string;
  document_number: string;
  full_name: string;
  phone: string;
  email: string;
  service_id: string;
  service_name: string,
}

// Definir los tipos de documento disponibles
const documentTypes = [
  { value: 'CC', label: 'Cédula de Ciudadanía' },
  { value: 'CE', label: 'Cédula de Extranjería' },
  { value: 'PAS', label: 'Pasaporte' }
];

interface CreateBookingProps {
  initialServiceId?: number;
}

export default function UpdateBooking({ initialServiceId }: CreateBookingProps) {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<Booking>({
    id: 0,
    document_type: 'CC',
    document_number: '',
    full_name: '',
    phone: '',
    email: '',
    service_id: initialServiceId?.toString() || '',
    service_name: '',
  });

  // Función para obtener el label del tipo de documento
  const getDocumentTypeLabel = (value: string) => {
    const docType = documentTypes.find(type => type.value === value);
    return docType ? docType.label : 'Seleccionar tipo de documento';
  };

  // Función para obtener el nombre del servicio
  const getServiceName = (serviceId: string) => {
    const service = services.find(s => s.id.toString() === serviceId);
    return service ? `${service.title} - ${service.price}` : 'Seleccionar servicio';
  };

  useEffect(() => {
    const fetchBooking = async () => {
      if (!params.id) return;

      try {
        setLoading(true);
        const response = await fetch(`/api/bookings/${params.id}`);

        if (!response.ok) {
          throw new Error('Failed to fetch booking');
        }

        const bookingData = await response.json();

        // Update all form fields with the fetched data
        setFormData({
          id: bookingData.id,
          document_type: bookingData.document_type || 'CC',
          document_number: bookingData.document_number || '',
          full_name: bookingData.full_name || '',
          phone: bookingData.phone || '',
          email: bookingData.email || '',
          service_id: bookingData.service_id?.toString() || '',
          service_name: bookingData.service_name || '',
        });
      } catch (error) {
        console.error('Error fetching booking:', error);
        toast({
          title: "Error",
          description: "No se pudo cargar la información de la reserva.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [params.id, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/bookings/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast({
          title: "Reserva actualizada",
          description: "La reserva se ha actualizado exitosamente."
        });
        router.push('/backend');
      } else {
        throw new Error('Failed to update booking');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo actualizar la reserva.",
        variant: "destructive"
      });
    }
  };

  const handleInputChange = (field: keyof Booking, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (loading) {
    return (
      <Card className="w-full max-w-2xl mx-auto mt-8">
        <CardContent className="p-6">
          <div className="flex justify-center items-center h-40">
            <p className="text-lg">Cargando información de la reserva...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>Actualizar Reserva</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Select
              value={formData.document_type}
              onValueChange={(value) => handleInputChange('document_type', value)}
            >
              <SelectTrigger>
                <SelectValue>
                  {getDocumentTypeLabel(formData.document_type)}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {documentTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              placeholder="Número de documento"
              value={formData.document_number}
              onChange={(e) => handleInputChange('document_number', e.target.value)}
            />
          </div>

          <Input
            placeholder="Nombre completo"
            value={formData.full_name}
            onChange={(e) => handleInputChange('full_name', e.target.value)}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Teléfono"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
            />
            <Input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
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
              <SelectValue>
                {getServiceName(formData.service_id)}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {services.map((service) => (
                <SelectItem key={service.id} value={service.id.toString()}>
                  {service.title} - {service.price}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex justify-between gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/backend')}
              className="w-full"
            >
              Cancelar
            </Button>
            <Button type="submit" className="w-full">
              Actualizar Reserva
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}