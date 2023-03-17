import { create } from "zustand";

interface Store {
  isRegistering: boolean;
  error: string;
  allIncapacities: any;
  modal: boolean;
  animationModal: boolean;
  setIsRegistering: (isRegistering: boolean) => void;
  setError: (error: string) => void;
  setAllIncapacities: (allIncapacities: any) => void;
  setModal: (modal: boolean) => void;
  setAnimationModal: (modal: boolean) => void;
}

export const useStore = create<Store>((set, get) => ({
  isRegistering: false,
  error: "",
  allIncapacities: [],
  modal: false,
  animationModal: false,
  setIsRegistering: (isRegistering) => set({ isRegistering: isRegistering }),
  setError: (error) => set({ error: error }),
  setAllIncapacities: (allIncapacities) =>
    set({ allIncapacities: allIncapacities }),
  setModal: (modal) => set({ modal: modal }),
  setAnimationModal: (animationModal) => set({ animationModal: animationModal }),
}));
