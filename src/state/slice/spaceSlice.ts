import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {getItems,getItem} from '../actions/spacexActions';
export interface Spacex {
    flight_number: number|undefined;
    launch_date_utc: Date;
    mission_name: string;
    rocket: any;
    upcoming:boolean;
    launch_success:boolean;
    launch_site?:{
        site_name:string,
        // [key:string]:unknown|{[key:string]:unknown},
    }
}
export interface ShowSpacex {
    item: Spacex[];
    isLoading: boolean,
    singleItem:any,
    modal:boolean,
    errorMessage: string
}
const initialState: ShowSpacex = {
    item: [],
    singleItem: {},
    modal:false,
    isLoading: true,
    errorMessage: ''
};


const spaceSlice = createSlice({
    name: 'spacex',
    initialState: initialState,
    reducers: {
        getModalFalse:(state)=>{
            state.modal = false;
            state.singleItem = {};
        }
    },
    extraReducers: 
    function (builder) {
        builder.addCase(getItems.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getItems.fulfilled, (state, action: PayloadAction<Spacex[]>) => {
            state.isLoading= false;
            state.item = action.payload
            state.errorMessage = '';
        });
        builder.addCase(getItems.rejected, (state, action) => {
            state.isLoading = false;
            state.item = [];
            let msg = action.error.message;
            if(action.error.message === 'Rejected'){
                msg = 'Not Found Launches'
            }
            state.errorMessage = msg || "";
        });
        builder.addCase(getItem.pending, (state, action) => {
            state.modal = false; 
        });
        builder.addCase(getItem.fulfilled, (state, action: PayloadAction<{flight_number:number|undefined}>) => {
            state.modal = true;
            state.singleItem = action.payload  
        });
        builder.addCase(getItem.rejected, (state, action) => {
            state.modal = true;
            let msg = action.error.message;
            if(action.error.message === 'Rejected'){
                msg = 'Not Found Flight Id'
            }
            state.errorMessage = msg || "";
        });
    }

});

export const {getModalFalse} = spaceSlice.actions;
export default spaceSlice.reducer;