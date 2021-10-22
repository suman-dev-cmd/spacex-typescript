import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";
import { useAppDispatch } from "../../hooks/hook";
import {  onSelect } from "../../state/slice/spaceSlice";

const DateRange = () => {
  const dispatch = useAppDispatch();
  const onDateSelect = (value:any) => {
    dispatch(onSelect(value));
    
  };
  return (
    <div>

      <DateRangePickerComponent
        placeholder="Enter Date Range"
        format='yyyy-MM-dd'
        onChange={onDateSelect}
      />
    </div>
  );
};

export default DateRange;
