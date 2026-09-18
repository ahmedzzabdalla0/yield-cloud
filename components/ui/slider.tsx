'use client';

import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from 'cn';
import * as React from 'react';

function Slider({
  className,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  return (
    <SliderPrimitive.Root
      data-slot="slider"
      min={min}
      max={max}
      className={cn(
        'relative flex w-full touch-none items-center select-none',
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-muted">
        <SliderPrimitive.Range className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block size-4 shrink-0 rounded-full border-2 border-primary bg-background shadow-xs outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50" />
    </SliderPrimitive.Root>
  );
}

export { Slider };
