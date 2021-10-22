import React, { useState } from "react";
import DateRangePicker from "react-daterange-picker";
import "react-daterange-picker/dist/css/react-calendar.css";
import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";
import * as Moment from "moment";
import { extendMoment } from "moment-range";

const moment = extendMoment(Moment);
interface DateProps {
 
  onSelect: (value: any) => any;
 
}
const DateRange = ({
 
  onSelect,

}: DateProps) => {

  
  return (
    <div>

      <DateRangePickerComponent
        placeholder="Enter Date Range"
        format='yyyy-MM-dd'
        onChange={onSelect}
      />
    </div>
  );
};

export default DateRange;
