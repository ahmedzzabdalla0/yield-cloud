'use client';

import { useEffect } from 'react';

type ClarityProps = {
  projectId: string;
};

export function ClarityInit({ projectId }: ClarityProps) {
  useEffect(() => {
    if (!projectId) return;
    const events = ['pointerdown', 'keydown', 'scroll'] as const;
    const load = () => {
      events.forEach((e) => window.removeEventListener(e, load));
      import('@microsoft/clarity').then((m) => m.default.init(projectId));
    };
    events.forEach((e) =>
      window.addEventListener(e, load, { once: true, passive: true })
    );
    return () => events.forEach((e) => window.removeEventListener(e, load));
  }, [projectId]);

  return null;
}
