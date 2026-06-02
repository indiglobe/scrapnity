import { Link } from "@tanstack/react-router";
import { ArrowLeft, Home, Recycle, Search } from "lucide-react";

import { cn } from "@/lib/utils/cn";
import { Button } from "@/ui/button";

export function NotFound() {
  return (
    <section
      className={cn(
        `relative overflow-hidden border-y border-white/10 py-24 lg:py-32`,
      )}
    >
      {/* Background Grid */}
      <div
        className={cn(
          `absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[80px_80px]`,
        )}
      />

      {/* Glow */}
      <div
        className={cn(
          `bg-primary-500/10 absolute top-1/2 left-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 blur-[180px]`,
        )}
      />

      <div className={cn(`relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`)}>
        <div className={cn(`mx-auto max-w-4xl border border-white/10`)}>
          {/* Header */}
          <div className={cn(`border-b border-white/10 p-8 sm:p-12`)}>
            <div
              className={cn(
                `flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between`,
              )}
            >
              <div>
                <p
                  className={cn(
                    `text-primary-500 text-xs font-black tracking-[0.25em] uppercase`,
                  )}
                >
                  Error 404
                </p>

                <h1
                  className={cn(
                    `mt-4 text-6xl font-black tracking-tight sm:text-8xl`,
                  )}
                >
                  PAGE
                  <br />
                  NOT FOUND
                </h1>
              </div>

              <div
                className={cn(
                  `border-primary-500/20 bg-primary-500/10 flex h-24 w-24 items-center justify-center border sm:h-32 sm:w-32`,
                )}
              >
                <Search
                  className={cn(`text-primary-500 h-12 w-12 sm:h-16 sm:w-16`)}
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div
            className={cn(
              `grid border-b border-white/10 lg:grid-cols-[1fr_320px]`,
            )}
          >
            <div className={cn(`p-8 sm:p-12`)}>
              <p
                className={cn(
                  `text-foreground/70 max-w-2xl text-base leading-relaxed`,
                )}
              >
                The page you're looking for doesn't exist, may have been moved,
                or the URL might be incorrect. Continue exploring Scrapnity's
                recycling and scrap collection services.
              </p>

              <div className={cn(`mt-10 flex flex-col gap-4 sm:flex-row`)}>
                <Button
                  asChild
                  className={cn(
                    `bg-primary-500 text-primary-950 hover:bg-primary-400 border-primary-500 h-14 rounded-none border px-8 font-black tracking-[0.15em] uppercase`,
                  )}
                >
                  <Link to="/">
                    <Home className={cn(`mr-2 h-4 w-4`)} />
                    Back Home
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className={cn(
                    `hover:border-primary-500/40 hover:bg-primary-500/10 h-14 rounded-none border-white/10 px-8 font-black tracking-[0.15em] uppercase`,
                  )}
                >
                  <Link to="/services">Explore Services</Link>
                </Button>
              </div>
            </div>

            <div
              className={cn(
                `border-t border-white/10 lg:border-t-0 lg:border-l lg:border-white/10`,
              )}
            >
              <div
                className={cn(`flex h-full flex-col divide-y divide-white/10`)}
              >
                <div className={cn(`flex items-center gap-4 p-6`)}>
                  <Recycle
                    className={cn(`text-primary-500 h-5 w-5 shrink-0`)}
                  />

                  <div>
                    <p
                      className={cn(
                        `text-foreground/40 text-[11px] font-black tracking-[0.18em] uppercase`,
                      )}
                    >
                      Main Route
                    </p>

                    <p className={cn(`mt-1 text-sm`)}>/</p>
                  </div>
                </div>

                <div className={cn(`flex items-center gap-4 p-6`)}>
                  <Recycle
                    className={cn(`text-primary-500 h-5 w-5 shrink-0`)}
                  />

                  <div>
                    <p
                      className={cn(
                        `text-foreground/40 text-[11px] font-black tracking-[0.18em] uppercase`,
                      )}
                    >
                      Services
                    </p>

                    <p className={cn(`mt-1 text-sm`)}>/services</p>
                  </div>
                </div>

                <div className={cn(`flex items-center gap-4 p-6`)}>
                  <Recycle
                    className={cn(`text-primary-500 h-5 w-5 shrink-0`)}
                  />

                  <div>
                    <p
                      className={cn(
                        `text-foreground/40 text-[11px] font-black tracking-[0.18em] uppercase`,
                      )}
                    >
                      About
                    </p>

                    <p className={cn(`mt-1 text-sm`)}>/about</p>
                  </div>
                </div>

                <div className={cn(`flex items-center gap-4 p-6`)}>
                  <Recycle
                    className={cn(`text-primary-500 h-5 w-5 shrink-0`)}
                  />

                  <div>
                    <p
                      className={cn(
                        `text-foreground/40 text-[11px] font-black tracking-[0.18em] uppercase`,
                      )}
                    >
                      Contact
                    </p>

                    <p className={cn(`mt-1 text-sm`)}>/contact</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            className={cn(
              `flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between`,
            )}
          >
            <p className={cn(`text-foreground/50 text-sm`)}>
              The requested resource could not be located.
            </p>

            <Link
              to="/"
              className={cn(
                `text-primary-500 inline-flex items-center gap-2 text-sm font-black tracking-[0.15em] uppercase`,
              )}
            >
              <ArrowLeft className={cn(`h-4 w-4`)} />
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
