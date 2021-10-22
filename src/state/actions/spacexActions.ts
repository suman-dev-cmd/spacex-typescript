import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../store';
import { Spacex } from '../slice/spaceSlice';
import axios from 'axios';
import moment from "moment";
export const getItems = createAsyncThunk<Spacex[], { statusd: string,  start:string,end:string}>('showspacex', async ({ statusd, start,end}, { rejectWithValue }) => {
    let fromDate = '';
    let toDate = '';
    if(start && end ){
         fromDate = start;
         toDate = end;
    }
    let url = `https://api.spacexdata.com/v3/launches?&start=${fromDate}&end=${toDate}`;
    console.log(url);
    if (statusd === 'upcoming') {
        url = `https://api.spacexdata.com/v3/launches/${statusd}?&start=${fromDate}&end=${toDate}`;
    }
    if (statusd === 'sucess') {
        url = `https://api.spacexdata.com/v3/launches?&start=${fromDate}&end=${toDate}&launch_success=${true}`;
    }
    if (statusd === 'faild') {
        url = `https://api.spacexdata.com/v3/launches?&start=${fromDate}&end=${toDate}&launch_success=${false}`;
    }
    try {
        const response = await axios.get(url)
        // console.log(response);
        return response.data
    } catch (err: any) {
        if (!err.response) {
            throw err
        }

        return rejectWithValue(err.response.data)
    }

})

export const getItem = createAsyncThunk<Spacex , { flight_number: number|undefined }, { state: RootState }>('showonespacex', async ({ flight_number }, thunkAPI) => {
    const url = `https://api.spacexdata.com/v3/launches/${flight_number}`
    const state = thunkAPI.getState();
    const items: Spacex = state.spacex.singleItem;
    // if (thunkAPI.requestId !== String(items.flight_number)) {
    //     const errmsg = 'Flight Number Not Found'
    //     return errmsg
    // }
    try {
        const response = await axios.get(url)
        // console.log(response);
        return response.data
    } catch (err: any) {
        if (!err.response) {
            throw err
        }

        return thunkAPI.rejectWithValue(err.response.data)
    }

})