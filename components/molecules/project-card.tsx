import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardFooter, 
  CardAction, 
  CardDescription  
} from "../ui/card";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { StarIcon } from "lucide-react";
import ProjectVoting from "./project-voting";
import { InferSelectModel } from "drizzle-orm";
import { projects } from "@/db/schema";

export interface ProjectCardProps extends
  InferSelectModel<typeof projects> {
    isFeatured?: boolean
  }

export default function ProjectCard({
  id,
  name,
  description,
  tags,
  voteCount,
  isFeatured
}: ProjectCardProps) {
  return (
    <Link href={`/projects/${id}`}>
      <Card className="group card-hover hover:bg-primary-foreground/10 border-solid border-gray-400 min-h-44">
        <CardHeader className="has-data-[slot=card-description]:grid-rows-[max-content_1fr]">
          <CardTitle className="text-lg group-hover:text-primary transition-colors truncate">{name}</CardTitle>
          <CardDescription className="line-clamp-3">{description}</CardDescription>
          <CardAction className="flex flex-col items-end gap-1">
              <div className="h-5">
                {
                  isFeatured && (
                      <Badge className="gap-1 bg-primary text-primary-foreground">
                        <StarIcon data-icon="inline-start" className="size-3 fill-current"/>
                        Featured
                      </Badge>
                    )
                }
              </div>
              <ProjectVoting 
                votes={voteCount}
                hasVoted={false}
              />
          </CardAction>
        </CardHeader>
        <CardFooter className="gap-2 border-0 bg-transparent scroll-fade-x overflow-y-auto scrollbar-none mx-(--card-spacing) p-0">
          {tags?.map(i => <Badge key={i} variant="secondary">{i}</Badge>)}
        </CardFooter>
      </Card>
    </Link>
  )
}