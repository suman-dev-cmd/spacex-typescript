import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hook";
import { getItems, getItem } from "../state/actions/spacexActions";
import { Spacex, getModalFalse } from "../state/slice/spaceSlice";
import SpacexImg from "./spacex.png";
import TableComponent from "./table/TableComponent";
import * as Moment from "moment";
import {extendMoment} from 'moment-range';
import ModalComponent from "./modal/ModalComponent";
import DateRange from "./daterange/DateRange";
const moment = extendMoment(Moment);
export interface ModifyTableProps {
  id: number;
  flight_number: number;
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

  const { item, isLoading, modal, errorMessage, singleItem } = useAppSelector(
    (state) => state.spacex
  );
  let editable: ModifyTableProps[] = [];
  if (item) {
    editable = item.map((item) => {
      const container = {} as ModifyTableProps;

      container.id = item.flight_number;
      container.flight_number = item.flight_number;
      container.launch_date_utc = moment(item.launch_date_utc).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      container.mission_name = item.mission_name;
      container.rocket_name = item.rocket?.rocket_name;
      container.orbit = item.rocket?.second_stage.payloads[0].orbit;
      container.upcoming = item.upcoming;
      container.launch_success = item.launch_success;
      container.launch_site = item.launch_site?.site_name;

      return container;
    });
  }
  // console.log(item);
  const toggle = () => dispatch(getModalFalse());
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
  const getSignleItem = (flight_number: number) => {
    // console.log(flight_number)
    dispatch(getItem({ flight_number }));
  };

  const getStatus = (upcoming: boolean, launch_success: boolean) => {
    if (upcoming) {
      return (
        <span
          className="badge badge-info"
          style={{ backgroundColor: "#17a2b8" }}
        >
          Upcoming
        </span>
      );
    } else {
      if (launch_success) {
        return (
          <span
            className="badge badge-success"
            style={{ backgroundColor: "green" }}
          >
            Success
          </span>
        );
      } else {
        return (
          <span
            className="badge badge-danger"
            style={{ backgroundColor: "red" }}
          >
            Faild
          </span>
        );
      }
    }
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
                <select onChange={changeStatus}>
                  <option value="all">All Launches</option>
                  <option value="upcoming">Upcoming Launches</option>
                  <option value="sucess">Success Launches</option>
                  <option value="faild">Faild Launches</option>
                </select>
              </div>
            </div>
          </div>
        </nav>
        {isLoading ? (
          <>Loading.......</>
        ) : (
          <>
            {editable.length > 0 && (
              <TableComponent
                editable={editable}
                getStatus={getStatus}
                getSignleItem={getSignleItem}
              />
            )}

            <ModalComponent
              modal={modal}
              errorMessage={errorMessage}
              singleItem={singleItem}
              toggle={toggle}
            />
          </>
        )}
      </div>
    </div>
  );
};
