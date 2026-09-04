import { Skeleton } from '@/components/ui/skeleton'

export const DailyReportRowSkeleton = () => (
  <tr className='border-b'>
    <td className='p-4'>
      <div className='flex items-center gap-2'>
        <Skeleton className='size-8 rounded-lg bg-gray-200 dark:bg-gray-700' />
        <div className='space-y-1'>
          <Skeleton className='h-3.5 w-24 rounded bg-gray-200 dark:bg-gray-700' />
          <Skeleton className='h-3 w-16 rounded bg-gray-200 dark:bg-gray-700' />
        </div>
      </div>
    </td>
    <td className='p-4'>
      <Skeleton className='h-6 w-20 rounded-md bg-gray-200 dark:bg-gray-700' />
    </td>
    <td className='p-4'>
      <div className='space-y-1'>
        <Skeleton className='h-4 w-32 rounded bg-gray-200 dark:bg-gray-700' />
        <Skeleton className='h-3 w-48 rounded bg-gray-200 dark:bg-gray-700' />
      </div>
    </td>
    <td className='p-4'>
      <Skeleton className='h-6 w-20 rounded-full bg-gray-200 dark:bg-gray-700' />
    </td>
    <td className='p-4 text-right'>
      <Skeleton className='h-4 w-20 ml-auto rounded bg-gray-200 dark:bg-gray-700' />
    </td>
    <td className='p-4 text-right'>
      <Skeleton className='h-4 w-16 ml-auto rounded bg-gray-200 dark:bg-gray-700' />
    </td>
  </tr>
)
