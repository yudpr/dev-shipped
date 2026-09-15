import React, { ComponentProps, useCallback, useState } from "react"
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
    .array(z.string())
    .refine(
      (items) => new Set(items).size === items.length, 
      { message: "All items must be unique" }
    )
})

interface OptionsStateErrorTrue {
  invalid: true
  errors: z.ZodError["issues"]
}

interface OptionsStateErrorFalse {
  invalid: false
}

type OptionsStateError = OptionsStateErrorTrue | OptionsStateErrorFalse

function useOptionsState(options: string[]) {
  const [ value, setValue ] = useState("")
  const initValidation = optionsSchema.safeParse({ options })
  const [ error, setError ] = useState<OptionsStateError>(() => {
    if (!initValidation.success) {
      return {
        invalid: true,
        errors: initValidation.error.issues
      }
    }
    return { invalid: false }
  })
  const [ state, setState ] = useState(() => {
    if (!initValidation.success) {
      return []
    }
    return initValidation.data.options
  })

  const setOptionsState = (newOption: string) => {
    const validation = optionsSchema.safeParse({ options: [...state, newOption] })
    if (!validation.success) {
      setError({
        invalid: true,
        errors: validation.error.issues
      })
    } else {
      setError({ invalid: false })
      setState(validation.data.options)
    }
  }

  const setInputValue = (newValue: string)  => {
    const validation = optionsSchema.safeParse({ options: [...state, newValue] })
    if (!validation.success) {
      setError({
        invalid: true,
        errors: validation.error.issues
      })
    } else {
      setError({ invalid: false })
    } 
    setValue(newValue)
  }

  return {
    options: state,
    setOptions: setOptionsState,
    ...error,
    setInputValue,
    inputValue: value
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
  const optionsState = useOptionsState(options)
  const anchor = useComboboxAnchor()

  return (
    <Combobox
      multiple
      autoHighlight
      items={optionsState.options}
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
        <CreateTagForm {...optionsState}/>
      </ComboboxContent>
    </Combobox>    
  )
}

type CreateTagFormProps = ReturnType<typeof useOptionsState>

function CreateTagForm({ 
  setOptions,
  inputValue,
  setInputValue,
  ...props
}: CreateTagFormProps) {

  const createTag = function () {
    if (!inputValue || props.invalid) return
    setOptions(inputValue)
    setInputValue("")
  }

  const handleChange: ComponentProps<typeof InputGroupInput>["onChange"] = function (e){
    setInputValue(e.target.value)
  }

  const handleKeydownEnter: ComponentProps<typeof InputGroupInput>["onKeyDown"]= function (e){
    e.key === "Enter" && createTag()
  }

  const handleClick = function (){
    createTag()
  }

  return (
    <div className="m-2">
      <Field data-invalid={props.invalid}>
        <InputGroup>
          <InputGroupInput 
            placeholder="Create a tag" 
            autoComplete="off"
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleKeydownEnter}
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton 
              variant="secondary" 
              type="button"
              onClick={handleClick}
            >
              +
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        { props.invalid && <FieldError errors={props.errors}/>}
      </Field>
    </div>
  )
}