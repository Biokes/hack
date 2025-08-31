import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WalletState {
    address: string | null,
    chainId: string | null,
    isConnected:  boolean,
    userType?: "admin" | "user" | null,
}
const initialState: WalletState ={
    address:null,
    chainId:null,
    isConnected:false,
    userType:null,
}

const walletSlice = createSlice({
    name: "wallet",
    initialState,

    reducers: {

        setWallet: (state, action: PayloadAction<{ address: string; chainId: string }>) => {
            state.address = action.payload.address;
            state.chainId = action.payload.chainId;
            state.isConnected = true;
        },

        clearWallet: (state) => {
            state.address = null;
            state.chainId = null;
            state.isConnected = false;
            state.userType = null;
        },

        setUserType: (state, action: PayloadAction<"admin" | "user" | null>) => {
            state.userType = action.payload;
        }
        
    },
});

export const { setWallet, clearWallet, setUserType } = walletSlice.actions;

export default walletSlice.reducer;