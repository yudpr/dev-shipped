import { ComponentProps, useCallback, useEffect, useState } from "react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group";
import { Check, Lock, LockOpen, X } from "lucide-react";
import { Button } from "../ui/button";
import { checkSlugAvailability } from "@/lib/projects/project-actions";
import { UseFormReturn, useWatch } from "react-hook-form";
import { ProjectSubmitFormData } from "../molecules/project-submit-form";
import { formSchema } from "../molecules/project-submit-form.schema";
import { slugSchema } from "./project-slug-input.schema";
import { Field, FieldDescription } from "../ui/field";

function useSlugLiveChecking(formReactHook : UseFormReturn<ProjectSubmitFormData>) {
  /**
   * The following useState allows the user to enable or disable auto-fill slug
   * feature which reflects project name input value.
   */
  const [ autoFillEnabled, setAutoFillEnabled ] = useState(true)

  const handleAutoFillState: ComponentProps<"button">["onClick"] = useCallback(() => {
    setAutoFillEnabled(prev => !prev)
  }, [])

  /**
   * This state controls slug status visibility and message. Null means no
   * message, and if booleans shows either slug available or none.
   */
  const [ isSlugAvailable, setIsSlugAvailable ] = useState<boolean | null>(null)

  const checkSlugAvailable = useCallback(async (slug: string) => {
    if (!slug) {
      setIsSlugAvailable(null)
      return
    }
    const result = await checkSlugAvailability(slug)
    if (!result.success) {
      setIsSlugAvailable(false)
      return
    }
    setIsSlugAvailable(true)
  }, [])


  /**
   * Slug receives values from two sources, change event of its own component or
   * project name input value. These sources are toggled using auto-fill state.
   * The following logic controls input values from slug input component.
   * 
   * formSchema validates the input. In this case, it validates every changes
   * in the input.
   */
  const handleNoAutofillChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    /**
     * Pick only slug, instead of all fields, then check if valid
     */
    const validateSlug = formSchema.pick({slug: true}).safeParse({ slug: e.target.value })
    if (!validateSlug.success) {
      formReactHook.setError("slug", { 
        message: validateSlug.error.issues
          .reduce((accumulator, issue) => accumulator + issue.message + "; ", "")
      })
    } else {
      formReactHook.clearErrors("slug")
    }
    formReactHook.setValue("slug", e.target.value)
    await checkSlugAvailable(e.target.value) //this function needs to be at utmost bottom at least before any setValue calls to avoid insert failure
  }, [ checkSlugAvailable, formReactHook ])


  /**
   * The following logic controls input values of project name input. It tracks that value
   * using useWatch or alternatively using form.watch. 
   * 
   * slugSchema transforms the projectNameValue to slugify format.
   */
  const projectNameValue = useWatch({
    control: formReactHook.control,
    name: "name"
  })

  useEffect(() => {
    if (!autoFillEnabled) return
    (async () => {
      const validateSlug = slugSchema.safeParse({ slug: projectNameValue })
      formReactHook.setValue("slug", validateSlug.data?.slug || "")
      await checkSlugAvailable(validateSlug.data?.slug || "")
    })()
  }, [ autoFillEnabled, checkSlugAvailable, formReactHook, projectNameValue ])


  return {
    slugLiveChecking: {
      buttonElement: {
        onClick: handleAutoFillState,
      },
      inputElement: {
        onChange: handleNoAutofillChange
      }
    },
    slugLiveCheckingState: {
      isDisabled: autoFillEnabled,
      isSlugAvailable
    }
  }
}


/**
 * onChange removed because it uses custom onChange using useSlugLiveChecking.
 */
interface ProjectSlugInputProps extends
   Omit<ComponentProps<typeof InputGroupInput>, "onChange"> {
    formReactHook: UseFormReturn<ProjectSubmitFormData>
  }

export default function ProjectSlugInput({
  formReactHook,
  ...props
}: ProjectSlugInputProps) {
  const { slugLiveChecking, slugLiveCheckingState } = useSlugLiveChecking(formReactHook)
  return (
    <Field>
      <InputGroup>
        <InputGroupInput
          autoComplete="off"
          {...props}
          {...slugLiveChecking.inputElement}
          disabled={ slugLiveCheckingState.isDisabled }
        />
        <InputGroupAddon align="inline-end" className="z-50">
          <Button 
            variant="link"
            title={ slugLiveCheckingState.isDisabled ? "Unlock to edit slug manually" : "Lock slug to match title"}
            { ...slugLiveChecking.buttonElement }
          >
            {
              slugLiveCheckingState.isDisabled
                ? <Lock className="stroke-3" />
                : <LockOpen className="stroke-3"/>
            }
          </Button>
        </InputGroupAddon>
      </InputGroup>
      <FieldDescription className="flex items-center gap-1 text-xs font-semibold">
        {
          slugLiveCheckingState.isSlugAvailable !== null && (
            slugLiveCheckingState.isSlugAvailable
              ? <><Check className="size-3 stroke-4 stroke-green-500"/> Slug is available</>
              : <><X className="size-3 stroke-4 stroke-destructive"/> Slug is not available</>
          )
        }
      </FieldDescription>
    </Field>
  )
}
