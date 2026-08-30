import { ComponentProps } from "react";

interface FeatCardGroupProps extends
  ComponentProps<"div"> {}

export default function FeatCardGroup(props: FeatCardGroupProps) {
  return (
    <div className="grid-wrapper" {...props} />
  )
}