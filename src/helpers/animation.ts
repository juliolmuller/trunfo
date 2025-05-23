import { Children, type Key, type RefObject } from 'react';

export interface AnimatableElement {
  key: Key;
  ref: RefObject<HTMLElement>;
}

export function calculateBoundingBoxes<T extends AnimatableElement>(
  children: T[],
): Map<Key, DOMRect> {
  const boundingBoxes = new Map<Key, DOMRect>();

  Children.forEach(children, (child) => {
    const domNode = child.ref.current;
    const nodeBoundingBox = domNode?.getBoundingClientRect();

    if (nodeBoundingBox && child.key) {
      boundingBoxes.set(child.key, nodeBoundingBox);
    }
  });

  return boundingBoxes;
}
