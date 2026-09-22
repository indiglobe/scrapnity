import { authClient } from "@/lib/auth/auth-client";
import { ArrowLeft, Leaf } from "lucide-react";
import type { ComponentProps } from "react";
import { useSearch } from "@tanstack/react-router";
import Main from "@/components/main/main";
import { cn } from "@/lib/utils/cn";
import { env } from "@/utils/env";

export function SigninPage({ ...props }: ComponentProps<typeof Main>) {
  return (
    <Main
      className={cn(
        `from-background via-primary-50 to-accent-50 dark:from-background mt-0 bg-linear-to-br dark:via-zinc-900 dark:to-zinc-800`,
      )}
      {...props}
    >
      <section
        className={cn(
          `relative flex min-h-screen flex-col overflow-hidden px-4 py-10 sm:px-6 md:px-10 lg:px-14`,
          props.className,
        )}
      >
        {/* BACK BUTTON */}
        <div
          className={cn(
            `relative z-20 mx-auto flex w-full max-w-7xl items-center`,
          )}
        >
          <button
            type="button"
            onClick={() => window.history.back()}
            className={cn(
              `text-primary-600 hover:bg-primary-500/10 hover:text-primary-500 flex h-10 w-10 items-center justify-center transition-colors`,
            )}
          >
            <ArrowLeft className={cn(`h-7 w-7`)} />
          </button>
        </div>

        {/* BACKGROUND GLOW */}
        <div
          className={cn(
            `pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_48%_30%,var(--color-primary-300),transparent_35%)] opacity-30`,
          )}
        />

        <div
          className={cn(
            `bg-primary-500/10 pointer-events-none absolute -top-32 left-[38%] h-125 w-125 rounded-full blur-[160px]`,
          )}
        />

        <div
          className={cn(
            `bg-accent-500/10 pointer-events-none absolute right-0 bottom-0 h-100 w-100 rounded-full blur-[130px]`,
          )}
        />

        {/* MAIN CONTENT */}
        <div
          className={cn(
            `relative z-10 mx-auto grid w-full max-w-7xl flex-1 items-center gap-12 py-10 lg:grid-cols-[1fr_0.95fr] lg:gap-20`,
          )}
        >
          {/* LEFT */}
          <div
            className={cn(
              `flex flex-col items-center text-center lg:items-start lg:text-left`,
            )}
          >
            <div
              className={cn(
                `border-primary-500/20 bg-primary-500/10 text-primary-600 mb-7 inline-flex items-center gap-2 border px-4 py-2 text-xs font-black tracking-[0.18em] uppercase`,
              )}
            >
              <Leaf className={cn(`h-4 w-4`)} />

              Scrapnity
            </div>

            <h1
              className={cn(
                `text-foreground text-4xl leading-[1.05] font-black tracking-tight sm:text-5xl lg:text-6xl`,
              )}
            >
              Welcome to
              <span
                className={cn(
                  `from-primary-600 via-primary-500 to-accent-500 mt-2 block bg-linear-to-r bg-clip-text text-transparent`,
                )}
              >
                Scrapnity
              </span>
            </h1>

            <SigninSubheading
              className={cn(
                `text-foreground/65 mt-7 max-w-xl text-base sm:text-lg`,
              )}
            />

            {/* MOBILE FORM */}
            <SigninForm className={cn(`mt-10 lg:hidden`)} />
          </div>

          {/* RIGHT */}
          <div className={cn(`hidden items-center justify-end lg:flex`)}>
            <SigninForm />
          </div>
        </div>
      </section>
    </Main>
  );
}

function SigninSubheading({ ...props }: ComponentProps<"p">) {
  return (
    <p
      {...props}
      className={cn(`leading-relaxed`, props.className)}
    >
      Turn your scrap into value with fast pickups, transparent pricing, and
      responsible recycling.
    </p>
  );
}

