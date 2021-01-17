import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../../app/store';
import config from '../../app/config';

interface AuthState {
    token: string | null,
    isFailure: boolean,
    isAuthenticating: boolean,
}

const initialState: AuthState = {
    token: localStorage.getItem('user_token'),
    isFailure: false,
    isAuthenticating: false
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,

    reducers: {
        loginInProgress: (state: AuthState) => {
            state.token = null;
            state.isFailure = false;
            state.isAuthenticating = true;

            localStorage.removeItem('user_token');
        },

        loginSuccess: (state: AuthState, action: PayloadAction<string>) => {
            state.token = action.payload;
            state.isFailure = false;
            state.isAuthenticating = false;

            localStorage.setItem('user_token', state.token);
        },

        loginFailure: (state: AuthState) => {
            state.token = null;
            state.isFailure = true;
            state.isAuthenticating = false;

            localStorage.removeItem('user_token');
        },

        logout: (state: AuthState) => {
            state.token = null;
            state.isFailure = false;
            state.isAuthenticating = false;

            localStorage.removeItem('user_token');
        }
    }
});

export const { loginInProgress, loginSuccess, loginFailure, logout } = authSlice.actions;

export const signIn = (email: string, password: string): AppThunk => dispatch => {
    dispatch(loginInProgress());

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    fetch(`${config.BACKEND_API}/auth/login`, {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(json => {

            if (json && json.token) {
                dispatch(loginSuccess(json.token));
            } else {
                dispatch(loginFailure());
            }
        })

        .catch(() => {
            dispatch(loginFailure());
        })
};

export default authSlice.reducer;
