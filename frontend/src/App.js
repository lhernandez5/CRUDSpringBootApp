import "./App.css";
import { useState, useEffect } from "react";


function App() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/clients/all");
        const data = await response.json();
        setClients(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <div className="App">
      <header className="App-header">
        <div className="App-intro">
          <h2>Clients</h2>
          {clients.map((client) => (
            <p key={client.id}>
              {client.name} ({client.email})
            </p>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
