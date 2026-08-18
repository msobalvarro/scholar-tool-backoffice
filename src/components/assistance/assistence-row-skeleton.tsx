import { Skeleton } from '@/components/ui/skeleton'

export const AssistenceRowSkeleton = () => (
  <div className='flex items-center gap-3 py-3 px-2'>
    <Skeleton className='size-9 rounded-full bg-gray-200 dark:bg-gray-600' />
    <div className='flex-1 space-y-1.5'>
      <Skeleton className='h-3.5 w-40 rounded bg-gray-200 dark:bg-gray-600' />
      <Skeleton className='h-3 w-24 rounded bg-gray-200 dark:bg-gray-600' />
    </div>
    <Skeleton className='h-5 w-20 rounded-full bg-gray-200 dark:bg-gray-600' />
  </div>
)
