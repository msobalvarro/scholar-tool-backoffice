import type { HTMLAttributes } from 'react'

interface Props {
  title: string
  subtitle?: string
  classNameContainer?: HTMLAttributes<HTMLDivElement>['className']
}

export const TitlePageView = ({ title, subtitle, classNameContainer }: Props) => {
  return (
    <div className={`flex flex-col ${classNameContainer || ''}`}>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-1">{title}</h1>
      {subtitle && <p className='text-muted-foreground font-medium text-sm sm:text-base'>{subtitle}</p>}
    </div>
  )
}