import { ExplorePageProps } from "@/app/explore/page";
import ExploreSection from "../organisms/explore-section";
import Footer from "../organisms/footer";
import Header from "../organisms/header";

export default function ExplorePage (props: ExplorePageProps) {
  return (
    <>
      <Header />
      <ExploreSection {...props}/>
      <Footer />
    </>
  )
}