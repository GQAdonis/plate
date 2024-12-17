import React from 'react';

import type { SlateLeafProps } from '@udecode/plate-common';

import { cn } from '@udecode/cn';
import { SlateLeaf } from '@udecode/plate-common';

export function KbdLeafStatic({
  children,
  className,
  ...props
}: SlateLeafProps) {
  return (
    <SlateLeaf
      {...props}
      as="kbd"
      className={cn(
        'rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-sm shadow-[rgba(255,_255,_255,_0.1)_0px_0.5px_0px_0px_inset,_rgb(248,_249,_250)_0px_1px_5px_0px_inset,_rgb(193,_200,_205)_0px_0px_0px_0.5px,_rgb(193,_200,_205)_0px_2px_1px_-1px,_rgb(193,_200,_205)_0px_1px_0px_0px] dark:shadow-[rgba(255,_255,_255,_0.1)_0px_0.5px_0px_0px_inset,_rgb(26,_29,_30)_0px_1px_5px_0px_inset,_rgb(76,_81,_85)_0px_0px_0px_0.5px,_rgb(76,_81,_85)_0px_2px_1px_-1px,_rgb(76,_81,_85)_0px_1px_0px_0px]',
        className
      )}
    >
      {children}
    </SlateLeaf>
  );
}
