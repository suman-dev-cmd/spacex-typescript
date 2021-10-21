import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../store';
import { Spacex } from '../slice/spaceSlice';
import axios from 'axios';

export const getItems = createAsyncThunk<Spacex[], { statusd: string, offset: number, fromDate: string, toDate: string }>('showspacex', async ({ statusd, offset, fromDate, toDate }, { rejectWithValue }) => {
    let url = `https://api.spacexdata.com/v3/launches?limit=10&offset=${offset}&start=${fromDate}&end=${toDate}`;
    // console.log(fromDate)
    // console.log(toDate)
    if (statusd === 'upcoming') {
        url = `https://api.spacexdata.com/v3/launches/${statusd}?limit=10&offset=${offset}&start=${fromDate}&end=${toDate}`;
    }
    if (statusd === 'sucess') {
        url = `https://api.spacexdata.com/v3/launches?limit=10&offset=${offset}&start=${fromDate}&end=${toDate}&launch_success=${true}`;
    }
    if (statusd === 'faild') {
        url = `https://api.spacexdata.com/v3/launches?limit=10&offset=${offset}&start=${fromDate}&end=${toDate}&launch_success=${false}`;
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

export const getItem = createAsyncThunk<Spacex | string , { flight_number: number }, { state: RootState }>('showonespacex', async ({ flight_number }, thunkAPI) => {
    const url = `https://api.spacexdata.com/v3/launches/${flight_number}`
    const state = thunkAPI.getState();
    const items: Spacex = state.spacex.singleItem;
    if (thunkAPI.requestId !== String(items.flight_number)) {
        const errmsg = 'Flight Number Not Found'
        return errmsg
    }
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