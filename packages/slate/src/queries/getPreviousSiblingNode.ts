import type { Path } from 'slate';

import last from 'lodash/last.js';

import { type TEditor, getNode } from '../interfaces';

export const getPreviousSiblingNode = (editor: TEditor, path: Path) => {
  const index = last(path)!;

  if (index > 0) {
    const previousSiblingIndex = index - 1;
    const previousSiblingPath = path
      .slice(0, -1)
      .concat([previousSiblingIndex]);
    const previousSiblingNode = getNode(editor, previousSiblingPath);

    return previousSiblingNode
      ? [previousSiblingNode, previousSiblingPath]
      : undefined;
  }
};
