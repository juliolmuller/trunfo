import List from '@mui/material/List'
import { Children, useEffect, useLayoutEffect, useState } from 'react'
import { usePrevious } from 'react-use'

import { calculateBoundingBoxes } from '~/helpers'

export interface AnimatedListProps {
  children: any[]
}

function AnimatedList({ children }: AnimatedListProps) {
  const [prevBoundingBox, setPrevBoundingBox] = useState<any>({})
  const [boundingBox, setBoundingBox] = useState<any>({})
  const prevChildren = usePrevious(children)

  useLayoutEffect(() => {
    setBoundingBox(calculateBoundingBoxes(children))
  }, [children])

  useLayoutEffect(() => {
    if (prevChildren) {
      setPrevBoundingBox(calculateBoundingBoxes(prevChildren))
    }
  }, [prevChildren])

  useEffect(() => {
    const hasPrevBoundingBox = Object.keys(prevBoundingBox).length

    if (prevBoundingBox && hasPrevBoundingBox) {
      Children.forEach(children, (child) => {
        const domNode = child.ref.current
        const firstBox = prevBoundingBox[child.key]
        const lastBox = boundingBox[child.key]
        const changeInY = firstBox.top - lastBox.top

        if (changeInY) {
          requestAnimationFrame(() => {
            // Before the DOM paints, invert child to old position
            domNode.style.transform = `translateY(${changeInY}px)`
            domNode.style.transition = 'transform 0s'
            requestAnimationFrame(() => {
              // After the previous frame, remove the transition to play the animation
              domNode.style.transform = ''
              domNode.style.transition = 'transform 500ms'
            })
          })
        }
      })
    }
  }, [boundingBox, prevBoundingBox, children])

  return <List>{children}</List>
}

export default AnimatedList
