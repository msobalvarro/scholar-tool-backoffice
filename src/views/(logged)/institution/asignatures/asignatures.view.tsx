import { useState, useMemo } from 'react'
import { useAsignatures, useAsignatureActions } from '@/hooks/API/use-asignatures'
import { AsignatureFilters } from '@/components/asignatures/asignature-filters'
import { AsignatureTable } from '@/components/asignatures/asignature-table'
import { AsignaturePagination } from '@/components/asignatures/asignature-pagination'
import { AsignatureForm } from '@/components/asignatures/asignature-form'
import { toast } from 'sonner'
import { CreateAsignatureDialog } from '@/components/asignatures/create-asignature-dialog'
import { ViewContainer } from '@/components/ui/view-container'
import type { AsignatureResponse } from '@/dtos/outputs/asignature-output'

export const AsignaturesView = () => {
  const { data: asignatures, isLoading: isLoadingList } = useAsignatures()
  const { patchAsignature, error: actionError, isLoading: isActionLoading } = useAsignatureActions()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedAsignature, setSelectedAsignature] = useState<AsignatureResponse | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'active' as 'active' | 'inactive'
  })

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 7

  const filteredData = useMemo(() => {
    if (!asignatures) return []
    const lowerQuery = searchQuery.toLocaleLowerCase()
    return asignatures.filter(a =>
      `${a.name} ${a.description}`.toLocaleLowerCase().includes(lowerQuery)
    )
  }, [asignatures, searchQuery])

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredData.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredData, currentPage])

  const handleEdit = (asignature: AsignatureResponse) => {
    setSelectedAsignature(asignature)
    setFormData({
      name: asignature.name,
      description: asignature.description,
      status: asignature.status
    })
  }

  const handleDeselect = () => {
    setSelectedAsignature(null)
    setFormData({
      name: '',
      description: '',
      status: 'active'
    })
  }

  const handleSave = async () => {
    if (!selectedAsignature) return
    try {
      await patchAsignature({
        _id: selectedAsignature._id,
        ...formData
      })
      toast.success('Asignatura actualizada exitosamente')
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <ViewContainer className='flex flex-col'>
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4'>
        <div>
          <h1 className='text-3xl font-extrabold text-[#111827]'>Gestión de Materias</h1>
          <p className='text-gray-500 mt-1 font-medium'>
            Administra las materias disponibles para los estudiantes.
          </p>
        </div>
        <CreateAsignatureDialog />
      </div>

      <div className='flex flex-col lg:flex-row gap-6'>
        {/* Left Column: List and Controls */}
        <div className='flex-1 flex flex-col gap-6'>
          <AsignatureFilters
            searchQuery={searchQuery}
            onSearchChange={(val) => {
              setSearchQuery(val)
              setCurrentPage(1)
            }}
          />

          <div className='bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden text-sm'>
            <AsignatureTable
              data={paginatedData}
              isLoading={isLoadingList}
              selectedId={selectedAsignature?._id}
              onEdit={handleEdit}
            />

            <AsignaturePagination
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              totalItems={filteredData.length}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>

        {/* Right Column: Edit/Create Sidebar */}
        <AsignatureForm
          formData={formData}
          onFormChange={setFormData}
          onSave={handleSave}
          onCancel={handleDeselect}
          isActionLoading={isActionLoading}
          error={actionError}
          selectedAsignature={selectedAsignature}
        />
      </div>
    </ViewContainer>
  )
}