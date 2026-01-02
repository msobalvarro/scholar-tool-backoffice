import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { axiosInstance } from '@/utils/axios-intance'
import type { AsignatureResponse, CreateAsignatureRequest, UpdateAsignatureRequest } from '@/utils/types'
import { useState } from 'react'
import { AxiosError } from 'axios'

export function useAsignatures(params?: Record<string, unknown>): ReturnType<typeof useQuery<AsignatureResponse[]>>

export function useAsignatures(id: string, params?: Record<string, unknown>): ReturnType<typeof useQuery<AsignatureResponse>>

export function useAsignatures(idOrParams?: string | Record<string, unknown>, params?: Record<string, unknown>) {
  const id = typeof idOrParams === 'string' ? idOrParams : undefined
  const queryParams = typeof idOrParams === 'object' ? idOrParams : params

  return useQuery({
    queryKey: ['asignatures', id, queryParams],
    queryFn: async () => {
      const url = id ? `/asignatures/${id}` : '/asignatures'
      const { data } = await axiosInstance.get<AsignatureResponse | AsignatureResponse[]>(url, { params: queryParams })
      return data
    }
  })
}

export const useAsignatureActions = () => {
  const [error, setError] = useState<string | null>(null)
  const queryClient = useQueryClient()

  const createAsignatureMutation = useMutation({
    mutationFn: async (asignature: CreateAsignatureRequest) => {
      setError(null)
      const { data } = await axiosInstance.post<AsignatureResponse>('/asignatures', asignature)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['asignatures'] })
    },
    onError: (error) => {
      const err = error instanceof AxiosError
        ? error.response?.data.message
        : String(error)
      setError(err)
    }
  })

  const updateAsignatureMutation = useMutation({
    mutationFn: async (asignature: UpdateAsignatureRequest) => {
      setError(null)
      const { data } = await axiosInstance.put<AsignatureResponse>(`/asignatures/${asignature._id}`, asignature)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['asignatures'] })
    },
    onError: (error) => {
      const err = error instanceof AxiosError
        ? error.response?.data.message
        : String(error)
      setError(err)
    }
  })

  const deleteAsignatureMutation = useMutation({
    mutationFn: async (_id: string) => {
      setError(null)
      const { data } = await axiosInstance.delete<AsignatureResponse>(`/asignatures/${_id}`)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['asignatures'] })
    },
    onError: (error) => {
      const err = error instanceof AxiosError
        ? error.response?.data.message
        : String(error)
      setError(err)
    }
  })

  return {
    error,
    postAsignature: createAsignatureMutation.mutateAsync,
    patchAsignature: updateAsignatureMutation.mutateAsync,
    deleteAsignature: deleteAsignatureMutation.mutateAsync,
    isLoading: createAsignatureMutation.isPending || updateAsignatureMutation.isPending || deleteAsignatureMutation.isPending
  }
}
