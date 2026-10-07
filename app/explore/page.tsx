import ExplorePage from "@/components/pages/explore-page";

type Extends<T extends Target, Target> = T

type ExplorePageSearchParams = {
  searchParams: Promise<{ query?: string; sort?: "trending" | "recent" }>;
}

export type ExplorePageProps = Extends<
  ExplorePageSearchParams, 
  Record<string, PageProps<"/explore">["searchParams"]>
>

export default function Explore(props: ExplorePageProps) {
  return <ExplorePage {...props}/>
}
