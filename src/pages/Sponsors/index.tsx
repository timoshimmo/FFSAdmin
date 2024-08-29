import React from "react";
import { Container } from "reactstrap";
import BreadCrumb from "Components/Common/BreadCrumb";

const RegisteredUsers = () => {
  document.title = "Users | Velzon - React Admin & Dashboard Template";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Ecommerce" pageTitle="Dashboard" />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default RegisteredUsers;
