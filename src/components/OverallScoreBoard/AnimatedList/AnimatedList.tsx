import { List } from '@mui/material';
import { Children, type ReactNode, useEffect, useLayoutEffect, useState } from 'react';
import { usePrevious } from 'react-use';

import { type AnimatableElement, calculateBoundingBoxes } from '~/helpers';

type AnimatedChild = AnimatableElement & ReactNode;

export interface AnimatedListProps {
  children: AnimatedChild[];
}

type BoundingBox = ReturnType<typeof calculateBoundingBoxes>;

export function AnimatedList({ children }: AnimatedListProps): ReactNode {
  const [prevBoundingBox, setPrevBoundingBox] = useState<BoundingBox>(new Map());
  const [boundingBox, setBoundingBox] = useState<BoundingBox>(new Map());
  const prevChildren = usePrevious(children);

  useLayoutEffect(() => {
    setBoundingBox(calculateBoundingBoxes(children));
  }, [children]);

  useLayoutEffect(() => {
    if (prevChildren) {
      setPrevBoundingBox(calculateBoundingBoxes(prevChildren));
    }
  }, [prevChildren]);

  useEffect(() => {
    const hasPrevBoundingBox = Object.keys(prevBoundingBox).length;

    if (prevBoundingBox && hasPrevBoundingBox) {
      Children.forEach(children, (child) => {
        if (!child.ref.current) {
          return;
        }

        const domNode = child.ref.current;
        const firstBoxTop = prevBoundingBox.get(child.key)?.top ?? 0;
        const lastBoxTop = boundingBox.get(child.key)?.top ?? 0;
        const changeInY = firstBoxTop - lastBoxTop;

        if (changeInY) {
          requestAnimationFrame(() => {
            // Before the DOM paints, invert child to old position
            domNode.style.transform = `translateY(${changeInY}px)`;
            domNode.style.transition = 'transform 0s';
            requestAnimationFrame(() => {
              // After the previous frame, remove the transition to play the animation
              domNode.style.transform = '';
              domNode.style.transition = 'transform 500ms';
            });
          });
        }
      });
    }
  }, [boundingBox, prevBoundingBox, children]);

  return <List dense>{children}</List>;
}
