"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import SkeletonLoading from "./skeleton-loading";

export default function ProjectReturnLink() {
  return (
    <Suspense fallback={<SkeletonLoading className="mb-8 h-6 w-[134.61px]"/>}>
      <ProjectReturnLinkView />
    </Suspense>
  )
}

function ProjectReturnLinkView() {
  const searchParams = useSearchParams()
  const returnParams = searchParams.get("returnParams")
  const decodedReturnParams = returnParams ? decodeURIComponent(returnParams) : ""

  return (
    <Link 
      href={`/explore?${decodedReturnParams}`}
      className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
      scroll={false}
    >
      <ArrowLeft className="size-4"/>
      Back to Explore
    </Link>
  )
}
