import { cn } from "@/lib/utils";

export const MaxWidthWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <>
      <div
        className={cn(
          "mx-auto px-2.5 md:px-20 w-full max-w-screen-xl h-full",
          className
        )}
      >
        {children}
      </div>
    </>
  );
};
