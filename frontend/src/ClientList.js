import React, { useState, useEffect } from "react";
import { Button, ButtonGroup, Container, Table } from "reactstrap";

function ClientList() {
    const [clients, setClients] = useState([]);

    useEffect(() => {
      fetch("/clients/all")
        .then((response) => response.json())
        .then((data) => setClients(data));
    }, []); // Empty dependency array means this effect runs once after the initial render

  const remove = (clientId) => {
    fetch(`/clients/${clientId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          setClients((prevClients) =>
            prevClients.filter((client) => client.id !== clientId)
          );
        } else {
          console.error("Failed to delete client");
        }
      })
      .catch((error) => console.error("Error: ", error));
  };

  return (
    <div>
      {/* Render your client list here */}
      {clients.map((client) => (
        <tr key={client.id}>
          <td>Name: {client.name}</td>
          <td>Email: {client.email}</td>
          <td>
            <ButtonGroup>
              <Button
                size="sm"
                color="primary"
                //tag={Link}
                to={"/clients/" + client.id}
              >
                Edit
              </Button>
              <Button
                size="sm"
                color="danger"
                onClick={() => remove(client.id)}
              >
                Remove
              </Button>
            </ButtonGroup>
          </td>
        </tr>
      ))}
      <div>
        {/* <AppNavbar /> */}
        <Container fluid>
          <div className="float-right">
            <Button
              color="success"
              //tag={Link}
              to="/clients/new"
            >
              Add Client
            </Button>
          </div>
          <h3>Clients</h3>
          <Table className="mt-4">
            <thead>
              <tr>
                <th width="30%">Name</th>
                <th width="30%">Email</th>
                <th width="40%">Actions</th>
              </tr>
            </thead>
            {/* <tbody>{clients}</tbody> */}
          </Table>
        </Container>
      </div>
    </div>
  );
}
export default ClientList;
