import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function DeleteBooking() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    if (params.id) {
      fetchBooking(Number(params.id));
    }
  }, [params.id]);

  const fetchBooking = async (id: number) => {
    try {
      const response = await fetch(`/api/bookings/${id}`);
      const data = await response.json();
      setBooking(data);
    } catch (error) {
      console.error('Error fetching booking:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/bookings/${params.id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        toast({
          title: "Reserva eliminada",
          description: "La reserva se ha eliminado exitosamente."
        });
        router.push('/backend');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo eliminar la reserva.",
        variant: "destructive"
      });
    }
  };

  if (!booking) return <div>Cargando...</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Eliminar Reserva</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p>¿Está seguro que desea eliminar la siguiente reserva?</p>
          <div>
            <p><strong>Nombre:</strong> {booking.full_name}</p>
            <p><strong>Documento:</strong> {booking.document_type} {booking.document_number}</p>
            <p><strong>Email:</strong> {booking.email}</p>
          </div>
          <div className="flex space-x-4">
            <Button variant="destructive" onClick={handleDelete}>
              Confirmar Eliminación
            </Button>
            <Button variant="outline" onClick={() => router.push('/backend')}>
              Cancelar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}