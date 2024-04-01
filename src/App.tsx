import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector } from "react-redux";
import { fetchHomeData } from "./store/home";

function App() {
   const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchHomeData())
  },[dispatch])

  const homeData = useSelector(
    (state: any) => state.homeData.homeData
  );

  console.log(homeData.length,'homeData');
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {homeData && homeData?.map((it:any,index:any)=>{
            return( <React.Fragment>
              <p style={{color:'white'}}>{it.title}</p>
            </React.Fragment>);
        })}
        
       
      </header>
    </div>
  );
}

export default App;
