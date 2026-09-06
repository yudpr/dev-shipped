import { ComponentProps, ComponentPropsWithoutRef } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

import { buttonVariants, Button } from "../ui/button";
import Link from "next/link";

const customButtonVariants = cva(
  "",
  {
    variants: {
      intent: {
        hero: "text-base shadow-lg border-0",
        "section-header": "hidden sm:inline-flex ml-auto",
        link: "bg-transparent hover:bg-transparent cursor-pointer"
      }
    }
  }
)

interface BaseProps extends
  VariantProps<typeof buttonVariants>,
  VariantProps<typeof customButtonVariants> {}

interface LinkProps extends
  BaseProps,
  ComponentProps<typeof Link> { 
    asLink: true 
  }

interface ButtonProps extends
  BaseProps,
  ComponentProps<typeof Button> { 
    asLink?: false 
  }

type CustomButtonProps = LinkProps | ButtonProps

export default function CustomButton({
  className,
  variant,
  intent,
  size,
  ...props
}: CustomButtonProps) {

  if (props.asLink) {
    const {href, asLink, ...rest} = props

    return (
      <Link
        href={href}
        className={cn(
          buttonVariants({ variant, size }),
          customButtonVariants({ intent }),
          className
        )}
        {...rest}
      />
    )
  } else {
    const {asLink, ...rest} = props

    return (
      <Button 
        className={cn(
          buttonVariants({ variant, size }),
          customButtonVariants({ intent }),
          className
        )}
        {...rest}
      >
      </Button>
    )
  }
}