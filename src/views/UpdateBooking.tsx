import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function UpdateBooking() {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/bookings/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking)
      });

      if (response.ok) {
        toast({
          title: "Reserva actualizada",
          description: "La reserva se ha actualizado exitosamente."
        });
        router.push('/backend');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo actualizar la reserva.",
        variant: "destructive"
      });
    }
  };

  if (!booking) return <div>Cargando...</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Actualizar Reserva</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campos del formulario similares a CreateBooking */}
          <Button type="submit">Actualizar Reserva</Button>
        </form>
      </CardContent>
    </Card>
  );
}