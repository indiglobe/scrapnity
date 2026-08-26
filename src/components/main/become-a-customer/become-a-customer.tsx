// import { platformPhoneNo } from "@/data/const";
import { SHEET_URL } from "@/data/const";
import { cn } from "@/lib/utils/cn";
import { useForm } from "@tanstack/react-form";

export function BecomeCustomer() {
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
        <CustomerForm />
      </div>
    </section>
  );
}

const PRICE = [
  {
    item: "Water Purifier",
    price: { amount: 150, quantityUnit: "Piece" },
  },
  {
    item: "Music System and Radio DVD Sound box",
    price: { amount: 200, quantityUnit: "Piece" },
  },
  {
    item: "Music System (big)",
    price: { amount: 500, quantityUnit: "Piece" },
  },
  {
    item: "Chimney",
    price: { amount: 300, quantityUnit: "Piece" },
  },
  {
    item: "CPU",
    price: { amount: 500, quantityUnit: "Piece" },
  },
  {
    item: "Monitor",
    price: { amount: 150, quantityUnit: "Piece" },
  },
  {
    item: "UPS",
    price: { amount: 250, quantityUnit: "Piece" },
  },
  {
    item: "Battery (Small)",
    price: { amount: 100, quantityUnit: "Piece" },
  },
  {
    item: "Battery (Big)",
    price: { amount: 200, quantityUnit: "Piece" },
  },
  {
    item: "Washing machine (top load)",
    price: { amount: 500, quantityUnit: "Piece" },
  },
  {
    item: "Washing machine (front load)",
    price: { amount: 650, quantityUnit: "Piece" },
  },
  {
    item: "BOX TV",
    price: { amount: 200, quantityUnit: "Piece" },
  },
  {
    item: "LED/LCD TV",
    price: { amount: 250, quantityUnit: "Piece" },
  },
  {
    item: "IRON / Copper / Brus / Adamson",
    price: { amount: 250, quantityUnit: "Piece" },
  },
] as const;

const PRODUCT_OPTIONS = [
  "--select--",
  ...PRICE.map(({ item }) => item),
] as const;

