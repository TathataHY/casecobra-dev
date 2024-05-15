import { Suspense } from "react";
import { ThankYouComponent } from "./_components/thank-you";

export default function ThankYou() {
  return (
    <Suspense>
      <ThankYouComponent />
    </Suspense>
  );
}
