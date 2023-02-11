import React from 'react';
import './App.css';

function App() {
  return (
    <div className="flex h-screen justify-center items-center  bg-gray-800" >
    <div className="text-center w-5/12 border-amber-600 ">
      <h1 className="text-3xl font-semi-bold">Dashboard</h1>
      <div className="w-10/12 h-96 mx-auto mt-6 border-2 border-amber-300">
        <div className="w-48 h-40 bg-red-500 mb-2 float-left"></div>
        <div className="w-48 h-48 bg-blue-500 mb-2 float-right"></div>
        <div className="w-48 h-56 bg-green-500 mb-2 float-left"></div>
        <div className="w-48 h-48 bg-yellow-500 mb-2 float-right"></div>
      </div>
    </div>
    </div>

  );
}


export default App;

// Ok, so what I want to crate is a div in the center of the page that I can size w and h using relative sizes


{/* <div className="grid grid-cols-2 mt-8 border-lime-300 border-2 h-80">
        <div className="bg-red-500 flex-auto h-60 p-0"></div>
        <div className="bg-blue-500 flex-auto h-40 p-0"></div>
        <div className="bg-green-500 flex-auto h-20 p-0"></div>
        <div className="bg-yellow-500 flex-auto h-40 p-0"></div>
</div> */}