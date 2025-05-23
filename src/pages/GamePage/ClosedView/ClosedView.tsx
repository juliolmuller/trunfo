import { type ReactNode } from 'react';

import { Section } from '~/components';

export function ClosedView(): ReactNode {
  return (
    <Section fullWidth maxWidth="sm">
      <h1>Closed View</h1>
    </Section>
  );
}
