import { useState } from 'react'
import { NewItemButton, NewItemFormContainer, NewItemInput } from './styles'
import { useFocus } from './utils/useFocus'

type NewItemFormProps = {
  onAdd(text: String): void
}

export const NewItemForm = ({ onAdd }: NewItemFormProps) => {
  const [text, setText] = useState(' ')
  const inputRef = useFocus()

  // Add element after clicking on enter rather than on click button
  const handleAddText = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onAdd(text)
    }
  }

  return (
    <NewItemFormContainer>
      <NewItemInput
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyUp={handleAddText}
      />
      <NewItemButton onClick={() => onAdd(text)}>Create</NewItemButton>
    </NewItemFormContainer>
  )
}
