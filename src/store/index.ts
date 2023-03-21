import { create } from "zustand";
import { AllIncapacities, UserData } from "../types";

interface Store {
  isRegistering: boolean;
  error: string;
  allIncapacities: AllIncapacities[];
  searchData: AllIncapacities[];
  searchApplications: any;
  allUsers: UserData[];
  modal: boolean;
  animationModal: boolean;
  setIsRegistering: (isRegistering: boolean) => void;
  setError: (error: string) => void;
  setAllIncapacities: (allIncapacities: AllIncapacities[]) => void;
  setSearchData: (searchData: AllIncapacities[]) => void;
  setSearchApplications: (searchApplications: any) => void;
  setAllUsers: (AllUsers: UserData[]) => void;
  setModal: (modal: boolean) => void;
  setAnimationModal: (modal: boolean) => void;
  formatDate: (date: string) => string;
}

export const useStore = create<Store>((set, get) => ({
  isRegistering: false,
  error: "",
  allIncapacities: [],
  searchData: [],
  searchApplications: [],
  allUsers: [],
  modal: false,
  animationModal: false,
  setIsRegistering: (isRegistering) => set({ isRegistering: isRegistering }),
  setError: (error) => set({ error: error }),
  setAllIncapacities: (allIncapacities) =>
    set({ allIncapacities: allIncapacities }),
  setAllUsers: (allUsers) => set({ allUsers: allUsers }),
  setSearchData: (searchData) => set({ searchData: searchData }),
  setSearchApplications: (searchApplications) =>
    set({ searchApplications: searchApplications }),
  setModal: (modal) => set({ modal: modal }),
  setAnimationModal: (animationModal) =>
    set({ animationModal: animationModal }),
  formatDate: (date: string) => {
    let newDate = new Date(date);

    const day = newDate.getDate().toString().padStart(2, "0");
    const month = (newDate.getMonth() + 1).toString().padStart(2, "0");
    const year = newDate.getFullYear();

    return `${day}/${month}/${year}`;
  },
}));
