import type { ComponentProps } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils/cn";
import {
  ArrowRight,
  Globe,
  Leaf,
  Recycle,
  ShieldCheck,
  Truck,
  Users,
} from "lucide-react";

export function AboutHero(props: ComponentProps<"section">) {
  return (
    <section
      className={cn(`relative overflow-hidden py-24 lg:py-32`)}
      {...props}
    >
      <div
        className={cn(
          `bg-primary-500/10 absolute top-0 left-0 h-96 w-96 rounded-full blur-[140px]`,
        )}
      />

      <div
        className={cn(
          `bg-secondary-500/10 absolute right-0 bottom-0 h-96 w-96 rounded-full blur-[140px]`,
        )}
      />

      <div className={cn(`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`)}>
        <div className={cn(`mx-auto max-w-4xl text-center`)}>
          <p
            className={cn(
              `text-primary-500 text-xs font-black tracking-[0.25em] uppercase`,
            )}
          >
            About Scrapnity
          </p>

          <h1
            className={cn(
              `mt-5 text-4xl leading-tight font-black sm:text-6xl lg:text-7xl`,
            )}
          >
            Building A Smarter
            <span className={cn(`text-primary-500`)}> Recycling Ecosystem</span>
          </h1>

          <p
            className={cn(
              `text-foreground/65 mx-auto mt-8 max-w-3xl text-base leading-relaxed sm:text-lg`,
            )}
          >
            Scrapnity is committed to making scrap collection, waste management
            and recycling more accessible, transparent and environmentally
            responsible for households, businesses and industries.
          </p>
        </div>
      </div>
    </section>
  );
}

