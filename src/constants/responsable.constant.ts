import type { ResponsableType } from '@/dtos/types'

export const ResponsableTypeEnum = {
  MOTHER: 'mother',
  FATHER: 'father',
  GRANDFATHER: 'grandfather',
  UNCLE: 'uncle',
  OTHER: 'other',
} as const

export type ResponsableTypeEnum = typeof ResponsableTypeEnum[keyof typeof ResponsableTypeEnum]

export const RESPONSABLE_TYPE_TRANSLATIONS: Record<ResponsableType, string> = {
  [ResponsableTypeEnum.MOTHER]: 'Madre',
  [ResponsableTypeEnum.FATHER]: 'Padre',
  [ResponsableTypeEnum.GRANDFATHER]: 'Abuelo/a',
  [ResponsableTypeEnum.UNCLE]: 'Tío/a',
  [ResponsableTypeEnum.OTHER]: 'Otro',
}

export const getRepresentativeTypeTranslation = (type: ResponsableType): string => {
  return RESPONSABLE_TYPE_TRANSLATIONS[type] || ''
}

