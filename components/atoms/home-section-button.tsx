import { ComponentProps } from "react";
import { buttonVariants } from "../ui/button";

import Link from "next/link";
import { VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

interface HomeSectionButtonProps extends
  ComponentProps<typeof Link>,
  VariantProps<typeof buttonVariants> {}

export default function HomeSectionButton({
  className,
  href="/",
  variant="outline",
  size="lg",
  ...props
}: HomeSectionButtonProps) {
  return (
    <Link 
      href={href}
      className={
        cn(
          buttonVariants({variant, size}),
          "hidden sm:inline-flex ml-auto mt-5",
          className
        )
      }
      {...props}
    />
  )
}