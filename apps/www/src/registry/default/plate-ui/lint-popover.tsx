'use client';

import React, { useEffect } from 'react';

import { cn } from '@udecode/cn';
import {
  focusEditor,
  useEditorPlugin,
  useHotkeys,
} from '@udecode/plate-common/react';
import { useVirtualRefState } from '@udecode/plate-floating';
import {
  ExperimentalLintPlugin,
  useAnnotationSelected,
} from '@udecode/plate-lint/react';

import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from '@/registry/default/plate-ui/popover';
import { Toolbar, ToolbarButton } from '@/registry/default/plate-ui/toolbar';

export function LintPopover() {
  const { api, editor, setOption, tf, useOption } = useEditorPlugin(
    ExperimentalLintPlugin
  );
  const activeAnnotation = useOption('activeAnnotation');
  console.log(activeAnnotation);
  const selected = useAnnotationSelected();
  const toolbarRef = React.useRef<HTMLDivElement>(null);
  const firstButtonRef = React.useRef<HTMLButtonElement>(null);
  const [virtualRef] = useVirtualRefState({
    at: activeAnnotation?.range,
  });
  const suggestions = activeAnnotation?.suggest ?? [];
  const open = selected && !!virtualRef?.current && suggestions.length > 0;

  useEffect(() => {
    if (!selected) {
      setOption('activeAnnotation', null);
    }
  }, [selected, setOption]);

  useHotkeys(
    'ctrl+space',
    (e) => {
      if (api.lint.setSelectedactiveAnnotation()) {
        e.preventDefault();
      }
    },
    { enableOnContentEditable: true, enabled: !open }
  );

  useHotkeys(
    'enter',
    (e) => {
      const suggestion = activeAnnotation?.suggest?.[0];

      if (suggestion) {
        e.preventDefault();

        suggestion.fix({ goNext: true });
      }
    },
    { enableOnContentEditable: true, enabled: open }
  );

  useHotkeys(
    'down',
    (e) => {
      e.preventDefault();
      firstButtonRef.current?.focus();
    },
    { enableOnContentEditable: true, enabled: open }
  );
  useHotkeys(
    'up',
    (e) => {
      if (toolbarRef.current?.contains(document.activeElement)) {
        e.preventDefault();
        focusEditor(editor);
      }
    },
    { enableOnContentEditable: true, enabled: open }
  );

  useHotkeys(
    'tab',
    (e) => {
      if (tf.lint.focusNextMatch()) {
        e.preventDefault();
      }
    },
    { enableOnContentEditable: true, enabled: open }
  );

  useHotkeys(
    'shift+tab',
    (e) => {
      if (tf.lint.focusNextMatch({ reverse: true })) {
        e.preventDefault();
      }
    },
    { enableOnContentEditable: true, enabled: open }
  );

  return (
    <Popover open={open}>
      <PopoverAnchor virtualRef={virtualRef} />
      <PopoverContent
        className={cn(
          'w-auto !animate-none p-0',
          activeAnnotation?.data?.type !== 'emoji' && 'p-0'
        )}
        onCloseAutoFocus={(e) => {
          e.preventDefault();
          // focusEditor(editor);
        }}
        onEscapeKeyDown={(e) => {
          e.preventDefault();
          setOption('activeAnnotation', null);
        }}
        onOpenAutoFocus={(e) => {
          e.preventDefault();
        }}
      >
        <Toolbar
          ref={toolbarRef}
          className={cn(
            'flex gap-0.5',
            activeAnnotation?.data?.type === 'emoji' && 'px-2 py-1.5'
          )}
        >
          {suggestions.map((suggestion, index) => (
            <ToolbarButton
              key={index}
              ref={index === 0 ? firstButtonRef : undefined}
              className={cn(
                'px-1 font-normal',
                suggestion.data?.type === 'emoji' ? 'text-2xl' : 'text-sm'
              )}
              onClick={() => {
                suggestion.fix();
              }}
            >
              {suggestion.data?.text}
            </ToolbarButton>
          ))}
        </Toolbar>
      </PopoverContent>
    </Popover>
  );
}
