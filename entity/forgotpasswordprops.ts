export interface ForgotPasswordFormProps {
  onSubmit?: (email: string) => void | Promise<void>;
  isLoading?: boolean;
  error?: string;
  success?: string;
}
