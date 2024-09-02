import React, { useState, useEffect, useMemo } from 'react';
import { Col, Container, Row, Spinner } from "reactstrap";
import BreadCrumb from "Components/Common/BreadCrumb";
import TableContainer from "../../Components/Common/TableContainerReactTable";
import axios from "axios";
//import moment from 'moment';

const Subscribers = () => {

  document.title = "Subscribers | FFS Admin";

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [userList, setUsersList] = useState([]);

  useEffect(() => {
    handleGetUsers();
  }, [setUsersList]);  

  const handleGetUsers = () => {
    setLoading(true);

    //https://api.futureoffinancialservices.org/api/
    //http://localhost:8000/api/

    axios.get('https://api.futureoffinancialservices.org/api/get-subscribers')
    .then(response => {
        console.log(response);
        const result: any = response;
        setUsersList(result);
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
      header: "Email",
      accessorKey: "email",
      enableColumnFilter: false,
    },
    {
      header: "Created",
      accessorKey: "created_at",
      enableColumnFilter: false,
    },
  ],
  []
);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Subscribers" pageTitle="Dashboard" />
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

export default Subscribers;
