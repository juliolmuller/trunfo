import { List } from '@mui/material';
import {
  Children,
  type ReactElement,
  type ReactNode,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';

import { usePrevious } from '~/helpers';
import { type AnimatableElement, calculateBoundingBoxes } from '~/helpers';

type AnimatedChild = AnimatableElement & ReactElement;

export interface AnimatedListProps {
  children: ReactNode;
}

type BoundingBox = ReturnType<typeof calculateBoundingBoxes>;

export function AnimatedList({ children }: AnimatedListProps): ReactNode {
  const [prevBoundingBox, setPrevBoundingBox] = useState<BoundingBox>(new Map());
  const [boundingBox, setBoundingBox] = useState<BoundingBox>(new Map());
  const prevChildren = usePrevious(children);

  useLayoutEffect(() => {
    const childrenArray = Children.toArray(children) as AnimatedChild[];
    setBoundingBox(calculateBoundingBoxes(childrenArray));
  }, [children]);

  useLayoutEffect(() => {
    if (prevChildren) {
      const prevChildrenArray = Children.toArray(prevChildren) as AnimatedChild[];
      setPrevBoundingBox(calculateBoundingBoxes(prevChildrenArray));
    }
  }, [prevChildren]);

  useEffect(() => {
    const hasPrevBoundingBox = Object.keys(prevBoundingBox).length;
    const childrenArray = Children.toArray(children) as AnimatedChild[];

    if (prevBoundingBox && hasPrevBoundingBox) {
      childrenArray.forEach((child) => {
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
