"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import SkeletonLoading from "./skeleton-loading";


interface ProjectCardLinkProps {
  slug: string,
  name: string
}

export default function ProjectCardLink(props: ProjectCardLinkProps) {
  return (
    <Suspense fallback={<SkeletonLoading className="absolute inset-0 z-0 rounded-xl"/>}>
      <ProjectCardLinkView {...props}/>
    </Suspense>
  )
}

function ProjectCardLinkView({
  name,
  slug
}: ProjectCardLinkProps) {
  const searchParams = useSearchParams()
  const currentParams = searchParams.toString()
  const returnParams = currentParams ? `?returnParams=${encodeURIComponent(currentParams)}` : ""

  return (
    <Link 
      href={`/projects/${slug}${returnParams}`} 
      className="absolute inset-0 z-0"
    >
      <span className="sr-only">Open {name}</span>
    </Link>
  )
}
