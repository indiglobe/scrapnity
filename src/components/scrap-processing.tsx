import { cn } from "@/lib/utils/cn";
import type { ComponentProps } from "react";

export function ProcessSection(props: ComponentProps<"section">) {
  const steps = [
    "Share Scrap Details",
    "Get Valuation",
    "Schedule Pickup",
    "Receive Payment",
  ];

  return (
    <section className={cn(`py-24`)} {...props}>
      <div className={cn(`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`)}>
        <div className={cn(`text-center`)}>
          <p
            className={cn(
              `text-primary-500 text-xs font-black tracking-[0.25em] uppercase`,
            )}
          >
            How It Works
          </p>

          <h2 className={cn(`mt-4 text-3xl font-black sm:text-5xl`)}>
            Simple 4-Step Process
          </h2>
        </div>

        <div
          className={cn(
            `mt-14 grid gap-6 overflow-clip md:grid-cols-2 xl:grid-cols-4`,
          )}
        >
          {steps.map((step, index) => (
            <div
              key={step}
              className={cn(
                `flex flex-col items-center justify-center border border-white/10 p-8`,
              )}
            >
              <p className={cn(`text-primary-500 text-5xl font-black`)}>
                0{index + 1}
              </p>

              <h3 className={cn(`mt-4 text-lg font-black`)}>{step}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
