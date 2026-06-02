import type { ComponentProps } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils/cn";
import {
  AirVent,
  ArrowRight,
  Building2,
  Factory,
  Laptop,
  Refrigerator,
  School,
  Store,
  UtensilsCrossed,
  Warehouse,
} from "lucide-react";

type Service = {
  icon: React.ElementType;
  title: string;
  description: string;
  items: string[];
};

const services: Service[] = [
  {
    icon: AirVent,
    title: "Air Conditioner Scrap",
    description:
      "Professional pickup and purchase of residential and commercial air conditioning systems.",
    items: ["Split AC", "Window AC", "Cassette AC", "VRV / VRF Systems"],
  },
  {
    icon: Refrigerator,
    title: "Home Appliance Scrap",
    description: "Get the best value for old and unused household appliances.",
    items: ["Refrigerator", "Washing Machine", "Microwave", "Mixer Grinder"],
  },
  {
    icon: UtensilsCrossed,
    title: "Restaurant Equipment",
    description:
      "Scrap purchase solutions for restaurants, cafes and commercial kitchens.",
    items: [
      "Kitchen Equipment",
      "Cooking Range",
      "Freezers",
      "Stainless Steel Items",
    ],
  },
  {
    icon: School,
    title: "Schools & Colleges",
    description:
      "Furniture, hostel equipment, laboratory assets and institutional scrap.",
    items: ["Furniture", "Lab Equipment", "Hostel Items", "Electrical Assets"],
  },
  {
    icon: Laptop,
    title: "Office Scrap",
    description:
      "Responsible collection of office furniture, electronics and workstations.",
    items: ["Office Furniture", "Computers", "Printers", "Electrical Items"],
  },
  {
    icon: Warehouse,
    title: "Godown & Shed Scrap",
    description:
      "Bulk scrap purchasing from warehouses, sheds and storage facilities.",
    items: ["Steel Structures", "Roofing Sheets", "Metal Pipes", "Beams"],
  },
  {
    icon: Store,
    title: "Small Industrial Scrap",
    description:
      "Collection of machinery, motors and production equipment from small industries.",
    items: ["Machinery", "Motors", "Gearbox", "Metal Scrap"],
  },
  {
    icon: Factory,
    title: "Large Industrial Scrap",
    description:
      "Large-scale industrial dismantling and bulk scrap purchasing services.",
    items: [
      "Plant Dismantling",
      "Heavy Machinery",
      "Bulk Scrap",
      "Industrial Equipment",
    ],
  },
];

export function Hero(props: ComponentProps<"section">) {
  return (
    <section
      className={cn(`relative overflow-hidden border-b border-white/10 pt-24`)}
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
            Scrap Purchase Services
          </p>

          <h1
            className={cn(`mt-5 text-4xl font-black sm:text-6xl lg:text-7xl`)}
          >
            Scrap Collection For
            <span className={cn(`text-primary-500`)}> Every Industry</span>
          </h1>

          <p
            className={cn(
              `text-foreground/65 mx-auto mt-6 max-w-3xl text-base leading-relaxed sm:text-lg`,
            )}
          >
            From household appliances to industrial machinery, Scrapnity
            provides fast pickup, fair valuation and responsible recycling.
          </p>
        </div>
      </div>
    </section>
  );
}

export function ServicesGrid(props: ComponentProps<"section">) {
  return (
    <section className={cn(`py-24`)} {...props}>
      <div className={cn(`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`)}>
        <div
          className={cn(
            `grid gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4`,
          )}
        >
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                className={cn(
                  `group bg-background hover:border-primary-500/30 hover:bg-primary-500/5 border border-white/10 p-6 transition-all duration-300`,
                )}
              >
                <div
                  className={cn(
                    `bg-primary-500/10 border-primary-500/20 flex h-14 w-14 items-center justify-center border`,
                  )}
                >
                  <Icon className={cn(`text-primary-500 h-6 w-6`)} />
                </div>

                <h3 className={cn(`mt-6 text-xl font-black`)}>
                  {service.title}
                </h3>

                <p
                  className={cn(
                    `text-foreground/60 mt-3 text-sm leading-relaxed`,
                  )}
                >
                  {service.description}
                </p>

                <div className={cn(`mt-6 flex flex-wrap gap-2`)}>
                  {service.items.map((item) => (
                    <span
                      key={item}
                      className={cn(
                        `bg-primary-500/10 text-primary-500 px-3 py-1 text-xs font-bold`,
                      )}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function WhyChooseScrapnity(props: ComponentProps<"section">) {
  const items = [
    "Fast Pickup Scheduling",
    "Transparent Pricing",
    "Bulk Scrap Handling",
    "Industrial Expertise",
    "Eco-Friendly Recycling",
    "Verified Processing",
  ];

  return (
    <section
      className={cn(`bg-primary-500/5 border-y border-white/10 py-24`)}
      {...props}
    >
      <div className={cn(`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`)}>
        <div className={cn(`text-center`)}>
          <p
            className={cn(
              `text-primary-500 text-xs font-black tracking-[0.25em] uppercase`,
            )}
          >
            Why Choose Us
          </p>

          <h2 className={cn(`mt-4 text-3xl font-black sm:text-5xl`)}>
            Trusted By Homes & Industries
          </h2>
        </div>

        <div className={cn(`mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3`)}>
          {items.map((item) => (
            <div
              key={item}
              className={cn(
                `bg-background border border-white/10 p-6 text-center`,
              )}
            >
              <p className={cn(`font-bold`)}>{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CTASection(props: ComponentProps<"section">) {
  return (
    <section className={cn(`border-t border-white/10 py-24`)} {...props}>
      <div className={cn(`mx-auto max-w-4xl px-4 text-center`)}>
        <Building2 className={cn(`text-primary-500 mx-auto h-10 w-10`)} />

        <h2 className={cn(`mt-6 text-3xl font-black sm:text-5xl`)}>
          Ready To Sell Your Scrap?
        </h2>

        <p
          className={cn(
            `text-foreground/60 mx-auto mt-5 max-w-2xl leading-relaxed`,
          )}
        >
          Get the best market value for appliances, machinery, office assets and
          industrial scrap.
        </p>

        <div
          className={cn(
            `mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center`,
          )}
        >
          <Link
            to="/contact"
            className={cn(
              `bg-primary-500 text-primary-50 inline-flex items-center justify-center gap-3 px-8 py-4 font-black transition-all duration-300 hover:-translate-y-1`,
            )}
          >
            Schedule Pickup
            <ArrowRight className={cn(`h-4 w-4`)} />
          </Link>

          <Link
            to="/about"
            className={cn(
              `hover:bg-primary-500/10 border border-white/10 px-8 py-4 font-black transition-all duration-300`,
            )}
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}
