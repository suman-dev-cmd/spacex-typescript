import {createAsyncThunk} from '@reduxjs/toolkit'
import { RootState } from '../store';
import { Spacex } from '../slice/spaceSlice';
import axios from 'axios';

export const getItems = createAsyncThunk<Spacex[], {statusd:string,offset:number,fromDate:string,toDate:string}, { state: RootState }>('showspacex', async ({statusd,offset,fromDate,toDate}, thunkAPI) => {
    let url = `https://api.spacexdata.com/v3/launches?limit=10&offset=${offset}&start=${fromDate}&end=${toDate}`
    // console.log(fromDate)
    // console.log(toDate)
    if(statusd !=='all'){
         url = `https://api.spacexdata.com/v3/launches/${statusd}?limit=3&offset=${offset}`
    }
   
    const response = await axios.get(url)
    // console.log(response);
    return response.data
})

export const getItem = createAsyncThunk<Spacex, {flight_number:number}, { state: RootState }>('showonespacex', async ({flight_number}, thunkAPI) => {
    const url = `https://api.spacexdata.com/v3/launches/${flight_number}`

    const response = await axios.get(url)
    // console.log(response);
    return response.data
})