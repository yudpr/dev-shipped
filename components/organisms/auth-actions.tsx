import Link from "next/link";
import { ComponentProps } from "react";
import CustomButton from "../atoms/custom-button";
import { Rocket } from "lucide-react";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

export default function AuthActions() {
  return (
    <div className="flex items-center gap-3">
      <Show when="signed-in">
        <CustomButton href="/submit" asLink>
          <Rocket data-icon="inline-start"/>
          Submit Project
        </CustomButton>
        <UserButton />
      </Show>
      <Show when="signed-out">
        <SignInButton>
          <CustomButton 
            variant="link" 
            intent="link"
          >
              Sign In
          </CustomButton>
        </SignInButton>
        <SignUpButton>
          <CustomButton>Sign Up</CustomButton>
        </SignUpButton>
      </Show>
    </div>
  )
}