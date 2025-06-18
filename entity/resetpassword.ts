export interface ResetPasswordFormProps {
  onSubmit?: (password: string, confirmPassword: string) => void
  isLoading?: boolean
}
