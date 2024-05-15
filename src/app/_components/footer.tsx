import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="relative bg-white h-20">
      <MaxWidthWrapper>
        <div className="border-gray-200 border-t" />

        <div className="flex md:flex-row flex-col justify-center md:justify-between items-center h-full">
          <div className="pb-2 md:pb-0 text-center md:text-left">
            <p className="text-muted-foreground text-sm">
              &copy; {new Date().getFullYear()} All rights reserved
            </p>
          </div>

          <div className="flex justify-center items-center">
            <div className="flex space-x-8">
              <Link
                href="#"
                className="text-muted-foreground text-sm hover:text-gray-600"
              >
                Terms
              </Link>
              <Link
                href="#"
                className="text-muted-foreground text-sm hover:text-gray-600"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-muted-foreground text-sm hover:text-gray-600"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};
