import { create } from "zustand";
import { AllIncapacities, UserData } from "../types";

interface Store {
  isRegistering: boolean;
  error: string;
  allIncapacities: AllIncapacities[];
  allUsers: UserData[];
  modal: boolean;
  animationModal: boolean;
  setIsRegistering: (isRegistering: boolean) => void;
  setError: (error: string) => void;
  setAllIncapacities: (allIncapacities: AllIncapacities[]) => void;
  setAllUsers: (AllUsers: UserData[]) => void;
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