import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        'text-display-2xl',
        'text-display-xl',
        'text-heading-lg',
        'text-heading-md',
        'text-heading-sm',
        'text-body-lg',
        'text-body-md',
        'text-body-sm',
        'text-caption-xs',
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(...inputs));
}
