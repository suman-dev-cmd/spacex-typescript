import React, { useState, useEffect } from "react";
import { useAppDispatch,useAppSelector } from "../hooks/hook";
import { getItems } from "../state/actions/spacexActions";
import SpacexImg from "./spacex.png";
import TableComponent from "./table/TableComponent";

import ModalComponent from "./modal/ModalComponent";
import DateRange from "./daterange/DateRange";
import SelectBox from "./selectbox/SelectBox";

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
  const {  statusd,start,end } = useAppSelector(
    (state) => state.spacex
  );
  useEffect(() => {
    if (statusd) {
      dispatch(getItems({ statusd, start,end }));
    }
  }, [dispatch, statusd, start,end]);
  
  return (
    <div className="card text-center mt-5" data-test="component">
      <div className="card-header">
        <img src={SpacexImg} height={20} alt="Spacex" />
      </div>
      <div className="card-body">
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="row col-12">
              <div className="col-3" style={{ textAlign: "left" }}>
              <DateRange   />
              </div>
              <div className="col-3" style={{ textAlign: "left" }}>
              </div>
              <div className="col-6" style={{ textAlign: "right" }}>
                <SelectBox  />
             
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
