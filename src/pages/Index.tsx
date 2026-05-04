import { Header } from "@/components/NKODAPP/Header";
import { Hero } from "@/components/NKODAPP/Hero";
import { Especialidades } from "@/components/NKODAPP/Especialidades";
import { Proyectos } from "@/components/NKODAPP/Proyectos";
import { Proceso } from "@/components/NKODAPP/Proceso";
import { Stack } from "@/components/NKODAPP/Stack";
import { Equipo } from "@/components/NKODAPP/Equipo";
import { Testimonios } from "@/components/NKODAPP/Testimonios";
import { Contacto } from "@/components/NKODAPP/Contacto";
import { Footer } from "@/components/NKODAPP/Footer";

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
