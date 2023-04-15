import type { AutocompleteCloseReason, UseAutocompleteProps } from '@mui/base/useAutocomplete';
import useAutocomplete from '@mui/base/useAutocomplete';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { ChevronsDownUp } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

import { selectTriggerStyle } from './select';

interface AutocompleteProps<
  T,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false
> extends UseAutocompleteProps<T, Multiple, DisableClearable, FreeSolo> {
  placeholder?: string;
  name?: React.InputHTMLAttributes<HTMLInputElement>['name'];
  className?: string;
  style?: React.CSSProperties;
  inputClassName?: React.InputHTMLAttributes<HTMLInputElement>['className'];
  inputStyle?: React.InputHTMLAttributes<HTMLInputElement>['style'];
  getListOptionLabel: (option: T) => string;
}

export const Autocomplete = <
  T,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false
>({
  placeholder,
  name,
  className,
  style,
  inputClassName,
  inputStyle,
  getListOptionLabel,
  openOnFocus = true,
  open: propOpen,
  onOpen: propOnOpen,
  onClose: propOnClose,
  ...props
}: AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>) => {
  const [open = false, setOpen] = useControllableState({
    prop: propOpen,
    defaultProp: false,
  });

  const onOpen = React.useCallback(
    (e: React.SyntheticEvent) => {
      setOpen(true);
      propOnOpen?.(e);
    },
    [propOnOpen, setOpen]
  );

  const onClose = React.useCallback(
    (e: React.SyntheticEvent, reason: AutocompleteCloseReason) => {
      setOpen(false);
      propOnClose?.(e, reason);
    },
    [propOnClose, setOpen]
  );

  const {
    //
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete<T, Multiple, DisableClearable, FreeSolo>({
    openOnFocus,
    open,
    onOpen,
    onClose,
    ...props,
  });

  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const [inputWidth, setInputWidth] = React.useState('auto');

  const widthStyle = React.useMemo(
    () => ({
      width: inputWidth,
    }),
    [inputWidth]
  );

  const handleInputWidth = React.useCallback(() => {
    if (wrapperRef.current) {
      setInputWidth(`${wrapperRef.current.getBoundingClientRect().width}px`);
    }
  }, [wrapperRef]);

  React.useEffect(() => {
    window.addEventListener('resize', handleInputWidth);
    return () => {
      window.removeEventListener('resize', handleInputWidth);
    };
  }, [handleInputWidth]);

  React.useEffect(() => {
    if (open) {
      handleInputWidth();
    }
  }, [handleInputWidth, open]);

  return (
    <>
      <div
        {...getRootProps()}
        ref={wrapperRef}
        style={style}
        className={cn(selectTriggerStyle(), className)}
      >
        <input
          {...getInputProps()}
          name={name}
          style={inputStyle}
          className={cn('h-full flex-1 bg-transparent outline-none', inputClassName)}
          placeholder={placeholder}
        />
        <button
          type="button"
          className="flex items-center justify-center"
          onClick={(e) => (open ? onClose(e, 'toggleInput') : onOpen(e))}
        >
          <ChevronsDownUp className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </button>
      </div>
      {groupedOptions.length > 0 ? (
        <ul
          {...getListboxProps()}
          style={widthStyle}
          className="absolute z-10 rounded-md border border-slate-100 bg-white p-2 text-slate-700 shadow-md dark:border-slate-800 dark:bg-slate-800 dark:text-slate-400"
        >
          {(groupedOptions as T[]).map((option, index) => (
            <li
              {...getOptionProps({ option, index })}
              className="cursor-default rounded-md px-2 py-1.5 text-sm data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&.Mui-focused]:bg-slate-100 dark:[&.Mui-focused]:bg-slate-700"
              key={index}
            >
              {getListOptionLabel(option)}
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
};
