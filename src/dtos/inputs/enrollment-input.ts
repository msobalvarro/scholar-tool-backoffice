import type { IEnrollment } from '../outputs/enrollment-output';

export type CreateEnrollmentPayload = Pick<
  IEnrollment,
  'name' | 'courses' | 'year' | 'enrolementPrice' | 'monthlyPaymentPrice'
>