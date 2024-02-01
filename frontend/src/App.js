import "./App.css";
import ClientEdit from "./ClientEdit";
import ClientList from "./ClientList";
import Home from './Home';
import { BrowserRouter as Router, Routes,Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact={true} element={<Home />} />
        <Route path="/clients" exact={true} element={<ClientList />} />
        <Route path="/clients/:id" element={<ClientEdit />} />
      </Routes>
    </Router>
  );
}

export default App;
