'use client';

import * as SelectPrimitive from '@radix-ui/react-select';
import { AlertCircle, Check, ChevronDown } from 'lucide-react';
import * as React from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

type SelectInputOption = {
  value: string;
  label: string;
};

type SelectInputProps = Omit<
  React.ComponentProps<'input'>,
  'value' | 'onChange'
> & {
  label?: string;
  helperText?: string;
  errorText?: string;
  inputValue: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectValue: string;
  onSelectChange: (value: string) => void;
  options: SelectInputOption[];
};

function SelectInput({
  label,
  helperText,
  errorText,
  inputValue,
  onInputChange,
  selectValue,
  onSelectChange,
  options,
  className,
  id,
  ...inputProps
}: SelectInputProps) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;
  const invalid = Boolean(errorText);

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <label htmlFor={inputId} className="text-body-sm text-foreground">
          {label}
        </label>
      )}
      <div
        data-slot="select-input"
        data-invalid={invalid || undefined}
        className={cn(
          'border-input bg-background focus-within:border-ring focus-within:ring-ring/50 flex h-11 items-center overflow-hidden rounded-md border shadow-xs transition-colors focus-within:ring-3',
          invalid &&
            'border-destructive focus-within:border-destructive focus-within:ring-destructive/20'
        )}
      >
        <Input
          id={inputId}
          data-slot="select-input-field"
          aria-invalid={invalid || undefined}
          dir="ltr"
          className="h-full flex-1 rounded-none border-none bg-transparent shadow-none focus-visible:ring-0 ltr:text-left rtl:text-right"
          value={inputValue}
          onChange={onInputChange}
          {...inputProps}
        />
        <span aria-hidden className="bg-border w-px shrink-0 self-stretch" />
        <SelectPrimitive.Root
          value={selectValue}
          onValueChange={onSelectChange}
        >
          <SelectPrimitive.Trigger
            data-slot="select-input-trigger"
            className={cn(
              'text-body-md text-foreground data-placeholder:text-muted-foreground flex h-full shrink-0 items-center gap-1.5 px-3 outline-none rtl:flex-row-reverse',
              '[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4 [&>span:first-child]:select-none'
            )}
          >
            <SelectPrimitive.Value />
            <ChevronDown className="text-muted-foreground" />
          </SelectPrimitive.Trigger>
          <SelectPrimitive.Portal>
            <SelectPrimitive.Content
              position="popper"
              className="border-border bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 z-50 min-w-40 overflow-hidden rounded-md border shadow-md data-[side=bottom]:translate-y-1 data-[side=top]:-translate-y-1"
            >
              <SelectPrimitive.Viewport className="w-full min-w-(--radix-select-trigger-width) scroll-my-1 p-1">
                {options.map((opt) => (
                  <SelectPrimitive.Item
                    key={opt.value}
                    value={opt.value}
                    className="text-body-sm text-foreground data-highlighted:bg-muted data-highlighted:text-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-2 ps-2 pe-8 outline-none select-none data-disabled:pointer-events-none data-disabled:opacity-50"
                  >
                    <SelectPrimitive.ItemText>
                      {opt.label}
                    </SelectPrimitive.ItemText>
                    <span className="absolute inset-e-2 flex size-3.5 items-center justify-center">
                      <SelectPrimitive.ItemIndicator>
                        <Check className="text-primary size-4" />
                      </SelectPrimitive.ItemIndicator>
                    </span>
                  </SelectPrimitive.Item>
                ))}
              </SelectPrimitive.Viewport>
            </SelectPrimitive.Content>
          </SelectPrimitive.Portal>
        </SelectPrimitive.Root>
      </div>
      {errorText ? (
        <p className="text-body-sm text-destructive flex items-center gap-1">
          <AlertCircle className="size-3.5" />
          {errorText}
        </p>
      ) : helperText ? (
        <p className="text-body-sm text-muted-foreground">{helperText}</p>
      ) : null}
    </div>
  );
}

export { SelectInput };
export type { SelectInputOption };
