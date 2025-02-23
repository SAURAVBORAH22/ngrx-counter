import { User } from "src/app/models/userModel";

export interface AuthState {
    user: User | null;
}

export const initialState: AuthState = {
    user: null
};