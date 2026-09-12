"use client";

import * as z from "zod";
import { useForm, Controller, UseFormReturn, ControllerProps, UseControllerReturn, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Field, FieldGroup, FieldLabel, FieldError, FieldDescription } from "../ui/field";
import { Input } from "../ui/input";
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from "../ui/input-group";
import { Combobox, ComboboxChip, ComboboxChips, ComboboxChipsInput, ComboboxContent, ComboboxEmpty, ComboboxItem, ComboboxList, ComboboxValue, useComboboxAnchor } from "../ui/combobox";
import React from "react";

const formSchema = z.object({
  name: z 
    .string()
    .min(3, "Project Name must be at least 3 characters.")
    .max(100, "Project Name must be at most 100."),
  slug: z 
    .string()
    .min(3, "Slug must be at least 3 characters.")
    .max(100, "Slug must be at most 100.")
    // Enforce lowercase letters, numbers, and dashes only
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: "Slug must be lowercase, alphanumeric, and contain no spaces (dashes only)",
    }),
  tagline: z 
    .string()
    .min(5, "Tagline must be at least 5 characters.")
    .max(280, "Tagline must be at most 280."),
  description: z 
    .string()
    .min(5, "Description must be at least 5 characters.")
    .max(5000, "Description must be at most 5000."),
  websiteUrl: z
    .string(),
  tags: z
    .array(z.string().min(1).max(20))
    .min(1, "Please add at least one tag")
    .max(10, "You can only choose up to 10 tags")
})

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

type FormFieldContentType = {
  [K in FormFieldKeysType]:  
    & { id: K, name: K } 
    & (
        | TextInputType 
        | TextareaInputType 
        | ComboboxInputType
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
    type: "input"
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
    placeholder: "tag1, tag2, ...",
    type: "combobox",
    helper: "Select the available tags from selection or add more using comma-separated tags (e.g., AI, SaaS, Productivity)",
    options: ["AI", "SaaS", "Productivity"],
  }
}

export default function ProjectSubmitForm() {
  const form = useForm<z.infer<typeof formSchema>>({
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

  function onSubmit() {
    // toast
  }

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          {
            formFieldKeys.map((k, index) => (
              <InputField key={index} form={form} content={formFieldContents[k]} />
            ))
          }
        </FieldGroup>
      </form>
    </div>
  )
}

interface InputFieldType {
  form: UseFormReturn<z.infer<typeof formSchema>>,
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
            const anchor = useComboboxAnchor()

            children = (
              <Combobox
                multiple
                autoHighlight
                items={options}
              >
                <ComboboxChips
                  ref={anchor}
                  className="w-full max-w-xs"
                >
                  <ComboboxValue>
                    {
                      (values) => (
                        <React.Fragment>
                          {
                            values.map((v: string) => (
                              <ComboboxChip key={v}>{v}</ComboboxChip>
                            ))
                          }
                          <ComboboxChipsInput placeholder={placeholder} />
                        </React.Fragment>
                      )
                    }
                  </ComboboxValue>
                </ComboboxChips>
                <ComboboxContent anchor={anchor}>
                  <ComboboxEmpty>No items found.</ComboboxEmpty>
                  <ComboboxList>
                    {(item) => (
                      <ComboboxItem 
                        key={item} 
                        value={item}
                      >
                        {item}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
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