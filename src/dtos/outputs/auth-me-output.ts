export interface AuthMeResponse {
  user: {
    role: string
    [key: string]: unknown
  }
}