import React,{useState} from 'react'
import DateRangePicker from "react-daterange-picker";
import "react-daterange-picker/dist/css/react-calendar.css";
import * as Moment from "moment";
import {extendMoment} from 'moment-range';


const moment = extendMoment(Moment);
interface DateProps{
    isOpen:boolean;
    value:any;
    onSelect:(value:any)=>any;
    onToggle:()=>void;
    renderSelectionValue:()=>any
}
const DateRange = ({isOpen,value,onToggle,onSelect,renderSelectionValue}:DateProps) => {
   
    return (
        <div>
        <div>{renderSelectionValue()}</div>

        <div>
          <input
            type="button"
            value="Select Date"
            onClick={onToggle}
          />
        </div>

        {isOpen && (
          <DateRangePicker
            value={value}
            onSelect={onSelect}
            singleDateRange={true}
          />
        )}
      </div>
    )
}

export default DateRange;
