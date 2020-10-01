import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    modalPos: false
  },
  reducers: {
    setModalOpen: (state) => {
        state.modalPos = true;
    },
    setModalClose: (state) => {
        state.modalPos = false;
    }
  },
});

export const { setModalOpen, setModalClose } = modalSlice.actions;





export const modalState = (state: RootState) => state.modal.modalPos;


export default modalSlice.reducer;