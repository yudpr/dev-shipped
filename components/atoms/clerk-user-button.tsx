"use client";

import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Building } from "lucide-react";

export default function ClerkUserButton() {
  return (
    <div className="size-7">
      <UserButton>
        <UserButton.UserProfilePage
          label="Organizations"
          labelIcon={<Building className="size-4"/>}
          url="/organizations"
        >
          <div className="p-4">
            <h2>Manage Organization</h2>
            <OrganizationSwitcher
              hidePersonal={true}
              appearance={{
                elements: {
                  rootBox: "w-full"
                }
              }}
            />
          </div>
        </UserButton.UserProfilePage>
      </UserButton>
    </div>
  )
}