import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Bienvenidos a Hotel Paradise
        </h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
          Descubra el lujo y la comodidad en nuestro hotel de cinco estrellas. Una experiencia única en el corazón de la ciudad.
        </p>
        <Button size="lg">
          Reservar Ahora
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-2">Ubicación Privilegiada</h3>
            <p className="text-muted-foreground">
              En el centro de la ciudad, cerca de los principales atractivos turísticos.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-2">Habitaciones de Lujo</h3>
            <p className="text-muted-foreground">
              Espacios diseñados para su máximo confort y relajación.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-2">Servicio Premium</h3>
            <p className="text-muted-foreground">
              Atención personalizada las 24 horas del día.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}