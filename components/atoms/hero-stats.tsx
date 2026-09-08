import { ComponentProps } from "react"
import { LucideIcon } from "lucide-react"
import { Card, CardTitle, CardContent } from "../ui/card"

interface HeroStatsProps {
  icon: LucideIcon,
  label: string,
  value: string
}

export default function HeroStats({
  icon: Icon,
  label,
  value
}: HeroStatsProps) {
  return (
    <Card className="bg-transparent ring-0 flex-col-reverse items-center gap-1">
      <CardTitle className="text-sm text-muted-foreground">{label}</CardTitle>
      <CardContent className="flex gap-2 items-center">
        <Icon className="size-5 text-primary/70"/>
        <span className="text-3xl sm:text-4xl font-bold">{value}</span>
      </CardContent>
    </Card>
  )
}