export interface ResetPasswordFormProps {
  onSubmit?: (password: string, confirmPassword: string) => void | Promise<void>
  isLoading?: boolean
  error?: string
  success?: string
}
