import { read__AllDistricts } from "@/integrations/server-function/districts";
import { create__ManyServiceablePincodes } from "@/integrations/server-function/serviceable-pincodes";
import { create__ManyVendorScrapItem } from "@/integrations/server-function/vendor-scrap-item";
import { create__OneVendorUser } from "@/integrations/server-function/vendor-user";
import { cn } from "@/lib/utils/cn";
import { tryCatch } from "@/utils/try-catch";
import { useForm } from "@tanstack/react-form";
import {
  useLoaderData,
  useNavigate,
  useRouteContext,
} from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Info, X } from "lucide-react";
import { useState } from "react";

export function BecomeVendor() {
  return (
    <section
      className={cn(
        `bg-background mt-16 min-h-screen px-4 py-8 sm:px-6 lg:px-8`,
      )}
    >
      <div
        className={cn(
          `mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(300px,1fr)]`,
        )}
      >
        <VendorForm />

        <TermsAndConditions />
      </div>
    </section>
  );
}

export function VendorForm() {
  const readAllDistricts = useServerFn(read__AllDistricts);
  const createOneVendorUser = useServerFn(create__OneVendorUser);
  const createManyVendorScrapItem = useServerFn(create__ManyVendorScrapItem);
  const createManyServiceablePincodes = useServerFn(
    create__ManyServiceablePincodes,
  );

  const navigate = useNavigate();

  const { session } = useRouteContext({
    from: "/(authenticated-routes)/(new-user)/become-a-vendor/",
  });

  const { scraps, states } = useLoaderData({
    from: "/(authenticated-routes)/(new-user)/become-a-vendor/",
  });

  const [districts, setDistricts] = useState<
    Awaited<ReturnType<typeof read__AllDistricts>>
  >([]);
  const [tempPinCode, setTempPinCode] = useState("");

  const form = useForm({
    defaultValues: {
      name: "",
      contactNo: "",
      address: {
        streetAddress: "",
        city: "",
        district: "",
        state: "",
        pinCode: "",
      },
      aadharNo: "",
      serviceablePincode: [] as string[],
      scrapItems: [] as { scrapItemId: string; scrapItemName: string }[],
    },

    formId: "vendor form",

    onSubmit: async ({ value }) => {
      console.log(value);

      const {
        user: { email, name },
      } = session;

      const [createOneVendorUserError, createOneVendorUserResult] =
        await tryCatch(
          createOneVendorUser({
            data: {
              aadharNo: value.aadharNo,
              city: value.address.city,
              district: value.address.district,
              address: value.address.streetAddress,
              state: value.address.state,
              email: email,
              name: name,
              phoneNumber: value.contactNo,
              vendorPinCode: value.address.pinCode,
            },
          }),
        );

      if (createOneVendorUserError) {
        console.log(createOneVendorUserError);
        return;
      }

      const [createManyVendorScrapItemError] = await tryCatch(
        createManyVendorScrapItem({
          data: value.scrapItems.map((s) => ({
            scrapItemId: s.scrapItemId,
            vendorId: createOneVendorUserResult.id,
          })),
        }),
      );

      if (createManyVendorScrapItemError) {
        console.log(createManyVendorScrapItemError);
        return;
      }

      const [createManyServiceablePincodesError] = await tryCatch(
        createManyServiceablePincodes({
          data: value.serviceablePincode.map((p) => ({
            pinCode: p,
            vendorId: createOneVendorUserResult.id,
          })),
        }),
      );

      if (createManyServiceablePincodesError) {
        console.log(createManyServiceablePincodesError);
        return;
      }

      navigate({ to: "/partner/vendor" });
    },
  });

  const inputClass = cn(`
    border-accent-300 dark:border-accent-700 bg-background focus:border-primary-500 focus:ring-primary-500/20 w-full  border px-4 py-3 text-sm transition-colors outline-none focus:ring-2
  `);

  const labelClass = cn(`
    text-accent-700 dark:text-accent-300 text-xs font-semibold tracking-wide uppercase sm:text-sm
  `);

  const errorClass = cn(`
    text-secondary-600 absolute top-[calc(100%+0.35rem)] left-1 text-xs font-medium
  `);

  return (
    <form
      className={cn(
        `border-accent-300 dark:border-accent-700 bg-background w-full space-y-8 border p-5 shadow-sm sm:p-8 lg:p-10`,
      )}
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <div
        className={cn(`border-accent-300 dark:border-accent-700 border-b pb-5`)}
      >
        <h1 className={cn(`text-primary-600 text-2xl font-bold sm:text-3xl`)}>
          Vendor Registration
        </h1>

        <p className={cn(`text-accent-600 mt-2 text-sm`)}>
          Register your scrap collection service details.
        </p>
      </div>

      {/* Name */}
      <form.Field
        name="name"
        validators={{
          onChange: ({ value }) =>
            value.trim().length < 2 ? "Name is required" : undefined,
        }}
      >
        {(field) => (
          <div className={cn(`relative space-y-2`)}>
            <label htmlFor="name" className={labelClass}>
              Name
            </label>

            <input
              id="name"
              name="name"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              className={inputClass}
              placeholder="Please provide your name"
            />

            {field.state.meta.errors.length > 0 && (
              <p className={errorClass}>{field.state.meta.errors[0]}</p>
            )}
          </div>
        )}
      </form.Field>

      {/* Contact */}
      <form.Field
        name="contactNo"
        validators={{
          onChange: ({ value }) =>
            /^\d{10}$/.test(value)
              ? undefined
              : "Enter valid 10 digit contact number",
        }}
      >
        {(field) => (
          <div className={cn(`relative space-y-2`)}>
            <label htmlFor="contactNo" className={labelClass}>
              Contact No
            </label>

            <input
              id="contactNo"
              name="contactNo"
              type="text"
              inputMode="numeric"
              maxLength={10}
              value={field.state.value}
              onChange={(e) =>
                field.handleChange(e.target.value.replace(/\D/g, ""))
              }
              className={inputClass}
              placeholder="Please provide your contact details"
            />

            {field.state.meta.errors.length > 0 && (
              <p className={errorClass}>{field.state.meta.errors[0]}</p>
            )}
          </div>
        )}
      </form.Field>

      {/* Aadhaar */}
      <form.Field
        name="aadharNo"
        validators={{
          onChange: ({ value }) =>
            /^\d{12}$/.test(value)
              ? undefined
              : "Aadhaar must contain exactly 12 digits",
        }}
      >
        {(field) => (
          <div className={cn(`relative space-y-2`)}>
            <label htmlFor="aadharNo" className={labelClass}>
              Aadhaar No
            </label>

            <input
              id="aadharNo"
              name="aadharNo"
              type="text"
              inputMode="numeric"
              maxLength={12}
              value={field.state.value}
              onChange={(e) =>
                field.handleChange(e.target.value.replace(/\D/g, ""))
              }
              className={inputClass}
              placeholder="Please provide your Addhar no. (must be 12 digit)"
            />

            {field.state.meta.errors.length > 0 && (
              <p className={errorClass}>{field.state.meta.errors[0]}</p>
            )}
          </div>
        )}
      </form.Field>

      {/* Scrap Items & Vendor Price Section */}
      <form.Field
        name="scrapItems"
        mode="array"
        validators={{
          onChange: ({ value }) =>
            value.length === 0 ? "Select at least one scrap item" : undefined,
        }}
      >
        {(field) => {
          const selectedPrices = field.state.value.map((item) => ({
            item,
            data: scraps.find((s) => s.productName === item.scrapItemName),
          }));

          return (
            <div className={cn(`space-y-6`)}>
              {/* Scrap Items Input & Tags */}
              <div className={cn(`relative space-y-3`)}>
                <label htmlFor="scrapItems" className={labelClass}>
                  Scrap Items
                </label>

                <div className={cn(`flex flex-wrap gap-2`)}>
                  {field.state.value.map((item, index) => (
                    <div
                      key={item.scrapItemId}
                      className={cn(
                        `border-primary-600 bg-primary-500 flex items-center overflow-hidden border text-sm font-medium text-white`,
                      )}
                    >
                      <span className={cn(`px-3 py-2`)}>
                        {item.scrapItemName}
                      </span>

                      <button
                        type="button"
                        onClick={() => field.removeValue(index)}
                        className={cn(
                          `border-primary-300/50 hover:bg-primary-600 border-l px-3 py-2 transition`,
                        )}
                        aria-label={`Remove ${item}`}
                      >
                        <X className={cn(`size-4`)} />
                      </button>
                    </div>
                  ))}
                </div>

                <select
                  id="scrapItems"
                  name="scrapItems"
                  value=""
                  onChange={(e) => {
                    const value = e.target.value;

                    if (
                      value &&
                      !field.state.value
                        .map((v) => v.scrapItemId)
                        .includes(value)
                    ) {
                      const selectedScrap = scraps.find((s) => s.id === value);

                      if (!selectedScrap) return;

                      field.pushValue({
                        scrapItemId: selectedScrap.id,
                        scrapItemName: selectedScrap.productName,
                      });
                    }
                  }}
                  className={inputClass}
                >
                  <option value="" disabled>
                    Select an item
                  </option>

                  {scraps
                    .filter(
                      (s) =>
                        !field.state.value.some(
                          (selected) => selected.scrapItemId === s.id,
                        ),
                    )
                    .map((scrap) => (
                      <option key={scrap.id} value={scrap.id}>
                        {scrap.productName}
                      </option>
                    ))}
                </select>

                {field.state.meta.errors.length > 0 && (
                  <p className={errorClass}>{field.state.meta.errors[0]}</p>
                )}
              </div>

              {/* Vendor Price Table */}
              <div className={cn(`space-y-4`)}>
                <div>
                  <h3 className={cn(labelClass)}>Vendor Price</h3>
                  <p className={cn(`text-accent-500 mt-1 text-xs`)}>
                    The following are the purchase prices provided by Scrapnity.
                  </p>
                </div>

                {selectedPrices.length === 0 ? (
                  <div
                    className={cn(
                      `border-accent-300 bg-accent-50 text-accent-600 rounded-md border border-dashed p-4 text-sm`,
                    )}
                  >
                    Select one or more scrap items to view their allowed prices.
                  </div>
                ) : (
                  <div className={cn(`grid gap-3 sm:grid-cols-2`)}>
                    {selectedPrices.map(({ item, data }) => (
                      <div
                        key={item.scrapItemId}
                        className={cn(
                          `border-accent-300 bg-background flex items-center justify-between rounded-lg border p-4 shadow-sm`,
                        )}
                      >
                        <div>
                          <h4 className={cn(`text-accent-900 font-semibold`)}>
                            {item.scrapItemName}
                          </h4>
                        </div>

                        {data ? (
                          <div className={cn(`text-right`)}>
                            <div
                              className={cn(
                                `text-primary-600 text-xl font-bold`,
                              )}
                            >
                              ₹{data.vendorPrice}
                            </div>

                            <div className={cn(`text-accent-500 text-xs`)}>
                              / {data.priceUnit}
                            </div>
                          </div>
                        ) : (
                          <span
                            className={cn(
                              `bg-secondary-100 text-secondary-700 rounded-full px-3 py-1 text-xs font-medium`,
                            )}
                          >
                            Market Rate
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        }}
      </form.Field>

      {/* Address Section */}
      <div className={cn(`grid grid-cols-1 gap-6 sm:grid-cols-2`)}>
        {/* Street Address */}
        <form.Field
          name="address.streetAddress"
          validators={{
            onChange: ({ value }) =>
              value.trim() ? undefined : "Street address is required",
          }}
        >
          {(field) => (
            <div className={cn(`relative space-y-2 sm:col-span-2`)}>
              <label className={labelClass}>Street Address</label>

              <input
                type="text"
                name="streetAddress"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className={cn(`${inputClass}`)}
                placeholder="Provide address"
              />

              {field.state.meta.errors.length > 0 && (
                <p className={errorClass}>{field.state.meta.errors[0]}</p>
              )}
            </div>
          )}
        </form.Field>

        {/* City */}
        <form.Field
          name="address.city"
          validators={{
            onChange: ({ value }) =>
              value.trim() ? undefined : "City is required",
          }}
        >
          {(field) => (
            <div className={cn(`relative space-y-2`)}>
              <label className={labelClass}>City</label>

              <input
                name="city"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className={inputClass}
                placeholder="Your city"
              />

              {field.state.meta.errors.length > 0 && (
                <p className={errorClass}>{field.state.meta.errors[0]}</p>
              )}
            </div>
          )}
        </form.Field>

        {/* State Dropdown */}
        <form.Field
          name="address.state"
          validators={{
            onChange: ({ value }) =>
              value.trim() ? undefined : "State is required",
          }}
        >
          {(field) => (
            <div className={cn(`relative space-y-2`)}>
              <label className={labelClass}>State</label>

              <select
                name="state"
                value={field.state.value}
                onChange={async (e) => {
                  const newState = e.target.value;
                  field.handleChange(newState);

                  // Reset district when state changes
                  form.setFieldValue("address.district", "");
                  setDistricts([]);

                  if (newState) {
                    const fetchedDistricts = await readAllDistricts({
                      data: { stateId: newState },
                    });
                    setDistricts(fetchedDistricts);
                  }
                }}
                className={inputClass}
              >
                <option value="" disabled>
                  --select--
                </option>
                {states.map((st) => (
                  <option key={st.id} value={st.id}>
                    {st.stateName}
                  </option>
                ))}
              </select>

              {field.state.meta.errors.length > 0 && (
                <p className={errorClass}>{field.state.meta.errors[0]}</p>
              )}
            </div>
          )}
        </form.Field>

        {/* District Dropdown */}
        <form.Field
          name="address.district"
          validators={{
            onChange: ({ value }) =>
              value.trim() ? undefined : "District is required",
          }}
        >
          {(field) => (
            <div className={cn(`relative space-y-2`)}>
              <label className={labelClass}>District</label>

              <select
                name="district"
                value={field.state.value}
                disabled={!form.getFieldValue("address.state")}
                onChange={(e) => field.handleChange(e.target.value)}
                className={cn(
                  inputClass,
                  "disabled:cursor-not-allowed disabled:opacity-50",
                )}
              >
                <option value="" disabled>
                  --select--
                </option>
                {districts.map((dist) => (
                  <option key={dist.id} value={dist.id}>
                    {dist.districtName}
                  </option>
                ))}
              </select>

              {field.state.meta.errors.length > 0 && (
                <p className={errorClass}>{field.state.meta.errors[0]}</p>
              )}
            </div>
          )}
        </form.Field>

        {/* Address Pincode */}
        <form.Field
          name="address.pinCode"
          validators={{
            onChange: ({ value }) =>
              /^\d{6}$/.test(value)
                ? undefined
                : "Pincode must contain exactly 6 digits",
          }}
        >
          {(field) => (
            <div className={cn(`relative space-y-2`)}>
              <label className={labelClass}>Address Pincode</label>

              <input
                name="pinCode"
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={field.state.value}
                onChange={(e) =>
                  field.handleChange(e.target.value.replace(/\D/g, ""))
                }
                className={inputClass}
                placeholder="Your pincode"
              />

              {field.state.meta.errors.length > 0 && (
                <p className={errorClass}>{field.state.meta.errors[0]}</p>
              )}
            </div>
          )}
        </form.Field>
      </div>

      {/* Pincode */}
      <form.Field
        name="serviceablePincode"
        mode="array"
        validators={{
          onChange: ({ value }) => {
            if (value.length === 0) {
              return "At least one serviceable pincode is required";
            }

            const invalid = value.filter((v) => !/^\d{6}$/.test(v));

            return invalid.length === 0
              ? undefined
              : "Pincode must contain exactly 6 digits";
          },
        }}
      >
        {(field) => (
          <div className={cn(`relative space-y-3`)}>
            <label htmlFor="serviceablePincode" className={labelClass}>
              Serviceable Pincode
            </label>

            {/* Selected pincodes */}
            <div className={cn(`flex flex-wrap gap-2`)}>
              {field.state.value.map((pin, index) => (
                <div
                  key={pin}
                  className={cn(
                    `border-primary-600 bg-primary-500 flex items-center overflow-hidden border text-sm font-medium text-white`,
                  )}
                >
                  <span className={cn(`px-3 py-2`)}>{pin}</span>

                  <button
                    type="button"
                    onClick={() => field.removeValue(index)}
                    className={cn(
                      `border-primary-300/50 hover:bg-primary-600 border-l px-3 py-2 transition-colors`,
                    )}
                    aria-label={`Remove ${pin}`}
                  >
                    <X className={cn(`size-4`)} />
                  </button>
                </div>
              ))}
            </div>

            {/* Input + Add button */}
            {field.state.value.length < 3 && (
              <div className={cn(`flex flex-col gap-3 sm:flex-row`)}>
                <input
                  id="serviceablePincode"
                  name="serviceablePincode"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={tempPinCode}
                  placeholder="Enter serviceable pincode, (upto 3 pincode)"
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    setTempPinCode(value);
                  }}
                  className={cn(inputClass, `flex-1`)}
                />

                <button
                  type="button"
                  disabled={tempPinCode.length !== 6}
                  onClick={() => {
                    if (
                      tempPinCode.length === 6 &&
                      !field.state.value.includes(tempPinCode)
                    ) {
                      field.pushValue(tempPinCode);
                      setTempPinCode("");
                    }
                  }}
                  className={cn(
                    `border-primary-600 bg-primary-500 hover:bg-primary-600 active:bg-primary-700 border px-6 py-3 text-sm font-semibold tracking-wide text-white uppercase transition-colors disabled:cursor-not-allowed disabled:opacity-50`,
                  )}
                >
                  Add
                </button>
              </div>
            )}

            {/* Helper text */}
            <p className={cn(`text-accent-500 text-xs`)}>
              You can add up to 3 serviceable pincodes.
            </p>

            {field.state.meta.errors.length > 0 && (
              <p className={errorClass}>{field.state.meta.errors[0]}</p>
            )}
          </div>
        )}
      </form.Field>

      <div className={cn(`text-xs text-red-500`)}>
        <Info className={cn(`inline-block size-3`)} /> Vendors need to provide
        10-20% commission to Scrapnity
      </div>

      <form.Subscribe
        selector={(state) => ({
          isValid: state.isValid,
          isSubmitting: state.isSubmitting,
        })}
      >
        {(subscription) => (
          <button
            type="submit"
            disabled={!subscription.isValid || subscription.isSubmitting}
            className={cn(
              `border-primary-600 bg-primary-500 hover:bg-primary-600 active:bg-primary-700 w-full border px-4 py-3 text-sm font-semibold tracking-wider text-white uppercase transition disabled:cursor-not-allowed disabled:opacity-50 sm:py-3.5`,
            )}
          >
            {subscription.isSubmitting ? "Submitting" : "Submit"}
          </button>
        )}
      </form.Subscribe>
    </form>
  );
}

export function TermsAndConditions() {
  return (
    <section
      className={cn(
        `border-accent-300 dark:border-accent-700 bg-background border p-4 shadow-sm sm:p-6 lg:sticky lg:top-24`,
      )}
    >
      <div className={cn(`mb-5`)}>
        <h2 className={cn(`text-primary-600 text-xl font-bold sm:text-2xl`)}>
          Terms & Conditions
        </h2>

        <p className={cn(`text-accent-600 mt-2 text-sm leading-relaxed`)}>
          Please read the vendor guidelines before submitting your registration.
        </p>
      </div>

      <div
        className={cn(`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1`)}
      >
        <TermsAndConditionsEnglish />
        <TermsAndConditionsBengali />
        <TermsAndConditionsHindi />
      </div>
    </section>
  );
}

export function TermsAndConditionsEnglish() {
  return (
    <div className={cn(`text-xs`)}>
      <h1 className={cn(`font-bold`)}>Scrapnity Vendor Terms & Conditions</h1>
      <ol className={cn(`space-y-2`)}>
        <li>
          1. A vendor can operate in a maximum of 3 serviceable PIN codes.
        </li>
        <li>
          2. The vendorship may be cancelled immediately if incorrect, fake, or
          invalid Aadhaar details are submitted during registration.
        </li>
        <li>
          3. Scrapnity reserves the right to cancel the vendorship if the vendor
          misbehaves with any customer or acts in a manner that harms the
          company's reputation.
        </li>
        <li>
          4. The scrap purchase price offered by the vendor should not exceed
          the prevailing market value.
        </li>
        <li>
          5. Customer leads will be assigned based on the vendor's registered
          serviceable PIN codes.
        </li>
        <li>
          6. The vendor is solely responsible for handling the complete pickup
          process, price negotiation, and payment to the customer.
        </li>
        <li>
          7. Vendor registration is currently free of charge. The commission
          structure between Scrapnity and the vendor will be discussed and
          finalized separately.
        </li>
        <li>
          8. Vendors are expected to maintain professional conduct and provide
          timely, reliable service to all customers.
        </li>
        <li>
          9. Scrapnity reserves the right to update these terms and conditions
          or suspend/cancel any vendor account in case of policy violations or
          misconduct.
        </li>
      </ol>
    </div>
  );
}

export function TermsAndConditionsHindi() {
  return (
    <div className={cn(`text-xs`)}>
      <h1 className={cn(`font-bold`)}>स्क्रैपनिटी विक्रेता नियम एवं शर्तें</h1>
      <ol className={cn(`space-y-2`)}>
        <li>
          1. एक विक्रेता अधिकतम 3 सर्विस योग्य पिन कोड में ही अपनी सेवाएं प्रदान
          कर सकता है।
        </li>
        <li>
          2. पंजीकरण के समय गलत, फर्जी या अमान्य आधार नंबर देने पर विक्रेता की
          सदस्यता तत्काल रद्द की जा सकती है।
        </li>
        <li>
          3. यदि कोई विक्रेता किसी ग्राहक के साथ दुर्व्यवहार करता है या कंपनी की
          प्रतिष्ठा को नुकसान पहुंचाने वाला कोई कार्य करता है, तो उसकी विक्रेता
          सदस्यता रद्द की जा सकती है।
        </li>
        <li>
          4. स्क्रैप खरीदने के लिए दी जाने वाली कीमत वर्तमान बाजार मूल्य से अधिक
          नहीं होनी चाहिए।
        </li>
        <li>
          5. स्क्रैपनिटी विक्रेता के पंजीकृत सर्विस योग्य पिन कोड के अनुसार ही
          ग्राहक लीड प्रदान करेगी।
        </li>
        <li>
          6. स्क्रैप की पिकअप, मूल्य निर्धारण, ग्राहक से भुगतान लेना तथा पूरी
          प्रक्रिया की जिम्मेदारी विक्रेता की होगी।
        </li>
        <li>
          7. वर्तमान में विक्रेता पंजीकरण पूरी तरह निःशुल्क है। स्क्रैपनिटी और
          विक्रेता के बीच कमीशन संबंधी शर्तें बाद में आपसी सहमति से तय की
          जाएंगी।
        </li>
        <li>
          8. सभी ग्राहकों के साथ विनम्र, पेशेवर और जिम्मेदार व्यवहार करना
          प्रत्येक विक्रेता के लिए अनिवार्य है।
        </li>
        <li>
          9. कंपनी की किसी भी नीति का उल्लंघन, अनुचित व्यवहार या नियमों का पालन
          न करने की स्थिति में स्क्रैपनिटी बिना पूर्व सूचना के किसी भी समय
          विक्रेता की सदस्यता निलंबित या रद्द करने का अधिकार सुरक्षित रखती है।
        </li>
      </ol>
    </div>
  );
}

export function TermsAndConditionsBengali() {
  return (
    <div className={cn(`text-xs`)}>
      <h1 className={cn(`font-bold`)}>স্ক্র্যাপনিটি ভেন্ডর শর্তাবলী</h1>
      <ol className={cn(`space-y-2`)}>
        <li>
          1. একজন ভেন্ডর সর্বোচ্চ ৩টি সার্ভিসযোগ্য পিন কোডে পরিষেবা প্রদান করতে
          পারবেন।
        </li>
        <li>
          2. রেজিস্ট্রেশনের সময় ভুল, ভুয়া বা অবৈধ আধার নম্বর প্রদান করলে
          ভেন্ডরশিপ তাৎক্ষণিকভাবে বাতিল করা হতে পারে।
        </li>
        <li>
          3. কোনো গ্রাহকের সঙ্গে অসৌজন্যমূলক আচরণ, প্রতারণা বা প্রতিষ্ঠানের
          সুনাম ক্ষুণ্ন করে এমন কোনো কার্যকলাপের জন্য ভেন্ডরশিপ বাতিল করা হতে
          পারে।
        </li>
        <li>
          4. স্ক্র্যাপ কেনার জন্য প্রস্তাবিত মূল্য বর্তমান বাজার মূল্যের চেয়ে
          বেশি হতে পারবে না।
        </li>
        <li>
          5. ভেন্ডরের নিবন্ধিত সার্ভিসযোগ্য পিন কোড অনুযায়ী স্ক্র্যাপনিটি
          গ্রাহকের লিড প্রদান করবে।
        </li>
        <li>
          6. স্ক্র্যাপ সংগ্রহ, মূল্য নির্ধারণ, গ্রাহকের সঙ্গে লেনদেন এবং পেমেন্ট
          সম্পূর্ণভাবে ভেন্ডরের দায়িত্বে থাকবে।
        </li>
        <li>
          7. বর্তমানে ভেন্ডর রেজিস্ট্রেশন সম্পূর্ণ বিনামূল্যে। স্ক্র্যাপনিটি ও
          ভেন্ডরের মধ্যে কমিশন সংক্রান্ত বিষয় পরবর্তীতে পারস্পরিক আলোচনার
          মাধ্যমে নির্ধারণ করা হবে।
        </li>
        <li>
          8. সকল গ্রাহকের সঙ্গে ভদ্র, পেশাদার এবং দায়িত্বশীল আচরণ বজায় রাখা
          ভেন্ডরের জন্য বাধ্যতামূলক।
        </li>
        <li>
          9. কোনো শর্ত লঙ্ঘন, অসদাচরণ বা প্রতিষ্ঠানের নীতিমালা ভঙ্গের ক্ষেত্রে
          স্ক্র্যাপনিটি যেকোনো সময় পূর্ব নোটিশ ছাড়াই ভেন্ডরশিপ স্থগিত বা বাতিল
          করার অধিকার সংরক্ষণ করে।
        </li>
      </ol>
    </div>
  );
}
