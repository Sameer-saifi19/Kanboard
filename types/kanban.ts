import { UniqueIdentifier } from "@dnd-kit/core"

export type Column = {
  id: UniqueIdentifier,
  title: string
}

export type Task = {
  id: UniqueIdentifier,
  ColumnId: UniqueIdentifier,
  title: string
}