import type { ReplaceNodeChildrenOptions } from './replaceNodeChildren';

import {
  type ElementOrTextOf,
  type TEditor,
  insertNodes,
  removeNodes,
  withoutNormalizing,
} from '../interfaces';

export const replaceNode = <
  N extends ElementOrTextOf<E>,
  E extends TEditor = TEditor,
>(
  editor: E,
  { at, insertOptions, nodes, removeOptions }: ReplaceNodeChildrenOptions<N, E>
) => {
  withoutNormalizing(editor, () => {
    removeNodes(editor, { ...removeOptions, at });

    insertNodes(editor, nodes, {
      ...insertOptions,
      at,
    });
  });
};
