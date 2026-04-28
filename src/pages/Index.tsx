import { Header } from "@/components/fluxa/Header";
import { Hero } from "@/components/fluxa/Hero";
import { Especialidades } from "@/components/fluxa/Especialidades";
import { Proyectos } from "@/components/fluxa/Proyectos";
import { Proceso } from "@/components/fluxa/Proceso";
import { Stack } from "@/components/fluxa/Stack";
import { Equipo } from "@/components/fluxa/Equipo";
import { Testimonios } from "@/components/fluxa/Testimonios";
import { Contacto } from "@/components/fluxa/Contacto";
import { Footer } from "@/components/fluxa/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <Especialidades />
        <Proyectos />
        <Proceso />
        <Stack />
        <Equipo />
        <Testimonios />
        <Contacto />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
