import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import type { LinkProps } from "@tanstack/react-router";
import { cn } from "@/lib/utils/cn";
import { ArrowRight, Menu, X } from "lucide-react";
import Logo from "@/components/logo";

const navigation = [
  {
    label: "Home",
    to: "/",
  },
  {
    label: "About",
    to: "/about",
  },
  {
    label: "Services",
    to: "/services",
  },
  {
    label: "Contact",
    to: "/contact",
  },
] satisfies {
  label: string;
  to: LinkProps["to"];
}[];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const pathname = `/${location.pathname.split("/")[1]}`;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className={cn(`fixed top-0 left-0 z-50 w-full`)}>
        {/* Main Navbar */}
        <div
          className={cn(
            `border-b transition-all duration-300 ${
              scrolled
                ? "border-primary-500/10 bg-background/90 backdrop-blur-xl"
                : "bg-background border-transparent"
            } `,
          )}
        >
          <div
            className={cn(
              `mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8`,
            )}
          >
            {/* Logo */}
            <Link to="/" className={cn(`flex items-center gap-3`)}>
              <Logo />
            </Link>

            {/* Desktop Navigation */}
            <nav className={cn(`hidden items-center lg:flex`)}>
              {navigation.map((item) => {
                const active = pathname === item.to;

                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={cn(
                      `relative px-5 py-7 text-[12px] font-bold tracking-[0.18em] uppercase transition-colors duration-300 ${
                        active
                          ? "text-primary-500"
                          : "text-foreground/65 hover:text-foreground"
                      } `,
                    )}
                  >
                    {item.label}

                    {active && (
                      <div
                        className={cn(
                          `bg-primary-500 absolute bottom-0 left-0 h-0.5 w-full`,
                        )}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTA */}
            <div className={cn(`hidden items-center gap-3 lg:flex`)}>
              <Link
                to="/become-a-vendor"
                className={cn(
                  `group bg-primary-500 text-primary-50 flex items-center gap-2 px-5 py-3 text-xs font-black tracking-[0.18em] uppercase transition-all duration-300 hover:-translate-y-0.5`,
                )}
              >
                Become a vendor
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setOpen((prev) => !prev)}
              className={cn(
                `border-primary-500/10 flex h-11 w-11 items-center justify-center border lg:hidden`,
              )}
            >
              {open ? (
                <X className={cn(`h-5 w-5`)} />
              ) : (
                <Menu className={cn(`h-5 w-5`)} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={cn(
          `fixed inset-0 z-40 transition-all duration-300 lg:hidden ${
            open
              ? "visible opacity-100"
              : "pointer-events-none invisible opacity-0"
          } `,
        )}
      >
        <div
          className={cn(`absolute inset-0 bg-black/50 backdrop-blur-sm`)}
          onClick={() => setOpen(false)}
        />

        <div
          className={cn(
            `bg-background absolute top-0 right-0 flex h-full w-full max-w-sm flex-col transition-transform duration-300 ${
              open ? "translate-x-0" : "translate-x-full"
            } `,
          )}
        >
          <div
            className={cn(
              `border-primary-500/10 flex h-18 items-center justify-between border-b px-5`,
            )}
          >
            <h2 className={cn(`text-sm font-black tracking-[0.2em] uppercase`)}>
              Menu
            </h2>

            <button
              onClick={() => setOpen(false)}
              className={cn(
                `border-primary-500/10 flex h-10 w-10 items-center justify-center border`,
              )}
            >
              <X className={cn(`h-4 w-4`)} />
            </button>
          </div>

          <div className={cn(`flex flex-1 flex-col px-5 py-6`)}>
            {navigation.map((item) => {
              const active = pathname === item.to;

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={cn(
                    `border-primary-500/10 flex items-center justify-between border-b py-5 text-sm font-bold tracking-[0.18em] uppercase ${
                      active ? "text-primary-500" : "text-foreground/70"
                    } `,
                  )}
                >
                  {item.label}

                  <ArrowRight className={cn(`h-4 w-4`)} />
                </Link>
              );
            })}

            <div className={cn(`mt-auto space-y-3 pt-8`)}>
              <Link
                to="/become-a-vendor"
                className={cn(
                  `border-primary-500/10 bg-primary-500 text-primary-50 flex items-center justify-center gap-2 border py-3 text-xs font-bold tracking-[0.18em] uppercase`,
                )}
              >
                Become a vendor
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
