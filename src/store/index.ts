import { create } from "zustand";

interface Store {
  isRegistering: boolean;
  error: string;
  setIsRegistering: (isRegistering: boolean) => void;
  setError: (error: string) => void;
}

export const useStore = create<Store>((set, get) => ({
  isRegistering: false,
  error: "",
  setIsRegistering: (isRegistering) => set({ isRegistering: isRegistering }),
  setError: (error) => set({ error: error }),
}));
