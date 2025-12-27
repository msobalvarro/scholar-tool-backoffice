import { create } from 'zustand'
import type { CourseStore } from '@/utils/types'

export const useCourseStore = create<CourseStore>((set) => ({
  course: null,
  setCourse: (course) => set({ course }),
}))
