import type { representativeSchema } from '@/schemas/representative-schema'
import { z } from 'zod'

export type RepresentativeFormValues = z.infer<typeof representativeSchema>