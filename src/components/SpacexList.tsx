import React, { useState, useEffect } from "react";
import { useAppDispatch } from "../hooks/hook";
import { getItems } from "../state/actions/spacexActions";
import SpacexImg from "./spacex.png";
import TableComponent from "./table/TableComponent";
import * as Moment from "moment";
import {extendMoment} from 'moment-range';
import ModalComponent from "./modal/ModalComponent";
import DateRange from "./daterange/DateRange";
import SelectBox from "./selectbox/SelectBox";
const moment = extendMoment(Moment);
export interface ModifyTableProps {
  id: number|undefined;
  flight_number: number|undefined;
  launch_date_utc: string;
  mission_name: string;
  rocket_name: string;
  orbit: string;
  upcoming: boolean;
  launch_success: boolean;
  launch_site?: string;
}
export const SpacexList: React.FC = () => {
  const dispatch = useAppDispatch();
  const today = moment();
  const [statusd, setStatusd] = useState<string>("all");
  const [isOpen,setIsOpen] = useState(false);
  const [value,setValue] = useState(moment.range(today.clone().subtract(3000, "days"), today.clone()));
 
  const onSelect = (value:any) => {

    setValue( value);
  };

 const  onToggle = () => {
    setIsOpen(!isOpen);
  };

  const renderSelectionValue = () => {
    return (
      <div>
       
        {value.start.format("YYYY-MM-DD")}
        {" - "}
        {value.end.format("YYYY-MM-DD")}
      </div>
    );
  };
  useEffect(() => {
    if (statusd) {
      dispatch(getItems({ statusd, value }));
    }
  }, [dispatch, statusd, value]);
  const changeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusd(e.target.value);
  };
 



  return (
    <div className="card text-center mt-5">
      <div className="card-header">
        <img src={SpacexImg} height={20} alt="Spacex" />
      </div>
      <div className="card-body">
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="row col-12">
              <div className="col-6" style={{ textAlign: "left" }}>
              <DateRange isOpen={isOpen} value={value} onToggle={onToggle} onSelect={onSelect}  renderSelectionValue={renderSelectionValue}/>
              </div>
              <div className="col-6" style={{ textAlign: "right" }}>
                <SelectBox changeStatus={changeStatus} />
             
              </div>
            </div>
          </div>
        </nav>
        <TableComponent />
         <ModalComponent />
      </div>
    </div>
  );
};
