import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Leaf,
  UserRound,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

export function BecomePartner() {
  return (
    <section
      className={cn(
        `from-background via-primary-50 to-accent-50 dark:from-background relative min-h-svh overflow-hidden bg-linear-to-br px-4 py-8 sm:px-6 lg:px-8 dark:via-zinc-900 dark:to-zinc-800`,
      )}
    >
      {/* Background decoration */}
      <div
        className={cn(
          `pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,var(--color-primary-300),transparent_38%)] opacity-25`,
        )}
      />

      <div
        className={cn(
          `bg-primary-500/10 pointer-events-none absolute -top-32 left-1/3 h-125 w-125 rounded-full blur-[150px]`,
        )}
      />

      <div
        className={cn(
          `bg-accent-500/10 pointer-events-none absolute right-0 bottom-0 h-96 w-96 rounded-full blur-[130px]`,
        )}
      />

      {/* Back button */}
      <div
        className={cn(
          `relative z-10 mx-auto flex w-full max-w-7xl items-center`,
        )}
      >
        <button
          type="button"
          onClick={() => window.history.back()}
          className={cn(
            `text-primary-600 hover:bg-primary-500/10 hover:text-primary-500 flex h-10 w-10 items-center justify-center transition-all`,
          )}
        >
          <ArrowLeft className={cn(`h-6 w-6`)} />
        </button>
      </div>

      {/* Content */}
      <div
        className={cn(
          `relative z-10 mx-auto flex min-h-[calc(100svh-80px)] max-w-6xl flex-col items-center justify-center py-12`,
        )}
      >
        {/* Heading */}
        <div className={cn(`mx-auto max-w-3xl text-center`)}>
          <div
            className={cn(
              `border-primary-500/20 bg-primary-500/10 text-primary-600 mx-auto inline-flex items-center gap-2 border px-4 py-2 text-xs font-black tracking-[0.18em] uppercase`,
            )}
          >
            <Leaf className={cn(`h-4 w-4`)} />
            Join Scrapnity
          </div>

          <h1
            className={cn(
              `text-foreground mt-7 text-3xl leading-tight font-black tracking-tight sm:text-4xl lg:text-5xl`,
            )}
          >
            How would you like to
            <span
              className={cn(
                `from-primary-600 via-primary-500 to-accent-500 block bg-linear-to-r bg-clip-text text-transparent`,
              )}
            >
              continue with us?
            </span>
          </h1>

          <p
            className={cn(
              `text-foreground/60 mx-auto mt-5 max-w-2xl text-sm leading-relaxed sm:text-base`,
            )}
          >
            Choose the type of account you want to create. You can join
            Scrapnity as a customer to sell scrap or as a vendor to collect and
            process scrap.
          </p>
        </div>

        {/* Partner choices */}
        <div className={cn(`mt-12 grid w-full max-w-4xl gap-6 md:grid-cols-2`)}>
          {/* Customer */}
          <Link
            to="/become-a-customer"
            className={cn(
              `group hover:border-primary-500/30 hover:bg-primary-500/5 relative overflow-hidden border border-white/50 bg-white/75 p-7 shadow-[0_25px_70px_rgba(25,60,20,0.10)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(64,164,4,0.16)] dark:border-white/10 dark:bg-white/5`,
            )}
          >
            <div
              className={cn(
                `bg-primary-500/10 absolute top-0 right-0 h-32 w-32 rounded-full blur-3xl`,
              )}
            />

            <div className={cn(`relative z-10`)}>
              <div
                className={cn(
                  `border-primary-500/20 bg-primary-500/10 flex h-14 w-14 items-center justify-center border`,
                )}
              >
                <UserRound className={cn(`text-primary-600 h-7 w-7`)} />
              </div>

              <p
                className={cn(
                  `text-primary-600 mt-7 text-xs font-black tracking-[0.18em] uppercase`,
                )}
              >
                For Individuals
              </p>

              <h2 className={cn(`text-foreground mt-2 text-2xl font-black`)}>
                Become a Customer
              </h2>

              <p
                className={cn(
                  `text-foreground/60 mt-4 text-sm leading-relaxed`,
                )}
              >
                Schedule scrap pickups, receive transparent pricing, and track
                your recycling activity from one place.
              </p>

              <div
                className={cn(
                  `text-primary-600 mt-8 flex items-center gap-2 text-sm font-black`,
                )}
              >
                Continue as Customer
                <ArrowRight
                  className={cn(
                    `h-4 w-4 transition-transform duration-300 group-hover:translate-x-1`,
                  )}
                />
              </div>
            </div>
          </Link>

          {/* Vendor */}
          <Link
            to="/become-a-vendor"
            className={cn(
              `group hover:border-secondary-500/30 hover:bg-secondary-500/5 relative overflow-hidden border border-white/50 bg-white/75 p-7 shadow-[0_25px_70px_rgba(25,60,20,0.10)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(126,57,10,0.14)] dark:border-white/10 dark:bg-white/5`,
            )}
          >
            <div
              className={cn(
                `bg-secondary-500/10 absolute top-0 right-0 h-32 w-32 rounded-full blur-3xl`,
              )}
            />

            <div className={cn(`relative z-10`)}>
              <div
                className={cn(
                  `border-secondary-500/20 bg-secondary-500/10 flex h-14 w-14 items-center justify-center border`,
                )}
              >
                <Building2 className={cn(`text-secondary-600 h-7 w-7`)} />
              </div>

              <p
                className={cn(
                  `text-secondary-600 mt-7 text-xs font-black tracking-[0.18em] uppercase`,
                )}
              >
                For Businesses
              </p>

              <h2 className={cn(`text-foreground mt-2 text-2xl font-black`)}>
                Become a Vendor
              </h2>

              <p
                className={cn(
                  `text-foreground/60 mt-4 text-sm leading-relaxed`,
                )}
              >
                Join the Scrapnity network, receive collection requests, manage
                pickups, and grow your recycling business.
              </p>

              <div
                className={cn(
                  `text-secondary-600 mt-8 flex items-center gap-2 text-sm font-black`,
                )}
              >
                Continue as Vendor
                <ArrowRight
                  className={cn(
                    `h-4 w-4 transition-transform duration-300 group-hover:translate-x-1`,
                  )}
                />
              </div>
            </div>
          </Link>
        </div>

        {/* Footer note */}
        <p className={cn(`text-foreground/40 mt-8 text-center text-xs`)}>
          Select an account type to continue your Scrapnity registration.
        </p>
      </div>
    </section>
  );
}
