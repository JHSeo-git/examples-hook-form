import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

interface HelperTextProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof helperTextVariants> {}

export const HelperText = React.forwardRef<HTMLSpanElement, HelperTextProps>(
  ({ className, status, ...props }, forwardedRef) => {
    return (
      <span
        ref={forwardedRef}
        className={cn(helperTextVariants({ status }), className)}
        {...props}
      />
    );
  }
);

const helperTextVariants = cva('text-xs font-medium', {
  variants: {
    status: {
      info: 'text-slate-500 dark:text-slate-400',
      error: 'text-red-500 dark:text-red-400',
      success: 'text-green-500 dark:text-green-400',
      warning: 'text-yellow-500 dark:text-yellow-400',
    },
  },
});

HelperText.displayName = 'HelperText';
