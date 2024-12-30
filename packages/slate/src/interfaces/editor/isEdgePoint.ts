import { type Location, type Point, isEdge } from 'slate';

import type { TEditor } from './TEditor';

export const isEdgePoint = (editor: TEditor, point: Point, at: Location) =>
  isEdge(editor as any, point, at);
