import { GroupsStats } from '@/components/course/course-stats'
import { CourseList } from '@/components/course/course-list'
import { CourseDetail } from '@/components/course/course-details'
import { Button } from '@/components/ui/button'
import { Plus, Download } from 'lucide-react'
import { useCourses } from '@/hooks/API/use-course'
import { CreateCourseModal } from '@/components/course/create-course-modal'
import { useState } from 'react'
import { ViewContainer } from '@/components/ui/view-container'

export const CoursesView = () => {
  const { data: dataCourses } = useCourses()
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <ViewContainer>
      {/* Page Header */}
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8'>
        <div>
          <h1 className='text-4xl font-extrabold'>
            Grupos Académicos
          </h1>
          <p className='text-gray-500 text-lg font-medium'>
            Gestiona la asignación de estudiantes y profesores.
          </p>
        </div>
        <div className='flex items-center gap-3'>
          <Button variant='outline' className='rounded-xl border-gray-200 h-11 px-6 font-bold shadow-sm hover:bg-gray-50'>
            <Download className='w-5 h-5 mr-2' />
            Importar
          </Button>
          <Button
            className='rounded-xl h-11 px-6 font-bold shadow-lg shadow-blue-200 transition-all active:scale-95'
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className='w-5 h-5 mr-2' />
            Nuevo Grupo
          </Button>
        </div>
      </div>

      {/* Stats Section */}
      <GroupsStats />

      {/* Main Content Grid */}
      <div className='flex flex-col lg:flex-row gap-6 items-start'>
        {dataCourses && (
          <CourseList
            groups={dataCourses}
          />
        )}

        <CourseDetail />
      </div>

      <CreateCourseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </ViewContainer>
  )
}