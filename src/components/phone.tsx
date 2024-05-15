/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface PhoneProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string;
  dark?: boolean;
}

export const Phone = ({
  imgSrc,
  className,
  dark = false,
  ...props
}: PhoneProps) => {
  return (
    <div
      className={cn(
        "relative z-50 overflow-hidden pointer-events-none",
        className
      )}
      {...props}
    >
      <img
        src={
          dark
            ? "/phone-template-dark-edges.png"
            : "/phone-template-white-edges.png"
        }
        className="z-50 pointer-events-none select-none"
        alt="phone image"
      />

      <div className="-z-10 absolute inset-0">
        <img
          className="min-w-full min-h-full object-cover"
          src={imgSrc}
          alt="overlaying phone image"
        />
      </div>
    </div>
  );
};
