import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils/cn";
import {
  ArrowRight,
  Leaf,
  Recycle,
  ShieldCheck,
  Truck,
  Zap,
  Cpu,
  FileText,
  Package,
} from "lucide-react";
import type { ComponentProps } from "react";
import { heroStat, scrapCollectionStat } from "@/data/statistics";

export function Hero({ className, ...props }: ComponentProps<"section">) {
  return (
    <section
      className={cn(
        `relative overflow-hidden border-b border-white/10`,
        className,
      )}
      {...props}
    >
      {/* Background */}
      <div className={cn(`bg-background absolute inset-0`)} />

      <div
        className={cn(
          `absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[90px_90px]`,
        )}
      />

      <div
        className={cn(
          `bg-primary-500/10 absolute -top-40 left-1/2 h-125 w-125 -translate-x-1/2 rounded-full blur-[140px]`,
        )}
      />

      <div
        className={cn(
          `bg-secondary-500/10 absolute right-0 bottom-0 h-75 w-75 rounded-full blur-[120px]`,
        )}
      />

      <div
        className={cn(
          `relative mx-auto grid min-h-svh max-w-7xl items-center gap-14 px-4 pt-32 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8`,
        )}
      >
        {/* Left */}
        <div>
          <div
            className={cn(
              `border-primary-500/20 bg-primary-500/10 text-primary-500 inline-flex items-center gap-2 border px-4 py-2 text-xs font-bold tracking-[0.2em] uppercase backdrop-blur-xl`,
            )}
          >
            <Leaf className="h-4 w-4" />
            Eco Smart Scrap Collection
          </div>

          <h1
            className={cn(
              `text-foreground mt-7 max-w-3xl text-4xl leading-[0.95] font-black tracking-tight sm:text-5xl lg:text-7xl`,
            )}
          >
            Turn Your Scrap Into{" "}
            <span className={cn(`text-primary-400`)}>Value</span> With Modern
            Recycling.
          </h1>

          <p
            className={cn(
              `text-foreground/65 mt-7 max-w-2xl text-base leading-relaxed sm:text-lg`,
            )}
          >
            Scrapnity helps households, offices, and industries recycle scrap
            responsibly with instant pickups, transparent pricing, and verified
            eco-processing.
          </p>

          <div className={cn(`mt-10 flex flex-col gap-4 sm:flex-row`)}>
            <Link
              to="/contact"
              className={cn(
                `group border-primary-500/30 bg-primary-500 text-primary-50 inline-flex items-center justify-center gap-3 border px-7 py-4 text-sm font-black tracking-[0.15em] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_45px_rgba(120,255,130,0.35)]`,
              )}
            >
              Schedule Pickup
              <ArrowRight
                className={cn(
                  `h-4 w-4 transition-transform duration-300 group-hover:translate-x-1`,
                )}
              />
            </Link>

            <Link
              to="/services"
              className={cn(
                `text-foreground hover:border-primary-500/20 hover:bg-primary-500/10 hover:text-primary-500 border-primary-500 inline-flex items-center justify-center border bg-white/3 px-7 py-4 text-sm font-bold tracking-[0.15em] uppercase backdrop-blur-xl transition-all duration-300`,
              )}
            >
              Explore Services
            </Link>
          </div>

          <div className={cn(`mt-12 grid gap-4 sm:grid-cols-3`)}>
            {heroStat.map((item) => (
              <div
                key={item.label}
                className={cn(
                  `border border-white/10 bg-white/3 p-5 backdrop-blur-xl`,
                )}
              >
                <p className={cn(`text-primary-500 text-2xl font-black`)}>
                  {item.value}
                </p>

                <p
                  className={cn(
                    `text-foreground/50 mt-2 text-xs tracking-[0.15em] uppercase`,
                  )}
                >
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div className={cn(`relative`)}>
          <div
            className={cn(
              `border-primary-500/20 bg-primary-500/10 absolute -top-6 -right-6 hidden h-32 w-32 border blur-2xl lg:block`,
            )}
          />

          <div
            className={cn(
              `relative overflow-hidden border border-white/10 bg-white/3 backdrop-blur-2xl`,
            )}
          >
            <div className={cn(`border-b border-white/10 p-6`)}>
              <div className={cn(`flex items-center justify-between`)}>
                <div>
                  <p
                    className={cn(
                      `text-primary-500 text-xs font-bold tracking-[0.2em] uppercase`,
                    )}
                  >
                    Live Recycling Network
                  </p>

                  <h3 className={cn(`mt-3 text-2xl font-black`)}>
                    Smart Scrap Collection
                  </h3>
                </div>

                <div
                  className={cn(
                    `border-primary-500/20 bg-primary-500/10 flex h-14 w-14 items-center justify-center border`,
                  )}
                >
                  <Truck className={cn(`text-primary-400 h-7 w-7`)} />
                </div>
              </div>
            </div>

            <div className={cn(`grid gap-4 p-6 sm:grid-cols-2`)}>
              {scrapCollectionStat.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className={cn(
                      `bg-background/40 hover:border-primary-500/20 hover:bg-primary-500/10 border border-white/10 p-5 transition-all duration-300`,
                    )}
                  >
                    <div
                      className={cn(
                        `border-primary-500/20 bg-primary-500/10 flex h-11 w-11 items-center justify-center border`,
                      )}
                    >
                      <Icon className={cn(`text-primary-300 h-5 w-5`)} />
                    </div>

                    <h4
                      className={cn(
                        `mt-5 text-sm font-black tracking-[0.12em] uppercase`,
                      )}
                    >
                      {item.title}
                    </h4>

                    <p
                      className={cn(
                        `text-foreground/60 mt-2 text-sm leading-relaxed`,
                      )}
                    >
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ServicesWeOffer({
  className,
  ...props
}: ComponentProps<"section">) {
  const services = [
    {
      title: "Home Scrap Pickup",
      desc: "Easy doorstep scrap collection for households.",
    },
    {
      title: "Office Clearance",
      desc: "Furniture, electronics & office waste handling.",
    },
    {
      title: "Industrial Scrap",
      desc: "Large-scale scrap collection & logistics.",
    },
    {
      title: "E-Waste Recycling",
      desc: "Responsible disposal of electronic waste.",
    },
  ];

  return (
    <section className={cn(`relative py-28`, className)} {...props}>
      <div className={cn(`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`)}>
        <div
          className={cn(
            `flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end`,
          )}
        >
          <div>
            <p
              className={cn(
                `text-primary-400 text-xs font-bold tracking-[0.25em] uppercase`,
              )}
            >
              What We Offer
            </p>

            <h2
              className={cn(`mt-4 max-w-2xl text-3xl font-black sm:text-5xl`)}
            >
              Modern Scrap Collection Services.
            </h2>
          </div>

          <p
            className={cn(
              `text-foreground/60 max-w-xl text-sm leading-relaxed sm:text-base`,
            )}
          >
            Built for households, offices, warehouses, and industries with fast
            pickup and verified recycling operations.
          </p>
        </div>

        <div className={cn(`mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4`)}>
          {services.map((item, index) => (
            <div
              key={item.title}
              className={cn(
                `group hover:border-primary-500/20 hover:bg-primary-500/10 relative overflow-hidden border border-white/10 bg-white/3 p-7 transition-all duration-300`,
              )}
            >
              <div
                className={cn(
                  `absolute top-5 right-5 text-5xl font-black text-white/5`,
                )}
              >
                0{index + 1}
              </div>

              <div className={cn(`relative z-10`)}>
                <h3 className={cn(`text-lg font-black`)}>{item.title}</h3>

                <p
                  className={cn(
                    `text-foreground/60 mt-4 text-sm leading-relaxed`,
                  )}
                >
                  {item.desc}
                </p>

                <div
                  className={cn(
                    `text-primary-500 mt-8 flex items-center gap-2 text-sm font-bold`,
                  )}
                >
                  <Link to="/services" className={cn(`flex gap-2`)}>
                    Learn More
                    <ArrowRight className={cn(`h-4 w-4`)} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ScrapTypes({ className, ...props }: ComponentProps<"section">) {
  const scrapTypes = [
    {
      title: "Metal Scrap",
      description:
        "Iron, steel and heavy metal waste collected from homes and industries.",
      icon: Recycle,
    },
    {
      title: "Copper",
      icon: Zap,
    },
    {
      title: "Aluminium",
      icon: Package,
    },
    {
      title: "Plastic",
      icon: ShieldCheck,
    },
    {
      title: "Paper",
      icon: FileText,
    },
    {
      title: "E-Waste",
      icon: Cpu,
    },
  ];

  return (
    <section className={cn(`py-24`, className)} {...props}>
      <div className={cn(`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`)}>
        <div className={cn(`mx-auto max-w-3xl text-center`)}>
          <p
            className={cn(
              `text-primary-500 text-xs font-black tracking-[0.25em] uppercase`,
            )}
          >
            Materials Accepted
          </p>

          <h2 className={cn(`mt-4 text-4xl font-black sm:text-5xl`)}>
            We Buy & Recycle
            <span className={cn(`text-primary-500`)}>
              {" "}
              Every Major Scrap Category
            </span>
          </h2>

          <p
            className={cn(
              `text-foreground/60 mt-5 text-sm leading-relaxed sm:text-base`,
            )}
          >
            From household waste to industrial scrap, we ensure every material
            is processed through responsible recycling channels.
          </p>
        </div>

        <div className={cn(`mt-16 grid gap-4 lg:grid-cols-4`)}>
          {/* Featured Card */}
          <div
            className={cn(
              `border-primary-500/20 bg-primary-500/8 relative overflow-hidden border p-8 lg:col-span-2 lg:row-span-2`,
            )}
          >
            <div
              className={cn(
                `bg-primary-500/10 absolute top-0 right-0 h-48 w-48 rounded-full blur-3xl`,
              )}
            />

            <div className={cn(`relative z-10`)}>
              <div
                className={cn(
                  `border-primary-500/20 bg-primary-500/10 flex h-16 w-16 items-center justify-center border`,
                )}
              >
                <Recycle className={cn(`text-primary-500 h-8 w-8`)} />
              </div>

              <h3 className={cn(`mt-8 text-3xl font-black`)}>Metal Scrap</h3>

              <p
                className={cn(
                  `text-foreground/60 mt-4 max-w-md leading-relaxed`,
                )}
              >
                Iron, steel, fabrication waste, industrial metal leftovers and
                construction scrap collected at competitive market rates.
              </p>

              <div
                className={cn(
                  `border-primary-500/20 bg-background mt-10 inline-flex items-center gap-2 border px-4 py-2 text-sm font-bold`,
                )}
              >
                Most Collected Category
              </div>
            </div>
          </div>

          {scrapTypes.slice(1).map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className={cn(
                  `group bg-background hover:border-primary-500/20 hover:bg-primary-500/5 border border-white/10 p-6 transition-all duration-300`,
                )}
              >
                <div
                  className={cn(
                    `border-primary-500/15 bg-primary-500/10 flex h-12 w-12 items-center justify-center border transition-transform duration-300 group-hover:scale-110`,
                  )}
                >
                  <Icon className={cn(`text-primary-500 h-5 w-5`)} />
                </div>

                <h3 className={cn(`mt-5 text-lg font-black`)}>{item.title}</h3>

                <div
                  className={cn(
                    `bg-primary-500 mt-4 h-0.5 w-10 transition-all duration-300 group-hover:w-16`,
                  )}
                />
              </div>
            );
          })}
        </div>

        <div
          className={cn(
            `mt-10 flex flex-wrap items-center justify-center gap-3`,
          )}
        >
          <div
            className={cn(
              `border-primary-500 bg-primary-500 text-primary-50 border px-4 py-2 text-xs font-bold tracking-[0.15em] uppercase`,
            )}
          >
            Fair Pricing
          </div>

          <div
            className={cn(
              `border-primary-500 bg-primary-500 text-primary-50 border px-4 py-2 text-xs font-bold tracking-[0.15em] uppercase`,
            )}
          >
            Verified Recycling
          </div>

          <div
            className={cn(
              `border-primary-500 bg-primary-500 text-primary-50 border px-4 py-2 text-xs font-bold tracking-[0.15em] uppercase`,
            )}
          >
            Fast Pickup
          </div>

          <div
            className={cn(
              `border-primary-500 bg-primary-500 text-primary-50 border px-4 py-2 text-xs font-bold tracking-[0.15em] uppercase`,
            )}
          >
            Eco Friendly
          </div>
        </div>
      </div>
    </section>
  );
}

export function FinalCTA({ className, ...props }: ComponentProps<"section">) {
  return (
    <section
      className={cn(`relative overflow-hidden py-28`, className)}
      {...props}
    >
      <div
        className={cn(
          `absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(110,255,120,0.12),transparent_50%)]`,
        )}
      />

      <div className={cn(`relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8`)}>
        <div
          className={cn(
            `overflow-hidden border border-white/10 bg-white/3 p-10 text-center backdrop-blur-2xl sm:p-16`,
          )}
        >
          <p
            className={cn(
              `text-primary-300 text-xs font-bold tracking-[0.25em] uppercase`,
            )}
          >
            Start Recycling Today
          </p>

          <h2
            className={cn(
              `mx-auto mt-5 max-w-3xl text-3xl font-black sm:text-5xl`,
            )}
          >
            Have Scrap? We’ll Collect It Responsibly.
          </h2>

          <p
            className={cn(
              `text-foreground/60 mx-auto mt-6 max-w-2xl text-sm leading-relaxed sm:text-base`,
            )}
          >
            Fast pickup, transparent pricing, and verified eco-friendly
            recycling for homes and businesses.
          </p>

          <div
            className={cn(
              `mt-10 flex flex-col justify-center gap-4 sm:flex-row`,
            )}
          >
            <Link
              to="/contact"
              className={cn(
                `group border-primary-500/30 bg-primary-500 text-primary-50 inline-flex items-center justify-center gap-3 border px-7 py-4 text-sm font-black tracking-[0.15em] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_45px_rgba(120,255,130,0.35)]`,
              )}
            >
              Schedule Pickup
              <ArrowRight
                className={cn(
                  `h-4 w-4 transition-transform duration-300 group-hover:translate-x-1`,
                )}
              />
            </Link>

            <Link
              to="/services"
              className={cn(
                `text-foreground hover:border-primary-500/20 hover:bg-primary-500/10 hover:text-primary-500 border-primary-500 inline-flex items-center justify-center border bg-white/3 px-7 py-4 text-sm font-bold tracking-[0.15em] uppercase transition-all duration-300`,
              )}
            >
              Explore Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
