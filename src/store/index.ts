import { create } from "zustand";
import { AllIncapacities } from "../types";

interface Store {
  isRegistering: boolean;
  error: string;
  allIncapacities: AllIncapacities[];
  allUsers: any;
  modal: boolean;
  animationModal: boolean;
  setIsRegistering: (isRegistering: boolean) => void;
  setError: (error: string) => void;
  setAllIncapacities: (allIncapacities: AllIncapacities[]) => void;
  setAllUsers: (AllUsers: any) => void;
  setModal: (modal: boolean) => void;
  setAnimationModal: (modal: boolean) => void;
}

export const useStore = create<Store>((set, get) => ({
  isRegistering: false,
  error: "",
  allIncapacities: [],
  allUsers: [],
  modal: false,
  animationModal: false,
  setIsRegistering: (isRegistering) => set({ isRegistering: isRegistering }),
  setError: (error) => set({ error: error }),
  setAllIncapacities: (allIncapacities) =>
    set({ allIncapacities: allIncapacities }),
  setAllUsers: (allUsers) => set({ allUsers: allUsers }),
  setModal: (modal) => set({ modal: modal }),
  setAnimationModal: (animationModal) =>
    set({ animationModal: animationModal }),
}));
