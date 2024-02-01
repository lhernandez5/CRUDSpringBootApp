import "./App.css";
import ClientEdit from "./ClientEdit";
import ClientList from "./ClientList";
import Home from './Home';
import { BrowserRouter as Router, Routes,Route } from "react-router-dom";
// import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact={true} element={<Home />}></Route>
        <Route path="/clients" exact={true} element={<ClientList />}></Route>
        {/* <Route path="/clients/:id" element={<ClientEdit />}></Route> */}
      </Routes>
    </Router>
  );
}

export default App;
