import Link from "next/link";
import { Ship } from "lucide-react";

export default function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-2">
      <div className="size-8 rounded-lg bg-primary flex items-center justify-center">
        <Ship className="size-4 text-primary-foreground"/>
      </div>
      <span className="text-xl font-bold">
        <span className="text-primary">dev</span>
        Shipped
      </span>
      
    </Link>
  )
}