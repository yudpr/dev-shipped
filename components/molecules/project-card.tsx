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
import { projects, votes } from "@/db/schema";

export interface ProjectCardProps extends
  Pick<InferSelectModel<typeof projects>, 
    | "id" 
    | "name" 
    | "slug"
    | "description"
    | "tags"
    | "voteCount"
  > {
    isFeatured?: boolean,
    userVote: InferSelectModel<typeof votes>["voteType"] | null
  }

export default function ProjectCard({
  id,
  name,
  slug,
  description,
  tags,
  voteCount,
  isFeatured,
  userVote
}: ProjectCardProps) {
  return (
    <Card className="group card-hover hover:bg-primary-foreground/10 border-solid border-gray-400 min-h-44 relative">
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
              userVote={userVote}
              projectId={id}
            />
        </CardAction>
      </CardHeader>
      <CardFooter className="gap-2 border-0 bg-transparent scroll-fade-x overflow-y-auto scrollbar-none mx-(--card-spacing) p-0 relative z-10">
        {tags?.map(i => <Badge key={i} variant="secondary">{i}</Badge>)}
      </CardFooter>
      <Link href={`/projects/${slug}`} className="absolute inset-0 z-0">
        <span className="sr-only">Open {name}</span>
      </Link>
    </Card>
  )
}
