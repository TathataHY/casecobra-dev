"use client";

import { Phone } from "@/components/phone";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { BASE_PRICE, PRODUCT_PRICES } from "@/config/products";
import { cn, formatPrice } from "@/lib/utils";
import { COLORS, MODELS } from "@/validators/option-validator";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Configuration } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { ArrowRight, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Confetti from "react-dom-confetti";
import { createCheckoutSession } from "../actions";
import { LoginModal } from "./login-modal";

interface Props {
  configuration: Configuration;
}

export const DesignPreview = ({ configuration }: Props) => {
  const { id, imageUrl, color, model, material, finish } = configuration;

  const tw = COLORS.find((c) => c.value === color)?.tw;
  const { label: modelPhone } = MODELS.options.find((m) => m.value === model)!;

  let totalPrice = BASE_PRICE;
  if (material === "polycarbonate")
    totalPrice += PRODUCT_PRICES.material.polycarbonate;
  if (finish === "textured") totalPrice += PRODUCT_PRICES.finish.textured;

  const [showConfetti, setShowConfetti] = useState<boolean>(false);

  useEffect(() => setShowConfetti(true), []);

  const router = useRouter();
  const { toast } = useToast();

  const { mutate: createPaymentSession, isPending } = useMutation({
    mutationKey: ["get-checkout-session"],
    mutationFn: createCheckoutSession,
    onSuccess: ({ url }) => {
      if (url) router.push(url);
      else throw new Error("Unable to retrieve payment URL.");
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "There was an error on our end. Please try again.",
      });
    },
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const { user } = useKindeBrowserClient();

  const handleCheckout = () => {
    if (user) {
      // create payment session
      createPaymentSession({ configId: id });
    } else {
      // need to log in
      localStorage.setItem("configurationId", id);
      setIsLoginModalOpen(true);
    }
  };

  return (
    <>
      <div
        aria-hidden
        className="absolute inset-0 flex justify-center overflow-hidden pointer-events-none select-none"
      >
        <Confetti
          active={showConfetti}
          config={{ elementCount: 300, spread: 150 }}
        />
      </div>

      <LoginModal isOpen={isLoginModalOpen} setIsOpen={setIsLoginModalOpen} />

      <div className="flex flex-col items-center sm:gap-x-6 md:gap-x-8 lg:gap-x-12 md:grid sm:grid-cols-12 sm:grid-rows-1 mt-20 text-sm">
        <div className="md:col-span-4 lg:col-span-3 md:row-span-2 md:row-end-2">
          <Phone
            imgSrc={imageUrl}
            className={cn(`bg-${tw}`, "max-w-[150px] md:max-w-full")}
          />
        </div>

        <div className="sm:col-span-9 md:row-end-1 mt-6">
          <h3 className="font-bold text-3xl text-gray-900 tracking-tight">
            Your {modelPhone} Case
          </h3>
          <div className="flex items-center gap-1.5 mt-3 text-base">
            <Check className="w-4 h-4 text-green-500" />
            In stock and ready to ship
          </div>
        </div>

        <div className="sm:col-span-12 md:col-span-9 text-base">
          <div className="gap-y-8 sm:gap-x-6 border-gray-200 grid grid-cols-1 sm:grid-cols-2 py-8 sm:py-6 md:py-10 border-b">
            <div>
              <p className="font-medium text-zinc-950">Highlights</p>
              <ol className="mt-3 text-zinc-700 list-disc list-inside">
                <li>Wireless charging compatible</li>
                <li>TPU shock absorption</li>
                <li>Packaging made from recycled materials</li>
                <li>5 year print warranty</li>
              </ol>
            </div>
            <div>
              <p className="font-medium text-zinc-950">Materials</p>
              <ol className="mt-3 text-zinc-700 list-disc list-inside">
                <li>High-quality, durable material</li>
                <li>Scratch- and fingerprint resistant coating</li>
              </ol>
            </div>
          </div>
          <div className="mt-8">
            <div className="bg-gray-50 p-6 sm:p-8 sm:rounded-lg">
              <div className="flow-root text-sm">
                <div className="flex justify-between items-center mt-2 py-1">
                  <p className="text-gray-600">Base price</p>
                  <p className="font-medium text-gray-900">
                    {formatPrice(BASE_PRICE / 100)}
                  </p>
                </div>

                {finish === "textured" ? (
                  <div className="flex justify-between items-center mt-2 py-1">
                    <p className="text-gray-600">Textured finish</p>
                    <p className="font-medium text-gray-900">
                      {formatPrice(PRODUCT_PRICES.finish.textured / 100)}
                    </p>
                  </div>
                ) : null}

                {material === "polycarbonate" ? (
                  <div className="flex justify-between items-center mt-2 py-1">
                    <p className="text-gray-600">Soft polycarbonate material</p>
                    <p className="font-medium text-gray-900">
                      {formatPrice(PRODUCT_PRICES.material.polycarbonate / 100)}
                    </p>
                  </div>
                ) : null}

                <div className="bg-gray-200 my-2 h-px" />

                <div className="flex justify-between items-center py-2">
                  <p className="font-semibold text-gray-900">Order total</p>
                  <p className="font-semibold text-gray-900">
                    {formatPrice(totalPrice / 100)}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-8 pb-12">
              <Button
                isLoading={isPending}
                disabled={isPending}
                loadingText="Checking out"
                onClick={handleCheckout}
                className="px-4 sm:px-6 lg:px-8"
              >
                Check out <ArrowRight className="inline ml-1.5 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
