"use client"

import * as React from "react"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  children: React.ReactNode
}

export function Stepper({ value, children, className, ...props }: StepperProps) {
  const childrenArray = React.Children.toArray(children)
  const steps = childrenArray.filter((child) => React.isValidElement(child) && child.type === Step)

  return (
    <div className={cn("flex items-center w-full", className)} {...props}>
      {steps.map((step, index) => {
        const isCompleted = index < value
        const isCurrent = index === value

        return (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center flex-1">
              <div
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors",
                  isCompleted
                    ? "bg-primary border-primary text-primary-foreground"
                    : isCurrent
                      ? "border-primary text-primary"
                      : "border-muted-foreground text-muted-foreground",
                )}
              >
                {isCompleted ? <CheckIcon className="h-4 w-4" /> : <span>{index + 1}</span>}
              </div>
              <span
                className={cn(
                  "text-xs mt-2 text-center",
                  isCurrent ? "text-primary font-medium" : isCompleted ? "text-primary" : "text-muted-foreground",
                )}
              >
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={cn("h-[2px] flex-1 mx-2", index < value ? "bg-primary" : "bg-muted")} />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}

interface StepProps {
  children: React.ReactNode
}

export function Step({ children }: StepProps) {
  return <>{children}</>
}

