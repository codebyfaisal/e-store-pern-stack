import { create } from "zustand";

const useSidebarStore = create((set) => ({
  isSidebarOpen: window.innerWidth > 1024 ? true : false,
  setIsSidebarOpen: (value) => set({ isSidebarOpen: value }),
}));

export default useSidebarStore;
