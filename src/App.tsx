import React from 'react';
import './App.css';

function App() {
  return (
    <div className="flex h-screen w-screen justify-center items-center" >
      <div className="w-9/12 h-5/6 mt-6 border-2 border-amber-300 ">
        <h1 className="text-3xl text-center font-semi-bold">Dashboard</h1>
        <div className="w-9/12 h-5/6 mt-6 border-2 border-amber-600 mx-auto"> 
          <div className="w-3/6 h-full float-left">
            <div className="bg-red-500 w-full h-3/6"></div>
            <div className="bg-blue-500 w-full h-3/6"></div>
          </div>
          <div className="w-3/6 h-full bg-blue-500 float-right">
            <div className="bg-blue-500 w-full h-3/6"></div>
            <div className="bg-red-500 w-full h-3/6"></div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default App;

// Ok, so what I want to crate is a div in the center of the page that I can size w and h using relative sizes
// No I need to add a title to the top of the page
// Next up is adding yet another box inside the first box, that is also sized relatively
// Create 4 boxes inside the second box, that are also sized relatively
// Create two twin boxes inside the second box, that are also sized relatively
