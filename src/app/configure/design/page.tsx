import prisma from "@/db";
import { notFound } from "next/navigation";
import { DesignConfigurator } from "./_components/design-configurator";

interface DesignProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export default async function Design({ searchParams }: DesignProps) {
  const { id } = searchParams;

  if (!id || typeof id !== "string") return notFound();

  const configuration = await prisma.configuration.findUnique({
    where: { id },
  });

  if (!configuration) return notFound();

  const { width, height, imageUrl } = configuration;

  return (
    <DesignConfigurator
      configId={id}
      imageUrl={imageUrl}
      imageDimensions={{ width, height }}
    />
  );
}
