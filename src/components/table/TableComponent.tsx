import React from "react";
import { ModifyTableProps } from "../SpacexList";
import MaterialTable from "material-table";
import { getItem } from "../../state/actions/spacexActions";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import moment from "moment";

const TableComponent: React.FC = () => {
  const { item, isLoading, modal, errorMessage, singleItem } = useAppSelector(
    (state) => state.spacex
  );
  const dispatch = useAppDispatch();
  let editable: ModifyTableProps[] = [];
  if (item) {
    editable = item.map((item) => {
      const container = {} as ModifyTableProps;
      if (item.flight_number !== undefined) container.id = item.flight_number;
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
  const getSignleItem = (flight_number: number | undefined) => {
    // console.log(flight_number)
    if (typeof flight_number !== undefined) {
      dispatch(getItem({ flight_number }));
    }
  };
  return (
    <>
      {isLoading ? (
        <>Loading.......</>
      ) : (
        <>
          {editable.length > 0 ? (
            <MaterialTable
              title=""
              columns={[
                { title: "No.", field: "flight_number" },
                { title: "Launched(UTC)", field: "launch_date_utc" },
                { title: "Location", field: "launch_site" },
                { title: "Mission", field: "mission_name" },
                { title: "Orbit", field: "orbit" },
                {
                  title: "Launch Status",
                  field: "launch_success",
                  render: (row) => getStatus(row.upcoming, row.launch_success),
                },
                { title: "Rocket", field: "rocket_name" },
              ]}
              data={editable}
              onRowClick={(
                evt: React.MouseEvent<Element, MouseEvent> | undefined,
                selectedRow: ModifyTableProps | undefined
              ) => getSignleItem(selectedRow?.flight_number)}
            />
          ) : (
            <>
              {errorMessage ? (
                <>
                  <div className="alert alert-danger" role="alert">
                    {errorMessage}
                  </div>
                </>
              ) : (
                <>
                  <div className="alert alert-info" role="alert">
                    Not Found List !
                  </div>
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default TableComponent;
