import * as React from 'react'

import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  wrapperClassName?: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, label, wrapperClassName, ...props }, ref) => {
  const id = React.useId()
  return (
    <fieldset className={cn(wrapperClassName)}>
      {label && (
        <Label htmlFor={`${id}-${label}`} className='mb-2.5 block'>
          {label}
          {props.required && <span className='text-destructive'> *</span>}
        </Label>
      )}
      <textarea
        className={cn(
          'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    </fieldset>
  )
})
Textarea.displayName = 'Textarea'

export { Textarea }