export function WhoWeAre(props: ComponentProps<"section">) {
  return (
    <section className={cn(`py-24`)} {...props}>
      <div className={cn(`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`)}>
        <div className={cn(`grid gap-12 lg:grid-cols-2 lg:items-center`)}>
          <div>
            <p
              className={cn(
                `text-primary-500 text-xs font-black tracking-[0.25em] uppercase`,
              )}
            >
              Who We Are
            </p>

            <h2 className={cn(`mt-4 text-3xl font-black sm:text-5xl`)}>
              Turning Waste Into Opportunity.
            </h2>

            <p className={cn(`text-foreground/65 mt-6 leading-relaxed`)}>
              Scrapnity was created with a simple vision: make recycling easier
              while ensuring valuable materials return to the circular economy
              instead of ending up in landfills.
            </p>

            <p className={cn(`text-foreground/65 mt-5 leading-relaxed`)}>
              We connect households, commercial establishments and industries
              with efficient scrap collection services, transparent pricing and
              responsible recycling processes.
            </p>
          </div>

          <div className={cn(`grid gap-4 sm:grid-cols-2`)}>
            {[
              {
                icon: Recycle,
                title: "Responsible Recycling",
              },
              {
                icon: Truck,
                title: "Fast Collection",
              },
              {
                icon: ShieldCheck,
                title: "Transparent Pricing",
              },
              {
                icon: Globe,
                title: "Environmental Impact",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className={cn(
                    `border-primary-500/10 bg-primary-500/5 border p-6`,
                  )}
                >
                  <div
                    className={cn(
                      `bg-primary-500/10 flex h-12 w-12 items-center justify-center`,
                    )}
                  >
                    <Icon className={cn(`text-primary-500 h-5 w-5`)} />
                  </div>

                  <h3 className={cn(`mt-5 text-lg font-black`)}>
                    {item.title}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export function OurMission(props: ComponentProps<"section">) {
  return (
    <section className={cn(`bg-primary-500/5 py-24`)} {...props}>
      <div className={cn(`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`)}>
        <div className={cn(`grid gap-10 lg:grid-cols-3`)}>
          <div>
            <p
              className={cn(
                `text-primary-500 text-xs font-black tracking-[0.25em] uppercase`,
              )}
            >
              Our Mission
            </p>

            <h2 className={cn(`mt-4 text-3xl font-black`)}>
              Driving Sustainable Growth Through Recycling.
            </h2>
          </div>

          <div className={cn(`lg:col-span-2`)}>
            <p className={cn(`text-foreground/65 leading-relaxed`)}>
              Our mission is to create a cleaner future by simplifying scrap
              collection and ensuring recyclable materials are processed
              efficiently. We believe recycling should be convenient, rewarding
              and beneficial for both people and the environment.
            </p>

            <div className={cn(`mt-10 grid gap-4 sm:grid-cols-3`)}>
              {[
                {
                  title: "Reduce Waste",
                  icon: Leaf,
                },
                {
                  title: "Support Circular Economy",
                  icon: Recycle,
                },
                {
                  title: "Protect Resources",
                  icon: Globe,
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className={cn(
                      `bg-background border-primary-500/10 border p-5`,
                    )}
                  >
                    <Icon className={cn(`text-primary-500 h-5 w-5`)} />

                    <h3 className={cn(`mt-4 text-sm font-black`)}>
                      {item.title}
                    </h3>
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

export function WhyChooseUs(props: ComponentProps<"section">) {
  return (
    <section className={cn(`py-24`)} {...props}>
      <div className={cn(`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`)}>
        <div className={cn(`text-center`)}>
          <p
            className={cn(
              `text-primary-500 text-xs font-black tracking-[0.25em] uppercase`,
            )}
          >
            Why Scrapnity
          </p>

          <h2 className={cn(`mt-4 text-3xl font-black sm:text-5xl`)}>
            What Makes Us Different
          </h2>
        </div>

        <div className={cn(`mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4`)}>
          {[
            "Quick Pickup Scheduling",
            "Fair & Transparent Rates",
            "Eco-Friendly Processing",
            "Trusted Service Network",
          ].map((item) => (
            <div
              key={item}
              className={cn(
                `border-primary-500/10 hover:border-primary-500/30 hover:bg-primary-500/5 border p-7 transition-all duration-300`,
              )}
            >
              <h3 className={cn(`text-lg font-black`)}>{item}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function StatsSection(props: ComponentProps<"section">) {
  return (
    <section className={cn(`border-primary-500/10 border-y py-24`)} {...props}>
      <div className={cn(`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`)}>
        <div className={cn(`grid gap-6 sm:grid-cols-2 lg:grid-cols-4`)}>
          {[
            {
              value: "10K+",
              label: "Pickups Completed",
            },
            {
              value: "500+",
              label: "Business Clients",
            },
            {
              value: "50K+",
              label: "Tons Recycled",
            },
            {
              value: "100%",
              label: "Eco-Friendly Process",
            },
          ].map((item) => (
            <div key={item.label} className={cn(`text-center`)}>
              <h3 className={cn(`text-primary-500 text-5xl font-black`)}>
                {item.value}
              </h3>

              <p className={cn(`text-foreground/60 mt-3 text-sm`)}>
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCTA(props: ComponentProps<"section">) {
  return (
    <section className={cn(`py-24`)} {...props}>
      <div className={cn(`mx-auto max-w-4xl px-4 text-center sm:px-6`)}>
        <Users className={cn(`text-primary-500 mx-auto h-10 w-10`)} />

        <h2 className={cn(`mt-6 text-3xl font-black sm:text-5xl`)}>
          Join The Movement Towards Responsible Recycling.
        </h2>

        <p className={cn(`text-foreground/65 mt-5 text-base`)}>
          Whether you're a household, business or industrial facility, Scrapnity
          is ready to help manage your recyclable materials responsibly.
        </p>

        <div
          className={cn(
            `mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center`,
          )}
        >
          <Link
            to="/contact"
            className={cn(
              `group bg-primary-500 text-primary-50 inline-flex items-center justify-center gap-3 px-8 py-4 font-black transition-all duration-300 hover:-translate-y-1`,
            )}
          >
            Contact Us
            <ArrowRight
              className={cn(
                `h-4 w-4 transition-transform duration-300 group-hover:translate-x-1`,
              )}
            />
          </Link>

          <Link
            to="/services"
            className={cn(
              `border-primary-500/20 hover:bg-primary-500/10 border px-8 py-4 font-black transition-all duration-300`,
            )}
          >
            Explore Services
          </Link>
        </div>
      </div>
    </section>
  );
}
