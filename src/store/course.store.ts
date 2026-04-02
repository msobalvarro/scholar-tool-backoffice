import { create } from 'zustand'
import type { CourseStore } from '@/dtos/types'

export const useCourseStore = create<CourseStore>((set) => ({
  course: null,
  setCourse: (course) => set({ course }),
}))
