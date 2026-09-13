import React, { ComponentProps, useState } from "react"
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
  useComboboxAnchor 
} from "../ui/combobox"

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
  const [ optionsState, setOptionsState ] = useState(options)
  const anchor = useComboboxAnchor()

  return (
    <Combobox
      multiple
      autoHighlight
      items={optionsState}
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
      </ComboboxContent>
    </Combobox>    
  )
}