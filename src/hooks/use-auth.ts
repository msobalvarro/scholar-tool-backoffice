import { useQuery, useQueryClient } from '@tanstack/react-query'
import { axiosInstance } from '@/adapters/axios-intance'
import { AxiosError } from 'axios'
import type { AuthMeResponse } from '@/dtos/outputs/auth-me-output'

export const AUTH_QUERY_KEY = ['auth', 'me'] as const

const fetchMe = async (): Promise<AuthMeResponse | null> => {
  try {
    const { data } = await axiosInstance.get<AuthMeResponse>('/auth/me')
    return data
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      return null
    }
    throw error
  }
}

export const useAuth = () => {
  const queryClient = useQueryClient()
  const { data, isLoading, isError } = useQuery({
    queryKey: AUTH_QUERY_KEY,
    queryFn: fetchMe,
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutos
  })

  const role = data?.user?.role ?? null

  /** Llama esto tras un login exitoso para que App.tsx reaccione sin recargar la página */
  const refresh = () => queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEY })

  return {
    isLoading,
    isError,
    isAuthenticated: !!data,
    role,
    isTeacher: role === 'teacher',
    isInstitution: role === 'institution',
    isAdmin: role === 'admin',
    refresh,
  }
}
