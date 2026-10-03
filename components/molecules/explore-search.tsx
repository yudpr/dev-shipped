import { Compass, Rocket, Search, TrendingUp } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group";
import { ButtonGroup } from "../ui/button-group"
import { Button } from "../ui/button";
import { Marker, MarkerContent, MarkerIcon } from "../ui/marker";
import { Spinner } from "../ui/spinner";
import { UseExploreProject } from "../organisms/project-explorer";
import { ComponentProps } from "react";

export default function ExploreSearch(exploreProject: UseExploreProject["exploreProject"]) {
  return (
    <div className="space-y-5">
      <div className="flex justify-center">
        <ButtonGroup className="max-w-3xl flex-1 [&_button]:h-10">
          <InputGroup className="h-10">
            <InputGroupInput 
              placeholder="Explore projects..." 
              onChange={exploreProject.handleSearch} 
              defaultValue={exploreProject.searchParams.get("query")?.toString()}
            />
            <InputGroupAddon>
              <Compass />
            </InputGroupAddon>
            {/* Swap component logic will be implemented soon */}
            <InputGroupAddon align="inline-end" className="hidden sm:inline">12 results</InputGroupAddon>
            <InputGroupAddon align="inline-end" className="hidden sm:inline">
              <Spinner className="size-5 stroke-3"/>
            </InputGroupAddon>
          </InputGroup>
          <SortButtonInside
            onClick={() => {exploreProject.handleOrder("trending")}}
            aria-pressed={exploreProject.searchParams.get("sort") === "trending"}
          >
            <TrendingUp data-icon="inline-start"/>
            Trending
          </SortButtonInside>
          <SortButtonInside
            onClick={() => {exploreProject.handleOrder("recent")}}
            aria-pressed={exploreProject.searchParams.get("sort") !== "trending"}
          >
            <Rocket data-icon="inline-start"/>
            Recent
          </SortButtonInside>
        </ButtonGroup>
      </div>
      <ButtonGroup className="sm:hidden">
        <SortButtonOutside 
          onClick={() => {exploreProject.handleOrder("trending")}}
          aria-pressed={exploreProject.searchParams.get("sort") === "trending"}
        >
          <TrendingUp data-icon="inline-start"/>
          Trending
        </SortButtonOutside>
        <SortButtonOutside
          variant="outline" 
          onClick={() => {exploreProject.handleOrder("recent")}}
          aria-pressed={exploreProject.searchParams.get("sort") !== "trending"}
        >
          <Rocket data-icon="inline-start"/>
          Recent
        </SortButtonOutside>
      </ButtonGroup>
      {/* Swap component logic will be implemented soon */}
      <Marker variant="separator" className="sm:hidden">
        <MarkerIcon>
          <Search />
        </MarkerIcon>
        <MarkerContent className="text-sm font-medium text-muted-foreground">12 results</MarkerContent>
      </Marker>
      <Marker variant="separator" role="status" className="sm:hidden">
        <MarkerIcon>
          <Spinner />
        </MarkerIcon>
        <MarkerContent className="text-sm font-medium text-muted-foreground">Searching...</MarkerContent>
      </Marker>
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