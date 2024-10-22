import React, { useState, useEffect, useMemo } from 'react';
import { Col, Container, Row, Spinner } from "reactstrap";
import BreadCrumb from "Components/Common/BreadCrumb";
import TableContainer from "../../Components/Common/TableContainerReactTable";
import axios from "axios";
import moment from 'moment';

const ContactUs = () => {

  document.title = "Contacts | FFS Admin";

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [userList, setContactsList] = useState([]);

  useEffect(() => {
    handleGetContacts();
  }, [setContactsList]);  

  const handleGetContacts = () => {
    setLoading(true);

    //https://api.futureoffinancialservices.org/api/
    //http://localhost:8000/api/
    //https://dev-api.futureoffinancialservices.org/api/v1/

    axios.get('https://dev-api.futureoffinancialservices.org/api/v1/contact')
    .then(response => {
        console.log(response);
        const result: any = response;
        setContactsList(result);
        setLoading(false);
    })
    .catch((error) => {
        if (error.response) {
            console.log(error.response.data.message);
            setErrorMsg(error.response.data.message);
            console.log("server error");
        } else if (error.request) {
            console.log("network error");
        } else {
            console.log(error);
        }
        setLoading(false);
  })
};


const columns = useMemo (
  () => [
    {
      header: "First Name",
      accessorKey: "first_name",
      enableColumnFilter: false,
    },
    {
      header: "Last Name",
      accessorKey: "last_name",
      enableColumnFilter: false,
    },
    {
      header: "Email",
      accessorKey: "email",
      enableColumnFilter: false,
    },
    {
      header: "Phone Number",
      accessorKey: "phonenumber",
      enableColumnFilter: false,
    },
    
    {
      header: "Additional Info",
      accessorKey: "additional_information",
      enableColumnFilter: false,
    },
    {
      header: "Created",
      accessorKey: "createdAt",
      enableColumnFilter: false,
      enableResizing: false, 
      size: 150,
      cell: (cell: any) => {
        return (
          <span>{moment(cell.getValue()).format("YYYY-MM-DD HH:mm:ss")}</span>
        )
      }
    },
  ],
  []
);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Contacts" pageTitle="Dashboard" />
          <Row className='mt-4 mb-5 px-2'>
            <Col lg={12}>
              {!loading ?
                userList.length > 0 ?
                    <TableContainer
                      columns={(columns || [])}
                      data={(userList || [])}
                      isPagination={userList.length > 20}
                      isGlobalFilter={true}
                      iscustomPageSize={false}
                      isBordered={false}
                      customPageSize={20}
                      divClass={'table-responsive'}
                      SearchPlaceholder='Search...'
                    /> 
                    :
                    <div className="d-flex flex-column align-items-center w-100 py-4">
                      <i className={"ri-alert-fill display-1 text-xl text-warning"}></i>
                      <p className='text-muted'>No Data Found</p>
                    </div>
                : 
                <div className="text-center"><Spinner animation="border" variant="primary" /></div>
              }
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ContactUs;
