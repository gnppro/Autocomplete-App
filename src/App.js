import React, { useState, useEffect } from 'react';
import client from "axios";
import Autocomplete from "./components/Autocomplete";
import './App.css'

function App() {
  const [data, setData] = useState([])
  const [refresh, setRefresh] = useState(1)
  const [openMessage, setOpenMessage] = useState(false)

  useEffect(() => {
    client("https://api.github.com/repos/facebook/react/issues")
      .then(res => {
        setData(res.data);
      });
  }, [refresh])

  const handleRefresh = () => {
    setRefresh(refresh + 1)
    setOpenMessage(true)
    setTimeout(() => {
      setOpenMessage(false)
    }, 5000)
  }

  return (
    <div className="App">
      {openMessage && <div className="App-message"><p>Lista de Issues actualizada!</p></div>}
      <div className="App-container">
        <div>
          <h1 className="App-title">Autocomplete App</h1>
          <Autocomplete data={data} />
          <button className="App-button" onClick={handleRefresh}>Actualizar Issues</button>
        </div>
      </div>
    </div>
  );
}

export default App;
