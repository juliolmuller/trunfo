import { type ReactNode, useEffect, useState } from 'react';
import { type DroppableProps, Droppable as ReactBeautifulDroppable } from 'react-beautiful-dnd';

declare module 'react-beautiful-dnd' {
  /**
   * @deprecated
   * Native `Droppable` is not fully compatible with React v18. Use `~/components/Droppable` instead.
   */
  function Droppable(props: DroppableProps): ReactNode;
}

export { type DroppableProps };

export function Droppable(props: DroppableProps): ReactNode {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return (): void => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return <ReactBeautifulDroppable {...props} />;
}
