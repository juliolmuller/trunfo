import { Children, Key, RefObject } from 'react'

export interface AnimatableElement {
  key: Key
  ref: RefObject<any>
}

export function calculateBoundingBoxes<T extends AnimatableElement>(children: T[]) {
  const boundingBoxes: Record<Key, HTMLElement> = {}

  Children.forEach(children, (child) => {
    const domNode = child.ref.current
    const nodeBoundingBox = domNode.getBoundingClientRect()

    if (child.key) {
      boundingBoxes[child.key] = nodeBoundingBox
    }
  })

  return boundingBoxes
}
