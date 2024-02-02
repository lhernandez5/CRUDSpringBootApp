import React, { useState, useEffect } from "react";
import { Button, FormGroup, Form, Input, Label } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";

const ClientEdit = () => {
  const { id } = useParams();
  const history = useNavigate();
  const [item, setItem] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    const clientId = id;
    if (clientId) {
      fetch(`/clients/${clientId}`)
        .then((response) => response.json())
        .then((data) => setItem(data))
        .catch((error) => console.log("Error fetching client data:", error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const clientId = id;
    const apiURl = clientId ? `/clients/${clientId}` : "/clients";
    const httpMethod = clientId ? "PUT" : "POST";

    fetch(apiURl, {
      method: httpMethod,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Client saved successfully:", data);
        history("/clients");
      })
      .catch((error) => console.error("Error saving client:", error));
  };

  return (
    <>
      <div>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              type="text"
              name="name"
              id="name"
              value={item.name || ""}
              onChange={handleChange}
              autoComplete="name"
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="text"
              name="email"
              id="email"
              value={item.email || ""}
              onChange={handleChange}
              autoComplete="email"
            />
          </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit">
              Save
            </Button>
            <Button color="secondary">Cancel</Button>
          </FormGroup>
        </Form>
      </div>
    </>
  );
};
export default ClientEdit;
