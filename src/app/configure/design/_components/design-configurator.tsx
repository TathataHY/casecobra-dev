"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { BASE_PRICE } from "@/config/products";
import { useUploadThing } from "@/lib/uploadthing";
import { base64ToBlob, cn, formatPrice } from "@/lib/utils";
import {
  COLORS,
  FINISHES,
  MATERIALS,
  MODELS,
} from "@/validators/option-validator";
import { Description, Radio, RadioGroup } from "@headlessui/react";
import { useMutation } from "@tanstack/react-query";
import { ArrowRight, Check, ChevronsUpDown } from "lucide-react";
import NextImage from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Rnd } from "react-rnd";
import { saveConfig, SaveConfigArgs } from "../actions";
import { HandleComponent } from "./handle-component";

interface Props {
  configId: string;
  imageUrl: string;
  imageDimensions: { width: number; height: number };
}

export const DesignConfigurator = ({
  configId,
  imageUrl,
  imageDimensions,
}: Props) => {
  const { toast } = useToast();
  const router = useRouter();

  const { mutate: _saveConfig, isPending } = useMutation({
    mutationKey: ["save-config"],
    mutationFn: async (args: SaveConfigArgs) => {
      await Promise.all([saveConfiguration(), saveConfig(args)]);
    },
    onSuccess: () => {
      router.push(`/configure/preview?id=${configId}`);
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    },
  });

  const [options, setOptions] = useState<{
    color: (typeof COLORS)[number];
    model: (typeof MODELS.options)[number];
    material: (typeof MATERIALS.options)[number];
    finish: (typeof FINISHES.options)[number];
  }>({
    color: COLORS[0],
    model: MODELS.options[0],
    material: MATERIALS.options[0],
    finish: FINISHES.options[0],
  });

  const [renderedDimensions, setRenderedDimensions] = useState<{
    width: number;
    height: number;
  }>({
    width: imageDimensions.width / 4,
    height: imageDimensions.height / 4,
  });

  const [renderedPosition, setRenderedPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 150, y: 205 });

  const phoneCaseRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { startUpload } = useUploadThing("imageUploader");

  const saveConfiguration = async () => {
    try {
      const {
        left: caseLeft,
        top: caseTop,
        width: caseWidth,
        height: caseHeight,
      } = phoneCaseRef.current!.getBoundingClientRect();

      const { left: containerLeft, top: containerTop } =
        containerRef.current!.getBoundingClientRect();

      const leftOffset = caseLeft - containerLeft;
      const topOffset = caseTop - containerTop;

      const x = renderedPosition.x - leftOffset;
      const y = renderedPosition.y - topOffset;

      const canvas = document.createElement("canvas");
      canvas.width = caseWidth;
      canvas.height = caseHeight;

      const ctx = canvas.getContext("2d");

      const userImage = new Image();
      userImage.src = imageUrl;
      userImage.crossOrigin = "anonymous";
      await new Promise((resolve) => (userImage.onload = resolve));

      ctx?.drawImage(
        userImage,
        x,
        y,
        renderedDimensions.width,
        renderedDimensions.height
      );

      const base64 = canvas.toDataURL();
      const base64Data = base64.split(",")[1];

      const blob = base64ToBlob(base64Data, "image/png");
      const file = new File([blob], "filename.png", { type: "image/png" });

      await startUpload([file], { configId });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="relative grid grid-cols-1 lg:grid-cols-3 mt-20 mb-20 pb-20">
      <div
        ref={containerRef}
        className="relative flex justify-center items-center border-2 border-gray-300 col-span-2 p-12 border-dashed rounded-lg w-full max-w-4xl h-[37.5rem] text-center overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        <div className="relative bg-opacity-50 w-60 pointer-events-none aspect-[896/1831]">
          <AspectRatio
            ref={phoneCaseRef}
            ratio={896 / 1831}
            className="relative z-50 w-full pointer-events-none aspect-[896/1831]"
          >
            <NextImage
              src="/phone-template.png"
              alt="phone template"
              fill
              className="z-50 pointer-events-none select-none"
            />
          </AspectRatio>
          <div className="top-px right-[3px] bottom-px left-[3px] z-40 absolute inset-0 shadow-[0_0_0_99999px_rgba(229,231,235,0.6)] rounded-[32px]" />
          <div
            className={cn(
              "top-px right-[3px] bottom-px left-[3px] absolute inset-0 rounded-[32px]",
              `bg-${options.color.tw}`
            )}
          />
        </div>

        <Rnd
          default={{
            x: 150,
            y: 205,
            width: imageDimensions.width / 4,
            height: imageDimensions.height / 4,
          }}
          lockAspectRatio
          resizeHandleComponent={{
            topRight: <HandleComponent />,
            topLeft: <HandleComponent />,
            bottomRight: <HandleComponent />,
            bottomLeft: <HandleComponent />,
          }}
          onResizeStop={(e, direction, ref, delta, position) => {
            setRenderedDimensions({
              width: parseInt(ref.style.width.slice(0, -2)),
              height: parseInt(ref.style.height.slice(0, -2)),
            });
            setRenderedPosition(position);
          }}
          onDragStop={(e, position) => {
            setRenderedPosition(position);
          }}
          className="z-20 absolute border-[3px] border-primary"
        >
          <div className="relative w-full h-full">
            <NextImage
              src={imageUrl}
              alt="your image"
              fill
              className="pointer-events-none"
            />
          </div>
        </Rnd>
      </div>

      <div className="flex flex-col col-span-full lg:col-span-1 bg-white w-full h-[37.5rem]">
        <ScrollArea className="relative flex-1 overflow-auto">
          <div
            aria-hidden="true"
            className="bottom-0 z-10 absolute inset-x-0 bg-gradient-to-t from-white h-12 pointer-events-none"
          />

          <div className="px-8 pt-8 pb-12">
            <h2 className="font-bold text-3xl tracking-tight">
              Customize your case
            </h2>

            <div className="bg-zinc-200 my-6 w-full h-px" />

            <div className="relative flex flex-col justify-between mt-4 h-full">
              <div className="flex flex-col gap-6">
                <RadioGroup
                  value={options.color}
                  onChange={(color) =>
                    setOptions((prev) => ({ ...prev, color }))
                  }
                >
                  <Label>Color: {options.color.label}</Label>
                  <div className="flex items-center space-x-3 mt-3">
                    {COLORS.map((color) => (
                      <Radio
                        key={color.value}
                        value={color}
                        className={({ hover, checked }) =>
                          cn(
                            "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 active:ring-0 focus:ring-0 active:outline-none focus:outline-none border-2 border-transparent",
                            {
                              [`border-${color.tw}`]: hover || checked,
                            }
                          )
                        }
                      >
                        <span
                          className={cn(
                            `bg-${color.tw}`,
                            "h-8 w-8 rounded-full border border-black border-opacity-10"
                          )}
                        />
                      </Radio>
                    ))}
                  </div>
                </RadioGroup>

                <div className="relative flex flex-col gap-3 w-full">
                  <Label>Model</Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className="justify-between w-full"
                      >
                        {options.model.label}
                        <ChevronsUpDown className="opacity-50 ml-2 w-4 h-4 shrink-0" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {MODELS.options.map((model) => (
                        <DropdownMenuItem
                          key={model.label}
                          className={cn(
                            "flex text-sm gap-1 items-center p-1.5 cursor-default hover:bg-zinc-100",
                            {
                              "bg-zinc-100":
                                model.label === options.model.label,
                            }
                          )}
                          onClick={() =>
                            setOptions((prev) => ({ ...prev, model }))
                          }
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              model.label === options.model.label
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {model.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {[MATERIALS, FINISHES].map(
                  ({ name, options: selectableOptions }) => (
                    <RadioGroup
                      key={name}
                      value={options[name]}
                      onChange={(val) =>
                        setOptions((prev) => ({ ...prev, [name]: val }))
                      }
                    >
                      <Label>
                        {name.slice(0, 1).toUpperCase() + name.slice(1)}
                      </Label>
                      <div className="space-y-4 mt-3">
                        {selectableOptions.map((option) => (
                          <Radio
                            key={option.value}
                            value={option}
                            className={({ hover, checked }) =>
                              cn(
                                "relative block cursor-pointer rounded-lg bg-white px-6 py-4 shadow-sm border-2 border-zinc-200 focus:outline-none ring-0 focus:ring-0 outline-none sm:flex sm:justify-between",
                                {
                                  "border-primary": hover || checked,
                                }
                              )
                            }
                          >
                            <span className="flex items-center">
                              <span className="flex flex-col text-sm">
                                <RadioGroup.Label
                                  className="font-medium text-gray-900"
                                  as="span"
                                >
                                  {option.label}
                                </RadioGroup.Label>

                                {option.description ? (
                                  <Description
                                    as="span"
                                    className="text-gray-500"
                                  >
                                    <span className="block sm:inline">
                                      {option.description}
                                    </span>
                                  </Description>
                                ) : null}
                              </span>
                            </span>

                            <Description
                              as="span"
                              className="sm:text-right flex sm:flex-col mt-2 sm:mt-0 sm:ml-4 text-sm"
                            >
                              <span className="font-medium text-gray-900">
                                {formatPrice(option.price / 100)}
                              </span>
                            </Description>
                          </Radio>
                        ))}
                      </div>
                    </RadioGroup>
                  )
                )}
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="bg-white px-8 w-full h-16">
          <div className="bg-zinc-200 w-full h-px" />
          <div className="flex justify-end items-center w-full h-full">
            <div className="flex items-center gap-6 w-full">
              <p className="font-medium whitespace-nowrap">
                {formatPrice(
                  (BASE_PRICE + options.material.price + options.finish.price) /
                    100
                )}
              </p>
              <Button
                isLoading={isPending}
                disabled={isPending}
                loadingText="Saving"
                onClick={() =>
                  _saveConfig({
                    configId,
                    color: options.color.value,
                    finish: options.finish.value,
                    material: options.material.value,
                    model: options.model.value,
                  })
                }
                size="sm"
                className="w-full"
              >
                Continue
                <ArrowRight className="inline ml-1.5 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
