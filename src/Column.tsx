import { ColumnContainer, ColumnTitle } from './styles'
import { isHidden } from './utils/isHidden'
import { Card } from './Card'
import { AddNewItem } from './AddNewItem'
import { useAppState } from './state/AppStateContext'
import { useRef } from 'react'
import { useItemDrag } from './utils/useItemDrag'
import { useDrop } from 'react-dnd'
import { addTask, moveTask, moveList, setDraggedItem } from './state/action'
import { throttle } from 'throttle-debounce-ts'

type ColumnProps = {
  text: string
  id: string
  isPreview?: boolean
}

export const Column = ({ text, id, isPreview }: ColumnProps) => {
  const { draggedItem, getTasksByListId, dispatch } = useAppState()
  const tasks = getTasksByListId(id)
  const ref = useRef<HTMLDivElement>(null)
  const [, drop] = useDrop({
    accept: ['COLUMN', 'CARD'],
    hover: throttle(200, () => {
      if (!draggedItem) {
        return
      }
      if (draggedItem.type === 'COLUMN') {
        if (draggedItem.id === id) {
          return
        }

        dispatch(moveList(draggedItem.id, id))
      } else {
        if (draggedItem.columnId === id) {
          return
        }
        if (tasks.length) {
          return
        }

        dispatch(moveTask(draggedItem.id, null, draggedItem.columnId, id))
        dispatch(setDraggedItem({ ...draggedItem, columnId: id }))
      }
    }),
  })

  const { drag } = useItemDrag({ type: 'COLUMN', id, text })

  drag(drop(ref))

  return (
    <ColumnContainer
      isPreview={isPreview}
      ref={ref}
      isHidden={isHidden(draggedItem, 'COLUMN', id, isPreview)}
    >
      <ColumnTitle>{text}</ColumnTitle>
      {tasks.map((task) => (
        <Card columnId={id} text={task.text} key={task.id} id={task.id} />
      ))}
      <AddNewItem
        toggleButtonText="+ Add another card"
        onAdd={(text) => dispatch(addTask(text.toString(), id))}
        dark
      />
    </ColumnContainer>
  )
}
