import type { ReactNode } from 'react';
import { DragDropContext, type DragDropContextProps, type DropResult } from 'react-beautiful-dnd';

import { Draggable } from './Draggable';
import { Droppable } from './Droppable';

export type DragAndDropEvent = DropResult;

export type DragAndDropProps = DragDropContextProps;

export function DragAndDrop(props: DragAndDropProps): ReactNode {
  return <DragDropContext {...props} />;
}

DragAndDrop.Draggable = Draggable;
DragAndDrop.Droppable = Droppable;
