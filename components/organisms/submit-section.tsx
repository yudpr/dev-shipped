import { Sparkle } from "lucide-react";
import SectionHeader from "../molecules/section-header";

export default function SubmitSection() {
  return (
    <section className="py-20">
      <div className="wrapper">
        <SectionHeader
          title="Submit Your Product"
          icon={Sparkle}
          description="You can submit your product to our community. Your submission will be reviewed before going live."
        />
      </div>
    </section>
  )
}