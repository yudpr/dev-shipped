import CustomButton from "../atoms/custom-button";
import { Rocket } from "lucide-react";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Suspense } from "react";
import SkeletonLoading from "../atoms/skeleton-loading";

function LoadingAuthActions() {
  return (
    <>
      <SkeletonLoading className="h-8 w-33.25"/>
      <SkeletonLoading className="size-7 rounded-full"/>
    </>
  )
}

export default function AuthActions() {
  return (
    <div className="flex items-center gap-3">
      <Suspense fallback={<LoadingAuthActions />}>
        <Show when="signed-in">
          <CustomButton href="/submit" asLink>
            <Rocket data-icon="inline-start"/>
            Submit Project
          </CustomButton>
          <div className="size-7">
            <UserButton />
          </div>
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
      </Suspense>
    </div>
  )
}