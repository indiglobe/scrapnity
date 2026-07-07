import { cn } from "@/lib/utils/cn";
import type { ComponentProps } from "react";

/**
 * A reusable layout wrapper that centers its children
 * both vertically and horizontally within the viewport.
 *
 * Uses a flex container with full viewport height (`h-svh`)
 * and full width.
 *
 * Additional `div` props and custom class names are supported.
 *
 * @param props - Standard HTML div props.
 *
 * @returns A flex container that centers its content.
 *
 * @example
 * ```tsx
 * <CenterContentWrapper>
 *   <Card />
 * </CenterContentWrapper>
 * ```
 *
 * @example
 * ```tsx
 * <CenterContentWrapper className="bg-muted">
 *   <Spinner />
 * </CenterContentWrapper>
 * ```
 */
export default function CenterContentWrapper({
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn(
        "flex h-svh w-full items-center justify-center",
        props.className,
      )}
    >
      {props.children}
    </div>
  );
}
