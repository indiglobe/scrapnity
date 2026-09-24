import { create__OneCustomerUser } from "@/integrations/server-function/customer-user";
import { cn } from "@/lib/utils/cn";
import { tryCatch } from "@/utils/try-catch";
import { useForm } from "@tanstack/react-form";
import { useNavigate, useRouteContext } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";

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

export function CustomerForm() {
  const createOneCustomerUser = useServerFn(create__OneCustomerUser);

  const { session } = useRouteContext({
    from: "/(authenticated-routes)/(new-user)/become-a-customer/",
  });

  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      name: "",
      number: "",
      address: "",
      pinCode: "",
    },

    formId: "customer form",

    onSubmit: async ({ value }) => {
      const {
        user: { email },
      } = session;

      const [createOneCustomerUserError] = await tryCatch(
        createOneCustomerUser({
          data: {
            address: value.address,
            customerPinCode: value.pinCode,
            email: email,
            name: value.name,
            phoneNumber: value.number,
          },
        }),
      );

      if (createOneCustomerUserError) {
        console.log(createOneCustomerUserError);
        return;
      }

      navigate({ to: "/partner/customer" });
    },
  });

  const inputClass = cn(`
    border-accent-300 dark:border-accent-700 bg-background focus:border-primary-500 focus:ring-primary-500/20 w-full border px-4 py-3 text-sm transition-colors outline-none focus:ring-2
  `);

  const labelClass =
    cn(` text-accent-700 dark:text-accent-300 text-xs font-semibold tracking-wide uppercase sm:text-sm
  `);

  const errorClass =
    cn(` text-secondary-600 absolute top-[calc(100%+0.35rem)] left-1 text-xs font-medium
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
          Become Our Customer
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

      {/* PIN + Floor */}
      <div className={cn(`grid grid-cols-1 gap-6 sm:grid-cols-2`)}>
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
      </div>

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

      {/* Submit */}
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
            {subscription.isSubmitting ? "Registering..." : "Register"}
          </button>
        )}
      </form.Subscribe>
    </form>
  );
}
