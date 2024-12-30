import { type EditorPointOptions, point } from 'slate';

import type { At } from '../../types';
import type { TEditor } from './TEditor';

import { getAt } from '../../utils';

export const getPoint = (
  editor: TEditor,
  at: At,
  options?: EditorPointOptions
) => {
  try {
    return point(editor as any, getAt(editor, at)!, options as any);
  } catch {}
};
