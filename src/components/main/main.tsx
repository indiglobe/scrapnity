import { cn } from "@/lib/utils/cn";
import type { ComponentProps } from "react";

export default function Main({ className, ...props }: ComponentProps<"main">) {
  return <main className={cn(`pt-12`, className)} {...props} />;
}
