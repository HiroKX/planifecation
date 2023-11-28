import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import User from '../../../models/User';
import {RootState} from "../Store";

interface loggedUserState {
    loggedUser: User
}

const initialState = { } as loggedUserState;

export const loggedUserSlice = createSlice({
    name: 'loggedUser',
    initialState,
    reducers: {
        updateLoggedUser(state, action: PayloadAction<User>) {
            state.loggedUser = action.payload;
            return state;
        }
    }
});


export const { updateLoggedUser }
    = loggedUserSlice.actions;
export const loggedUser = (state: RootState) => state.loggedUser
export default loggedUserSlice.reducer;