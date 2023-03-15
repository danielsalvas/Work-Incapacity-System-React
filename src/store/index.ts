import { create } from "zustand";

interface Store {
  isRegistering: boolean
  errorLogin: string
  setIsRegistering: (isRegistering: boolean) => void
  setErrorLogin: (errorLogin: string) => void
};

export const useStore = create<Store>((set, get) => ({
    isRegistering: false,
    errorLogin: '',
    setIsRegistering: (isRegistering) => set({ isRegistering: isRegistering }),
    setErrorLogin: (errorLogin) => set({ errorLogin: errorLogin }),
  }));