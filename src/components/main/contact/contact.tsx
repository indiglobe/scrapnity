import { useForm } from "@tanstack/react-form";
import { Mail, MapPin, Phone, Recycle } from "lucide-react";

import { cn } from "@/lib/utils/cn";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { RadioGroup, RadioGroupItem } from "@/ui/radio-group";
import { Textarea } from "@/ui/textarea";
import { contactMessageGenerator } from "@/utils/contact-message-generator";
import { platformPhoneNo } from "@/data/const";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  scrapLocation: string;
  customScrapLocation: string;
  message: string;
};

const scrapLocations = [
  {
    value: "ground-floor",
    label: "Ground Floor",
  },
  {
    value: "1st-floor",
    label: "1st Floor",
  },
  {
    value: "2nd-floor",
    label: "2nd Floor",
  },
  {
    value: "3rd-floor",
    label: "3rd Floor",
  },
  {
    value: "4th-floor-or-above",
    label: "4th Floor+",
  },
  {
    value: "custom",
    label: "Custom",
  },
];

export function ContactFormSection() {
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      location: "",
      scrapLocation: "",
      customScrapLocation: "",
      message: "",
    } satisfies FormData,

    onSubmit: async ({ value }) => {
      const contactMessage = contactMessageGenerator({ ...value });

      const params = new URLSearchParams({
        text: contactMessage,
      }).toString();

      const a = document.createElement("a");
      a.target = "_blank";
      a.href = `https://wa.me/91${platformPhoneNo}?${encodeURI(params)}`;
      a.click();
    },
  });

  return (
    <section
      className={cn(`relative overflow-hidden border-y border-white/10 py-24`)}
    >
      <div
        className={cn(
          `bg-primary-500/5 absolute top-0 left-0 h-125 w-125 blur-[180px]`,
        )}
      />

      <div
        className={cn(
          `bg-secondary-500/5 absolute right-0 bottom-0 h-125 w-125 blur-[180px]`,
        )}
      />

      <div className={cn(`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`)}>
        {/* HEADER */}
        <div
          className={cn(
            `mb-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between`,
          )}
        >
          <div>
            <p
              className={cn(
                `text-primary-500 text-xs font-black tracking-[0.25em] uppercase`,
              )}
            >
              Contact Scrapnity
            </p>

            <h2 className={cn(`mt-4 text-4xl font-black sm:text-5xl`)}>
              Schedule A Scrap Pickup.
            </h2>
          </div>

          <p
            className={cn(
              `text-foreground/60 max-w-xl text-sm leading-relaxed`,
            )}
          >
            Share your scrap details and our team will contact you with
            valuation, pickup schedule, and recycling process information.
          </p>
        </div>

        <div
          className={cn(
            `grid gap-0 border border-white/10 lg:grid-cols-[360px_1fr]`,
          )}
        >
          {/* LEFT PANEL */}
          <aside
            className={cn(`border-b border-white/10 lg:border-r lg:border-b-0`)}
          >
            <div className={cn(`border-b border-white/10 p-8`)}>
              <div
                className={cn(
                  `border-primary-500/20 bg-primary-500/10 flex h-14 w-14 items-center justify-center border`,
                )}
              >
                <Recycle className={cn(`text-primary-500 h-7 w-7`)} />
              </div>

              <h3
                className={cn(
                  `mt-6 text-lg font-black tracking-[0.15em] uppercase`,
                )}
              >
                Why Scrapnity
              </h3>

              <div className={cn(`text-foreground/70 mt-6 space-y-4 text-sm`)}>
                <p>• Free Scrap Evaluation</p>
                <p>• Transparent Pricing</p>
                <p>• Fast Pickup Scheduling</p>
                <p>• Eco-Friendly Recycling</p>
                <p>• Bulk Scrap Collection</p>
              </div>
            </div>

            <div className={cn(`divide-y divide-white/10`)}>
              <div className={cn(`flex items-start gap-4 p-6`)}>
                <Phone
                  className={cn(`text-primary-500 mt-0.5 h-5 w-5 shrink-0`)}
                />

                <div>
                  <p
                    className={cn(
                      `text-foreground/40 text-[11px] font-black tracking-[0.18em] uppercase`,
                    )}
                  >
                    Phone
                  </p>

                  <p className={cn(`mt-2 text-sm`)}>+91 95806 93651</p>
                </div>
              </div>

              <div className={cn(`flex items-start gap-4 p-6`)}>
                <Mail
                  className={cn(`text-primary-500 mt-0.5 h-5 w-5 shrink-0`)}
                />

                <div>
                  <p
                    className={cn(
                      `text-foreground/40 text-[11px] font-black tracking-[0.18em] uppercase`,
                    )}
                  >
                    Email
                  </p>

                  <p className={cn(`mt-2 text-sm`)}>hello@scrapnity.com</p>
                </div>
              </div>

              <div className={cn(`flex items-start gap-4 p-6`)}>
                <MapPin
                  className={cn(`text-primary-500 mt-0.5 h-5 w-5 shrink-0`)}
                />

                <div>
                  <p
                    className={cn(
                      `text-foreground/40 text-[11px] font-black tracking-[0.18em] uppercase`,
                    )}
                  >
                    Location
                  </p>

                  <p className={cn(`mt-2 text-sm`)}>
                    Mumbai, Maharashtra, India
                  </p>
                </div>
              </div>
            </div>
          </aside>

          {/* FORM */}
          <div className={cn(`relative`)}>
            <div
              className={cn(`bg-primary-500 absolute top-0 left-0 h-full w-1`)}
            />

            <div className={cn(`p-6 sm:p-8 lg:p-10`)}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  void form.handleSubmit();
                }}
                className={cn(`space-y-8`)}
              >
                <div className={cn(`grid gap-6 md:grid-cols-2`)}>
                  <form.Field
                    name="firstName"
                    validators={{
                      onChange: ({ value }) =>
                        !value ? "First name is required" : undefined,
                    }}
                  >
                    {(field) => (
                      <div>
                        <Label
                          className={cn(
                            `text-xs font-black tracking-[0.15em] uppercase`,
                          )}
                        >
                          First Name
                        </Label>

                        <Input
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="John"
                          className={cn(
                            `focus-visible:border-primary-500 mt-3 h-12 rounded-none border-white/10 bg-transparent focus-visible:ring-0`,
                          )}
                        />

                        {field.state.meta.errors[0] && (
                          <p className={cn(`mt-2 text-xs text-red-500`)}>
                            {field.state.meta.errors[0]}
                          </p>
                        )}
                      </div>
                    )}
                  </form.Field>

                  <form.Field
                    name="lastName"
                    validators={{
                      onChange: ({ value }) =>
                        !value ? "Last name is required" : undefined,
                    }}
                  >
                    {(field) => (
                      <div>
                        <Label
                          className={cn(
                            `text-xs font-black tracking-[0.15em] uppercase`,
                          )}
                        >
                          Last Name
                        </Label>

                        <Input
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="Doe"
                          className={cn(
                            `focus-visible:border-primary-500 mt-3 h-12 rounded-none border-white/10 bg-transparent focus-visible:ring-0`,
                          )}
                        />
                      </div>
                    )}
                  </form.Field>
                </div>

                <div className={cn(`grid gap-6 md:grid-cols-2`)}>
                  <form.Field name="email">
                    {(field) => (
                      <div>
                        <Label
                          className={cn(
                            `text-xs font-black tracking-[0.15em] uppercase`,
                          )}
                        >
                          Email
                        </Label>

                        <Input
                          type="email"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="john@example.com"
                          className={cn(
                            `mt-3 h-12 rounded-none border-white/10 bg-transparent`,
                          )}
                        />
                      </div>
                    )}
                  </form.Field>

                  <form.Field name="phone">
                    {(field) => (
                      <div>
                        <Label
                          className={cn(
                            `text-xs font-black tracking-[0.15em] uppercase`,
                          )}
                        >
                          Phone
                        </Label>

                        <Input
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="+91 9876543210"
                          className={cn(
                            `mt-3 h-12 rounded-none border-white/10 bg-transparent`,
                          )}
                        />
                      </div>
                    )}
                  </form.Field>
                </div>

                <form.Field name="location">
                  {(field) => (
                    <div>
                      <Label
                        className={cn(
                          `text-xs font-black tracking-[0.15em] uppercase`,
                        )}
                      >
                        Pickup Address
                      </Label>

                      <Input
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Full pickup address"
                        className={cn(
                          `mt-3 h-12 rounded-none border-white/10 bg-transparent`,
                        )}
                      />
                    </div>
                  )}
                </form.Field>

                <form.Field name="scrapLocation">
                  {(field) => (
                    <div>
                      <Label
                        className={cn(
                          `text-xs font-black tracking-[0.15em] uppercase`,
                        )}
                      >
                        Scrap Location
                      </Label>

                      <RadioGroup
                        value={field.state.value}
                        onValueChange={(value) => field.handleChange(value)}
                        className={cn(
                          `mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3`,
                        )}
                      >
                        {scrapLocations.map((item) => (
                          <Label
                            key={item.value}
                            className={cn(
                              `hover:border-primary-500/40 flex cursor-pointer items-center gap-3 border border-white/10 p-4 transition-colors`,
                            )}
                          >
                            <RadioGroupItem value={item.value} />

                            <span
                              className={cn(
                                `text-xs font-black tracking-[0.12em] uppercase`,
                              )}
                            >
                              {item.label}
                            </span>
                          </Label>
                        ))}
                      </RadioGroup>
                    </div>
                  )}
                </form.Field>

                <form.Subscribe
                  selector={(state) => state.values.scrapLocation}
                >
                  {(scrapLocation) =>
                    scrapLocation === "custom" ? (
                      <form.Field name="customScrapLocation">
                        {(field) => (
                          <div>
                            <Label
                              className={cn(
                                `text-xs font-black tracking-[0.15em] uppercase`,
                              )}
                            >
                              Custom Location
                            </Label>

                            <Input
                              value={field.state.value}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                              placeholder="Terrace, Basement, Warehouse..."
                              className={cn(
                                `mt-3 h-12 rounded-none border-white/10 bg-transparent`,
                              )}
                            />
                          </div>
                        )}
                      </form.Field>
                    ) : null
                  }
                </form.Subscribe>

                <form.Field name="message">
                  {(field) => (
                    <div>
                      <Label
                        className={cn(
                          `text-xs font-black tracking-[0.15em] uppercase`,
                        )}
                      >
                        Message
                      </Label>

                      <Textarea
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Describe scrap quantity, material types, preferred pickup time and other requirements..."
                        rows={8}
                        className={cn(
                          `focus-visible:border-primary-500 mt-3 min-h-40 resize-none rounded-none border-white/10 bg-transparent focus-visible:ring-0`,
                        )}
                      />
                    </div>
                  )}
                </form.Field>

                <form.Subscribe
                  selector={(state) => [state.canSubmit, state.isSubmitting]}
                >
                  {([canSubmit, isSubmitting]) => (
                    <Button
                      type="submit"
                      disabled={!canSubmit || isSubmitting}
                      className={cn(
                        `bg-primary-500 text-primary-50 hover:bg-primary-400 border-primary-500 h-14 w-full rounded-none border text-sm font-black tracking-[0.18em] uppercase`,
                      )}
                    >
                      {isSubmitting ? "Submitting..." : "Schedule Pickup"}
                    </Button>
                  )}
                </form.Subscribe>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
