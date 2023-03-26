import React, { useState, useEffect } from 'react';

function App() {
  const [timeSpent, setTimeSpent] = useState({});

  useEffect(() => {
    chrome.runtime.sendMessage({ type: 'getTimeSpentData' }, (response) => {
      setTimeSpent(response);
    });
  }, []);

  return (
    <div>
      <h1>Time Spent on Websites</h1>
      <ul>
        {Object.entries(timeSpent).map(([website, time]) => (
          <li key={website}>
            {website}: {time / 1000} seconds
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