function SigninFormHeading({
  className,
  ...props
}: ComponentProps<"h2">) {
  const { initiator } = useSearch({
    from: "/(unauthenticated-routes)/sign-in/",
  });

  return (
    <h2
      className={cn(
        `text-foreground text-2xl font-black sm:text-3xl`,
        className,
      )}
      {...props}
    >
      {initiator === "vendor"
        ? "Continue as Vendor"
        : initiator === "seller"
          ? "Continue as Seller"
          : "Sign in to Scrapnity"}
    </h2>
  );
}

function SigninForm({
  className,
  ...props
}: ComponentProps<"div">) {
  const { callbackUrl, redirectUrl, ...restSearchParams } = useSearch({
    from: "/(unauthenticated-routes)/sign-in/",
  });

  /**
   * BetterAuth OAuth callback URL
   */
  const callbackUrlWithHost = new URL(
    callbackUrl ?? "",
    env.VITE_APP_HOST,
  );

  callbackUrlWithHost.searchParams.set(
    "redirectUrl",
    redirectUrl ?? "/",
  );

  Object.entries(restSearchParams).forEach(([key, value]) => {
    callbackUrlWithHost.searchParams.set(
      key,
      String(value),
    );
  });

  const fullCallbackUrl = callbackUrlWithHost.toString();

  return (
    <div
      className={cn(
        `w-full max-w-xl border border-white/50 bg-white/75 p-7 text-center shadow-[0_30px_80px_rgba(25,60,20,0.15)] backdrop-blur-2xl sm:p-10 lg:p-12 dark:border-white/10 dark:bg-zinc-900/70`,
        className,
      )}
      {...props}
    >
      {/* HEADING */}
      <SigninFormHeading />

      <SigninSubheading
        className={cn(
          `text-foreground/60 mx-auto mt-5 max-w-md text-sm sm:text-base`,
        )}
      />

      {/* DIVIDER */}
      <div className={cn(`my-9 flex w-full items-center gap-4`)}>
        <div className={cn(`bg-foreground/10 h-px flex-1`)} />

        <span
          className={cn(
            `text-foreground/40 text-xs whitespace-nowrap`,
          )}
        >
          Continue with
        </span>

        <div className={cn(`bg-foreground/10 h-px flex-1`)} />
      </div>

      {/* GOOGLE BUTTON */}
      <button
        type="button"
        onClick={async () => {
          await authClient.signIn.social({
            provider: "google",
            callbackURL: fullCallbackUrl,
          });
        }}
        className={cn(
          `group hover:border-primary-500/30 hover:bg-primary-500/5 flex w-full items-center justify-center gap-3 border border-black/10 bg-white px-5 py-4 text-sm font-bold text-neutral-800 shadow-sm transition-all duration-300 hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/5 dark:text-foreground`,
        )}
      >
        <GoogleIcon />

        Continue with Google
      </button>

      <p
        className={cn(
          `text-foreground/40 mt-8 text-xs`,
        )}
      >
        Secure sign-in powered by BetterAuth
      </p>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn(`h-5 w-5`)}
      aria-hidden="true"
    >
      <path
        fill="#4285F4"
        d="M21.6 12.23c0-.71-.06-1.39-.18-2.05H12v3.87h5.38a4.6 4.6 0 0 1-2 3.02v2.51h3.24c1.9-1.75 2.98-4.33 2.98-7.35Z"
      />

      <path
        fill="#34A853"
        d="M12 22c2.7 0 4.97-.9 6.63-2.42l-3.24-2.51c-.9.6-2.04.96-3.39.96-2.61 0-4.82-1.76-5.61-4.13H3.05v2.59A10 10 0 0 0 12 22Z"
      />

      <path
        fill="#FBBC05"
        d="M6.39 13.9A6 6 0 0 1 6.08 12c0-.66.11-1.3.31-1.9V7.51H3.05A10 10 0 0 0 2 12c0 1.61.39 3.13 1.05 4.49l3.34-2.59Z"
      />

      <path
        fill="#EA4335"
        d="M12 5.97c1.47 0 2.79.51 3.83 1.5l2.87-2.88C16.96 2.97 14.7 2 12 2a10 10 0 0 0-8.95 5.51l3.34 2.59C7.18 7.73 9.39 5.97 12 5.97Z"
      />
    </svg>
  );
}