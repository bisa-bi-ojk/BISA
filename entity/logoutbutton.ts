export interface LogoutButtonProps {
  className?: string
  onLogout?: () => void | Promise<void>
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}