export function CustomerForm() {
  const form = useForm({
    defaultValues: {
      // this is the name of the google sheet
      // DO NOT EDIT THIS
      googleSheetName: "Customers",
      name: "",
      number: "",
      product: "",
      address: "",
      landmark: "",
      pinCode: "",
      floor: "",
      pickupDate: "",
      pickupTime: "",
    },

    formId: "customer form",

    onSubmit: async ({ value }) => {
      const selectedProduct = PRICE.find((item) => item.item === value.product);

      const data = {
        googleSheetName: value.googleSheetName,
        name: value.name,
        number: value.number,
        product: value.product,
        price: selectedProduct?.price.amount ?? "",
        address: value.address,
        landmark: value.landmark,
        pinCode: value.pinCode,
        floor: value.floor,
        pickupDate: value.pickupDate,
        pickupTime: value.pickupTime,
      };

      console.log("Submitting:", data);

      try {
        const response = await fetch(SHEET_URL, {
          method: "POST",
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        console.log("Google Apps Script response:", result);

        if (!result.success) {
          throw new Error(result.error || "Failed to save customer");
        }

        alert("Pickup scheduled successfully!");
      } catch (error) {
        console.error("Failed to save customer:", error);
        alert("Something went wrong. Please try again.");
      }
    },
  });

  const inputClass = cn(`
    border-accent-300 dark:border-accent-700
    bg-background focus:border-primary-500
    focus:ring-primary-500/20 w-full border px-4 py-3
    text-sm transition-colors outline-none focus:ring-2
  `);

  const labelClass = cn(`
    text-accent-700 dark:text-accent-300
    text-xs font-semibold tracking-wide uppercase sm:text-sm
  `);

  const errorClass = cn(`
    text-secondary-600 absolute top-[calc(100%+0.35rem)]
    left-1 text-xs font-medium
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
      {/* Header */}
      <div
        className={cn(`border-accent-300 dark:border-accent-700 border-b pb-5`)}
      >
        <h1 className={cn(`text-primary-600 text-2xl font-bold sm:text-3xl`)}>
          Schedule Your Scrap Pickup
        </h1>

        <p className={cn(`text-accent-600 mt-2 text-sm`)}>
          Enter your details and schedule a convenient pickup.
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
            <label htmlFor="customer-name" className={labelClass}>
              Name
            </label>

            <input
              id="customer-name"
              type="text"
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

      {/* Number */}
      <form.Field
        name="number"
        validators={{
          onChange: ({ value }) =>
            /^\d{10}$/.test(value)
              ? undefined
              : "Enter valid 10 digit mobile number",
        }}
      >
        {(field) => (
          <div className={cn(`relative space-y-2`)}>
            <label htmlFor="customer-number" className={labelClass}>
              Number
            </label>

            <input
              id="customer-number"
              type="text"
              name="number"
              inputMode="numeric"
              maxLength={10}
              value={field.state.value}
              onChange={(e) =>
                field.handleChange(e.target.value.replace(/\D/g, ""))
              }
              className={inputClass}
              placeholder="Please provide your 10 digit mobile number"
            />

            {field.state.meta.errors.length > 0 && (
              <p className={errorClass}>{field.state.meta.errors[0]}</p>
            )}
          </div>
        )}
      </form.Field>

      {/* Product */}
      <form.Field
        name="product"
        validators={{
          onChange: ({ value }) =>
            value ? undefined : "Please select a product",
        }}
      >
        {(field) => {
          const selectedProduct = PRICE.find(
            (item) => item.item === field.state.value,
          );

          return (
            <div className={cn(`relative space-y-4`)}>
              <div className={cn(`space-y-2`)}>
                <label htmlFor="product" className={labelClass}>
                  Select Your Product
                </label>

                <select
                  id="product"
                  name="product"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={inputClass}
                >
                  {PRODUCT_OPTIONS.map((product) => (
                    <option
                      key={product}
                      value={product === "--select--" ? "" : product}
                      disabled={product === "--select--"}
                    >
                      {product}
                    </option>
                  ))}
                </select>

                {field.state.meta.errors.length > 0 && (
                  <p className={errorClass}>{field.state.meta.errors[0]}</p>
                )}
              </div>

              {/* Product Price */}
              {selectedProduct && (
                <div
                  className={cn(
                    `border-primary-200 bg-primary-50 flex items-center justify-between border p-4`,
                  )}
                >
                  <div>
                    <p className={cn(`text-accent-600 text-xs font-medium`)}>
                      Estimated Maximum Price
                    </p>

                    <p
                      className={cn(
                        `text-accent-900 mt-1 text-sm font-semibold`,
                      )}
                    >
                      {selectedProduct.item}
                    </p>
                  </div>

                  <div className={cn(`text-right`)}>
                    <div className={cn(`text-primary-600 text-2xl font-bold`)}>
                      ₹{selectedProduct.price.amount}
                    </div>

                    <div className={cn(`text-accent-500 text-xs`)}>
                      / {selectedProduct.price.quantityUnit}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        }}
      </form.Field>

      {/* Address */}
      <form.Field
        name="address"
        validators={{
          onChange: ({ value }) =>
            value.trim() ? undefined : "Address is required",
        }}
      >
        {(field) => (
          <div className={cn(`relative space-y-2`)}>
            <label htmlFor="address" className={labelClass}>
              Address
            </label>

            <textarea
              id="address"
              name="address"
              rows={3}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              className={cn(inputClass, `resize-none`)}
              placeholder="Enter your complete address"
            />

            {field.state.meta.errors.length > 0 && (
              <p className={errorClass}>{field.state.meta.errors[0]}</p>
            )}
          </div>
        )}
      </form.Field>

      {/* Landmark */}
      <form.Field name="landmark">
        {(field) => (
          <div className={cn(`space-y-2`)}>
            <label htmlFor="landmark" className={labelClass}>
              Landmark
            </label>

            <input
              id="landmark"
              name="landmark"
              type="text"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              className={inputClass}
              placeholder="Nearby landmark"
            />
          </div>
        )}
      </form.Field>

      {/* PIN + Floor */}
      <div className={cn(`grid grid-cols-1 gap-6 sm:grid-cols-2`)}>
        {/* PIN */}
        <form.Field
          name="pinCode"
          validators={{
            onChange: ({ value }) =>
              /^\d{6}$/.test(value)
                ? undefined
                : "Pincode must contain exactly 6 digits",
          }}
        >
          {(field) => (
            <div className={cn(`relative space-y-2`)}>
              <label htmlFor="pinCode" className={labelClass}>
                Pin Code
              </label>

              <input
                id="pinCode"
                type="text"
                name="pinCode"
                inputMode="numeric"
                maxLength={6}
                value={field.state.value}
                onChange={(e) =>
                  field.handleChange(e.target.value.replace(/\D/g, ""))
                }
                className={inputClass}
                placeholder="Enter 6 digit PIN code"
              />

              {field.state.meta.errors.length > 0 && (
                <p className={errorClass}>{field.state.meta.errors[0]}</p>
              )}
            </div>
          )}
        </form.Field>

        {/* Floor */}
        <form.Field
          name="floor"
          validators={{
            onChange: ({ value }) =>
              value.trim() ? undefined : "Floor is required",
          }}
        >
          {(field) => (
            <div className={cn(`relative space-y-2`)}>
              <label htmlFor="floor" className={labelClass}>
                Floor
              </label>

              <input
                id="floor"
                type="text"
                name="floor"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className={inputClass}
                placeholder="e.g. Ground, 1st, 2nd"
              />

              {field.state.meta.errors.length > 0 && (
                <p className={errorClass}>{field.state.meta.errors[0]}</p>
              )}
            </div>
          )}
        </form.Field>
      </div>

      {/* Schedule Pickup */}
      <div
        className={cn(`border-accent-300 dark:border-accent-700 border-t pt-6`)}
      >
        <div className={cn(`mb-5`)}>
          <h2 className={cn(`text-primary-600 text-lg font-bold sm:text-xl`)}>
            Schedule Your Pick Up
          </h2>

          <p className={cn(`text-accent-500 mt-1 text-xs`)}>
            Select your preferred pickup date and time.
          </p>
        </div>

        <div className={cn(`grid grid-cols-1 gap-6 sm:grid-cols-2`)}>
          {/* Date */}
          <form.Field
            name="pickupDate"
            validators={{
              onChange: ({ value }) =>
                value ? undefined : "Pickup date is required",
            }}
          >
            {(field) => (
              <div className={cn(`relative space-y-2`)}>
                <label htmlFor="pickupDate" className={labelClass}>
                  Date
                </label>

                <input
                  id="pickupDate"
                  type="date"
                  name="pickupDate"
                  min={new Date().toISOString().split("T")[0]}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={inputClass}
                />

                {field.state.meta.errors.length > 0 && (
                  <p className={errorClass}>{field.state.meta.errors[0]}</p>
                )}
              </div>
            )}
          </form.Field>

          {/* Time */}
          <form.Field
            name="pickupTime"
            validators={{
              onChange: ({ value }) =>
                value ? undefined : "Pickup time is required",
            }}
          >
            {(field) => (
              <div className={cn(`relative space-y-2`)}>
                <label htmlFor="pickupTime" className={labelClass}>
                  Time
                </label>

                <input
                  id="pickupTime"
                  type="time"
                  name="pickupTime"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={inputClass}
                />

                {field.state.meta.errors.length > 0 && (
                  <p className={errorClass}>{field.state.meta.errors[0]}</p>
                )}
              </div>
            )}
          </form.Field>
        </div>
      </div>

      {/* Price Information */}
      <div
        className={cn(
          `border-accent-300 bg-accent-50 text-accent-600 border p-4 text-xs`,
        )}
      >
        <p>
          The displayed price is the maximum estimated purchase price for the
          selected item. The final price may vary depending on the actual
          condition and inspection of the product.
        </p>
      </div>

      {/* Submit */}
      <form.Subscribe
        selector={(state) => ({
          isValid: state.isValid,
        })}
      >
        {(subscription) => (
          <button
            type="submit"
            disabled={!subscription.isValid}
            className={cn(
              `border-primary-600 bg-primary-500 hover:bg-primary-600 active:bg-primary-700 w-full border px-4 py-3 text-sm font-semibold tracking-wider text-white uppercase transition disabled:cursor-not-allowed disabled:opacity-50 sm:py-3.5`,
            )}
          >
            Schedule Pickup
          </button>
        )}
      </form.Subscribe>
    </form>
  );
}
