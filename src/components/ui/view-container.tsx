import { cn } from "@/lib/utils"

interface ViewContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function ViewContainer({ children, className, ...props }: ViewContainerProps) {
  return (
    <div
      className={cn(
        "p-8 animate-in fade-in duration-500",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
