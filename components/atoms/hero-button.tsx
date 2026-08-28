import { ComponentProps } from "react";
import { VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

import { buttonVariants } from "../ui/button";
import Link from "next/link";

interface HeroButtonProps extends
  ComponentProps<typeof Link>,
  VariantProps<typeof buttonVariants> {}

export default function HeroButton({
  size="lg",
  className,
  variant,
  href="/",
  ...props
}: HeroButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ size, variant }),
        "text-base shadow-lg border-0",
        className
      )}
      {...props}
    />
  )
}