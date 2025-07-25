export interface SignupFormProps {
  onSubmit?: (formData: {
    fullName: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
  }) => void | Promise<void>;
  isLoading?: boolean;
  error?: string;
  success?: string;
}
