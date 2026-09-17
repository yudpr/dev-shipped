import React, {
  ComponentProps,
  useCallback,
  useState
} from "react"
import { 
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "../ui/combobox"
import z from "zod"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../ui/input-group"
import { Field, FieldError } from "../ui/field"

const optionsSchema = z.object({
  options: z
    .array(z
      .string()
      .trim()
      .min(1, "Tag cannot be empty")
      .max(20, "Tag is too long")
    )
    .refine(
      (items) => new Set(items).size === items.length, 
      { message: "All items must be unique" }
    )
})

interface ComboboxOptionsStateErrorTrue {
  invalid: true
  errors: z.ZodError["issues"]
}

interface ComboboxOptionsStateErrorFalse {
  invalid: false
}

type ComboboxOptionsStateError = ComboboxOptionsStateErrorTrue | ComboboxOptionsStateErrorFalse

function useComboboxOptionsState(initOptions: string[]) {
  /**
   * Perform lazy initialization to insert intial options 
   * value to combobox options state and initialize error 
   * state based on that value validation.
   */
  const initOptionsValidation = optionsSchema.safeParse({ options: initOptions })
  const [ error, setError ] = useState<ComboboxOptionsStateError>(() => {
    if (!initOptionsValidation.success) {
      return {
        invalid: true,
        errors: initOptionsValidation.error.issues
      }
    }
    return { invalid: false }
  })

  const [ comboboxOptionsState, setComboboxOptionsState ] = useState(() => {
    if (!initOptionsValidation.success) {
      return []
    }
    return initOptionsValidation.data.options
  })

  /**
   * Controll and validate input value against the existing options
   */
  const [ inputValue, setInputValue ] = useState("")

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const controlledInputValue = e.target.value
    const controlledInputValidation = optionsSchema
      .safeParse({ options: [...comboboxOptionsState, controlledInputValue] })
    if (!controlledInputValidation.success) {
      setError({
        invalid: true,
        errors: controlledInputValidation.error.issues
      })
    } else {
      setError({ invalid: false })
    } 
    setInputValue(controlledInputValue)
  }, [comboboxOptionsState, setError, setInputValue])

  /**
   * Handle new combobox option creation through event listener
   */
  const createNewOption = useCallback((inputValue: string) => {
    const newOptionValidation = optionsSchema
      .safeParse({ options: [...comboboxOptionsState, inputValue] })

    if (!newOptionValidation.success) {
      setError({
        invalid: true,
        errors: newOptionValidation.error.issues
      })
    } else {
      setError({ invalid: false })
      setComboboxOptionsState(newOptionValidation.data.options)
      setInputValue("")
    }
  }, [comboboxOptionsState, setError, setComboboxOptionsState, setInputValue])

  const handleClick: ComponentProps<"button">["onClick"] = useCallback(() => {
    createNewOption(inputValue)
  }, [inputValue, createNewOption])

  const handleKeydownEnter = useCallback((e: React.KeyboardEvent<HTMLInputElement> ) => {
    if (e.key === "Enter") {
      createNewOption(inputValue)
    }
  }, [inputValue, createNewOption])

  return {
    comboboxOptions: {
      buttonElement: {
        onClick: handleClick
      },
      inputElement: {
        onChange: handleChange,
        onKeyDown: handleKeydownEnter,
        value: inputValue
      }
    },
    comboboxOptionsState: {
      ...error,
      data: comboboxOptionsState
    }
  }
}

interface ProjectTagsComboboxProps extends
  ComponentProps<typeof Combobox> {
    options: string[]
    placeholder?: string
  }

export default function ProjectTagsCombobox({
  options,
  placeholder,
  ...props
}:ProjectTagsComboboxProps) {
  const comboboxOptionsState = useComboboxOptionsState(options)
  const anchor = useComboboxAnchor()

  return (
    <Combobox
      multiple
      autoHighlight
      items={comboboxOptionsState.comboboxOptionsState.data}
      {...props}
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
                <ComboboxChipsInput placeholder={placeholder}/>
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
        <CreateTagForm {...comboboxOptionsState}/>
      </ComboboxContent>
    </Combobox>    
  )
}

type CreateTagFormProps = ReturnType<typeof useComboboxOptionsState>

function CreateTagForm({ 
  comboboxOptions,
  comboboxOptionsState
}: CreateTagFormProps) {
  return (
    <div className="m-2">
      <Field data-invalid={comboboxOptionsState.invalid}>
        <InputGroup>
          <InputGroupInput 
            placeholder="Create a tag" 
            autoComplete="off"
            {...comboboxOptions.inputElement}
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton 
              variant="secondary" 
              type="button"
              {...comboboxOptions.buttonElement}
            >
              +
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        { 
          comboboxOptionsState.invalid 
            && <FieldError errors={comboboxOptionsState.errors}/>
        }
      </Field>
    </div>
  )
}