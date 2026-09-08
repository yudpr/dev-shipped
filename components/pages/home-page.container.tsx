import { getFeaturedProjects } from "@/lib/projects/project-select";
import { getRecentProjects } from "@/lib/projects/project-select";
import HomePageView from "./home-page.view";

export default async function HomePage() {
  const featuredProjects = await getFeaturedProjects()
  const recentProjects = await getRecentProjects()

  return <HomePageView 
    featuredProjects={featuredProjects} 
    recentProjects={recentProjects}/>
}