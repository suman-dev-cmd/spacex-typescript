import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {getItems,getItem} from '../actions/spacexActions';
type SpacexState = "LOADING" | "READY" | "ERROR";
export interface Spacex {
    flight_number: number;
    launch_date_utc: Date;
    mission_name: string;
    rocket: any;
    orbit: string;
    launch_success:boolean;
    launch_site?:{
        site_name:string
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
            state.item = []
            state.errorMessage = action.error.message || "";
        });
        builder.addCase(getItem.fulfilled, (state, action: PayloadAction<{flight_number:number}>) => {
            state.singleItem = action.payload
            
        });
    }

});


export default spaceSlice.reducer;