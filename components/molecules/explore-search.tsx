import { Compass, Rocket, Search, TrendingUp } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group";
import { ButtonGroup } from "../ui/button-group"
import { Button } from "../ui/button";
import { Marker, MarkerContent, MarkerIcon } from "../ui/marker";
import { Spinner } from "../ui/spinner";

export default function ExploreSearch() {
  return (
    <div className="space-y-5">
      <div className="flex justify-center">
        <ButtonGroup className="max-w-3xl flex-1 [&_button]:h-10">
          <InputGroup className="h-10">
            <InputGroupInput placeholder="Explore projects..." />
            <InputGroupAddon>
              <Compass />
            </InputGroupAddon>
            {/* Swap component logic will be implemented soon */}
            <InputGroupAddon align="inline-end" className="hidden sm:inline">12 results</InputGroupAddon>
            <InputGroupAddon align="inline-end" className="hidden sm:inline">
              <Spinner className="size-5 stroke-3"/>
            </InputGroupAddon>
          </InputGroup>
          <Button variant="outline" className="hidden sm:inline-flex">
            <TrendingUp data-icon="inline-start"/>
            Trending
          </Button>
          <Button variant="outline" className="hidden sm:inline-flex">
            <Rocket data-icon="inline-start"/>
            Recent
          </Button>
        </ButtonGroup>
      </div>
      <ButtonGroup className="sm:hidden">
        <Button variant="outline">
          <TrendingUp data-icon="inline-start"/>
          Trending
        </Button>
        <Button variant="outline">
          <Rocket data-icon="inline-start"/>
          Recent
        </Button>
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