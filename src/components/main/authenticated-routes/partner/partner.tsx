import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  Leaf,
  Recycle,
  UserRound,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

export function Partner() {
  return (
    <section
      className={cn(
        `from-background via-primary-50 to-accent-50 dark:from-background relative min-h-svh overflow-hidden bg-linear-to-br px-4 py-10 dark:via-zinc-900 dark:to-zinc-800 sm:px-6 lg:px-8`,
      )}
    >
      {/* Background glow */}
      <div
        className={cn(
          `pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,var(--color-primary-300),transparent_40%)] opacity-20`,
        )}
      />

      <div
        className={cn(
          `bg-primary-500/10 pointer-events-none absolute -top-32 left-1/3 h-125 w-125 rounded-full blur-[160px]`,
        )}
      />

      <div
        className={cn(
          `bg-accent-500/10 pointer-events-none absolute right-0 bottom-0 h-100 w-100 rounded-full blur-[140px]`,
        )}
      />

      {/* Grid background */}
      <div
        className={cn(
          `pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-size-[80px_80px]`,
        )}
      />

      <div
        className={cn(
          `relative z-10 mx-auto flex min-h-[calc(100svh-80px)] max-w-6xl flex-col items-center justify-center`,
        )}
      >
        {/* Heading */}
        <div className={cn(`mx-auto max-w-3xl text-center`)}>
          <div
            className={cn(
              `border-primary-500/20 bg-primary-500/10 text-primary-600 mx-auto inline-flex items-center gap-2 border px-4 py-2 text-xs font-black tracking-[0.2em] uppercase backdrop-blur-xl`,
            )}
          >
            <Leaf className={cn(`h-4 w-4`)} />
            Scrapnity Partner
          </div>

          <h1
            className={cn(
              `text-foreground mt-7 text-4xl leading-tight font-black tracking-tight sm:text-5xl lg:text-6xl`,
            )}
          >
            Choose how you want to
            <span
              className={cn(
                `from-primary-600 via-primary-500 to-accent-500 block bg-linear-to-r bg-clip-text text-transparent`,
              )}
            >
              continue with Scrapnity
            </span>
          </h1>

          <p
            className={cn(
              `text-foreground/60 mx-auto mt-6 max-w-2xl text-sm leading-relaxed sm:text-base`,
            )}
          >
            Select your role to continue. Customers can schedule scrap pickups,
            while vendors can manage collection requests and recycling
            operations.
          </p>
        </div>

        {/* Cards */}
        <div
          className={cn(
            `mt-14 grid w-full max-w-5xl gap-6 md:grid-cols-2`,
          )}
        >
          {/* Customer */}
          <Link
            to="/partner/customer"
            className={cn(
              `group relative overflow-hidden border border-white/50 bg-white/70 p-7 shadow-[0_25px_70px_rgba(25,60,20,0.10)] backdrop-blur-2xl transition-all duration-300 hover:border-primary-500/30 hover:bg-primary-500/5 hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(64,164,4,0.18)] dark:border-white/10 dark:bg-white/5`,
            )}
          >
            <div
              className={cn(
                `bg-primary-500/10 absolute top-0 right-0 h-40 w-40 rounded-full blur-3xl transition-transform duration-500 group-hover:scale-125`,
              )}
            />

            <div className={cn(`relative z-10`)}>
              <div
                className={cn(
                  `border-primary-500/20 bg-primary-500/10 flex h-16 w-16 items-center justify-center border transition-all duration-300 group-hover:scale-110`,
                )}
              >
                <UserRound
                  className={cn(`text-primary-600 h-8 w-8`)}
                />
              </div>

              <p
                className={cn(
                  `text-primary-600 mt-7 text-xs font-black tracking-[0.2em] uppercase`,
                )}
              >
                I want to sell scrap
              </p>

              <h2
                className={cn(
                  `text-foreground mt-2 text-2xl font-black sm:text-3xl`,
                )}
              >
                Continue as Customer
              </h2>

              <p
                className={cn(
                  `text-foreground/60 mt-4 text-sm leading-relaxed`,
                )}
              >
                Schedule doorstep pickups, get transparent scrap pricing, and
                track your recycling activity.
              </p>

              <div
                className={cn(
                  `text-primary-600 mt-8 flex items-center gap-2 text-sm font-black`,
                )}
              >
                Go to Customer

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
            to="/partner/vendor"
            className={cn(
              `group relative overflow-hidden border border-white/50 bg-white/70 p-7 shadow-[0_25px_70px_rgba(60,30,10,0.08)] backdrop-blur-2xl transition-all duration-300 hover:border-secondary-500/30 hover:bg-secondary-500/5 hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(126,57,10,0.16)] dark:border-white/10 dark:bg-white/5`,
            )}
          >
            <div
              className={cn(
                `bg-secondary-500/10 absolute top-0 right-0 h-40 w-40 rounded-full blur-3xl transition-transform duration-500 group-hover:scale-125`,
              )}
            />

            <div className={cn(`relative z-10`)}>
              <div
                className={cn(
                  `border-secondary-500/20 bg-secondary-500/10 flex h-16 w-16 items-center justify-center border transition-all duration-300 group-hover:scale-110`,
                )}
              >
                <Building2
                  className={cn(`text-secondary-600 h-8 w-8`)}
                />
              </div>

              <p
                className={cn(
                  `text-secondary-600 mt-7 text-xs font-black tracking-[0.2em] uppercase`,
                )}
              >
                I want to collect scrap
              </p>

              <h2
                className={cn(
                  `text-foreground mt-2 text-2xl font-black sm:text-3xl`,
                )}
              >
                Continue as Vendor
              </h2>

              <p
                className={cn(
                  `text-foreground/60 mt-4 text-sm leading-relaxed`,
                )}
              >
                Receive pickup requests, manage collections, handle scrap
                processing, and grow your recycling business.
              </p>

              <div
                className={cn(
                  `text-secondary-600 mt-8 flex items-center gap-2 text-sm font-black`,
                )}
              >
                Go to Vendor

                <ArrowRight
                  className={cn(
                    `h-4 w-4 transition-transform duration-300 group-hover:translate-x-1`,
                  )}
                />
              </div>
            </div>
          </Link>
        </div>

        {/* Bottom note */}
        <div
          className={cn(
            `text-foreground/45 mt-10 flex items-center gap-2 text-center text-xs`,
          )}
        >
          <Recycle className={cn(`text-primary-500 h-4 w-4`)} />

          Choose the role that best matches how you want to use Scrapnity.
        </div>
      </div>
    </section>
  );
}