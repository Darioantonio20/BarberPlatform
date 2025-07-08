import { BarbershopTemplate } from "@/components/templates";

interface BarbershopPageProps {
  params: Promise<{ barberiaId: string }>;
}

export default async function BarbershopPage({ params }: BarbershopPageProps) {
  const { barberiaId } = await params;
  return <BarbershopTemplate barberiaId={barberiaId} />;
}

export async function generateStaticParams() {
  // Generamos las rutas estáticas para cada barbería
  return [
    { barberiaId: 'centro-barberia' },
    { barberiaId: 'plaza-barberia' },
    { barberiaId: 'zona-norte-barberia' },
  ];
} 