import * as React from "react"

const Alert = React.forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className="relative w-full rounded-lg border p-4"
    {...props}
  >
    {children}
  </div>
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className="mb-1 font-medium leading-none tracking-tight"
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className="text-sm [&_p]:leading-relaxed"
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }