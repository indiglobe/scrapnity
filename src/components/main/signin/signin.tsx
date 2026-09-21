import { authClient } from "@/lib/auth/auth-client";
import { ArrowLeft } from "lucide-react";
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
          "relative flex min-h-screen flex-col justify-center px-6 py-12 sm:py-16 md:px-10",
          props.className,
        )}
      >
        {/* Back button */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 md:left-10">
          <button
            onClick={() => window.history.back()}
            className="text-primary-500 hover:text-primary-400 hover:bg-primary-500/10"
          >
            <ArrowLeft className="size-6 sm:size-7" />
          </button>
        </div>

        {/* Glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,var(--color-primary-400),transparent)] opacity-20" />

        {/* Container */}
        <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-12">
          {/* LEFT */}
          <div className="flex flex-col items-center gap-5 text-center sm:gap-6 lg:items-start lg:text-left">
            <h1 className="text-3xl leading-tight font-bold sm:text-4xl lg:text-5xl">
              <span className="text-zinc-800 dark:text-white">Welcome to</span>
              <br />
              <span className="from-primary-500 to-accent-500 bg-linear-to-r bg-clip-text text-transparent">
                Ai Mine Hub
              </span>
            </h1>

            <SigninSubheading className="max-w-md text-sm text-zinc-600 sm:text-base dark:text-zinc-400" />

            <SigninForm className={cn(`lg:hidden`)} />

            {/* Image */}
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md"></div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center justify-center">
            <SigninForm className={cn(`max-lg:hidden`)} />
          </div>
        </div>
      </section>
    </Main>
  );
}

function SigninSubheading({ ...props }: ComponentProps<"p">) {
  return (
    <p {...props} className={cn("leading-relaxed", props.className)}>
      Get access to the resources you need to invest, spend, and put your money
      in motion.
    </p>
  );
}

function SigninFormHeading({ ...props }: ComponentProps<"h2">) {
  const { initiator } = useSearch({
    from: "/(unauthenticated-routes)/sign-in/",
  });

  return <h2 {...props}></h2>;
}

function SigninForm({ className, ...props }: ComponentProps<"div">) {
  const { callbackUrl, redirectUrl, ...restSearchParams } = useSearch({
    from: "/(unauthenticated-routes)/sign-in/",
  });

  /**
   * In OAuth you can send only one search param to the url into the callbackUrl,
   *  so we use a trick to include whole url to be sent to the OAuth process.
   * the trick is -------------
   * use all search params (except the callbackUrl) availabe to create a new
   * search params for the callbackUrl + host
   */
  const callbackUrlWithHost = new URL(callbackUrl ?? "", env.VITE_APP_HOST);

  callbackUrlWithHost.searchParams.set("redirectUrl", redirectUrl ?? "/");

  Object.entries(restSearchParams).forEach(([key, value]) => {
    callbackUrlWithHost.searchParams.set(key, value);
  });

  const fullCallbackUrl = callbackUrlWithHost.toString();

  return (
    <div
      className={cn(
        "flex w-full max-w-sm flex-col items-center gap-5 rounded-2xl border border-zinc-200/60 bg-white/70 p-6 text-center shadow-xl backdrop-blur-xl sm:max-w-md sm:gap-6 sm:p-8 sm:shadow-2xl md:p-10 dark:border-zinc-700/60 dark:bg-zinc-900/70",
        className,
      )}
      {...props}
    >
      <SigninFormHeading />

      <SigninSubheading className="text-sm text-zinc-600 sm:text-base dark:text-zinc-400" />

      {/* Divider */}
      <div className="flex w-full items-center gap-3">
        <div className="h-px flex-1 bg-zinc-300 dark:bg-zinc-700" />
        <span className="text-xs whitespace-nowrap text-zinc-400">
          Continue with
        </span>
        <div className="h-px flex-1 bg-zinc-300 dark:bg-zinc-700" />
      </div>

      {/* button */}
      <div className="w-full">
        <button
          className={cn(`mx-auto`)}
          onClick={async () => {
            await authClient.signIn.social({
              provider: "google",
              callbackURL: fullCallbackUrl,
            });
          }}
        >Google siginin button</button>
      </div>

      <p className="text-xs text-zinc-400">
        Secure sign-in powered by BetterAuth
      </p>
    </div>
  );
}
