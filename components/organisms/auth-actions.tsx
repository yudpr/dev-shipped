import Link from "next/link";
import { ComponentProps } from "react";
import CustomButton from "../atoms/custom-button";
import { Rocket } from "lucide-react";

interface AuthActionsProps {
  hasAuth?: boolean
}

export default function AuthActions({
  hasAuth
}: AuthActionsProps) {
  let children

  if (hasAuth) {
    children = (
      <>
        <CustomButton href="/submit" asLink>
          <Rocket data-icon="inline-start"/>
          Submit Project
        </CustomButton>
        <div>User Icon</div>
      </>
    )
  } else {
    children = (
      <>
        <Link href="/sign-in" className="hover:underline">Sign In</Link>
        <CustomButton href="/sign-up" asLink>Sign Up</CustomButton>
      </>
    )
  }

  return (
    <div className="flex items-center gap-3">
      {children}
    </div>
  )
}