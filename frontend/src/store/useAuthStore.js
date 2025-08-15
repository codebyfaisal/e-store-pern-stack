import api from "@/services/api.js";
import toast from "react-hot-toast";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      loading: false,

      login: () => set({ isAuthenticated: true }),

      _clearAuth: () => {
        set({ isAuthenticated: false, loading: false });
      },

      logout: async () => {
        set({ loading: true });
        try {
          await api.get("/api/users/logout");
          toast.success("Logged out successfully!");
          set({ isAuthenticated: true, loading: false });
          localStorage.clear();
          window.location.pathname = "/login";
        } catch (error) {
          console.error("Logout failed:", error);
          toast.error("Logout failed.");
          set({ isAuthenticated: false, loading: false });
        }
      },
    }),
    {
      name: "auth",
      getStorage: () => localStorage,
      partialize: (state) => ({ isAuthenticated: state.isAuthenticated }),
    }
  )
);

export default useAuthStore;