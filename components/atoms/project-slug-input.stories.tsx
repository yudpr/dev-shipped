import { type Meta, type StoryObj } from "@storybook/nextjs-vite";
import ProjectSlugInput from "./project-slug-input";
import { useForm } from "react-hook-form";
import { type ProjectSubmitFormData } from "../molecules/project-submit-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "../molecules/project-submit-form.schema";

const meta = {
  title: "Atoms/Project Slug Input",
  component: ProjectSlugInput,
  render: () => {
    const form = useForm<ProjectSubmitFormData>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: "",
        slug: "",
        tagline: "",
        description: "",
        websiteUrl: "",
        tags: []
      }
    })
    return <ProjectSlugInput formReactHook={form}/>
  },
  tags: ["autodocs"]
} satisfies Meta<typeof ProjectSlugInput>

export default meta;

type Story = StoryObj<typeof ProjectSlugInput>

export const Default = {} satisfies Story
