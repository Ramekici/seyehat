import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import axios from 'axios';
import {VeriDatas, Datas, ErrorVeriler, VerilerState} from '../interfaces/veriInterface';
import { BACK_SERVER_URL } from '../Config';

const el = { _id:'', user:'', category:'', mission:'', name:'', surName:'', start:'', end:''}

const initialState: VerilerState = {
  veriler: [],
  veri: el,
  verilerOzel:[],
  errors:{nam:'', surNam:'', categor:'', missio:''},
  gosterilen: 1, 
  isCompleted: false,
  updateEl:el,
  updateId:'',
  message:'',
  tarih: '01/10/2010'
};

export const verilerSlice = createSlice({
  name: 'veriler',
  initialState,
  reducers: {
    setInitial:(state) => {
      state.updateEl = el;
      state.isCompleted = false;  
      state.errors = {nam:'', surNam:'', categor:'', missio:''};
    },
    setMessage:(state) => {
      state.message = '';
      state.veri = el;
    },
    setVeriler:(state, action: PayloadAction<Array<VeriDatas>>) => {
      state.veriler = action.payload;
      state.isCompleted = true;
    },
    setVeri:(state, action: PayloadAction<Datas>) => {
      state.veri = action.payload;
      state.isCompleted = true;
    },
    setVerilerOzel:(state, action: PayloadAction<Array<Datas>>) => {
      state.verilerOzel = action.payload;
      state.isCompleted = true;
    },
    setDataFailed: (state, action: PayloadAction<ErrorVeriler>) => {
      state.errors = action.payload;
      state.isCompleted = false;
    },
    setGosterilen:(state, action: PayloadAction<number>) => {
      state.gosterilen = action.payload;
    },
    setUpdateEL:(state, action: PayloadAction<string>) => {
      const eleman = state.verilerOzel.find(item => item._id === action.payload);
      if(eleman){
        state.updateEl = eleman; 
      }  
    },
    setVeriTarih:(state, action: PayloadAction<string>) => {
      state.tarih = action.payload;
    }

  },
});

export const { setVeriler, setVeri, setDataFailed, setUpdateEL,
  setVerilerOzel, setGosterilen, setInitial, setMessage, setVeriTarih } = verilerSlice.actions;


//// verileri getiriyor

export const getVeriler = (date: string) : AppThunk => dispatch => {
    axios.get(`${BACK_SERVER_URL}/api/veriler?date=${date}`)
    .then(res => {
        dispatch(setVeriler(res.data));
    })
    .catch(err =>{
        dispatch(setDataFailed(err))
    })
};

export const getVerilerOzel = (category: string, mission: string): AppThunk => dispatch => {
  axios.get(`${BACK_SERVER_URL}/api/veriler/ozel?category=${category}&mission=${mission}`)
  .then(res => {
      dispatch(setVerilerOzel(res.data))
  })
  .catch(err =>{
      dispatch(setDataFailed(err))
  })
};

export const setVerilerToDatabase = (data: Datas ): AppThunk => dispatch => {
  const token = localStorage.getItem('token');
  axios.post(`${BACK_SERVER_URL}/api/veriler/create`, data,
  {headers: {"Authorization": `Bearer ${token}`}})
  .then(res => {
    dispatch(setVeri(res.data.profile));
    dispatch(setInitial());
  })
  .catch(err =>{
    dispatch(setDataFailed(err.response.data))
  })
};


export const deleteVeriler = (id: string, category: string, mission: string): AppThunk => dispatch => {
  const token = localStorage.getItem('token');
  axios.delete(`${BACK_SERVER_URL}/api/veriler/${id}`,
  {headers: {"Authorization": `Bearer ${token}`}})
  .then(res => {
      dispatch(getVerilerOzel(category, mission))
  })
  .catch(err =>{
      dispatch(setDataFailed(err))
  })
};

export const updateVeriler = (id: string, data: Datas, category: string, mission: string): AppThunk => dispatch => {
  const token = localStorage.getItem('token');
  axios.put(`${BACK_SERVER_URL}/api/veriler/update/${id}`, data,
  {headers: {"Authorization": `Bearer ${token}`}})
  .then(res => {
      dispatch(getVerilerOzel(category, mission));
      dispatch(setInitial());
  })
  .catch(err =>{
      dispatch(setDataFailed(err.response.data))
  })
};


export const stateDatas = (state: RootState) => state.veriler;


export default verilerSlice.reducer;