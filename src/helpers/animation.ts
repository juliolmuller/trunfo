import { Children, Key, RefObject } from 'react'

export interface AnimatableElement {
  key: Key
  ref: RefObject<any>
}

export function calculateBoundingBoxes<T extends AnimatableElement>(children: T[]) {
  const boundingBoxes = new Map<Key, any>()

  Children.forEach(children, (child) => {
    const domNode = child.ref.current
    const nodeBoundingBox = domNode.getBoundingClientRect()

    if (child.key) {
      boundingBoxes.set(child.key, nodeBoundingBox)
    }
  })

  return boundingBoxes
}
