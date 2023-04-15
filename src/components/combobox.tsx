'use client';

import { useComposedRefs } from '@radix-ui/react-compose-refs';
import { createContext } from '@radix-ui/react-context';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { Check, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

import { selectTriggerStyle } from './ui/select';

interface ComboboxContextValue {
  width: string;
  setWidth: React.Dispatch<React.SetStateAction<string>>;
  name?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
const [ComboboxProvider, useComboboxContext] =
  createContext<ComboboxContextValue>('ComboboxContext');

interface ComboboxProps extends React.ComponentProps<typeof Popover> {
  name?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}
const Combobox = ({
  name,
  value: propValue,
  defaultValue: propDefaultValue,
  onChange: propOnChange,
  open: propOpen,
  defaultOpen: propDefaultOpen,
  onOpenChange: propOnOpenChange,
  placeholder,
  ...props
}: ComboboxProps) => {
  const [value = '', setValue] = useControllableState({
    prop: propValue,
    defaultProp: propDefaultValue,
    onChange: propOnChange,
  });

  const [open = false, setOpen] = useControllableState({
    prop: propOpen,
    defaultProp: propDefaultOpen,
    onChange: propOnOpenChange,
  });

  const onChange = React.useCallback(
    (value: string) => {
      setValue(value);
    },
    [setValue]
  );

  const onOpenChange = React.useCallback(
    (open: boolean) => {
      setOpen(open);
    },
    [setOpen]
  );

  const [width, setWidth] = React.useState('auto');

  return (
    <ComboboxProvider
      name={name}
      value={value}
      onChange={onChange}
      open={open}
      onOpenChange={onOpenChange}
      placeholder={placeholder}
      width={width}
      setWidth={setWidth}
    >
      <Popover open={open} onOpenChange={onOpenChange} {...props} />
    </ComboboxProvider>
  );
};

const ComboboxTrigger = React.forwardRef<
  React.ElementRef<typeof PopoverTrigger>,
  Omit<React.ComponentPropsWithoutRef<typeof PopoverTrigger>, 'asChild'> & { placeholder?: string }
>(({ className, children, placeholder: propPlaceHolder, ...props }, forwardedRef) => {
  const { placeholder = propPlaceHolder, setWidth, open } = useComboboxContext('ComboboxTrigger');
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const composedRef = useComposedRefs(forwardedRef, buttonRef);

  const handleWidth = React.useCallback(() => {
    if (buttonRef.current) {
      setWidth(buttonRef.current.getBoundingClientRect().width + 'px');
    }
  }, [setWidth]);

  React.useEffect(() => {
    window.addEventListener('resize', handleWidth);
    return () => {
      window.removeEventListener('resize', handleWidth);
    };
  }, [handleWidth]);

  React.useEffect(() => {
    if (open) {
      handleWidth();
    }
  }, [handleWidth, open]);

  return (
    <PopoverTrigger ref={composedRef} className={cn(selectTriggerStyle(), className)} {...props}>
      {children || <span className="text-gray-400">{placeholder}</span>}
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
>(
  (
    { className, children, placeholder: propPlaceHolder, emptyText, style: propStyle, ...props },
    forwardedRef
  ) => {
    const { placeholder = propPlaceHolder, width } = useComboboxContext('ComboboxContent');
    const style = React.useMemo(() => {
      return { ...propStyle, width } as React.CSSProperties;
    }, [propStyle, width]);

    return (
      <PopoverContent
        ref={forwardedRef}
        {...props}
        style={style}
        className={cn('w-auto p-0', className)}
      >
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandEmpty>{emptyText || 'No found.'}</CommandEmpty>
          <CommandGroup>{children}</CommandGroup>
        </Command>
      </PopoverContent>
    );
  }
);
ComboboxContent.displayName = 'ComboboxContent';

const ComboboxItem = React.forwardRef<
  React.ElementRef<typeof CommandItem>,
  React.ComponentPropsWithoutRef<typeof CommandItem>
>(({ className, children, onSelect: propOnSelect, ...props }, forwardedRef) => {
  const { value, onChange, onOpenChange } = useComboboxContext('ComboboxItem');
  const selected = value === children;

  const onSelect = React.useCallback(
    (value: string) => {
      if (typeof children === 'string') {
        onChange(children);
      }

      propOnSelect?.(value);
      onOpenChange(false);
    },
    [children, onChange, propOnSelect, onOpenChange]
  );

  return (
    <CommandItem ref={forwardedRef} className={className} onSelect={onSelect} {...props}>
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
