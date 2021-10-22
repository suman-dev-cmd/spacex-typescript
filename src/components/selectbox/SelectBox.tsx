import React from "react";
interface SelecboxProps{
    changeStatus:(e: React.ChangeEvent<HTMLSelectElement>)=>void;
}
const SelectBox = ({changeStatus}:SelecboxProps) => {
  return (
    <select onChange={changeStatus}>
      <option value="all">All Launches</option>
      <option value="upcoming">Upcoming Launches</option>
      <option value="sucess">Success Launches</option>
      <option value="faild">Faild Launches</option>
    </select>
  );
};

export default SelectBox;
