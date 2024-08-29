import React, { useState, useEffect, useMemo } from 'react';
import { Col, Container, Row, Spinner } from "reactstrap";
import BreadCrumb from "Components/Common/BreadCrumb";
import TableContainer from "../../Components/Common/TableContainerReactTable";
import axios from "axios";
import ReactTable from "react-table";
import { CSVLink } from "react-csv";

const DashboardEcommerce = () => {

  document.title = "Home | FFS Admin";

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [userList, setUsersList] = useState([]);

  useEffect(() => {
    handleGetUsers();
  }, [setUsersList]);  

  const handleGetUsers = () => {
    setLoading(true);
   /* setTimeout(() => {
        setSuccessful(true);
        setLoading(false);
    }, 5000); */

    //https://api.futureoffinancialservices.org/api/
    //http://localhost:8000/api/

    axios.get('https://api.futureoffinancialservices.org/api/get-registered-users')
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
      header: "ID",
      cell: (cell: any) => {
        return (
          <span className="fw-semibold">{cell.getValue()}</span>
        );
      },
      accessorKey: "id",
      enableColumnFilter: false,
    },
    {
      header: "Name",
      accessorKey: "name",
      enableColumnFilter: false,
    },
    {
      header: "Email",
      accessorKey: "email",
      enableColumnFilter: false,
    },
    {
      header: "Phone",
      accessorKey: "phone",
      enableColumnFilter: false,
    },
    {
      header: "Company",
      accessorKey: "company_name",
      enableColumnFilter: false,
    },
    {
      header: "Title",
      accessorKey: "title",
      enableColumnFilter: false,
    },
  ],
  []
);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Users" pageTitle="Dashboard" />
          <Row className='mt-4 mb-5 px-2'>
            <Col lg={12}>
              {userList.length > 0 && !loading ?
                  <TableContainer
                    columns={(columns || [])}
                    data={(userList || [])}
                    isPagination={userList.length > 5}
                    isGlobalFilter={true}
                    iscustomPageSize={false}
                    isBordered={false}
                    customPageSize={5}
                    SearchPlaceholder='Search...'
                  /> 
                 
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

export default DashboardEcommerce;
