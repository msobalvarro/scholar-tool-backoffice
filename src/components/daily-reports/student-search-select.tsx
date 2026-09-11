import { useState, useMemo, useRef, useEffect } from 'react'
import {
  Search,
  Check,
  ChevronsUpDown,
  X,
  Loader2,
  User,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { useStudents } from '@/hooks/API/use-students'

interface StudentSearchSelectProps {
  value?: string
  onChange: (value: string) => void
  error?: string
}

export const StudentSearchSelect = ({
  value,
  onChange,
  error,
}: StudentSearchSelectProps) => {
  const { data: studentsData, isLoading } = useStudents()
  const [searchTerm, setSearchTerm] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const students = useMemo(() => {
    return Array.isArray(studentsData) ? studentsData : []
  }, [studentsData])

  const selectedStudent = useMemo(() => {
    return students.find((s) => s._id === value)
  }, [students, value])

  const filteredStudents = useMemo(() => {
    if (!searchTerm.trim()) return students
    const term = searchTerm.toLowerCase().trim()
    return students.filter(
      (student) =>
        `${student.firstName} ${student.lastName}`.toLowerCase().includes(term) ||
        student.email?.toLowerCase().includes(term)
    )
  }, [students, searchTerm])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleSelect = (studentId: string) => {
    onChange(studentId === value ? '' : studentId)
    setIsOpen(false)
    setSearchTerm('')
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange('')
    setSearchTerm('')
  }

  const handleOpenSearch = () => {
    setIsOpen(true)
    setTimeout(() => {
      inputRef.current?.focus()
    }, 50)
  }

  return (
    <div className='space-y-2' ref={containerRef}>
      <label className='text-sm font-bold text-gray-700 ml-1 flex items-center gap-2'>
        <User className='w-4 h-4 text-blue-500' />
        Estudiante
      </label>

      {/* Tarjeta de Estudiante Seleccionado */}
      {selectedStudent && !isOpen ? (
        <div className='flex items-center justify-between p-3 rounded-2xl bg-blue-50/80 border border-blue-200 shadow-xs transition-all animate-in fade-in-50 duration-200'>
          <div className='flex items-center gap-3 min-w-0'>
            <Avatar className='w-10 h-10 border-2 border-white shadow-xs shrink-0'>
              <AvatarImage
                src={selectedStudent.photo}
                alt={`${selectedStudent.firstName} ${selectedStudent.lastName}`}
              />
              <AvatarFallback className='bg-blue-200 text-blue-800 font-bold text-xs'>
                {selectedStudent.firstName?.[0]}
                {selectedStudent.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
            <div className='flex flex-col min-w-0'>
              <div className='flex items-center gap-2'>
                <span className='font-semibold text-gray-900 text-sm truncate'>
                  {selectedStudent.firstName} {selectedStudent.lastName}
                </span>
                <span className='inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-100 text-blue-700'>
                  Seleccionado
                </span>
              </div>
              {selectedStudent.email && (
                <span className='text-xs text-gray-500 truncate'>
                  {selectedStudent.email}
                </span>
              )}
            </div>
          </div>

          <div className='flex items-center gap-1 shrink-0 ml-2'>
            <Button
              type='button'
              variant='ghost'
              size='sm'
              onClick={handleOpenSearch}
              className='h-8 px-2.5 text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-100/60 rounded-lg font-medium'
            >
              Cambiar
            </Button>

            <Button
              type='button'
              variant='ghost'
              size='icon'
              onClick={handleClear}
              className='h-8 w-8 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg'
              title='Quitar estudiante'
            >
              <X className='w-4 h-4' />
            </Button>
          </div>
        </div>
      ) : (
        /* Modo de búsqueda y selección con dropdown directo */
        <div className='relative'>
          <div className='relative'>
            <Search className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none' />
            <Input
              ref={inputRef}
              type='text'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsOpen(true)}
              placeholder={
                selectedStudent
                  ? `Buscar para cambiar: ${selectedStudent.firstName} ${selectedStudent.lastName}...`
                  : 'Buscar estudiante por nombre o correo...'
              }
              className={`pl-10 pr-10 rounded-xl bg-gray-50 border-none focus-visible:ring-2 focus-visible:ring-blue-500 h-11 text-sm ${
                error ? 'ring-2 ring-red-500' : ''
              }`}
            />
            {isOpen ? (
              <button
                type='button'
                onClick={() => setIsOpen(false)}
                className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 cursor-pointer'
              >
                <X className='w-4 h-4' />
              </button>
            ) : (
              <button
                type='button'
                onClick={handleOpenSearch}
                className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 cursor-pointer'
              >
                <ChevronsUpDown className='w-4 h-4' />
              </button>
            )}
          </div>

          {/* Menú desplegable flotante con scroll */}
          {isOpen && (
            <div className='absolute left-0 right-0 top-full mt-2 z-50 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 max-h-60 overflow-y-auto space-y-1 custom-scrollbar animate-in fade-in-50 zoom-in-95 duration-150'>
              {isLoading ? (
                <div className='flex items-center justify-center py-6 gap-2 text-sm text-gray-400'>
                  <Loader2 className='w-4 h-4 animate-spin text-blue-500' />
                  Cargando estudiantes...
                </div>
              ) : filteredStudents.length > 0 ? (
                filteredStudents.map((s) => {
                  const isSelected = value === s._id
                  return (
                    <div
                      key={s._id}
                      onClick={() => handleSelect(s._id)}
                      className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-blue-50 text-blue-900 font-medium'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div className='flex items-center gap-2.5 min-w-0'>
                        <Avatar className='w-8 h-8 shrink-0'>
                          <AvatarImage src={s.photo} />
                          <AvatarFallback className='bg-blue-100 text-blue-700 text-xs font-bold'>
                            {s.firstName?.[0]}
                            {s.lastName?.[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className='flex flex-col min-w-0'>
                          <span className='text-sm leading-tight font-medium truncate'>
                            {s.firstName} {s.lastName}
                          </span>
                          {s.email && (
                            <span className='text-xs text-gray-400 truncate'>{s.email}</span>
                          )}
                        </div>
                      </div>
                      {isSelected && <Check className='w-4 h-4 text-blue-600 shrink-0 ml-2' />}
                    </div>
                  )
                })
              ) : (
                <div className='text-center py-6 text-xs text-gray-400'>
                  No se encontraron estudiantes con "{searchTerm}"
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {error && (
        <p className='text-xs font-semibold text-red-500 mt-1 ml-1'>{error}</p>
      )}
    </div>
  )
}
