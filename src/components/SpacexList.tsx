import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hook";
import { getItems,getItem } from "../state/actions/spacexActions";
import { Spacex } from "../state/slice/spaceSlice";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import moment from "moment";

export const SpacexList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { item, itemstate, errorMessage,singleItem } = useAppSelector(
    (state) => state.spacex
  );
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const [statusd, setStatusd] = useState<string>("all");
  useEffect(() => {
    if (statusd) {
      dispatch(getItems({ statusd }));
    }
  }, [statusd]);
  const changeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusd(e.target.value);
  };
  const getSignleItem=(flight_number:number)=>{
    // console.log(flight_number)
    dispatch(getItem({flight_number}));
    setModal(true);
  }
  return (
    <div className="card text-center mt-5">
      <div className="card-header">Specex</div>
      <div className="card-body">
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="row col-12">
              <div className="col-6" style={{ textAlign: "left" }}></div>
              <div className="col-6" style={{ textAlign: "right" }}>
                <select onChange={changeStatus}>
                  <option value="all">All Launches</option>
                  <option value="upcoming">Upcoming Launches</option>
                  <option value="next">Next Launches</option>
                  <option value="latest">Latested Launches</option>
                </select>
              </div>
            </div>
          </div>
        </nav>
        {itemstate === "LOADING" ? (
          <>Loading.......</>
        ) : (
          <>
            <table className="table table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col">Launched(UTC)</th>
                  <th scope="col">Location</th>
                  <th scope="col">Mission</th>
                  <th scope="col">Orbit</th>
                  <th scope="col">Launch Status</th>
                  <th scope="col">Rocket</th>
                </tr>
                {item.length > 0 ? (
                  item.map((obj: Spacex, i: number) => (
                    <tr key={i} onClick={()=>getSignleItem(obj.flight_number)} style={{cursor:'pointer'}}>
                      <td>{obj.flight_number}</td>
                      <td>
                        {moment(obj.launch_date_utc).format(
                          "YYYY-MM-DD HH:mm:ss"
                        )}
                      </td>
                      <td>{obj.launch_site?.site_name}</td>
                      <td>{obj.mission_name}</td>
                      <td>{obj.rocket?.second_stage.payloads[0].orbit}</td>

                      <td>
                        {obj.launch_success ? (
                          <div className="alert alert-success" role="alert">
                            Success
                          </div>
                        ) : (
                          <div className="alert alert-danger" role="alert">
                            Faild
                          </div>
                        )}
                      </td>
                      <td>{obj.rocket?.rocket_name}</td>
                    </tr>
                  ))
                ) : (
                  <td colSpan={7}>
                    {errorMessage ? (
                      <>
                        <div className="alert alert-danger" role="alert">
                          {errorMessage}
                        </div>
                      </>
                    ) : (
                      " No Record found"
                    )}
                  </td>
                )}
              </thead>
              <tbody></tbody>
            </table>
          </>
        )}
      </div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Show Launch</ModalHeader>
        <ModalBody>
         Flight Number: {singleItem?.flight_number}
         <br/>
         Launched(UTC) : {moment(singleItem?.launch_date_utc).format(
                          "YYYY-MM-DD HH:mm:ss"
                        )}
        <br/>
        Location :{singleItem?.launch_site?.site_name}
        <br/>
        Mission :{singleItem?.mission_name}
        <br/>
        Orbit :{singleItem?.rocket?.second_stage.payloads[0].orbit}
        <br/>
         Rocket :{singleItem?.rocket?.rocket_name}
        </ModalBody>
     
      </Modal>
    </div>
  );
};
