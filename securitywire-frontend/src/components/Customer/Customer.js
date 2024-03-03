import React, { useState } from "react";
import CreatedPrograms from "./CreatedPrograms";
import { Button, Container } from "semantic-ui-react";
import MyModal from "../MyModal";
import { useHistory } from "react-router-dom";

//TODO Customer' tasks:
//TODO//View created Programs
//TODO: Create new Programs -validation -multiselect
//TODO: Update Programs
//TODO//Invite Researcher to a Programs
//TODO// Delete Programs

const Customer = () => {
  const history = useHistory();
  return (
    <Container>
      <br />
      <br />
      <CreatedPrograms />
    </Container>
  );
};

export default Customer;
