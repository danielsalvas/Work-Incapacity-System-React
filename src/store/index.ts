import { create } from "zustand";

interface Store {
  isRegistering: boolean;
  error: string;
  allIncapacities: any;
  setIsRegistering: (isRegistering: boolean) => void;
  setError: (error: string) => void;
  setAllIncapacities: (allIncapacities: any) => void;
}

export const useStore = create<Store>((set, get) => ({
  isRegistering: false,
  error: "",
  allIncapacities: [],
  setIsRegistering: (isRegistering) => set({ isRegistering: isRegistering }),
  setError: (error) => set({ error: error }),
  setAllIncapacities: (allIncapacities) =>
    set({ allIncapacities: allIncapacities }),
}));
