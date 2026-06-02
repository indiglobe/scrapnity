import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils/cn";
import { ArrowLeft, Clock3, Recycle, Sparkles } from "lucide-react";
import type { ComponentProps } from "react";

export default function ComingSoonPage({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        `relative flex min-h-svh items-center overflow-hidden`,
        className,
      )}
      {...props}
    >
      {/* Background */}
      <div className={cn(`bg-background absolute inset-0 -z-20`)} />

      <div
        className={cn(
          `bg-primary-500/10 absolute top-0 left-0 -z-10 h-96 w-96 rounded-full blur-[140px]`,
        )}
      />

      <div
        className={cn(
          `bg-secondary-500/10 absolute right-0 bottom-0 -z-10 h-96 w-96 rounded-full blur-[140px]`,
        )}
      />

      <div
        className={cn(
          `absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[70px_70px]`,
        )}
      />

      <div className={cn(`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8`)}>
        <div className={cn(`mx-auto max-w-4xl text-center`)}>
          {/* Badge */}
          <div
            className={cn(
              `border-primary-500/20 bg-primary-500/10 text-primary-500 inline-flex items-center gap-2 border px-4 py-2 text-xs font-black tracking-[0.18em] uppercase`,
            )}
          >
            <Sparkles className={cn(`h-3.5 w-3.5`)} />
            Under Development
          </div>

          {/* Icon */}
          <div className={cn(`mt-10 flex justify-center`)}>
            <div
              className={cn(
                `border-primary-500/20 bg-primary-500/10 flex h-24 w-24 items-center justify-center border`,
              )}
            >
              <Recycle className={cn(`text-primary-500 h-12 w-12`)} />
            </div>
          </div>

          {/* Heading */}
          <h1
            className={cn(
              `mt-10 text-5xl font-black tracking-tight sm:text-6xl lg:text-8xl`,
            )}
          >
            Coming
            <span className={cn(`text-primary-500`)}> Soon</span>
          </h1>

          <p
            className={cn(
              `text-foreground/65 mx-auto mt-8 max-w-2xl text-base leading-relaxed sm:text-lg`,
            )}
          >
            We're building something valuable for Scrapnity. This page is
            currently under development and will be available soon.
          </p>

          {/* Status Card */}
          <div
            className={cn(
              `border-primary-500/15 bg-background/70 mx-auto mt-12 max-w-2xl border p-6 backdrop-blur-xl`,
            )}
          >
            <div
              className={cn(
                `flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between`,
              )}
            >
              <div className={cn(`flex items-center gap-4`)}>
                <div className={cn(`bg-primary-500 h-3 w-3 animate-pulse`)} />

                <div className={cn(`text-left`)}>
                  <p
                    className={cn(
                      `text-xs font-black tracking-[0.18em] uppercase`,
                    )}
                  >
                    Current Status
                  </p>

                  <p className={cn(`text-foreground/60 mt-1 text-sm`)}>
                    Actively being developed
                  </p>
                </div>
              </div>

              <div className={cn(`flex items-center gap-3`)}>
                <Clock3 className={cn(`text-primary-500 h-5 w-5`)} />

                <span className={cn(`text-sm font-semibold`)}>
                  Launching Soon
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div
            className={cn(
              `mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center`,
            )}
          >
            <Link
              to="/"
              className={cn(
                `group border-primary-500/20 bg-primary-500 text-primary-50 inline-flex items-center justify-center gap-3 border px-7 py-4 text-sm font-black tracking-[0.15em] uppercase transition-all duration-300 hover:-translate-y-1`,
              )}
            >
              <ArrowLeft
                className={cn(
                  `h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1`,
                )}
              />
              Back To Home
            </Link>

            <Link
              to="/contact"
              className={cn(
                `border-primary-500/20 hover:bg-primary-500/10 inline-flex items-center justify-center border px-7 py-4 text-sm font-black tracking-[0.15em] uppercase transition-all duration-300`,
              )}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
