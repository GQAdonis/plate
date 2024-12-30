import { type Location, type Point, isEnd } from 'slate';

import type { TEditor } from './TEditor';

export const isEndPoint = (
  editor: TEditor,
  point: Point | null | undefined,
  at: Location
) => !!point && isEnd(editor as any, point, at);
