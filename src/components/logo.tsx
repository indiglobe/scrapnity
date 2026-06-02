import { cn } from "@/lib/utils/cn";
import { Image } from "@unpic/react";
import type { ComponentProps } from "react";

export default function Logo({ className, ...props }: ComponentProps<"div">) {
  return (
    <div className={cn(`flex items-center`, className)} {...props}>
      <div className={cn(`size-12`)}>
        <Image
          src="/logo-icon-100x100.png"
          alt="logo icon"
          layout="fullWidth"
        />
      </div>
      <div className={cn(`h-12 w-36 max-sm:hidden`)}>
        <Image
          src="/logo-text-300x100.png"
          alt="logo text"
          layout="fullWidth"
        />
      </div>
    </div>
  );
}
