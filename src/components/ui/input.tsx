import * as React from 'react'

import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  wrapperClassName?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, label, wrapperClassName, ...props }, ref) => {
  const id = React.useId()

  return (
    <fieldset className={cn(wrapperClassName)}>
      {label && (
        <Label htmlFor={`${id}-${label}`} className='mb-2.5 block'>
          {label}
          {props.required && <span className='text-destructive'> *</span>}
        </Label>
      )}

      <input
        id={`${id}-${label}`}
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-white px-3 py-1 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:py-1 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    </fieldset>
  )
})
Input.displayName = 'Input'

export { Input }
