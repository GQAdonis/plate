'use client';

import React, { useMemo } from 'react';

import type {
  NodeWrapperComponent,
  PlateRenderElementProps,
} from '@udecode/plate-common/react';

import { isCollapsed, isElementEmpty } from '@udecode/plate-common';
import {
  ParagraphPlugin,
  createPlatePlugin,
} from '@udecode/plate-common/react';
import { useComposing, useFocused, useSelected } from 'slate-react';

const PlaceholderAboveNodes: NodeWrapperComponent = (props) => {
  const { editor, element, path } = props;

  const focused = useFocused();
  const selected = useSelected();
  const composing = useComposing();

  const placeholderProps = useMemo(() => {
    if (!composing) {
      if (
        path.length === 1 &&
        element.type === editor.getType(ParagraphPlugin) &&
        isCollapsed(editor.selection) &&
        focused &&
        selected &&
        isElementEmpty(editor, element)
      ) {
        return { placeholder: 'Type a paragraph' };
      }
      if (
        element.type === editor.getType({ key: 'h1' }) &&
        isElementEmpty(editor, element)
      ) {
        return { placeholder: 'Untitled' };
      }
    }
  }, [composing, editor, element, focused, path.length, selected]);

  if (!placeholderProps) return;

  return (props) => <Placeholder {...props} {...placeholderProps} />;
};

const Placeholder = (
  props: PlateRenderElementProps & { placeholder: string }
) => {
  const { children, nodeProps, placeholder } = props;

  return React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      className: child.props.className,
      nodeProps: {
        ...nodeProps,
        className:
          'before:absolute before:cursor-text before:opacity-30 before:content-[attr(placeholder)]',
        placeholder,
      },
    });
  });
};

export const BlockPlaceholderPlugin = createPlatePlugin({
  key: 'block-placeholder',
  render: {
    aboveNodes: PlaceholderAboveNodes,
  },
});
