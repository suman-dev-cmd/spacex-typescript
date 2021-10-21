import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {getItems,getItem} from '../actions/spacexActions';
type SpacexState = "LOADING" | "READY" | "ERROR";
export interface Spacex {
    flight_number: number;
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
    itemstate: SpacexState,
    singleItem:any,
    errorMessage: string
}
const initialState: ShowSpacex = {
    item: [],
    singleItem: {},
    itemstate: 'READY',
    errorMessage: ''
};


const spaceSlice = createSlice({
    name: 'spacex',
    initialState: initialState,
    reducers: {},
    extraReducers: 
    function (builder) {
        builder.addCase(getItems.pending, (state, action) => {
            state.itemstate = 'LOADING';
        });
        builder.addCase(getItems.fulfilled, (state, action: PayloadAction<Spacex[]>) => {
            state.itemstate= 'READY';
            state.item = action.payload
            state.errorMessage = '';
        });
        builder.addCase(getItems.rejected, (state, action) => {
            state.itemstate = 'ERROR';
            state.item = [];
            let msg = action.error.message;
            if(action.error.message === 'Rejected'){
                msg = 'Not Found Launches'
            }
            state.errorMessage = msg || "";
        });
        builder.addCase(getItem.fulfilled, (state, action: PayloadAction<{flight_number:number}|string>) => {
            state.singleItem = action.payload  
        });
        builder.addCase(getItem.rejected, (state, action) => {
            state.itemstate = 'ERROR';
            let msg = action.error.message;
            if(action.error.message === 'Rejected'){
                msg = 'Not Found Flight Id'
            }
            state.errorMessage = msg || "";
        });
    }

});


export default spaceSlice.reducer;