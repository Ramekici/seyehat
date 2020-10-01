import axios from 'axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import { TarihDatas, TarihState, TarihErrors } from '../interfaces/tarihInterface';
import { BACK_SERVER_URL } from '../Config.js';

const initialState : TarihState = {
  errors:{titl:'', inf:''},
  tarihteBugun:[],
  ilgiliTarihteki:[],
  tarihItem:{_id:'', user:'', title:'', info:'', date: new Date()},
  completed: false
}


export const tarihSlice = createSlice({
  name: 'tarih',
  initialState,
  reducers: {
    setInitial:(state) => {
      state.completed = false;
      state.tarihItem = {_id:'', user:'', title:'', info:'', date: new Date()};
      state.errors = {titl:'', inf:''};
    },
    setTarihteBugun: (state, action: PayloadAction<Array<TarihDatas>>) => {
      state.tarihteBugun = action.payload;
    },
    setIlgiliTarih: (state, action: PayloadAction<Array<TarihDatas>>) => {
      state.ilgiliTarihteki = action.payload;
    },
    setDataFailed: (state, action: PayloadAction<TarihErrors|any>) => {
      state.errors = action.payload;
      state.completed = false;
    },
    setTarihId: (state, action: PayloadAction<string>) => {
      const item = state.ilgiliTarihteki.find(item => item._id === action.payload)
      if(item) {
        state.tarihItem = item}
    },
    setCompleted:(state) => {
      state.completed = true;
    },
    
    
  },
});

export const { setDataFailed, setTarihteBugun, setIlgiliTarih, setTarihId, setInitial, setCompleted } = tarihSlice.actions;


export const setTarihItems = (data: TarihDatas): AppThunk => dispatch => {
  const token = localStorage.getItem('token');
  axios.post(`${BACK_SERVER_URL}/api/tarih/tarihtebugun`, data,
  {headers: {"Authorization": `Bearer ${token}`}})
  .then(res => {
      dispatch(getTarihteBugun())
  })
  .catch(err =>{
      dispatch(setDataFailed(err.response.data))
  })
};


export const getTarihteBugun = (): AppThunk => dispatch => {
  axios.get(`${BACK_SERVER_URL}/api/tarih/tarihte`)
  .then(res => {
      dispatch(setTarihteBugun(res.data))
  })
  .catch(err =>{
      dispatch(setDataFailed(err))
  })
};

export const getSpecificDate = (date: Date): AppThunk => dispatch => {
  axios.get(`${BACK_SERVER_URL}/api/tarih/tarihindeki?date=${date}`)
  .then(res => {
      dispatch(setIlgiliTarih(res.data))
  })
  .catch(err =>{
      dispatch(setDataFailed(err))
  })
};

export const deleteTarihItems  = (id: string, date: Date): AppThunk => dispatch => {
  const token = localStorage.getItem('token');
  axios.delete(`${BACK_SERVER_URL}/api/tarih/tarihdelete/${id}`, 
  {headers: {"Authorization": `Bearer ${token}`}})
  .then(res => {
      dispatch(getSpecificDate(date))
  })
  .catch(err =>{
      dispatch(setDataFailed(err))
  })
};

export const updateTarihItems = (id:string, data:TarihDatas, date:Date): AppThunk => dispatch => {
  const token = localStorage.getItem('token');
  axios.put(`${BACK_SERVER_URL}/api/tarih/tarihupdate/${id}`, data, 
  {headers: {"Authorization": `Bearer ${token}`}})
  .then(res => {
      dispatch(getSpecificDate(date));
      dispatch(setCompleted());
      dispatch(setInitial());
    
  })
  .catch(err =>{
      dispatch(setDataFailed(err.response.data))
  })
};


export const stateTarihte = (state: RootState) => state.tarih.tarihteBugun;
export const stateTarih = (state: RootState) => state.tarih;


export default tarihSlice.reducer;