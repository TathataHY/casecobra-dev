import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { Steps } from "./_components/steps";

export default function ConfigureLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MaxWidthWrapper className="flex flex-col flex-1">
      <Steps />
      {children}
    </MaxWidthWrapper>
  );
}
