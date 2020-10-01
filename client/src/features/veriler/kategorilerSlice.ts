import axios from 'axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import { setModalClose } from '../modal/modalSlice';
import { Kategori, KatogoriState, CategoryErrors, MissionAlt } from '../interfaces/categoryInterfaces';
import { BACK_SERVER_URL } from '../Config';

const eleman = {_id:'', user:'', category:'', openPos:false, link:'', missions:[]};

const initialState: KatogoriState = {
    kategoriler:[],
    missions:[],
    missionsAlt:[],
    id: '',
    altId: '',
    mission: '',
    el:eleman,
    completed: false,
    errors:{catagor: ''}
}

export const kategorilerSlice = createSlice({
  name: 'kategoriler',
  initialState,
  reducers: {
    setKategoriler: (state, action: PayloadAction<Kategori[]>) => {
      state.kategoriler = action.payload
    },
    setMissions: (state, action: PayloadAction<string>) => {
      const eleman = state.kategoriler.find(item => item.category === action.payload);
      if(eleman){
        state.missions = eleman.missions;
      }
    },
    setMissionsAlt: (state, action: PayloadAction<string>) => {
      const eleman = state.kategoriler.find(item => item.category === action.payload);
      if(eleman){
        state.missionsAlt = eleman.missions;
      }
    },
    setDataFail: (state, action: PayloadAction<CategoryErrors|any>) => {
      state.errors = action.payload;
      state.completed = false;
    },
    setId:(state, action: PayloadAction<string>) => {
      state.id = action.payload;
      state.el = state.kategoriler.find(item => item._id === action.payload)
      state.completed = false
    },
    setAltId:(state, action: PayloadAction<any>) => {
      state.id = action.payload.id;
      state.altId = action.payload.altId;
      state.completed = false;
      //const eleman = state.kategoriler.find(item => item.id === action.payload.id)
      //state.mission =  eleman.missions[action.payload.altId]; 
    },
    setCompleted:(state) => {
      state.id = '';
      state.el = {id:'', user:'', category:'', openPos:false, link:'', missions:[]};
      state.mission = '';
      state.altId = '';
      state.completed = true;
    }

  },
});

export const { setDataFail, setKategoriler, setId, setAltId, setCompleted, setMissions, setMissionsAlt} = kategorilerSlice.actions;


export const getKategoriler = (): AppThunk => dispatch => {
  axios.get(`${BACK_SERVER_URL}:5000/api/category`)
  .then(res => {
      dispatch(setKategoriler(res.data.kategoriler))
  })
  .catch(err =>{
      dispatch(setDataFail(err))
  })
};

export const setAnaKategorilerToDatabase = (data: Kategori): AppThunk => dispatch => {
  const token = localStorage.getItem('token');
  axios.post(`${BACK_SERVER_URL}:5000/api/category/create`, 
  data, {headers: {"Authorization": `Bearer ${token}`}} )
  .then(res => {
      dispatch(getKategoriler())
  })
  .catch(err =>{
      dispatch(setDataFail(err.response.data))
  })
};

export const deleteKategorilerFromDatabase = (id: string): AppThunk => dispatch => {
  const token = localStorage.getItem('token');
  axios.delete(`${BACK_SERVER_URL}/api/category/delete/${id}`, 
  {headers: {"Authorization": `Bearer ${token}`}} )
  .then(res => {
      dispatch(getKategoriler())
  })
  .catch(err =>{
      dispatch(setDataFail(err))
  })
};

export const setAltKategorilerToDatabase = (id: string, data:MissionAlt): AppThunk => dispatch => {
  const token = localStorage.getItem('token');
  axios.post(`${BACK_SERVER_URL}/api/category/mission/create/${id}`, data, 
  {headers: {"Authorization": `Bearer ${token}`}} )
  .then(res => {
      dispatch(getKategoriler());
      dispatch(setCompleted());
      dispatch(setModalClose());
  })
  .catch(err =>{
      dispatch(setDataFail(err))
  })
};




export const deleteAltKategorilerFromDatabase = (id:string, alt:string): AppThunk => dispatch => {
  const token = localStorage.getItem('token');
  axios.delete(`${BACK_SERVER_URL}/api/category/mission/delete/${id}/${alt}`, 
  {headers: {"Authorization": `Bearer ${token}`}} )
  .then(res => {
      dispatch(getKategoriler())
  })
  .catch(err =>{
      dispatch(setDataFail(err))
  })
};



export const updateAltKategoriler = (id:string, alt:string, data:MissionAlt): AppThunk => dispatch => {
  const token = localStorage.getItem('token');
  axios.put(`${BACK_SERVER_URL}/api/category/mission/update/${id}/${alt}`, data,
  {headers: {"Authorization": `Bearer ${token}`}} )
  .then(res => {
    dispatch(getKategoriler());
    dispatch(setCompleted());
    dispatch(setModalClose());
  })
  .catch(err =>{
    dispatch(setDataFail(err))
  })
};

export const updateKategoriler = (id:string, data:Kategori):AppThunk => dispatch => {
  const token = localStorage.getItem('token');
  axios.put(`${BACK_SERVER_URL}/api/category/update/${id}`, data,
  {headers: {"Authorization": `Bearer ${token}`}} )
  .then(res => {
    dispatch(getKategoriler());
    dispatch(setCompleted());
  })
  .catch(err =>{
    dispatch(setDataFail(err.response.data))
  })
};



export const stateKategoriler = (state: RootState) => state.kategoriler.kategoriler;
export const stateId = (state: RootState) => state.kategoriler.id;
export const stateEl = (state: RootState)=> state.kategoriler.el;
export const stateMissionId = (state: RootState) => state.kategoriler.altId;
export const stateMission = (state: RootState) => state.kategoriler.mission;
export const stateCompleted = (state: RootState) => state.kategoriler.completed;


export const stateCategory =(state: RootState) => state.kategoriler;

export default kategorilerSlice.reducer;