import { LucideIcon } from "lucide-react";
import { ComponentProps } from "react";

interface HomeSectionHeaderProps extends 
  ComponentProps<"div"> {
    icon: LucideIcon,
    title: string,
    description: string
  }

export default function HomeSectionHeader({
  description,
  icon: Icon,
  title,
  children
}: HomeSectionHeaderProps) {
  return (
    <div className="flex items-start mb-8" >
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-3">
          <Icon className="size-6 text-primary"/>
          <h2 className="text-3xl font-bold">{title}</h2>
        </div>
        <p className="text-muted-foreground text-lg">{description}</p>
      </div>
      {children}
    </div>
  )
}