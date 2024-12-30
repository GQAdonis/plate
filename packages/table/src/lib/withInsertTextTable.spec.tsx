/** @jsx jsxt */

import type { SlateEditor } from '@udecode/plate-common';

import { createPlateEditor } from '@udecode/plate-common/react';
import { jsxt } from '@udecode/plate-test-utils';

import { getTestTablePlugins } from './withNormalizeTable.spec';

jsxt;

describe('withInsertTextTable', () => {
  // https://github.com/udecode/editor-protocol/issues/65
  describe('cell child is a text', () => {
    it.each([{ disableMerge: true }, { disableMerge: false }])(
      'should wrap the children into a p (disableMerge: $disableMerge)',
      ({ disableMerge }) => {
        const input = (
          <editor>
            <htable>
              <htr>
                <htd>
                  <hp>
                    <anchor />a
                  </hp>
                </htd>
                <htd>
                  <hp>b</hp>
                </htd>
              </htr>
              <htr>
                <htd>
                  <hp>
                    c<focus />
                  </hp>
                </htd>
                <htd>
                  <hp>d</hp>
                </htd>
              </htr>
            </htable>
          </editor>
        ) as any as SlateEditor;

        const output = (
          <editor>
            <htable>
              <htr>
                <htd>
                  <hp>
                    <htext />
                  </hp>
                </htd>
                <htd>
                  <hp>b</hp>
                </htd>
              </htr>
              <htr>
                <htd>
                  <hp>e</hp>
                </htd>
                <htd>
                  <hp>d</hp>
                </htd>
              </htr>
            </htable>
          </editor>
        ) as any as SlateEditor;

        const editor = createPlateEditor({
          value: input.children,
    selection: input.selection,
          plugins: getTestTablePlugins({ disableMerge }),
        });

        editor.deleteFragment();
        editor.insertText('e');
        expect(editor.children).toMatchObject(output.children);
      }
    );
  });
});
