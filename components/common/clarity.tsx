'use client';

import { useEffect } from 'react';

type ClarityProps = {
  projectId: string;
};

type IdleWindow = Window & {
  requestIdleCallback?: (callback: () => void) => number;
  cancelIdleCallback?: (handle: number) => void;
};

export function ClarityInit({ projectId }: ClarityProps) {
  useEffect(() => {
    if (!projectId) return;

    let cancelled = false;

    function load() {
      if (cancelled) return;
      import('@microsoft/clarity').then((mod) => {
        if (!cancelled) mod.default.init(projectId);
      });
    }

    const win = window as IdleWindow;
    const hasIdleCallback = typeof win.requestIdleCallback === 'function';

    const idleId: number = hasIdleCallback
      ? win.requestIdleCallback!(load)
      : window.setTimeout(load, 2000);

    return () => {
      cancelled = true;
      if (hasIdleCallback) {
        win.cancelIdleCallback?.(idleId);
      } else {
        window.clearTimeout(idleId);
      }
    };
  }, [projectId]);

  return null;
}
