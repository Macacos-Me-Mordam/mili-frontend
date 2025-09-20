// src/hooks/use-toast.ts
import { toast } from 'react-hot-toast';

export function useToast() {
  const showToast = (message: string, options?: { type?: 'success' | 'error' }) => {
    switch (options?.type) {
      case 'success':
        toast.success(message);
        break;
      case 'error':
        toast.error(message);
        break;
      default:
        toast(message);
        break;
    }
  };

  return { toast: showToast };
}