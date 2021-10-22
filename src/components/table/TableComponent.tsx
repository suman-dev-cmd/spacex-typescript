import React from 'react'
import {ModifyTableProps} from '../SpacexList';
import MaterialTable from 'material-table'
interface TableProps{
    editable:ModifyTableProps[];
    getStatus:(upcoming:boolean,launch_status:boolean)=>any;
    getSignleItem:(flight_number:number)=>any;
}
const TableComponent = ({editable,getStatus,getSignleItem}:TableProps) => {
    return (
        <MaterialTable

        title=""
        columns={[
          { title: "No.", field: "flight_number" },
          { title: "Launched(UTC)", field: "launch_date_utc" },
          { title: "Location", field: "launch_site"},
          { title: "Mission", field: "mission_name"},
          { title: "Orbit", field: "orbit"},
          { title: "Launch Status", field: "launch_success",render:(row)=>getStatus(row.upcoming,row.launch_success)},
          { title: "Rocket", field: "rocket_name"},
        ]}
        data={editable}
        onRowClick={((evt, selectedRow) => getSignleItem(1))}  
      />
    )
}

export default TableComponent
