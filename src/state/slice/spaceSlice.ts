import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {getItems,getItem} from '../actions/spacexActions';
import moment from 'moment';
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
    errorMessage: string,
    statusd:string,
    start:string,
    end:string
}
const initialState: ShowSpacex = {
    item: [],
    singleItem: {},
    modal:false,
    isLoading: true,
    errorMessage: '',
    statusd:'all',
    start:'',
    end:''
};


const spaceSlice = createSlice({
    name: 'spacex',
    initialState: initialState,
    reducers: {
        getModalFalse:(state)=>{
            state.modal = false;
            state.singleItem = {};
        },
        changeStatus:(state,action)=>{
            state.statusd = action.payload
        },
        onSelect:(state,action)=>{
            if(action.payload.value != null){
                state.start= moment(action.payload.value[0]).format("YYYY-MM-DD");
                state.end = moment(action.payload.value[1]).format("YYYY-MM-DD");
              }else{
                state.start= '';
                state.end = '';
              }
       
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

export const {getModalFalse,changeStatus,onSelect} = spaceSlice.actions;
export default spaceSlice.reducer;