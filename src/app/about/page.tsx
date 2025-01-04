import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export default function AboutPage() {
  const images = [
    "/api/placeholder/800/400",
    "/api/placeholder/800/400",
    "/api/placeholder/800/400"
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Quiénes Somos</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Nuestra Historia</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Con más de 20 años de experiencia en la industria hotelera, Hotel Paradise
            se ha convertido en un referente de excelencia y servicio. Nuestro compromiso
            con la calidad y la satisfacción del cliente nos ha permitido crecer y
            mejorar constantemente.
          </p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Misión</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Proporcionar experiencias memorables a nuestros huéspedes a través de
              un servicio excepcional y atención personalizada.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Visión</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Ser reconocidos como el hotel líder en experiencias de hospitalidad
              únicas y servicios de calidad superior.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}