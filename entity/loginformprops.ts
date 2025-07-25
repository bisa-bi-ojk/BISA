export interface LoginFormProps {
  onSubmit?: (email: string, password: string) => void | Promise<void>;
  isLoading?: boolean;
  error?: string;
}
