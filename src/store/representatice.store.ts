import type { ResponsablePerson } from '@/dtos/types'
import { create } from 'zustand'

interface RepresentativeStore {
  representative: ResponsablePerson | null
  setRepresentative: (representative: ResponsablePerson) => void
  clearRepresentative: () => void
}

export const useRepresentativeStore = create<RepresentativeStore>((set) => ({
  representative: null,
  setRepresentative: (representative) => set({ representative }),
  clearRepresentative: () => set({ representative: null }),
}))