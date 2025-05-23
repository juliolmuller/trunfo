import type { ReactNode } from 'react';
import {
  Draggable as BeautifulDraggable,
  type DraggableProps as BeautifulDraggableProps,
} from 'react-beautiful-dnd';

export type DraggableProps = BeautifulDraggableProps;

export function Draggable(props: DraggableProps): ReactNode {
  return <BeautifulDraggable {...props} />;
}
