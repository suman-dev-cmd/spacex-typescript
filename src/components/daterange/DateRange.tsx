import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";
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
