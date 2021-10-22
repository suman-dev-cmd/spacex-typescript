import React from "react";
import { useAppDispatch } from "../../hooks/hook";
import {  changeStatus } from "../../state/slice/spaceSlice";

const SelectBox:React.FC = () => {
  const dispatch = useAppDispatch();
  const changeLaunches = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(changeStatus(e.target.value));
  };
  return (
    <select onChange={changeLaunches}>
      <option value="all">All Launches</option>
      <option value="upcoming">Upcoming Launches</option>
      <option value="sucess">Success Launches</option>
      <option value="faild">Faild Launches</option>
    </select>
  );
};

export default SelectBox;
