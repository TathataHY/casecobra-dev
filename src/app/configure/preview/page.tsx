import prisma from "@/db";
import { notFound } from "next/navigation";
import { DesignPreview } from "./_components/design-preview";

interface Props {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export default async function Preview({ searchParams }: Props) {
  const { id } = searchParams;

  if (!id || typeof id !== "string") return notFound();

  const configuration = await prisma.configuration.findUnique({
    where: { id },
  });

  if (!configuration) return notFound();

  return <DesignPreview configuration={configuration} />;
}
