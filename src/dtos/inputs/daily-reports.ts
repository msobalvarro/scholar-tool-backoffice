import type { Institution } from '../types';
import type { Student } from '../types/models';

export const TypeMovementType = {
  INCOME: 'Ingreso',
  EXPENSE: 'Egreso',
  CANCELLED: 'Cancelado',
} as const;
export type TypeMovementType = typeof TypeMovementType[keyof typeof TypeMovementType];

// Conceptos de Ingreso
export const IncomeConceptType = {
  ENROLLMENT_FEE: 'Matrícula',
  TUTION_FEES: 'Colegiatura',
  KIOSK_RENTAL: 'Alquiler de quiosco',
  DOCUMENT_REQUESTS: 'Solicitud de documentos',
  EXAM_RESCHEDULING: 'Recuperación de exámenes',
  TEXTBOOK_SALES: 'Venta de libros',
  UNIFORM_SALES: 'Venta de uniformes',
  OTHER_INCOME: 'Otros ingresos',
} as const;
export type IncomeConceptType = typeof IncomeConceptType[keyof typeof IncomeConceptType];

// Conceptos de Egreso
export const ExpenseConceptType = {
  ADMINISTRATIVE_EXPENSES: 'Gastos administrativos',
  OFFICE_EXPENSES: 'Gastos de oficina',
  BUILDING_MAINTENANCE: 'Mantenimiento de edificio',
  OTHER_EXPENSES: 'Otros gastos',
} as const;
export type ExpenseConceptType = typeof ExpenseConceptType[keyof typeof ExpenseConceptType];

// Conceptos Generales / Otros
export const OtherConceptType = {
  CANCELLED: 'Cancelado',
  OTHER: 'Otro',
} as const;
export type OtherConceptType = typeof OtherConceptType[keyof typeof OtherConceptType];

// Todos los conceptos agrupados
export const ConceptType = {
  ...IncomeConceptType,
  ...ExpenseConceptType,
  ...OtherConceptType,
} as const;
export type ConceptType = typeof ConceptType[keyof typeof ConceptType];


export interface IDailyReportStudentDto {
  institution: Institution
  date: Date
  type_movement: TypeMovementType
  concept: ConceptType
  description: string
  receipt_number: string
  income_recorded_amount?: number
  income_recorded_amount_usd?: number
  expense_amount?: number
  expense_amount_usd?: number
  student?: Student
}