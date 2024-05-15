/* eslint-disable @next/next/no-img-element */
import { Icons } from "@/components/icons";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { Phone } from "@/components/phone";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight, Check, Star } from "lucide-react";
import Link from "next/link";
import { Reviews } from "./_components/reviews";

export default function Home() {
  return (
    <>
      <main className="bg-slate-50">
        {/* Main content */}
        <section>
          <MaxWidthWrapper className="lg:gap-x-0 xl:gap-x-8 lg:grid lg:grid-cols-3 pt-10 lg:pt-24 xl:pt-32 pb-24 sm:pb-32 lg:pb-52">
            {/* CaseCobra description */}
            <div className="col-span-2 px-6 lg:px-0 lg:pt-4">
              <div className="relative flex flex-col items-center lg:items-start mx-auto text-center lg:text-left">
                {/* Logo */}
                <div className="lg:block -top-20 left-0 absolute hidden w-28">
                  <img
                    src="/snake-1.png"
                    alt="CaseCobra snake logo"
                    className="w-full"
                  />
                </div>
                {/* Title */}
                <h1 className="relative mt-16 w-fit font-bold text-5xl text-balance text-gray-900 md:text-6xl lg:text-7xl !leading-tight tracking-tight">
                  Your Image on a{" "}
                  <span className="bg-green-600 px-2 text-white">Custom</span>{" "}
                  Phone Case
                </h1>
                {/* Description */}
                <p className="mt-8 lg:pr-10 max-w-prose text-balance text-center text-lg md:text-wrap lg:text-left">
                  Capture your favorite memories with your own,{" "}
                  <span className="font-semibold">one-of-one</span> phone case.
                  CaseCobra allows you to protect your memories, not just your
                  phone case.
                </p>
                {/* Features */}
                <ul className="flex flex-col items-center sm:items-start space-y-2 mt-8 font-medium text-left">
                  <li className="flex items-center gap-1.5 text-left">
                    <Check className="w-5 h-5 text-green-600 shrink-0" />
                    High-quality, durable material
                  </li>
                  <li className="flex items-center gap-1.5 text-left">
                    <Check className="w-5 h-5 text-green-600 shrink-0" />5 year
                    print guarantee
                  </li>
                  <li className="flex items-center gap-1.5 text-left">
                    <Check className="w-5 h-5 text-green-600 shrink-0" />
                    Modern iPhone models supported
                  </li>
                </ul>
                {/* Customers */}
                <div className="flex sm:flex-row flex-col items-center sm:items-start gap-5 mt-12">
                  <div className="flex -space-x-4">
                    <img
                      className="inline-block rounded-full w-10 h-10 ring-2 ring-slate-100"
                      src="/users/user-1.png"
                      alt="user image"
                    />
                    <img
                      className="inline-block rounded-full w-10 h-10 ring-2 ring-slate-100"
                      src="/users/user-2.png"
                      alt="user image"
                    />
                    <img
                      className="inline-block rounded-full w-10 h-10 ring-2 ring-slate-100"
                      src="/users/user-3.png"
                      alt="user image"
                    />
                    <img
                      className="inline-block rounded-full w-10 h-10 ring-2 ring-slate-100"
                      src="/users/user-4.jpg"
                      alt="user image"
                    />
                    <img
                      className="inline-block rounded-full w-10 h-10 object-cover ring-2 ring-slate-100"
                      src="/users/user-5.jpg"
                      alt="user image"
                    />
                  </div>

                  <div className="flex flex-col justify-between items-center sm:items-start">
                    <div className="flex gap-0.5">
                      <Star className="w-4 h-4 text-green-600 fill-green-600" />
                      <Star className="w-4 h-4 text-green-600 fill-green-600" />
                      <Star className="w-4 h-4 text-green-600 fill-green-600" />
                      <Star className="w-4 h-4 text-green-600 fill-green-600" />
                      <Star className="w-4 h-4 text-green-600 fill-green-600" />
                    </div>

                    <p>
                      <span className="font-semibold">1.250</span> happy
                      customers
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Your image */}
            <div className="flex justify-center col-span-full lg:col-span-1 lg:mx-0 mt-32 lg:mt-20 px-8 sm:px-16 md:px-0 w-full h-fit">
              <div className="relative md:max-w-xl">
                <img
                  src="/your-image.png"
                  alt="your image"
                  className="sm:block xl:block -top-20 left-56 absolute hidden lg:hidden w-40 lg:w-52 select-none"
                />
                <img
                  src="/line.png"
                  alt="line image"
                  className="-bottom-6 -left-6 absolute w-20 select-none"
                />
                <Phone className="w-64" imgSrc="/testimonials/1.jpg" />
              </div>
            </div>
          </MaxWidthWrapper>
        </section>

        {/* Value proposition section */}
        <section className="bg-slate-100 py-24 grainy-dark">
          <MaxWidthWrapper className="flex flex-col items-center gap-16 sm:gap-32">
            {/* Title */}
            <div className="flex lg:flex-row flex-col items-center gap-4 sm:gap-6">
              <h2 className="order-1 mt-2 font-bold text-5xl text-balance text-center text-gray-900 md:text-6xl !leading-tight tracking-tight">
                What our{" "}
                <span className="relative px-2">
                  customers{" "}
                  <Icons.underline className="sm:block -bottom-6 absolute inset-x-0 hidden text-green-500 pointer-events-none" />
                </span>{" "}
                say
              </h2>
              <img
                src="/snake-2.png"
                className="order-0 lg:order-2 w-24"
                alt="snake logo"
              />
            </div>

            {/* Testimonials */}
            <div className="gap-y-16 grid grid-cols-1 lg:grid-cols-2 mx-auto lg:mx-0 px-4 max-w-2xl lg:max-w-none">
              {/* First testimonial */}
              <div className="flex flex-col flex-auto gap-4 lg:pr-8 xl:pr-20">
                <div className="flex gap-0.5 mb-2">
                  <Star className="w-5 h-5 text-green-600 fill-green-600" />
                  <Star className="w-5 h-5 text-green-600 fill-green-600" />
                  <Star className="w-5 h-5 text-green-600 fill-green-600" />
                  <Star className="w-5 h-5 text-green-600 fill-green-600" />
                  <Star className="w-5 h-5 text-green-600 fill-green-600" />
                </div>
                <div className="text-lg leading-8">
                  <p>
                    &quot;The case feels durable and I even got a compliment on
                    the design. Had the case for two and a half months now and{" "}
                    <span className="bg-slate-800 p-0.5 text-white">
                      the image is super clear
                    </span>
                    , on the case I had before, the image started fading into
                    yellow-ish color after a couple weeks. Love it.&quot;
                  </p>
                </div>
                <div className="flex gap-4 mt-2">
                  <img
                    className="rounded-full w-12 h-12 object-cover"
                    src="/users/user-1.png"
                    alt="user"
                  />
                  <div className="flex flex-col">
                    <p className="font-semibold">Jonathan</p>
                    <div className="flex items-center gap-1.5 text-zinc-600">
                      <Check className="w-4 h-4 text-green-600 stroke-[3px]" />
                      <p className="text-sm">Verified Purchase</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Second testimonial */}
              <div className="flex flex-col flex-auto gap-4 lg:pr-8 xl:pr-20">
                <div className="flex gap-0.5 mb-2">
                  <Star className="w-5 h-5 text-green-600 fill-green-600" />
                  <Star className="w-5 h-5 text-green-600 fill-green-600" />
                  <Star className="w-5 h-5 text-green-600 fill-green-600" />
                  <Star className="w-5 h-5 text-green-600 fill-green-600" />
                  <Star className="w-5 h-5 text-green-600 fill-green-600" />
                </div>
                <div className="text-lg leading-8">
                  <p>
                    &quot;I usually keep my phone together with my keys in my
                    pocket and that led to some pretty heavy scratchmarks on all
                    of my last phone cases. This one, besides a barely
                    noticeable scratch on the corner,{" "}
                    <span className="bg-slate-800 p-0.5 text-white">
                      looks brand new after about half a year
                    </span>
                    . I dig it.&quot;
                  </p>
                </div>
                <div className="flex gap-4 mt-2">
                  <img
                    className="rounded-full w-12 h-12 object-cover"
                    src="/users/user-4.jpg"
                    alt="user"
                  />
                  <div className="flex flex-col">
                    <p className="font-semibold">Josh</p>
                    <div className="flex items-center gap-1.5 text-zinc-600">
                      <Check className="w-4 h-4 text-green-600 stroke-[3px]" />
                      <p className="text-sm">Verified Purchase</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </MaxWidthWrapper>

          <div className="pt-16">
            <Reviews />
          </div>
        </section>

        {/* Upload section */}
        <section>
          <MaxWidthWrapper className="py-24">
            {/* Title */}
            <div className="mb-12 px-6 lg:px-8">
              <div className="mx-auto max-w-2xl sm:text-center">
                <h2 className="order-1 mt-2 font-bold text-5xl text-balance text-center text-gray-900 md:text-6xl !leading-tight tracking-tight">
                  Upload your photo and get{" "}
                  <span className="relative bg-green-600 px-2 text-white">
                    your own case
                  </span>{" "}
                  now
                </h2>
              </div>
            </div>

            {/* Images content */}
            <div className="mx-auto px-6 lg:px-8 max-w-6xl">
              <div className="relative flex flex-col items-center gap-40 md:grid grid-cols-2">
                <img
                  alt="arrow"
                  src="/arrow.png"
                  className="top-[25rem] md:top-1/2 left-1/2 z-10 absolute -translate-x-1/2 -translate-y-1/2 rotate-90 md:rotate-0"
                />

                <div className="relative md:justify-self-end bg-gray-900/5 rounded-xl lg:rounded-2xl w-full max-w-sm h-80 md:h-full ring-gray-900/10 ring-inset">
                  <img
                    alt="horse"
                    src="/horse.jpg"
                    className="bg-white shadow-2xl rounded-md w-full h-full object-cover ring-1 ring-gray-900/10"
                  />
                </div>

                <Phone className="w-60" imgSrc="/horse_phone.jpg" />
              </div>
            </div>

            {/* Features */}
            <ul className="space-y-2 mx-auto mt-12 w-fit max-w-prose sm:text-lg">
              <li className="w-fit">
                <Check className="inline mr-1.5 w-5 h-5 text-green-600" />
                High-quality silicone material
              </li>
              <li className="w-fit">
                <Check className="inline mr-1.5 w-5 h-5 text-green-600" />
                Scratch- and fingerprint resistant coating
              </li>
              <li className="w-fit">
                <Check className="inline mr-1.5 w-5 h-5 text-green-600" />
                Wireless charging compatible
              </li>
              <li className="w-fit">
                <Check className="inline mr-1.5 w-5 h-5 text-green-600" />5 year
                print warranty
              </li>
            </ul>

            {/* Create your case button */}
            <div className="flex justify-center mt-2">
              <Link
                className={buttonVariants({
                  size: "lg",
                  className: "mx-auto mt-8",
                })}
                href="/configure/upload"
              >
                Create your case now <ArrowRight className="ml-1.5 w-4 h-4" />
              </Link>
            </div>
          </MaxWidthWrapper>
        </section>
      </main>
    </>
  );
}
