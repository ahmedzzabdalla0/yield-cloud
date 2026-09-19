'use client';

import Clarity from '@microsoft/clarity';
import { useEffect } from 'react';

type ClarityProps = {
  projectId: string;
};

export function ClarityInit({ projectId }: ClarityProps) {
  useEffect(() => {
    if (projectId) Clarity.init(projectId);
  }, [projectId]);

  return null;
}
