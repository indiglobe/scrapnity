import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import type { LinkProps } from "@tanstack/react-router";
import { cn } from "@/lib/utils/cn";
import { ArrowRight, Github, Mail, Phone } from "lucide-react";
import type { ComponentProps } from "react";
import Logo from "@/components/logo";
import {
  PLATFORM_EMAIL,
  PLATFORM_PHONE_NO,
  SOURCE_CODE_LINK,
} from "@/database/const";
import { authClient } from "@/lib/auth/auth-client";
import type { FileRoutesByFullPath, FileRoutesByTo } from "@/routeTree.gen";

const navigation = [
  {
    label: "Home",
    to: "/",
  },
  {
    label: "Services",
    to: "/services",
  },
  {
    label: "About",
    to: "/about",
  },
  {
    label: "Contact",
    to: "/contact",
  },
] satisfies {
  label: string;
  to: LinkProps["to"];
}[];

const scrapTypes = [
  "Iron Scrap",
  "Copper Scrap",
  "Aluminium Scrap",
  "Plastic Waste",
  "Paper Waste",
  "E-Waste",
];

export function Footer({ className, ...props }: ComponentProps<"footer">) {
  return (
    <footer
      className={cn(`border-primary-500/10 bg-background border-t`, className)}
      {...props}
    >
      <div className={cn(`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`)}>
        {/* CTA */}
        <div className={cn(`border-primary-500/10 border-b py-16`)}>
          <div
            className={cn(
              `flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between`,
            )}
          >
            <div>
              <p
                className={cn(
                  `text-primary-500 text-xs font-bold tracking-[0.18em] uppercase`,
                )}
              >
                Scrap Collection Service
              </p>

              <h2
                className={cn(`mt-3 max-w-2xl text-3xl font-black sm:text-5xl`)}
              >
                Ready To Turn Scrap Into Value?
              </h2>

              <p className={cn(`text-foreground/60 mt-4 max-w-xl text-sm`)}>
                Schedule a pickup and let Scrapnity handle the collection,
                sorting and recycling responsibly.
              </p>
            </div>

            <Link
              to="/contact"
              className={cn(
                `group bg-primary-500 text-primary-50 inline-flex items-center justify-center gap-3 px-7 py-4 text-sm font-black tracking-[0.15em] uppercase transition-all duration-300 hover:-translate-y-0.5`,
              )}
            >
              Schedule Pickup
              <ArrowRight
                className={cn(
                  `h-4 w-4 transition-transform duration-300 group-hover:translate-x-1`,
                )}
              />
            </Link>
          </div>
        </div>

        {/* Main Footer */}
        <div
          className={cn(
            `grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.8fr_1fr]`,
          )}
        >
          {/* Brand */}
          <div>
            <Link to="/" className={cn(`inline-flex items-center gap-3`)}>
              <Logo />
            </Link>

            <p
              className={cn(
                `text-foreground/60 mt-6 max-w-md text-sm leading-relaxed`,
              )}
            >
              Scrapnity helps households, businesses and industries recycle
              scrap responsibly through transparent pricing, fast pickups and
              eco-friendly processing.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3
              className={cn(`text-sm font-black tracking-[0.15em] uppercase`)}
            >
              Navigation
            </h3>

            <div className={cn(`mt-6 flex flex-col gap-3`)}>
              {navigation.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    `text-foreground/60 hover:text-primary-500 text-sm transition-colors`,
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Scrap Types */}
          <div>
            <h3
              className={cn(`text-sm font-black tracking-[0.15em] uppercase`)}
            >
              Scrap Types
            </h3>

            <div className={cn(`mt-6 flex flex-col gap-3`)}>
              {scrapTypes.map((item) => (
                <p key={item} className={cn(`text-foreground/60 text-sm`)}>
                  {item}
                </p>
              ))}
            </div>
          </div>

          {/* Contact */}

          <div>
            <Accounts className={cn(``, className)} />

            <div>
              <h3
                className={cn(`text-sm font-black tracking-[0.15em] uppercase`)}
              >
                Contact
              </h3>

              <div className={cn(`mt-6 space-y-5`)}>
                <a
                  href={`tel:+91${PLATFORM_PHONE_NO}`}
                  className={cn(`flex items-start gap-3`)}
                >
                  <Phone className={cn(`text-primary-500 mt-0.5 h-4 w-4`)} />

                  <span className={cn(`text-foreground/70 text-sm`)}>
                    +91 {PLATFORM_PHONE_NO}
                  </span>
                </a>

                <a
                  href={`mailto:${PLATFORM_EMAIL}`}
                  className={cn(`flex items-start gap-3`)}
                >
                  <Mail className={cn(`text-primary-500 mt-0.5 h-4 w-4`)} />

                  <span className={cn(`text-foreground/70 text-sm`)}>
                    {PLATFORM_EMAIL}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          className={cn(
            `border-primary-500/10 flex flex-col gap-3 border-t py-6 text-center sm:flex-row sm:justify-between sm:text-left`,
          )}
        >
          <div>
            <p className={cn(`text-foreground/50 text-sm`)}>
              © {new Date().getFullYear()} Scrapnity. All rights reserved.
            </p>
          </div>

          <div>
            <p className={cn(`text-foreground/50 text-sm`)}>
              <a href={SOURCE_CODE_LINK}>
                <Github className={cn(`inline-block size-4`)} />
              </a>{" "}
              Developed by{" "}
              <a href="https://indiglobe.in" className={cn(`underline`)}>
                Indiglobe
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Accounts({ className, ...props }: ComponentProps<"div">) {
  const { data, isPending } = authClient.useSession();
  const selected = useRouterState({
    select: (state) => state.location,
  });
  const navigate = useNavigate();

  async function signout() {
    const PUBLIC_ROUTES = [
      "/",
      "/about",
      "/about/",
      "/contact",
      "/contact/",
      "/services",
      "/services/",
    ] satisfies (keyof FileRoutesByTo | keyof FileRoutesByFullPath)[];

    if (PUBLIC_ROUTES.includes(selected.pathname as any)) {
      await authClient.signOut();
      return;
    }
    await authClient.signOut();
    navigate({ to: "/" });
    return;
  }

  return (
    <div className={cn(`mb-10`, className)} {...props}>
      <h3 className={cn(`text-sm font-black tracking-[0.15em] uppercase`)}>
        Accounts
      </h3>

      <div
        className={cn(
          `text-foreground/60 mt-6 flex flex-col items-start gap-3 text-sm`,
        )}
      >
        {!isPending && (
          <>
            {data ? (
              <>
                <button onClick={signout}>Logout</button>
              </>
            ) : (
              <>
                <Link to={"/partner"}>Partner</Link>
              </>
            )}
          </>
        )}

        {isPending && <span>Loading...</span>}
      </div>
    </div>
  );
}
