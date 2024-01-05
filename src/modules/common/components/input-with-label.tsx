import * as React from "react"
import { cn } from "../../../lib/util/cn"
import { FieldError, get } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  errors?: Record<string, unknown>
  touched?: Record<string, unknown>
  name: string
  label?: string
}

const InputWithLabel = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, errors, touched, label, type, ...props }, ref) => {
    const hasError = get(errors, props.name) && get(touched, props.name)
    return (
      <div>
        {(errors || label) && (
          <div className="flex items-center gap-2 p-1">
            <label htmlFor={props.name}>{label}</label>
            {hasError && (
              <ErrorMessage
                errors={errors}
                name={props.name}
                render={({ message }) => {
                  return (
                    <div className="pt-1 pl-2 text-rose-500 text-xsmall-regular">
                      <span>{message}</span>
                    </div>
                  )
                }}
              />
            )}
          </div>
        )}
        <input
          id={props.name}
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
InputWithLabel.displayName = "InputWithLabel"

export { InputWithLabel }
