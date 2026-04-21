import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : []
};

export const PasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;
      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Paste created successfully!");
    },

    updateToPastes: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex(item => item._id === paste._id);
      if (index !== -1) {
        state.pastes[index] = paste;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste updated successfully!");
      } else {
        toast.error("Paste not found!");
      }
    },

    removeFromPastes: (state, action) => {
      const _id = action.payload;
      state.pastes = state.pastes.filter(item => item._id !== _id);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Paste removed!");
    },

    resetAllPastes: (state) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
      toast.success("All pastes cleared!");
    },
  }
});

// Export actions
export const { addToPastes, updateToPastes, removeFromPastes, resetAllPastes } = PasteSlice.actions;

// Export reducer as default
export default PasteSlice.reducer;
