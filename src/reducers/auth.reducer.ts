import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUser } from '@/types/entity.typs';

interface IAuthState {
  signUpComplete: boolean;
  user: IUser;
  tokenExp: number;
}

const initialState: IAuthState = {
  signUpComplete: false,
  user: null,
  tokenExp: 0,
};

export const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSignUpComplete(
      state,
      { payload, }: PayloadAction<{ signUpComplete: boolean }>
    ) {
      state.signUpComplete = payload.signUpComplete;
    },

    setUser(
      state,
      { payload, }: PayloadAction<{user: IUser}>
    ) {
      state.user = payload.user;
    },

    setExp(
      state,
      { payload, }: PayloadAction<{tokenExp: number}>
    ) {
      state.tokenExp = payload.tokenExp;
    },
  },
});

export const { setSignUpComplete, setUser, setExp, } = authReducer.actions;
export default authReducer.reducer;
