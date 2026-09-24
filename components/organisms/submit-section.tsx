import { Sparkle } from "lucide-react";
import SectionHeader from "../molecules/section-header";
import ProjectSubmitForm from "../molecules/project-submit-form";

export default function SubmitSection() {
  return (
    <section className="py-20">
      <div className="wrapper">
        <SectionHeader
          title="Submit Your Project"
          icon={Sparkle}
          description="You can submit your project to our community. Your submission will be reviewed before going live."
        />
        <ProjectSubmitForm />
      </div>
    </section>
  )
}