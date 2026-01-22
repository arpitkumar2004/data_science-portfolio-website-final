import { useToastContext } from '../components/ToastProvider';

export const useToast = () => {
  const { showToast } = useToastContext();
  return { showToast };
};
