"use client";

import * as z from "zod";
import { 
  useForm,
  Controller,
  UseFormReturn,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { 
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
  FieldDescription
} from "../ui/field";
import { Input } from "../ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea
} from "../ui/input-group";
import { Button } from "../ui/button";
import { Sparkle } from "lucide-react";
import ProjectTagsCombobox from "../atoms/project-tags-combobox";
import { addProjectAction } from "@/lib/projects/project-actions";
import { Spinner } from "../ui/spinner";
import { toast } from "../ui/toast";
import { formSchema } from "./project-submit-form.schema";
import ProjectSlugInput from "../atoms/project-slug-input";

const formSchemaObj = formSchema.shape

const formFieldKeys = Object.keys(formSchemaObj) as Array<keyof typeof formSchemaObj>

type FormFieldKeysType = typeof formFieldKeys[number]

interface BaseFieldContentType {
  label: string,
  required?: boolean,
  placeholder?: string
  helper?: string
}

interface TextInputType extends
  BaseFieldContentType {
    type: "input",
  }

interface TextareaInputType extends
  BaseFieldContentType {
    type: "textarea",
    rows: number
  }

interface ComboboxInputType extends
  BaseFieldContentType {
    type: "combobox",
    options: string[],
  }

interface SlugInputType extends
  BaseFieldContentType {
    type: "slug",
  }

type FormFieldContentType = {
  [K in FormFieldKeysType]:  
    & { id: K, name: K } 
    & (
        | TextInputType 
        | TextareaInputType 
        | ComboboxInputType
        | SlugInputType
      )
}

const formFieldContents: FormFieldContentType = {
  name: {
    id: "name",
    name: "name",
    label: "Project Name",
    required: true,
    placeholder: "My Awesome Project",
    type: "input"
  },
  slug: {
    id: "slug",
    name: "slug",
    label: "Slug",
    required: true,
    placeholder: "my-awesome-project",
    type: "slug"
  },
  tagline: {
    id: "tagline",
    name: "tagline",
    label: "Tagline",
    required: true,
    placeholder: "A brief, catchy description",
    type: "textarea",
    rows: 3
  },
  description: {
    id: "description",
    name: "description",
    label: "Description",
    required: true,
    placeholder: "A detailed description of your project",
    type: "textarea",
    rows: 10
  },
  websiteUrl: {
    id: "websiteUrl",
    name: "websiteUrl",
    label: "Website URL",
    required: true,
    placeholder: "https://your-project.com",
    type: "input",
    helper: "Enter your project's website URL"
  },
  tags: {
    id: "tags",
    name: "tags",
    label: "Tags",
    required: true,
    placeholder: "Select one or more tags",
    type: "combobox",
    helper: "Select the available tags from selection or create and select your own tags",
    options: ["AI", "SaaS", "Productivity"],
  }
}

export type ProjectSubmitFormData = z.infer<typeof formSchema>

export default function ProjectSubmitForm() {
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

  
  async function onSubmit(data: ProjectSubmitFormData) {
    const result = await addProjectAction(data)

    if (!result.success) {
      toast.add({
        type: "error",
        description: result.error
      })  
      return
    }

    toast.add({
      type: "success",
      description: result.message
    })
  }

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={form.handleSubmit(onSubmit)} id="project-submit-form" className="mb-5">
        <FieldGroup>
          {
            formFieldKeys.map((k, index) => (
              <InputField key={index} form={form} content={formFieldContents[k]} />
            ))
          }
        </FieldGroup>
      </form>
      <Field>
        <Button type="submit" form="project-submit-form" size="lg" disabled={form.formState.isSubmitting}>
          {
            form.formState.isSubmitting
              ? <>
                  <Spinner className="size-4" data-icon="inline-start" />
                  Submitting
                </>
              : <>
                  <Sparkle className="size-4" data-icon="inline-start" />
                  Submit Project        
                </>
          }
        </Button>
      </Field>
    </div>
  )
}

interface InputFieldType {
  form: UseFormReturn<ProjectSubmitFormData>,
  content: FormFieldContentType[keyof FormFieldContentType]
}

function InputField({
  form,
  content: {  
    id, 
    name, 
    label, 
    helper, 
    required, 
    placeholder 
  },
  content
}: InputFieldType) {
  return (
    <Controller
      control={form.control}
      name={name}
      render={({field, fieldState}) => {
        let children

        switch (content.type) {
          case "input":
            children = (
              <Input
                {...field}
                id={id}
                aria-invalid={fieldState.invalid}
                placeholder={placeholder}
                required={required}
                autoComplete="off"
              />
            )
            break;
          case "textarea":
            const { rows } = content
            const maxLength = (formSchemaObj[name] as z.ZodString).maxLength || 0
            
            children = (
              <InputGroup>
                <InputGroupTextarea
                  {...field}
                  id={id}
                  aria-invalid={fieldState.invalid}
                  placeholder={placeholder}
                  required={required}
                  className="min-h-0 h-auto field-sizing-fixed"
                  rows={rows}
                />
                <InputGroupAddon align="block-end">
                  <InputGroupText>
                    {field.value.length}/{maxLength} characters
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            )
            break;
          case "combobox":
            const { options } = content
            children = (
              <ProjectTagsCombobox 
                options={options}
                placeholder={placeholder} 
                required
                onValueChange={field.onChange}
              />
            )
            break;
          case "slug": 
            children = (
              <ProjectSlugInput 
                {...field}
                id={id}
                aria-invalid={fieldState.invalid}
                placeholder={placeholder}
                required={required}
                formReactHook={form}
              />
            )
            break;
          default:
            break;
        }

        return (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={id}>{label}</FieldLabel>
            { children }
            { helper && <FieldDescription>{helper}</FieldDescription>}
            { fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
          </Field>
        )
      }}
    />
  )
}
