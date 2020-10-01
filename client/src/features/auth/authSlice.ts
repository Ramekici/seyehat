import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import { BACK_SERVER_URL } from '../Config';
import axios from 'axios';

interface DefaultValReg{
    name:string;
    lastName:string, 
    email:string, 
    password:string, 
    rePassword: string
}

interface DefaultValLog{
    email:string, 
    password:string, 
}
interface PersonelData {
    token: string, 
    userId: string,
    email: string,
    name: string,
    lastName: string,
    admin: boolean
}

interface AuthState {
    isCompleted:boolean;
    isAuthenticated: boolean;
    personelData: PersonelData;
    authRedirectPath: string;
    message: string;
    errorLogin: any;
    errorRegister: any;
    defaultValReg: DefaultValReg,
    defaultValLog: DefaultValLog
};



const initialState: AuthState = {
    isCompleted: false,
    isAuthenticated: false,
    personelData:{token: '', userId: '', email: '', name: '', lastName: '', admin: false},
    authRedirectPath:'/',
    message: '',
    errorLogin: {},
    errorRegister: {},
    defaultValReg: {name:'', lastName:'', email:'', password:'', rePassword:''},
    defaultValLog: {email:'', password:''}
};

export const authSlice = createSlice({
  name:'auth',
  initialState,
  reducers: {
    createUserStart: (state) => {
        state.isCompleted = false;
    },
    createUserSuccess: (state, action: PayloadAction<string>) => {
        state.message= action.payload;
        state.errorRegister = '';
        state.isCompleted = true;
    },
    messageReset : (state) => {
        state.message = '';
    },
    loginUserSuccess: (state, action: PayloadAction<PersonelData>) => {
        state.isAuthenticated = true;
        state.personelData = action.payload;
        state.errorLogin = {};
        state.isCompleted = true;
    },
    createUserRegisterFail: (state, action: PayloadAction<any>) => {
        state.isCompleted = false;
        state.errorRegister= action.payload;
    },
    createUserLoginFail: (state, action: PayloadAction<any>) => {
        state.isCompleted = false;
        state.errorLogin= action.payload;
    },
    setAuthRedirect: (state, action: PayloadAction<string>) =>{
        state.authRedirectPath = action.payload;
    },
    logoutUserState: (state) => {
        state.isAuthenticated = false;
        state.personelData = {token: '', userId: '', email: '', name: '', lastName: '', admin: false};
    }
  },
});

export const { createUserStart, createUserSuccess, createUserLoginFail, createUserRegisterFail,
    loginUserSuccess, logoutUserState, setAuthRedirect, messageReset } = authSlice.actions;

export const createUser = (data: DefaultValReg): AppThunk  => dispatch => {
    dispatch(createUserStart());
    axios.post(`${BACK_SERVER_URL}/api/users/register`, data)
    .then(res => {
            dispatch(createUserSuccess(res.data.message));
    })
    .catch(err => {
            dispatch(createUserRegisterFail(err.response.data));
    })
};

export const updateUser = (data: DefaultValLog): AppThunk => dispatch => {
    const token = localStorage.getItem('token');
    dispatch(createUserStart());
    axios.post(`${BACK_SERVER_URL}/api/users/update`, 
        data, {headers: {'Authorization' : 'Bearer ' + token}})
        .then(res => {
            dispatch(createUserSuccess(res.data.message));
            dispatch(messageReset());
        })
        .catch(err => {
            dispatch(createUserRegisterFail(err.response.data));
    })
};


export const loginUser = (data: DefaultValLog): AppThunk => dispatch => {
    dispatch(createUserStart());
    axios.post(`${BACK_SERVER_URL}/api/users/login`, data)
        .then(response => {
            const payload = {
                token: response.data.token, 
                userId: response.data.userId,
                email: response.data.email,
                name: response.data.name,
                lastName: response.data.lastName,
                admin: response.data.admin
            }
            dispatch(loginUserSuccess(payload));
            if (response.data.token) {
                const expiresInDuration = response.data.expiresIn;
                dispatch(setAuthTimer(expiresInDuration));
                const now = new Date();
                const expirationDate = new Date(now.getTime() + expiresInDuration*1000);
                saveAuthData(response.data.token, expirationDate, response.data.userId);
            };             
        })
        .catch(err => {
            dispatch(createUserLoginFail(err.response.data));
        })
};

export const logoutUser = (): AppThunk => dispatch => {
    clearAuthData();
    dispatch(logoutUserState());
};

export const setAuthTimer = (duration:number): AppThunk => dispatch => {
    setTimeout(() => {
    dispatch(logoutUser());
    }, duration*1000);
}

export const saveAuthData = (token: string, expirationDate: Date, userId: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
}

export const clearAuthData = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
}

export const getAuthData = () => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate),
      userId
    };
}

export const autoAuthUser = () : AppThunk  => dispatch => {
    const authInformation = getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
        //dispatch(saveAuthData(authInformation.token, 
        //    authInformation.expirationDate, authInformation.userId));
        dispatch(setAuthTimer(expiresIn / 1000));
    }
  }

export const stateAuth = (state: RootState) => state.auth;

export default authSlice.reducer;