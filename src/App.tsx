import React, { useState } from "react";
import { SpacexList } from "./components/SpacexList";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
const App:React.FC=() =>{
  
  return (
    <div className="container">
     <SpacexList />
    </div>
  );
}


export default App;
