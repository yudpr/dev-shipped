"use client";

import { Compass, Rocket, Search, TrendingUp } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group";
import { ButtonGroup } from "../ui/button-group"
import { Button } from "../ui/button";
import { Marker, MarkerContent, MarkerIcon } from "../ui/marker";
import { Spinner } from "../ui/spinner";
import { ChangeEvent, ComponentProps, useCallback, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { SearchParamsType } from "../organisms/project-explorer.schema";

function useSearchProject() {

  const searchParams = useSearchParams()

  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const pathname = usePathname()

  const handleSearch = useDebouncedCallback((e: ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams)
    const trimmedSearch = e.target.value.trim()
    if (trimmedSearch) {
      params.set("query", e.target.value)
    } else {
      params.delete("query")
    }
    
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    })
  }, 400)

  const [ sort, setSort ] = useState<SearchParamsType["sort"]>("recent")

  const handleOrder = useCallback((sortType: SearchParamsType["sort"]) => {
    const params = new URLSearchParams(searchParams)

    if (sortType) {
      params.set("sort", sortType)
    } else {
      params.delete("sort")
    }
    setSort(sortType)
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    })
  }, [searchParams])

  return {
    handleOrder,
    handleSearch,
    setSort,
    searchParams,
    state: {
      sort,
      isPending
    }
  }
}

export default function ExploreSearch({
  totalItems
}:{ totalItems?: number }) {
  const searchProject = useSearchProject()
  return (
    <div className="space-y-5">
      <div className="flex justify-center">
        <ButtonGroup className="max-w-3xl flex-1 [&_button]:h-10">
          <InputGroup className="h-10">
            <InputGroupInput 
              placeholder="Explore projects..." 
              onChange={searchProject.handleSearch} 
              defaultValue={searchProject.searchParams.get("query")?.toString()}
            />
            <InputGroupAddon>
              <Compass />
            </InputGroupAddon>
            {
              searchProject.state.isPending
                ? (
                    <InputGroupAddon align="inline-end" className="hidden sm:inline">
                      <Spinner className="size-5 stroke-3"/>
                    </InputGroupAddon>
                  )
                : totalItems && (
                    <InputGroupAddon align="inline-end" className="hidden sm:inline">
                      {totalItems} result(s)
                    </InputGroupAddon>
                  )
            }
          </InputGroup>
          <SortButtonInside
            onClick={() => {searchProject.handleOrder("trending")}}
            aria-pressed={searchProject.state.sort === "trending"}
          >
            <TrendingUp data-icon="inline-start"/>
            Trending
          </SortButtonInside>
          <SortButtonInside
            onClick={() => {searchProject.handleOrder("recent")}}
            aria-pressed={searchProject.state.sort !== "trending"}
          >
            <Rocket data-icon="inline-start"/>
            Recent
          </SortButtonInside>
        </ButtonGroup>
      </div>
      <ButtonGroup className="sm:hidden">
        <SortButtonOutside 
          onClick={() => {searchProject.handleOrder("trending")}}
          aria-pressed={searchProject.state.sort === "trending"}
        >
          <TrendingUp data-icon="inline-start"/>
          Trending
        </SortButtonOutside>
        <SortButtonOutside
          variant="outline" 
          onClick={() => {searchProject.handleOrder("recent")}}
          aria-pressed={searchProject.state.sort !== "trending"}
        >
          <Rocket data-icon="inline-start"/>
          Recent
        </SortButtonOutside>
      </ButtonGroup>
      {
        searchProject.state.isPending
          ? (
              <Marker variant="separator" role="status" className="sm:hidden">
                <MarkerIcon>
                  <Spinner />
                </MarkerIcon>
                <MarkerContent className="text-sm font-medium text-muted-foreground">Searching...</MarkerContent>
              </Marker>
            )
          : totalItems && (
              <Marker variant="separator" className="sm:hidden">
                <MarkerIcon>
                  <Search />
                </MarkerIcon>
                <MarkerContent className="text-sm font-medium text-muted-foreground">{totalItems} result(s)</MarkerContent>
              </Marker>
            )
      }
    </div>
  )
}

function SortButtonInside({
  ...props
}: ComponentProps<typeof Button>) {
  return (
    <Button
      variant="outline"
      className="hidden sm:inline-flex aria-pressed:bg-primary aria-pressed:text-white hover:bg-primary/30 aria-pressed:hover:bg-primary"
      {...props}
    />
  )
}

function SortButtonOutside({
  ...props
}: ComponentProps<typeof Button>) {
  return (
    <Button
      variant="outline"
      className="sm:inline-flex aria-pressed:bg-primary aria-pressed:text-white hover:bg-primary/30 aria-pressed:hover:bg-primary"
      {...props}
    />
  )
}
