export interface AlertProps {
  title?: string;
  type?: 'success' | 'warning' | 'danger' | 'info';
  effect?: 'light' | 'dark';
  closeText?: string;
  closable?: boolean;
}
