import { create } from "zustand";
import api from "@/services/api.js";
import toast from "react-hot-toast";

const useApiDataStore = create((set) => ({
  data: [],
  loading: true,
  error: null,
  updateApiLoading: false,
  deleteApiLoading: false,

  clearData: () => set({ data: [] }),

  setUpdateApiLoading: (loading) => set({ updateApiLoading: loading }),
  setDeleteApiLoading: (loading) => set({ deleteApiLoading: loading }),

  setLoading: (loading) => set({ loading }),

  fetchData: async (endpoint) => {
    set({ data: [], loading: true, error: null });
    try {
      const response = await api.get(endpoint, {
        withCredentials: true,
      });

      if (!response?.data?.success) {
        set({ error: "Failed to fetch data" });
      } else {
        set({ data: response.data.result });
      }
    } catch (error) {
      console.log(error);
      set({
        error: error?.data?.error || "An unexpected error occurred",
      });
    } finally {
      set({ loading: false });
    }
  },

  downloadFile: async (endpoint) => {
    try {
      const response = await api.get(endpoint, {
        responseType: "arraybuffer",
        withCredentials: true,
      });
      return new Blob([response.data], {
        type: response.headers["content-type"],
      });
    } catch (error) {
      console.error("Error downloading file:", error);
      throw new Error("Failed to download file");
    }
  },

  addData: async (endpoint, newData) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post(endpoint, newData, {
        withCredentials: true,
      });

      if (!response?.data?.success)
        set({ error: "Failed to add data", loading: false });
    } catch (error) {
      set({
        error: error?.data?.error || "Failed to add data",
        loading: false,
      });
    }
  },

  updateData: async (endpoint, updatedData) => {
    set({ updateApiLoading: true, error: null });
    try {
      console.log(updatedData, endpoint);

      const response = await api.put(endpoint, updatedData, {
        withCredentials: true,
      });

      if (response?.data?.success) {
        toast.success("Updated successfully!");
      } else {
        set({ error: "Failed to update data", updateApiLoading: false });
      }
    } catch (error) {
      console.log(error);
      set({
        error: error?.data?.error || "Failed to update data",
        updateApiLoading: false,
      });
    } finally {
      set({ updateApiLoading: false });
    }
  },

  deleteData: async (endpoint) => {
    set({ deleteApiLoading: true, error: null });
    try {
      const response = await api.delete(endpoint, {
        withCredentials: true,
      });

      if (response?.data?.success) {
        toast.success("Deleted successfully!");
      } else {
        set({ error: "Failed to delete", deleteApiLoading: false });
      }
    } catch (error) {
      toast.error(error?.response?.data?.error);
      set({
        error: error?.response?.data?.error || "Failed to delete",
        deleteApiLoading: false,
      });
    }
  },
}));

export default useApiDataStore;
