'use client';

import { Slottable } from '@radix-ui/react-slot';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from 'cn';
import * as React from 'react';

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn('flex flex-col gap-2', className)}
      {...props}
    />
  );
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      dir="auto"
      className={cn(
        'bg-muted inline-grid h-fit auto-cols-[1fr] grid-flow-col items-center gap-x-1.5 rounded-xl p-1.5',
        className
      )}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  children,
  hideIcon,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger> & {
  hideIcon?: boolean;
}) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        // layout
        'group relative inline-flex shrink-0 basis-0 cursor-pointer items-center justify-center gap-1.5',
        // spacing
        'rounded-lg px-3 py-1 sm:px-5 sm:py-2',
        // typography
        'text-body-sm font-medium whitespace-nowrap',
        // colors — default
        'text-muted-foreground transition-colors duration-200',
        // colors — active
        'data-[state=active]:bg-brand-800 data-[state=active]:text-white data-[state=active]:shadow-md',
        // colors — hover
        'hover:not-data-[state=active]:bg-brand-700/15 hover:not-data-[state=active]:text-foreground',
        // focus
        'focus-visible:ring-ring/50 outline-none focus-visible:ring-3',
        // disabled
        'disabled:pointer-events-none disabled:opacity-50',
        // icon
        hideIcon
          ? '[&_svg]:hidden'
          : '[&_svg]:pointer-events-none [&_svg]:hidden [&_svg]:shrink-0 data-[state=active]:[&_svg]:inline-block [&_svg:not([class*=size-])]:size-4',
        className
      )}
      {...props}
    >
      {!hideIcon && (
        <div className="w-1.25 group-data-[state=active]:hidden" aria-hidden />
      )}
      <Slottable>{children}</Slottable>
      {!hideIcon && (
        <div className="w-1.25 group-data-[state=active]:hidden" aria-hidden />
      )}
    </TabsPrimitive.Trigger>
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn('flex-1 outline-none', className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
