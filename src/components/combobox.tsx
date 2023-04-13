'use client';

import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { Check, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

const Combobox = Popover;

const ComboboxTrigger = React.forwardRef<
  React.ElementRef<typeof PopoverTrigger>,
  Omit<React.ComponentPropsWithoutRef<typeof PopoverTrigger>, 'asChild'> & { placeholder?: string }
>(({ className, children, placeholder, ...props }, forwardedRef) => {
  return (
    <PopoverTrigger
      ref={forwardedRef}
      className={cn(
        'flex h-10 w-full items-center justify-between rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-50 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900',
        className
      )}
      {...props}
    >
      {children || placeholder}
      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
    </PopoverTrigger>
  );
});
ComboboxTrigger.displayName = 'ComboboxTrigger';

const ComboboxContent = React.forwardRef<
  React.ElementRef<typeof PopoverContent>,
  React.ComponentPropsWithoutRef<typeof PopoverContent> & {
    placeholder?: string;
    emptyText?: string;
  }
>(({ className, children, placeholder, emptyText, ...props }, forwardedRef) => {
  return (
    <PopoverContent ref={forwardedRef} {...props} className={cn('p-0', className)}>
      <Command>
        <CommandInput placeholder={placeholder} />
        <CommandEmpty>{emptyText || 'No found.'}</CommandEmpty>
        <CommandGroup>{children}</CommandGroup>
      </Command>
    </PopoverContent>
  );
});
ComboboxContent.displayName = 'ComboboxContent';

const ComboboxItem = React.forwardRef<
  React.ElementRef<typeof CommandItem>,
  React.ComponentPropsWithoutRef<typeof CommandItem> & { selected?: boolean }
>(({ className, children, selected, ...props }, forwardedRef) => {
  return (
    <CommandItem ref={forwardedRef} className={className} {...props}>
      <Check className={cn('mr-2 h-4 w-4', selected ? 'opacity-100' : 'opacity-0')} />
      {children}
    </CommandItem>
  );
});
ComboboxItem.displayName = 'ComboboxItem';

export {
  //
  Combobox,
  ComboboxTrigger,
  ComboboxContent,
  ComboboxItem,
};
