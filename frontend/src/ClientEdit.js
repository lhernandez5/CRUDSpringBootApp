import React, { useState, useEffect } from "react";
import { Button, FormGroup, Form, Input, Label } from "reactstrap";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';

const ClientEdit = () => {
  const { id } = useParams();

  const [item, setItem] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    if (id) {
      fetch(`/clients/${id}`)
        .then((response) => response.json())
        .then((data) => setItem(data))
        .catch((error) => console.log("Error fetching client data:", error));
    }
    // Fetch existing data based on props.match.params.id
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
    
    const apiURl = id ? `/clients/${id}` : "/clients";
    const httpMethod = id ? "PUT" : "POST";

    // Make the fetch request to update or create the client
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
        // redirect or perform other actions after successful submission
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
            </Button>{" "}
            <Button color="secondary" tag={Link} to="/clients">
              Cancel
            </Button>
          </FormGroup>
        </Form>
      </div>
    </>
  );
};
export default ClientEdit;
