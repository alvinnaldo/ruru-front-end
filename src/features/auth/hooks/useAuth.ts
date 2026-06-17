import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/authApi';
import { useAuthStore } from '../../../store/authStore';

export const useLogin = () => {
  const setUser = useAuthStore((state) => state.setUser);
  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      setUser(data.user);
    },
  });
};

export const useRegister = () => {
  const setUser = useAuthStore((state) => state.setUser);
  return useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      setUser(data.user);
    },
  });
};

export const useLogout = () => {
  const logoutStore = useAuthStore((state) => state.logout);
  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      logoutStore();
    },
  });
};
