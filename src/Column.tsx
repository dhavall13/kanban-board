import { AddNewItem } from './AddNewItem'
import { Card } from './Card'
import { ColumnContainer, ColumnTitle } from './styles'

type ColumnProps = {
  text: String
}

export const Column = ({ text }: ColumnProps) => {
  return (
    <ColumnContainer>
      <ColumnTitle>{text}</ColumnTitle>
      <Card text="Geneate app scalforld" />
      <Card text="Testing javascript" />
      <Card text="creating kanban board" />
      <AddNewItem
        toggleButtonText="+ Add another card "
        onAdd={console.log}
        dark
      />
    </ColumnContainer>
  )
}
