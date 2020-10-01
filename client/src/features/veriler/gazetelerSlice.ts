import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import axios from 'axios';
import { BACK_SERVER_URL } from '../Config';


interface GazetelerDatas {
  _id:string;
  user:string;
  title:string, 
  description:string,
  owner:string,
  name:string,
  date:Date,
}

interface GazetelerState {
  gazeteler: Array<GazetelerDatas>,
  specific: Array<GazetelerDatas>,
  updateEl: GazetelerDatas | undefined,
  message: string,
  completed: boolean,
  errors: any,
}

const initialState: GazetelerState = {
  gazeteler: [],
  specific: [],
  updateEl: {_id:'', user:'', title:'', description:'', owner:'', name:'', date: new Date()},
  message: '',
  completed: false,
  errors:{},
};

export const gazetelerSlice= createSlice({
    name: 'gazeteler',
    initialState,
    reducers: {
      setInitial:(state) => {
        state.completed = false;
        state.message = '';
        state.errors = {};
        state.updateEl = {_id:'', user:'', title:'', description:'', owner:'', name:'', date: new Date()};
      },
      setGazeteler:(state, action: PayloadAction<Array<GazetelerDatas>>) => {
        state.gazeteler = action.payload;
        state.completed = true;
      },
      setSpecificNews: (state, action: PayloadAction<Array<GazetelerDatas>>) => {
        state.specific = action.payload;
        state.completed = true;
      },
      setDataFailed: (state, action: PayloadAction<any>) => {
        state.errors = action.payload;
        state.completed = false;
      },
      setUpdateEl: (state, action: PayloadAction<string>) => {
        state.updateEl = state.specific.find(item => item._id === action.payload);
      },
  
    },
  });
  
  export const { setInitial, setDataFailed, setUpdateEl, 
    setGazeteler, setSpecificNews } = gazetelerSlice.actions;
  
  export const getGazeteler = (date: Date): AppThunk => dispatch => {
      axios.get(`${BACK_SERVER_URL}/api/gazeteler?date=${date}`)
      .then(res => {
          dispatch(setGazeteler(res.data));
          dispatch(setSpecificNews(res.data))
      })
      .catch(err =>{
          dispatch(setDataFailed(err))
      })
  };
  
  
  
  export const setGazetelerToDatabase = (data: GazetelerDatas, date: Date): AppThunk => dispatch => {
    const token = localStorage.getItem('token');
    axios.post(`${BACK_SERVER_URL}/api/gazeteler/create`, data,
    {headers: {"Authorization": `Bearer ${token}`}})
    .then(res => {
      dispatch(getGazeteler(date));
      dispatch(setInitial());
    })
    .catch(err =>{
      dispatch(setDataFailed(err.response.data))
    })
  };

  export const deleteGazeteler = (id: string, date: Date): AppThunk => dispatch => {
    const token = localStorage.getItem('token');
    axios.delete(`${BACK_SERVER_URL}/api/gazeteler/delete/${id}`,
    {headers: {"Authorization": `Bearer ${token}`}})
    .then(res => {
        dispatch(getGazeteler(date))
    })
    .catch(err =>{
        dispatch(setDataFailed(err))
    })
  };
  

  export const updateGazeteler = (id:string, data:GazetelerDatas, date: Date):AppThunk => dispatch => {
    const token = localStorage.getItem('token');
    axios.put(`${BACK_SERVER_URL}/api/gazeteler/update/${id}`, data,
    {headers: {"Authorization": `Bearer ${token}`}})
    .then(res => {
        dispatch(getGazeteler(date))
        dispatch(setInitial());
    })
    .catch(err =>{
        dispatch(setDataFailed(err.response.data))
    })
  };


  export const stateVeri = (state: RootState) => state.gazeteler.gazeteler;
  export const stateUpdateEl = (state: RootState) => state.gazeteler.updateEl;
  export const stateErrors = (state: RootState) => state.gazeteler.errors;
  export const stateCompleted = (state: RootState) => state.gazeteler.completed;
  export const stateSpecificNews = (state: RootState) => state.gazeteler.specific;

  
  export default gazetelerSlice.reducer;