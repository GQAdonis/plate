import React from 'react';

import type { SlateElementProps } from '@udecode/plate-common';
import type { TColumnElement } from '@udecode/plate-layout';

import { cn } from '@udecode/cn';
import { SlateElement } from '@udecode/plate-common';

export function ColumnElementStatic({
  children,
  className,
  element,
  ...props
}: SlateElementProps) {
  const { width } = element as TColumnElement;

  return (
    <SlateElement
      className={cn(className, 'border border-transparent p-1.5')}
      style={{ width: width ?? '100%' }}
      element={element}
      {...props}
    >
      {children}
    </SlateElement>
  );
}
