import React from 'react';
import './App.css';
import DeepWorkCard from './components/DeepWorkCard';
import RunCard from './components/RunCard';
import SleepCard from './components/SleepCard';
import WebsiteTimeCard from './components/WebsiteTimeCard';


function App() {
  return (
    <div className="flex h-screen w-screen justify-center items-center" >
      <div className="w-9/12 h-5/6 ">
        <h1 className="text-3xl text-center font-semi-bold">Dashboard</h1>
        <div className="w-11/12 h-5/6 mt-6 mx-auto mt-10 border-2">
          <div className="w-full sm:w-9/12 md:w-7/12  lg:w-5/12 h-full lg:float-left border-2 mx-auto lg:ml-14 mb-28 ">
            <RunCard /> 
            <SleepCard/>
          </div>
          <div className="w-full sm:w-9/12 md:w-7/12  lg:w-5/12 h-full lg:float-left border-2 mx-auto lg:ml-14 mb-28 ">
            <WebsiteTimeCard/>
            <DeepWorkCard/>
          </div>
        </div>
      </div>
    </div>

  );
}

export default App;


