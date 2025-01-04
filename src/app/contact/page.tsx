import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Contáctenos</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Envíenos un mensaje</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <Input placeholder="Nombre completo" />
              </div>
              <div>
                <Input type="email" placeholder="Correo electrónico" />
              </div>
              <div>
                <Input placeholder="Asunto" />
              </div>
              <div>
                <Textarea placeholder="Mensaje" className="min-h-[150px]" />
              </div>
              <Button type="submit" className="w-full">
                Enviar Mensaje
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Información de Contacto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Dirección</h3>
              <p className="text-muted-foreground">
                Calle Principal #123<br />
                Ciudad, País
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Teléfono</h3>
              <p className="text-muted-foreground">
                +1 234 567 890<br />
                +1 234 567 891
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-muted-foreground">
                info@hotelparadise.com<br />
                reservas@hotelparadise.com
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Horario de Atención</h3>
              <p className="text-muted-foreground">
                Lunes a Domingo<br />
                24 horas
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}