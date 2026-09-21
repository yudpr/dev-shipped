import React, { ComponentProps, useCallback, useEffect, useRef, useState } from "react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group";
import { Check, Lock, LockOpen, X } from "lucide-react";
import { Button } from "../ui/button";
import { checkSlugAvailability } from "@/lib/projects/project-actions";
import { UseFormReturn, useWatch } from "react-hook-form";
import { type ProjectSubmitFormData } from "../molecules/project-submit-form";
import { formSchema } from "../molecules/project-submit-form.schema";
import { slugSchema } from "./project-slug-input.schema";
import { Field, FieldDescription } from "../ui/field";
import { useDebounce } from "use-debounce";
import { Spinner } from "../ui/spinner";

function useSlugLiveChecking(formReactHook : UseFormReturn<ProjectSubmitFormData>) {
  const requestId = useRef(0) //Acting as staleness guard.

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
  const [ isChecking, setIsChecking ] = useState(false)

  const checkSlugAvailable = useCallback(async (slug: string) => {
    const id = ++requestId.current

    if (!slug) {
      setIsSlugAvailable(null)
      setIsChecking(false)
      return
    }
    setIsChecking(true)
    setIsSlugAvailable(null)

    try {
      const result = await checkSlugAvailability(slug)
      
      if (id !== requestId.current) return

      setIsChecking(false)
      if (!result.success) {
        formReactHook.setError("slug", { message: result.error })
        return 
      }
      setIsSlugAvailable(result?.data?.isSlugAvailable ?? null)
    } catch {
      if (id === requestId.current) {
        formReactHook.setError("slug", { message:  "Network error occured. Please try again."})
        setIsChecking(false)
        setIsSlugAvailable(false)
      }
    }
  }, [ formReactHook ])


  /**
   * Slug receives values from two sources, change event of its own component or
   * project name input value. These sources are toggled using auto-fill state.
   * The following logic controls input values from slug input component.
   * 
   * formSchema validates the input. In this case, it validates every changes
   * in the input.
   */
  const handleNoAutofillChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    formReactHook.setValue("slug", e.target.value)
  }, [ formReactHook ])

  const slugValue = useWatch({
    control: formReactHook.control,
    name: "slug"
  })

  const [ debounceNoAutoFillSlug ] = useDebounce(slugValue, 400)

  useEffect(() => {
    if (autoFillEnabled) return
    (async () => {
      formReactHook.clearErrors("slug")
      /**
       * Pick only slug, instead of all fields, then check if valid
       */
      const validateSlug = formSchema.pick({slug: true}).safeParse({ slug: debounceNoAutoFillSlug })
      if (!validateSlug.success) {
        formReactHook.setError("slug", { 
          message: validateSlug.error.issues
            .reduce((accumulator, issue) => accumulator + issue.message + "; ", "")
        })
      }
      await checkSlugAvailable(debounceNoAutoFillSlug) //this function needs to be at utmost bottom at least before any setValue calls to avoid insert failure
    })()
  }, [ checkSlugAvailable, debounceNoAutoFillSlug, formReactHook, autoFillEnabled ])


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

  const [ debouncedSlug ] = useDebounce(projectNameValue, 400)

  useEffect(() => {
    if (!autoFillEnabled) return
    (async () => {
      formReactHook.clearErrors("slug")
      const validateSlug = slugSchema.safeParse({ slug: debouncedSlug })
      formReactHook.setValue("slug", validateSlug.data?.slug || "")
      await checkSlugAvailable(validateSlug.data?.slug || "")
    })()
  }, [ autoFillEnabled, checkSlugAvailable, formReactHook, debouncedSlug ])


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
      isSlugAvailable,
      isChecking
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
          aria-describedby="slug-status-viewer"
        />
        <InputGroupAddon align="inline-end">
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
      <FieldDescription 
        id="slug-status-viewer"
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="flex items-center gap-1 text-xs font-semibold"
      >
        {
          slugLiveCheckingState.isChecking
            ? <><Spinner className="size-3" aria-hidden="true"/><span className="italic font-medium">Loading...</span></>
            : ( slugLiveCheckingState.isSlugAvailable !== null && (
                  slugLiveCheckingState.isSlugAvailable
                    ? <><Check className="size-3 stroke-4 stroke-green-500"/> Slug is available</>
                    : <><X className="size-3 stroke-4 stroke-destructive"/> Slug is not available</>
              ))
        }
      </FieldDescription>
    </Field>
  )
}
